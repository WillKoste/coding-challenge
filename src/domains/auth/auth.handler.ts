import { Request, Response } from "express";
import { login } from "./auth.service.js";
import { LoginBody } from "./auth.types.js";

// Could be wrapped in a try/catch if we don't have a error handling wrapper.
// Another option with express is to not `throw new Error()`, but `return res.status(500).send('Server Error')`. Just needs to be consistent
export const authLoginHandler = async (req: Request, res: Response) => {
  const body: LoginBody = req.body;
  const user = await login({ ...body, ip: req.ip });
  return res.status(200).json({ success: true, data: user });
};
