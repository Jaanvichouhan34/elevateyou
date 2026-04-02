const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const OpenAI = require('openai');
const User = require('../models/User');
const OutfitScan = require('../models/OutfitScan');
const auth = require('../middleware/auth');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Ensure uploads directory exists
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// POST /api/outfit/scan-image
router.post('/scan-image', auth, upload.single('image'), async (req, res) => {
  const { event } = req.body;
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: `Analyze this outfit for a ${event}. Provide analysis in JSON format with fields: appropriate (array of strings), notSuitable (array of strings), improvements (array of strings), groomingTips (array of strings), and score (number 1-10).` },
            { type: "image_url", image_url: { url: imageUrl } }
          ],
        },
      ],
      response_format: { type: "json_object" }
    });

    const aiResData = JSON.parse(response.choices[0].message.content || response.choices[0].message.function_call?.arguments);
    
    if (mongoose.connection.readyState !== 1) {
      console.log('Demo Mode: Scan Result');
      return res.status(200).json({ 
        _id: 'demo-' + Date.now(),
        event,
        inputType: 'image',
        imageUrl,
        aiResponse: aiResData,
        date: new Date()
      });
    }

    const newScan = new OutfitScan({
      userId: req.userData.userId,
      event,
      inputType: 'image',
      imageUrl,
      aiResponse: aiResData
    });
    await newScan.save();

    res.status(200).json(newScan);
  } catch (error) {
    res.status(500).json({ message: 'Error analyzing image', error: error.message });
  }
});

// POST /api/outfit/scan-text
router.post('/scan-text', auth, async (req, res) => {
  const { event, outfitDescription } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Analyze this outfit description for a ${event}: "${outfitDescription}". Provide analysis in JSON format with fields: appropriate (array of strings), notSuitable (array of strings), improvements (array of strings), groomingTips (array of strings), and score (number 1-10).`
        },
      ],
      response_format: { type: "json_object" }
    });

    const aiResData = JSON.parse(response.choices[0].message.content);

    if (mongoose.connection.readyState !== 1) {
      console.log('Demo Mode: Text Scan Result');
      return res.status(200).json({ 
        _id: 'demo-' + Date.now(),
        event,
        inputType: 'text',
        outfitDescription,
        aiResponse: aiResData,
        date: new Date()
      });
    }

    const newScan = new OutfitScan({
      userId: req.userData.userId,
      event,
      inputType: 'text',
      outfitDescription,
      aiResponse: aiResData
    });
    await newScan.save();

    res.status(200).json(newScan);
  } catch (error) {
    res.status(500).json({ message: 'Error analyzing text', error: error.message });
  }
});

// GET /api/outfit/history/:userId
router.get('/history/:userId', auth, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json([
        { 
          _id: 'd1', event: 'Interview', inputType: 'image', score: 9, date: new Date(),
          aiResponse: { score: 9, appropriate: ['Professional fit', 'Classic colors'], notSuitable: [], improvements: [], groomingTips: [] }
         }
      ]);
    }
    const history = await OutfitScan.find({ userId: req.params.userId }).sort({ date: -1 }).limit(10);
    res.status(200).json(history);
  } catch (error) {
    res.status(200).json([]); // Fallback for error
  }
});

module.exports = router;
