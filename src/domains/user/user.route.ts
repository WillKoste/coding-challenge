import express from 'express';
import {authorize} from '../../middleware/authorize.js';
import {getUserHandler} from './user.handler.js';

const router = express.Router();

// This is just an example of where the auth middleware can go.
router.post('/users/:id', authorize, getUserHandler);

export default router;
