import express from "express";
import { body } from "express-validator";
import { authLoginHandler } from "./auth.handler.js";

const loginValidator = [body("email").isEmail(), body("password").isLength({ min: 8 })];

const router = express.Router();

router.post("/login", loginValidator, authLoginHandler);

export default router;
