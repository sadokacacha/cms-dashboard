import mongoose from 'mongoose';

const seoSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },

  // Basic
  title: String,
  description: String,
  keywords: String,
  canonical: String,
  robots: String,

  // Open Graph
  ogTitle: String,
  ogDescription: String,
  ogImage: String,
  ogUrl: String,
  ogType: String,

  // Twitter
  twitterTitle: String,
  twitterDescription: String,
  twitterImage: String,
  twitterCard: String,
  twitterSite: String,

  // Scripts
  scripts: String, // inline
  externalScripts: String, // JSON array of <script src="...">

  // For admin UX
  metaType: String, // e.g. "product", "article", "custom"
  titleRef: String, // readable title for SEO list (from product/article title)
  tags: [String],   // optional filter tags

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('SeoMeta', seoSchema);
