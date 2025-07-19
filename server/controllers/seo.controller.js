import SeoMeta from "../models/seo.js";

export const getMeta = async (req, res) => {
  try {
    const { path } = req.query;
    if (!path) return res.status(400).json({ message: "Missing path" });

    const meta = await SeoMeta.findOne({ path });
    res.json(meta || {});
  } catch (err) {
    console.error("GET /meta error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const saveMeta = async (req, res) => {
  try {
    const { path, title, description, ogTitle, ogImage, scripts } = req.body;

    const existing = await SeoMeta.findOne({ path });

    if (existing) {
      await SeoMeta.updateOne({ path }, { title, description, ogTitle, ogImage, scripts });
    } else {
      await SeoMeta.create({ path, title, description, ogTitle, ogImage, scripts });
    }

    res.json({ message: "Meta saved" });
  } catch (err) {
    console.error("POST /meta error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
import express from "express";