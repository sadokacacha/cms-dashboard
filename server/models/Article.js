import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: String,
  tags: String,
  category: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.model('Article', articleSchema);
