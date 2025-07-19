import Article from '../models/Article.js';

export const getArticles = async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
};

export const createArticle = async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json({ message: 'Article created', article });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create article', error: err.message });
  }
};

export const updateArticle = async (req, res) => {
  const { id } = req.params;
  const updated = await Article.findByIdAndUpdate(id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Article not found' });
  res.json({ message: 'Article updated', article: updated });
};

export const deleteArticle = async (req, res) => {
  const { id } = req.params;
  const deleted = await Article.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ message: 'Article not found' });
  res.json({ message: 'Article deleted' });
};
