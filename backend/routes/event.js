const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const auth = require('../middleware/auth');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper: extract JSON from possibly markdown-wrapped response
function extractJSON(text) {
  try {
    const match = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (match) return JSON.parse(match[1].trim());
    return JSON.parse(text.trim());
  } catch (e) {
    console.error('JSON Extraction Error:', e);
    throw new Error('Failed to parse AI response as JSON');
  }
}

// POST /api/event/guide
router.post('/guide', auth, async (req, res) => {
  const { eventType, guideType } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }, { apiVersion: 'v1' });
    
    const prompt = `Provide a detailed ${guideType} guide for a ${eventType}. 
    If guideType is 'outfit', include: clothing suggestions, color combinations, footwear, accessories, and a grooming checklist.
    If guideType is 'communication', include: conversation starters, tone and voice tips, sample answers, and mistakes to avoid.
    If guideType is 'bodyLanguage', include: posture, eye contact, gestures, facial expressions, and walking confidence.
    Return only a structured JSON object with fields as appropriate for the content. Never use markdown code blocks.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.status(200).json(extractJSON(response.text()));
  } catch (error) {
    console.error('Event Guide error:', error);
    res.status(500).json({ message: 'Error generating guide: ' + error.message, error: error.message });
  }
});

module.exports = router;
