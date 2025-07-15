import express from "express";
import { getSeoByPath, upsertSeoMeta } from "../models/seo.js";

const router = express.Router();

// GET meta by path
router.get("/:path(*)", async (req, res) => {
  const path = "/" + req.params.path;
  const result = await getSeoByPath(path);
  res.json(result || {});
});

// POST or update
router.post("/", async (req, res) => {
  const { path, title, description, ogTitle, ogImage, scripts } = req.body;
  await upsertSeoMeta({ path, title, description, ogTitle, ogImage, scripts });
  res.json({ message: "Meta saved" });
});

export default router;
