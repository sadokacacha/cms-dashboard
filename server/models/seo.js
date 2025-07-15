import getDB from "../db.js";

// Get SEO by path
export async function getSeoByPath(path) {
  const db = await getDB();
  return db.get("SELECT * FROM seo WHERE path = ?", [path]);
}

// Create or update SEO meta
export async function upsertSeoMeta({ path, title, description, ogTitle, ogImage, scripts }) {
  const db = await getDB();
  return db.run(`
    INSERT INTO seo (path, title, description, ogTitle, ogImage, scripts)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(path) DO UPDATE SET
      title = excluded.title,
      description = excluded.description,
      ogTitle = excluded.ogTitle,
      ogImage = excluded.ogImage,
      scripts = excluded.scripts
  `, [path, title, description, ogTitle, ogImage, scripts]);
}
