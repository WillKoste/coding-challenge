import express from "express";
import { authorize } from "../../middleware/authorize.js";
import { getUserHandler } from "./user.handler.js";

const router = express.Router();

// This should not have `/users/`, as the `/api/v1/user` is already defined in `server.ts`
router.post("/users/:id", authorize, getUserHandler);

export default router;
