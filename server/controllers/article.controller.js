// For demo, using an in-memory array as "database"
let articles = [];
let currentId = 1;

export const getArticles = (req, res) => {
  res.json(articles);
};

export const createArticle = (req, res) => {
  const { title, content, tags, category, date } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  const newArticle = {
    id: currentId++,
    title,
    content,
    tags: tags || [],
    category: category || 'General',
    date: date || new Date().toISOString(),
  };
  articles.push(newArticle);

  res.status(201).json({ message: 'Article created', article: newArticle });
};

export const updateArticle = (req, res) => {
  const id = parseInt(req.params.id);
  const articleIndex = articles.findIndex(a => a.id === id);

  if (articleIndex === -1) {
    return res.status(404).json({ message: 'Article not found' });
  }

  const { title, content, tags, category, date } = req.body;

  articles[articleIndex] = {
    ...articles[articleIndex],
    title: title ?? articles[articleIndex].title,
    content: content ?? articles[articleIndex].content,
    tags: tags ?? articles[articleIndex].tags,
    category: category ?? articles[articleIndex].category,
    date: date ?? articles[articleIndex].date,
  };

  res.json({ message: 'Article updated', article: articles[articleIndex] });
};

export const deleteArticle = (req, res) => {
  const id = parseInt(req.params.id);
  const articleIndex = articles.findIndex(a => a.id === id);

  if (articleIndex === -1) {
    return res.status(404).json({ message: 'Article not found' });
  }

  articles.splice(articleIndex, 1);
  res.json({ message: 'Article deleted' });
};
