export default async function handler(req, res) {
  // ✅ Allow cross-origin requests from your frontend
 res.setHeader("Access-Control-Allow-Origin", "*"); // for testing, later replace with your domain
res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");

// Handle preflight
if (req.method === "OPTIONS") {
  return res.status(200).end();
}

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
  // Frontend sends: { model: 'gemini-2.0-flash', input: '<prompt>' }
  const { model = 'gemini-1.5-flash', input } = req.body;
  console.log("🧠 Incoming Gemini Request:", { model, inputLength: input?.length });

  if (!input) {
    return res.status(400).json({ error: "Missing 'input' in request body" });
  }

  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ Gemini API key not found");
    return res.status(500).json({ error: "Gemini API key not configured." });
  }

  // Use the model from request or default to gemini-1.5-flash
  const geminiModel = model.includes('gemini') ? model : 'gemini-1.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: input
          }
        ]
      }
    ]
  };

  console.log("📡 Sending payload to Gemini:", payload);

  const geminiResponse = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const raw = await geminiResponse.text();
  console.log("🔍 Gemini Raw Response:", raw.substring(0, 500)); // Log first 500 chars

  if (!geminiResponse.ok) {
    console.error("❌ Gemini API error response:", raw);
    return res.status(geminiResponse.status).json({ error: `Gemini API error: ${raw}` });
  }

  const data = JSON.parse(raw);
  console.log("✅ Gemini Response received:", { 
    hasCandidates: !!data.candidates, 
    candidatesCount: data.candidates?.length 
  });
  
  // Return the raw Google Gemini response format (frontend expects this structure)
  return res.status(200).json(data);

  } catch (error) {
    console.error("❌ Gemini Proxy Crash:", error);
    return res
      .status(500)
      .json({ error: error.message || "Gemini Proxy internal error" });
  }
}