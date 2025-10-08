const axios = require('axios')

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
    const GEMINI_KEY = process.env.GEMINI_KEY
    if (!GEMINI_KEY) return res.status(500).json({ error: 'Gemini key not configured on server.' })

    const { model = 'models/text-bison-001', input } = req.body || {}
    if (!input) return res.status(400).json({ error: 'Missing input in request body' })

    const url = `https://generativeai.googleapis.com/v1beta2/${model}:generate?key=${GEMINI_KEY}`

    const response = await axios.post(url, { prompt: input }, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 60000
    })

    return res.status(response.status).json(response.data)
  } catch (err) {
    console.error('Gemini proxy error:', err?.response?.data || err.message || err)
    const status = err?.response?.status || 500
    const data = err?.response?.data || { error: err.message }
    return res.status(status).json(data)
  }
}
