import Analysis from "../models/analysisModel.js";
import axios from "axios";

export const analyzeContent = async (req, res) => {
  try {
    const { text } = req.body;

   const response = await axios.post(
  "https://openrouter.ai/api/v1/chat/completions",
  {
    model: "openai/gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Analyze this product: ${text} and give a short professional summary.`
      }
    ]
  },
  {
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    }
  }
);


    const aiText = response.data.choices[0].message.content;

    const saved = await Analysis.create({
      text,
      title: "AI Analysis",
      category: "Generated",
      summary: aiText,
      estimatedPrice: "AI Estimated",
      features: [],
      confidence: "AI Generated"
    });

    res.status(201).json(saved);

  } catch (error) {
    console.error("FULL ERROR:", error.response?.data || error.message);
    res.status(500).json({ message: "AI Analysis Failed" });
  }
};
