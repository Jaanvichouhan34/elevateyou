const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const OutfitScan = require('../models/OutfitScan');
const { saveData } = require('../utils/storage');
const { analyzeImage, generateText, extractJSON } = require('../utils/aiService');

const outfitFallbacks = {
  // ... (keeping fallback data as is to keep it robust)
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

// POST /api/outfit/scan-image
// Body: { event: string, imageBase64: string (data URI) }
router.post('/scan-image', auth, async (req, res) => {
  const { event, imageBase64 } = req.body;
  
  if (!imageBase64 || !event) {
    return res.status(400).json({ message: 'Image and event are required.' });
  }

  try {
    const prompt = `You are a professional fashion and style consultant. Analyze this outfit image for a ${event} event. 
Return a JSON object with EXACTLY these keys:
{
  "score": <number 1-10, be realistic and varied based on actual suitability>,
  "summary": "<2 sentence visual analysis specific to what you actually see>",
  "strengths": ["<3-4 specific observations about THIS actual outfit>"],
  "improvements": ["<3 specific actionable improvements for THIS outfit>"],
  "risks": ["<2-3 specific risks or concerns about THIS outfit for this event>"],
  "groomingTips": ["<3 grooming tips relevant to this look>"]
}
Be specific to what you actually see. Never give generic advice. For a ${event}, scoring should reflect how suitable the outfit truly is. Return only the JSON.`;

    const aiText = await analyzeImage(imageBase64, prompt);
    const aiResData = extractJSON(aiText);

    // Save to Database / Local Fallback
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

    return res.status(200).json(savedScan);
  } catch (error) {
    console.error('Scan image error:', error);
    const eventFallback = req.body.event || 'Interview';
    const fallback = outfitFallbacks[eventFallback] || outfitFallbacks['Interview'];
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
    const prompt = `You are a professional style consultant. The user described their outfit as: "${outfitDescription}" for a ${event} event.
Analyze the description and return a JSON object with EXACTLY these keys:
{
  "score": <number 1-10 based on how suitable this specific outfit is for a ${event}>,
  "summary": "<2 sentences referencing the specific items they described>",
  "strengths": ["<3-4 points specific to the described items>"],
  "improvements": ["<3 specific suggestions for the described outfit>"],
  "risks": ["<2-3 specific concerns about this outfit for this event>"],
  "groomingTips": ["<3 relevant grooming tips>"]
}
Reference the actual items mentioned. Never be generic. Score strictly for ${event} suitability. Return only the JSON.`;

    const aiText = await generateText(prompt, "You are a professional fashion and style consultant.");
    const aiResData = extractJSON(aiText);

    // Save to Database / Local Fallback
    let savedScan = null;
    if (mongoose.connection.readyState === 1) {
      try {
        const newScan = new OutfitScan({
          userId: req.userData.userId,
          event,
          inputType: 'text',
          outfitDescription,
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
        inputType: 'text',
        outfitDescription,
        aiResponse: aiResData
      });
    }

    return res.status(200).json(savedScan);
  } catch (error) {
    console.error('Scan text error:', error);
    const eventFallback = req.body.event || 'Interview';
    const fallback = outfitFallbacks[eventFallback] || outfitFallbacks['Interview'];
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
        const OutfitScan = require('../models/OutfitScan');
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
