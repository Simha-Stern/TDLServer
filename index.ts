import express from 'express';
import dotenv from 'dotenv';
import router from './src/router';

dotenv.config();

const app = express();
app.use(express.json());
app.use(router);

import { pool } from './src/db';

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
