import {NextFunction, Request, Response} from "express";
import {CustomRequest} from "./auth.js";

export async function verifyAdmin(req: Request, res: Response, next: NextFunction) {
  const token = (req as CustomRequest).token;
  if (!token.isAdmin) {
    return res.status(401).send('You need admin privileges for this action');
  }
  next();
}