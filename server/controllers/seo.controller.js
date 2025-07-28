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

export const getAllMeta = async (req, res) => {
  try {
    const all = await SeoMeta.find({}, 'title path');
    res.json(all);
  } catch (err) {
    res.status(500).json({ message: "Error loading meta list" });
  }
};
export const saveMeta = async (req, res) => {
  try {
    const {
      path,
      title,
      description,
      keywords,
      canonical,
      robots,
      ogTitle,
      ogDescription,
      ogImage,
      ogUrl,
      ogType,
      twitterTitle,
      twitterDescription,
      twitterImage,
      twitterCard,
      twitterSite,
      scripts,
      externalScripts,
      metaType,
      titleRef,
      tags,
    } = req.body;

    const data = {
      title, description, keywords, canonical, robots,
      ogTitle, ogDescription, ogImage, ogUrl, ogType,
      twitterTitle, twitterDescription, twitterImage, twitterCard, twitterSite,
      scripts, externalScripts, metaType, titleRef, tags,
      updatedAt: new Date()
    };

    const existing = await SeoMeta.findOne({ path });

    if (existing) {
      await SeoMeta.updateOne({ path }, data);
    } else {
      await SeoMeta.create({ path, ...data });
    }

    res.json({ message: "Meta saved" });
  } catch (err) {
    console.error("POST /meta error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

import express from "express";