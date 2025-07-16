import express from "express";
import SeoMeta from "../models/seo.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { path } = req.query;
    if (!path) return res.status(400).json({ message: "Missing path" });

    const meta = await SeoMeta.findByPk(path);
    res.json(meta || {});
  } catch (err) {
    console.error("GET /meta error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { path, title, description, ogTitle, ogImage, scripts } = req.body;
    await SeoMeta.upsert({ path, title, description, ogTitle, ogImage, scripts });
    res.json({ message: "Meta saved" });
  } catch (err) {
    console.error("POST /meta error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
