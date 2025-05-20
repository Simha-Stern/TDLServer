import express from 'express';
import dotenv from 'dotenv';
import router from './src/router';
import logger from './src/utils/logger';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
