import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'; 
import { fileURLToPath } from 'url';
import path from 'path';



import authRoutes from './routes/auth.routes.js';
import metaRoutes from "./routes/meta.routes.js";
import articleRoutes from "./routes/article.routes.js";
import productRoutes from "./routes/product.routes.js";

dotenv.config();

const app = express();





// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());



// ✅ Serve uploaded images statically
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use("/api/meta", metaRoutes);
app.use("/api/products", productRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
