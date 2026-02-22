import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    imageUrl: String,
    link: String,
    text: String,
    title: String,
    category: String,
    summary: String,
    estimatedPrice: String,
    confidence: String,

    pros: [String],
    cons: [String],

    targetAudience: {
      primary: String,
      secondary: String,
      demographics: String,
      behavioralProfile: String
    },

    marketPosition: {
      priceTier: String,
      brandStrength: String,
      competitiveAdvantage: String,
      growthPotential: String
    },

    relatedImages: [String]
  },
  { timestamps: true }
);

const Analysis = mongoose.model("Analysis", analysisSchema);

export default Analysis;