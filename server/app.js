import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


import sequelize from './config/db.js';


import authRoutes from './routes/auth.routes.js';
import metaRoutes from "./routes/meta.routes.js";
import articleRoutes from "./routes/article.routes.js";



import User from './models/User.js';
import SeoMeta from './models/seo.js'; // ✅ now a Sequelize model
import Article from "./models/Article.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use("/api/meta", metaRoutes);




// Sync DB and start server
await sequelize.sync(); // ✅ creates tables for User and SeoMeta




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
