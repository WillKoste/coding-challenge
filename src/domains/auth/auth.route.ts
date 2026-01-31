import express from 'express';
import {body} from 'express-validator';
import {authLoginHandler} from './auth.handler.js';

const validateLogin = [body('email').isEmail(), body('password').isLength({min: 8})];

const router = express.Router();

router.post('/login', validateLogin, authLoginHandler);

export default router;
