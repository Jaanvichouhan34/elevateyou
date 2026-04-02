const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const OpenAI = require('openai');
const User = require('../models/User');
const QuizResult = require('../models/QuizResult');
const ChatSession = require('../models/ChatSession');
const auth = require('../middleware/auth');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// POST /api/trainer/quiz/generate
router.post('/quiz/generate', auth, async (req, res) => {
  const { topic, level } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Generate a 10-question multiple-choice quiz for a ${level} level on the topic of ${topic}. 
          Each question must have: text, options (array of 4 strings), and correctAnswer (index 0-3). 
          Provide JSON format with a "questions" field.`
        },
      ],
      response_format: { type: "json_object" }
    });

    res.status(200).json(JSON.parse(response.choices[0].message.content));
  } catch (error) {
    res.status(500).json({ message: 'Error generating quiz', error: error.message });
  }
});

// POST /api/trainer/quiz/submit
router.post('/quiz/submit', auth, async (req, res) => {
  const { topic, level, score, weakAreas, suggestions } = req.body;

  try {
    if (mongoose.connection.readyState !== 1) {
      console.log('Demo Mode: Quiz Result Not Saved');
      return res.status(201).json({ _id: 'demo-' + Date.now(), topic, level, score });
    }

    const newResult = new QuizResult({
      userId: req.userData.userId,
      topic,
      level,
      score,
      weakAreas,
      suggestions
    });
    await newResult.save();

    // Update user level if score is high? (logic can be added here)
    res.status(201).json(newResult);
  } catch (error) {
    res.status(201).json({ message: 'Demo Mode: Mock Submission' });
  }
});

// POST /api/trainer/chat
router.post('/chat', auth, async (req, res) => {
  const { message, mode, history } = req.body;

  try {
    const systemPrompts = {
      'Interview Simulation': "You are an expert interviewer. Conduct a professional interview. Provide feedback on user's responses.",
      'Presentation Rehearsal': "You are a presentation coach. Help the user refine their presentation script and delivery.",
      'Casual Talk': "Engage in a friendly, natural conversation to improve user's social skills.",
      'Grammar Correction': "Focus on identifying and explaining grammar mistakes in user's messages.",
      'Rephrasing': "Provide professional and polished alternatives for user's sentences."
    };

    const messages = [
      { role: "system", content: systemPrompts[mode] || "Help the user improve their communication skills." },
      ...history,
      { role: "user", content: message }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages
    });

    const aiMessage = response.choices[0].message.content;

    // Save to session (optional logic here)
    res.status(200).json({ response: aiMessage });
  } catch (error) {
    res.status(500).json({ message: 'Error in chat', error: error.message });
  }
});

// GET /api/trainer/progress/:userId
router.get('/progress/:userId', auth, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({ 
        quizCount: 8, 
        quizHistory: [
          { _id: 'q1', topic: 'Grammar', score: 9, date: new Date(Date.now() - 86400000) },
          { _id: 'q2', topic: 'Vocabulary', score: 7, date: new Date() }
        ] 
      });
    }
    const quizCount = await QuizResult.countDocuments({ userId: req.params.userId });
    const quizHistory = await QuizResult.find({ userId: req.params.userId }).sort({ date: 1 });
    res.status(200).json({ quizCount, quizHistory });
  } catch (error) {
    res.status(200).json({ quizCount: 0, quizHistory: [] });
  }
});

module.exports = router;
