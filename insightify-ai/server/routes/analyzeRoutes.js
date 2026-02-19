import express from "express";
import { analyzeContent } from "../controllers/analyzeController.js";

const router = express.Router();

router.post("/analyze", analyzeContent);

export default router;
