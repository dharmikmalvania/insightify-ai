import Analysis from "../models/analysisModel.js";
import axios from "axios";
import * as cheerio from "cheerio";

export const analyzeContent = async (req, res) => {
  try {
    const text = req.body.text || "";
    const link = req.body.link || "";
    const userDescription = req.body.userDescription || "";
    const image = req.file;

    let linkTitle = "";
    let metaDescription = "";
    let imageFilename = "";
    let domainKeyword = "";

    // 🖼 Image filename
    if (image) {
      imageFilename = image.originalname;
    }

    // 🔗 Extract metadata from link
    if (link) {
      try {
        const { data } = await axios.get(link, {
          headers: { "User-Agent": "Mozilla/5.0" }
        });

        const $ = cheerio.load(data);

        linkTitle = $("title").text().trim();
        metaDescription =
          $('meta[name="description"]').attr("content")?.trim() || "";

        const urlObj = new URL(link);
        domainKeyword = urlObj.hostname
          .replace("www.", "")
          .split(".")[0]
          .trim();

      } catch (err) {
        console.log("Link scraping failed");
      }
    }

    // 🧠 ADVANCED AI PROMPT
  const prompt = `
You are a senior market research analyst.

Analyze the following content and provide deep commercial intelligence.

Text: ${text}
Website Title: ${linkTitle}
Meta Description: ${metaDescription}
User Description: ${userDescription}
Image Filename: ${imageFilename}

Return ONLY valid JSON:

{
  "keyword": "",
  "category": "",
  "summary": "",
  "pros": ["", "", ""],
  "cons": ["", "", ""],
  "targetAudience": {
    "primary": "",
    "secondary": "",
    "demographics": "",
    "behavioralProfile": ""
  },
  "marketPosition": {
    "priceTier": "",
    "brandStrength": "",
    "competitiveAdvantage": "",
    "growthPotential": ""
  },
  "estimatedValue": ""
}

Rules:
- Be specific, not generic
- Target audience must describe real user segments
- Market position must include price tier and competitive standing
- Do not include explanation outside JSON
`;

    // 🤖 AI CALL
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    let parsed;

    try {
      parsed = JSON.parse(response.data.choices[0].message.content);
    } catch (err) {
      parsed = {
        keyword: domainKeyword || "product",
        category: "General",
        summary: response.data.choices[0].message.content,
        pros: [],
        cons: [],
        targetAudience: "General users",
        marketPosition: "Standard",
        estimatedValue: "N/A"
      };
    }

    const mainKeyword = parsed.keyword;

    // 🔍 Fetch related images from Pexels
    let relatedImages = [];

    try {
      const pexelsResponse = await axios.get(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(
          mainKeyword
        )}&per_page=3`,
        {
          headers: {
            Authorization: process.env.PEXELS_API_KEY
          }
        }
      );

      relatedImages = pexelsResponse.data.photos.map(
        (photo) => photo.src.medium
      );
    } catch (error) {
      console.log("Pexels image fetch failed");
    }

    // 📊 Dynamic confidence calculation
    const confidenceScore = Math.min(
      95,
      Math.max(70, Math.floor(parsed.summary.length / 10))
    );

    // 💾 Save to DB
  const saved = await Analysis.create({
  text,
  link,
  linkTitle,
  metaDescription,
  userDescription,
  imageFilename,
  title: mainKeyword,
  category: parsed.category,
  summary: parsed.summary,
  pros: parsed.pros,
  cons: parsed.cons,
  targetAudience: parsed.targetAudience,
  marketPosition: parsed.marketPosition,
  estimatedPrice: parsed.estimatedValue,
  confidence: confidenceScore + "%",
  relatedImages
});

    res.status(201).json(saved);

  } catch (error) {
    console.error("FULL ERROR:", error.response?.data || error.message);
    res.status(500).json({ message: "Analysis Failed" });
  }
};