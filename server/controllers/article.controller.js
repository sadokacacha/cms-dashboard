import Article from "../models/Article.js";

export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ date: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: "Error fetching articles" });
  }
};

export const createArticle = async (req, res) => {
  try {
    const { title, content, tags, category, date } = req.body;
    const image = req.file?.filename; // ✅ Only filename

    const article = new Article({
      title,
      content,
      tags,
      category,
      date,
      image,
    });

    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ message: "Error creating article." });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (req.file) {
      updates.image = `/uploads/articles/${req.file.filename}`;
    }

    const updated = await Article.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updated) return res.status(404).json({ message: "Article not found" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Error updating article", error: err.message });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const deleted = await Article.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Article not found" });
    res.json({ message: "Article deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting article", error: err.message });
  }
};
