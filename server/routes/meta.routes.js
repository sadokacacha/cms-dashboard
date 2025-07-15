import express from "express";
import { getSeoByPath, upsertSeoMeta } from "../models/seo.js";

const router = express.Router();

// No wildcard in route — we'll pass path via query
router.get("/", async (req, res) => {
  const { path } = req.query;
  if (!path) return res.status(400).json({ message: "Missing path query param" });

  const result = await getSeoByPath(path);
  res.json(result || {});
});

router.post("/", async (req, res) => {
  const { path, title, description, ogTitle, ogImage, scripts } = req.body;
  await upsertSeoMeta({ path, title, description, ogTitle, ogImage, scripts });
  res.json({ message: "Meta saved" });
});

export default router;
