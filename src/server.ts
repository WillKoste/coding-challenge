import dotenv from 'dotenv';
import path from 'node:path';
dotenv.config({path: path.resolve(process.cwd(), './.env')});
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './domains/auth/auth.route.js';
import userRoutes from './domains/user/user.route.js';

const PORT = process.env.PORT ?? 3000;
const STAGE = process.env.STAGE;

const app = express();

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
