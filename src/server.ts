import dotenv from 'dotenv';
dotenv.config({path: '../.env'});
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import Database from 'better-sqlite3';
import authRoutes from './domains/auth/auth.route.js';
import userRoutes from './domains/user/user.route.js';

const PORT = process.env.PORT ?? 3000;
const STAGE = process.env.STAGE;

const app = express();

export const db = new Database('database.db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    email VARCHAR(60) NOT NULL UNIQUE,
    
  ) VALUES (

  )
`);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan(STAGE === 'production' ? 'combined' : 'dev'));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);

app.listen(PORT, () => {
	console.log(`Express server running on port: ${PORT}, stage = ${STAGE}`);
});
