import mongoose from 'mongoose';

const seoSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  title: String,
  description: String,
  ogTitle: String,
  ogImage: String,
  scripts: String,
});

export default mongoose.model('SeoMeta', seoSchema);
