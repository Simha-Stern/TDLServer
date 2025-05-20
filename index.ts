import express from 'express';
import dotenv from 'dotenv';
import router from './src/router';
import logger from './src/utils/logger';

dotenv.config();

const app = express();
app.use(express.json());
app.use(router);

import { pool } from './src/db';

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
