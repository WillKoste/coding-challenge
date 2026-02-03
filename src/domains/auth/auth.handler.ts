import { Request, Response } from "express";
import { login } from "./auth.service.js";
import { LoginBody } from "./auth.types.js";

export const authLoginHandler = async (req: Request, res: Response) => {
  try {
    const body: LoginBody = req.body;
    const user = await login({ ...body, ip: req.ip });

    return res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error(`[authLoginHandler] Error: ${err}`);
    return res.status(500).send("Server error");
  }
};
