import express from "express";
import Article from "../models/Article.js";

const router = express.Router();

// Get all articles
router.get("/", async (req, res) => {
  const articles = await Article.findAll({ order: [["date", "DESC"]] });
  res.json(articles);
});

// Get article by ID
router.get("/:id", async (req, res) => {
  const article = await Article.findByPk(req.params.id);
  if (!article) return res.status(404).json({ message: "Not found" });
  res.json(article);
});

// Create new article
router.post("/", async (req, res) => {
  const newArticle = await Article.create(req.body);
  res.status(201).json(newArticle);
});

// Update article
router.put("/:id", async (req, res) => {
  const article = await Article.findByPk(req.params.id);
  if (!article) return res.status(404).json({ message: "Not found" });
  await article.update(req.body);
  res.json(article);
});

// Delete article
router.delete("/:id", async (req, res) => {
  const article = await Article.findByPk(req.params.id);
  if (!article) return res.status(404).json({ message: "Not found" });
  await article.destroy();
  res.json({ message: "Deleted" });
});

export default router;
