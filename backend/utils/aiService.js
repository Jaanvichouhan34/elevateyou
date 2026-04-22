const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateAIResponse = async (prompt) => {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // ✅ FIXED MODEL
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return response.choices[0].message.content;

  } catch (error) {
    console.error("❌ AI Error:", error.message);

    throw new Error("AI generation failed"); // ✅ IMPORTANT FIX
  }
};

module.exports = { generateAIResponse };