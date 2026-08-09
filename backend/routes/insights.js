const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const QuizResult = require('../models/QuizResult');
const { readData } = require('../utils/storage');
const { generateText } = require('../utils/aiService');

// GET /api/insights/:userId
router.get('/:userId', auth, async (req, res) => {
  try {
    let quizHistory = [];
    
    if (mongoose.connection.readyState === 1) {
      try {
        quizHistory = await QuizResult.find({ userId: req.params.userId }).sort({ date: -1 });
      } catch (e) {
        console.error('DB Fetch error for insights:', e);
      }
    }

    // Combine with local data
    const localHistory = readData('quiz_results').filter(q => q.userId === req.params.userId);
    const combined = [...quizHistory, ...localHistory].sort((a, b) => new Date(b.date) - new Date(a.date));

    if (combined.length === 0) {
      return res.status(200).json({ 
        summary: "Start taking quizzes to unlock personalized AI insights and performance tips!",
        tips: []
      });
    }

    // Prepare data for AI
    const performanceSummary = combined.map(q => ({
      topic: q.topic,
      level: q.level,
      score: q.score,
      weakAreas: q.weakAreas || []
    })).slice(0, 5); // Last 5 quizzes

    const prompt = `Analyze the following user quiz performance data and provide 3 short, actionable insights for improvement. 
Keep the tone encouraging and professional. 
Format the response as a JSON object with fields: "summary" (a brief overview) and "tips" (an array of 3 strings).

Data:
${JSON.stringify(performanceSummary, null, 2)}`;

    const aiResponse = await generateText(prompt, "You are a senior communication coach and career mentor.");
    
    // Extract JSON or return text if failed
    try {
      const match = aiResponse.match(/```(?:json)?\s*([\s\S]*?)```/);
      const jsonStr = match ? match[1].trim() : aiResponse.trim();
      const insightsData = JSON.parse(jsonStr);
      res.status(200).json(insightsData);
    } catch (e) {
      // Fallback if AI didn't return valid JSON
      res.status(200).json({ 
        summary: "We analyzed your recent quizzes and identified areas for growth.", 
        tips: [
          "Keep practicing on topics where you scored below 80%.",
          "Focus on the specific weak areas listed in your history.",
          "Consistency is key! Try to maintain a daily streak."
        ] 
      });
    }

  } catch (error) {
    console.error('Insights error:', error);
    res.status(500).json({ message: 'Failed to generate insights' });
  }
});

module.exports = router;
