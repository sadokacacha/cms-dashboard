import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.model('Product', productSchema);
