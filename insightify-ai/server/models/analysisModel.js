import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
    },
    link: {
      type: String,
    },
    text: {
      type: String,
    },
    title: {
      type: String,
    },
    category: {
      type: String,
    },
    summary: {
      type: String,
    },
    estimatedPrice: {
      type: String,
    },
    features: {
      type: [String],
    },
    confidence: {
      type: String,
    },
  },
  { timestamps: true }
);

const Analysis = mongoose.model("Analysis", analysisSchema);

export default Analysis;
