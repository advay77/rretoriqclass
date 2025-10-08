const axios = require('axios')
const FormData = require('form-data')

function setCors(req, res) {
  const allowed = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean)
  const origin = req.headers.origin
  if (!origin) {
    res.setHeader('Access-Control-Allow-Origin', '*')
  } else if (allowed.length === 0 || allowed.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
}

module.exports = async (req, res) => {
  setCors(req, res)
  if (req.method === 'OPTIONS') return res.status(204).end()
  try {
    const OPENAI_KEY = process.env.OPENAI_KEY
    if (!OPENAI_KEY) return res.status(500).json({ error: 'OpenAI key not configured on server.' })

    if (!req.headers['content-type'] || !req.is('multipart/*')) {
      return res.status(400).json({ error: 'This endpoint expects multipart/form-data with field `file`' })
    }

    // Vercel parses multipart into req.body/files depending on runtime; to keep this simple,
    // expect a base64 field or forward the raw body. For robust handling, use Busboy or multer.
    // Here we'll assume client posts base64 in `file` field.

    const { file, language, temperature, response_format } = req.body || {}
    if (!file) return res.status(400).json({ error: 'Missing file (base64) in request body' })

    const form = new FormData()
    const buffer = Buffer.from(file, 'base64')
    form.append('file', buffer, { filename: 'recording.webm', contentType: 'audio/webm' })
    form.append('model', 'whisper-1')
    if (language) form.append('language', language)
    if (temperature) form.append('temperature', temperature)
    if (response_format) form.append('response_format', response_format)

    const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', form, {
      headers: {
        Authorization: `Bearer ${OPENAI_KEY}`,
        ...form.getHeaders()
      },
      timeout: 120000
    })

    return res.status(response.status).json(response.data)
  } catch (err) {
    console.error('Whisper proxy error:', err?.response?.data || err.message || err)
    const status = err?.response?.status || 500
    const data = err?.response?.data || { error: err.message }
    return res.status(status).json(data)
  }
}
