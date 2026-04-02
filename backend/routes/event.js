const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const OpenAI = require('openai');
const auth = require('../middleware/auth');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// POST /api/event/guide
router.post('/guide', auth, async (req, res) => {
  const { eventType, guideType } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Provide a detailed ${guideType} guide for a ${eventType}. 
          If guideType is 'outfit', include: clothing suggestions, color combinations, footwear, accessories, and a grooming checklist.
          If guideType is 'communication', include: conversation starters, tone and voice tips, sample answers, and mistakes to avoid.
          If guideType is 'bodyLanguage', include: posture, eye contact, gestures, facial expressions, and walking confidence.
          Provide structured JSON output with fields as appropriate for the content.`
        },
      ],
      response_format: { type: "json_object" }
    });

    res.status(200).json(response.choices[0].message.content);
  } catch (error) {
    res.status(500).json({ message: 'Error generating guide', error: error.message });
  }
});

module.exports = router;
