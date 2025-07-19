import express from "express";
import { getMeta, saveMeta } from "../controllers/seo.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getMeta);
router.post("/", authMiddleware, saveMeta);

export default router;
