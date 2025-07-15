import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import articleRoutes from './routes/article.routes.js';
import metaRoutes from "./routes/meta.routes.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);        // public
app.use('/api/articles', articleRoutes); // protected
app.use("/api/meta", metaRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
