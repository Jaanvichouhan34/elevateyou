const { generateAIResponse } = require("../utils/aiService");
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const OutfitScan = require('../models/OutfitScan');
const { saveData, readData } = require('../utils/storage');

const outfitFallbacks = {
  Interview: {
    score: 8,
    summary: "Your outfit shows a professional approach suitable for an interview setting. Based on your input, you have made thoughtful style choices.",
    strengths: ["Professional color choice that signals credibility", "Appropriate formality level for the context", "Clean and well-maintained appearance", "Good footwear selection for the occasion"],
    improvements: ["Consider adding a structured blazer or jacket for authority", "Ensure all clothes are freshly ironed with no creases", "A subtle watch or accessory can elevate the overall look"],
    risks: ["Overly casual pieces can undermine first impressions", "Bright or distracting patterns may shift focus away from you", "Wrinkled or ill-fitted clothing signals lack of preparation"],
    groomingTips: ["Keep hair neatly styled and away from face", "Ensure shoes are clean and polished", "Subtle fragrance only — nothing overpowering in a closed room"]
  },
  Presentation: {
    score: 7,
    summary: "Your presentation outfit strikes a good balance between professional and approachable. This style works well for engaging an audience.",
    strengths: ["Smart casual level is appropriate for most presentations", "Solid colors help you stand out against slide backgrounds", "Comfortable enough for standing and moving around", "Approachable yet professional appearance"],
    improvements: ["Add a blazer to instantly increase perceived authority", "Choose colors that contrast well with your slide theme", "Avoid any noisy jewelry that moves when you gesture"],
    risks: ["White shirts can blend into white presentation backgrounds", "Overly formal attire can create distance with your audience", "Uncomfortable shoes will affect your confidence and posture"],
    groomingTips: ["Check appearance in a mirror right before presenting", "Keep hair secured so it does not fall over your face", "Minimal accessories to avoid distraction during gestures"]
  },
  Party: {
    score: 9,
    summary: "Your outfit is fun, stylish and perfectly appropriate for a social occasion. You have made choices that balance personality with appropriateness.",
    strengths: ["Shows personality while remaining tasteful", "Good balance of style and comfort for a social setting", "Color and style choices are fun and occasion-appropriate", "Accessory choices add character without overdoing it"],
    improvements: ["A statement piece like bold shoes or a jacket could elevate this", "Layer with a stylish outer piece for versatility", "Consider adding one bold accessory as a conversation starter"],
    risks: ["Overly formal attire can make you feel out of place", "Too casual may seem like you did not make an effort", "Uncomfortable clothing affects your mood and confidence"],
    groomingTips: ["Style your hair in a way that holds throughout the evening", "A good fragrance is essential for social events", "Keep a small touch-up kit for longer events"]
  },
  Wedding: {
    score: 8,
    summary: "Your wedding guest outfit is elegant and respectful of the occasion. You have made appropriate choices that honor the event without overshadowing the couple.",
    strengths: ["Formality level is appropriate for a wedding", "Color choices are respectful and occasion-suitable", "Overall presentation shows effort and consideration", "Style is elegant without being overdressed"],
    improvements: ["Ensure the outfit is absolutely wrinkle-free for photos", "Add elegant accessories to complete the formal look", "A pocket square or corsage adds a celebratory touch"],
    risks: ["Never wear white, ivory or cream to a wedding", "Overly casual outfits disrespect the formality of the occasion", "Uncomfortable shoes are a problem at events with dancing"],
    groomingTips: ["Get a fresh haircut or style a few days before", "Dress shoes must be polished to a shine", "Keep formal grooming standards throughout the day"]
  },
  Office: {
    score: 7,
    summary: "Your office outfit is professional and workplace appropriate. The choices you have made align well with a business environment.",
    strengths: ["Meets professional workplace standards", "Conservative enough to be taken seriously", "Practical and comfortable for a full day of work", "Projects a credible and reliable image"],
    improvements: ["Invest in one or two quality statement pieces like a good blazer", "Introduce subtle personality through accessories or color accents", "Ensure everything is wrinkle-free at the start of each day"],
    risks: ["Too casual risks being seen as unprofessional", "Graphic tees or hoodies are generally not appropriate", "Ill-fitting clothes affect both appearance and confidence"],
    groomingTips: ["Consistent daily grooming builds your professional reputation", "Keep nails clean and trimmed", "Fresh breath and subtle fragrance are always important"]
  },
  College: {
    score: 7,
    summary: "Your college outfit is stylish and age-appropriate. You have struck a good balance between looking put-together and staying comfortable.",
    strengths: ["Comfortable enough for a full day on campus", "Stylish and appropriate for a college environment", "Shows personality while remaining neat", "Practical footwear for walking between classes"],
    improvements: ["Clean sneakers instantly elevate any casual outfit", "Layering adds both style and practical temperature control", "One accessory like a watch or bag ties the whole look together"],
    risks: ["Overly formal looks out of place in most college settings", "Very revealing outfits may be inappropriate for some classes", "Wrinkled or dirty clothing affects how peers perceive you"],
    groomingTips: ["A clean and fresh appearance goes a long way on campus", "Simple skincare routine keeps you looking healthy", "Well-fitted clothes always look better than oversized ones"]
  }
};

// Helper: extract JSON from possibly markdown-wrapped response
function extractJSON(text) {
  try {
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');
    const jsonString = text.substring(jsonStart, jsonEnd + 1);
    return JSON.parse(jsonString);
  } catch (e) {
    console.error('❌ JSON parse failed:', text);
    throw new Error('Invalid JSON from AI');
  }
}

// POST /api/outfit/scan-image
// Body: { event: string, imageBase64: string (data URI) }
router.post('/scan-image', auth, async (req, res) => {
  const { event, imageBase64 } = req.body;

  if (!imageBase64 || !event) {
    return res.status(400).json({ message: 'Image and event are required.' });
  }

  try {

    const prompt = `
You are a fashion AI expert.

The user uploaded an outfit image for: ${event}.

Analyze the outfit visually and return ONLY valid JSON:

{
  "score": number (1-10),
  "summary": "",
  "strengths": [],
  "improvements": [],
  "risks": [],
  "groomingTips": []
}
`;

    const aiResponse = await generateAIResponse(prompt);

    // extract JSON safely
    const jsonStart = aiResponse.indexOf("{");
    const jsonEnd = aiResponse.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("Invalid AI response");
    }
let aiResData;

try {


  aiResData = JSON.parse(
    aiResponse.substring(jsonStart, jsonEnd + 1)
  );
} catch (err) {
  console.error("AI JSON parse failed:", err);
  return res.status(500).json({
  success: false,
  message: "AI response parsing failed"
});
}

    // Save to DB
    let savedScan = null;

    if (mongoose.connection.readyState === 1) {
      try {
        const newScan = new OutfitScan({
          userId: req.userData.userId,
          event,
          inputType: 'image',
          aiResponse: aiResData
        });

        savedScan = await newScan.save();
      } catch (e) {
        console.error('DB Save error:', e);
      }
    }

    if (!savedScan) {
      savedScan = saveData('outfit_scans', {
        userId: req.userData.userId,
        event,
        inputType: 'image',
        aiResponse: aiResData
      });
    }

    return res.status(200).json({
  success: true,
  data: savedScan
});

  } catch (error) {
    console.error('Scan image error:', error);

    const fallback = outfitFallbacks[event] || outfitFallbacks["Interview"];

    return res.status(200).json({
      ...fallback,
      isFallback: true
    });
  }
});

// POST /api/outfit/scan-text
// Body: { event: string, outfitDescription: string }
router.post('/scan-text', auth, async (req, res) => {
  const { event, outfitDescription } = req.body;

  if (!outfitDescription || !event) {
    return res.status(400).json({ message: 'Outfit description and event are required.' });
  }

  try {
    const prompt = `
You are a professional style consultant.

Event: ${event}
Outfit: ${outfitDescription}

Return ONLY valid JSON:
{
  "score": number (1-10),
  "summary": "2 lines",
  "strengths": ["..."],
  "improvements": ["..."],
  "risks": ["..."],
  "groomingTips": ["..."]
}
`;

    const aiResponse = await generateAIResponse(prompt);
    console.log("🔍 RAW AI RESPONSE:", aiResponse);


let aiResData;

try {
  const jsonStart = aiResponse.indexOf("{");
  const jsonEnd = aiResponse.lastIndexOf("}");

  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error("No JSON found");
  }

  aiResData = JSON.parse(
    aiResponse.substring(jsonStart, jsonEnd + 1)
  );
} catch (err) {
  console.error("AI JSON parse failed:", err);
  throw new Error("Invalid AI response format");
}

    return res.status(200).json({
  success: true,
  data: aiResData
});

  } catch (error) {
    console.error(error);

    const fallback = outfitFallbacks[event] || outfitFallbacks["Interview"];

    return res.status(200).json({
      ...fallback,
      isFallback: true
    });
  }
});


// GET /api/outfit/history/:userId
router.get('/history/:userId', auth, async (req, res) => {
  try {
    let history = [];
    if (mongoose.connection.readyState === 1) {
      try {
        history = await OutfitScan.find({ userId: req.params.userId }).sort({ date: -1 }).limit(10);
      } catch (e) {
        console.error('DB Fetch error, falling back to JSON:', e);
      }
    }

    // If DB empty or failed, combine with local data
    const localHistory = readData('outfit_scans').filter(s => s.userId === req.params.userId);
    const combined = [...history, ...localHistory].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    res.status(200).json(combined.slice(0, 15));
  } catch (error) {
    res.status(200).json([]);
  }
});



module.exports = router;
