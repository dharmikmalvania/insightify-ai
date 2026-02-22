import express from "express";
import multer from "multer";
import { analyzeContent } from "../controllers/analyzeController.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/analyze", upload.single("image"), analyzeContent);

export default router;