import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import sequelize from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import articleRoutes from './routes/article.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); 
app.use('/api/articles', articleRoutes);

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.sync(); // Creates tables if not exist
    console.log('✅ Database synced');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error);
  }
})();
