import jwt, {JwtPayload, Secret} from 'jsonwebtoken';
import express, {Request} from 'express';
import dotenv from "dotenv";

dotenv.config();

export interface CustomRequest extends Request {
  token: DecodedToken;
}

export interface DecodedToken extends JwtPayload {
  id: string,
  isAdmin: string
}

export async function auth(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(400).send('No token provided for authentification');
    }

    (req as CustomRequest).token = jwt.verify(token!, process.env.AUTH_SECRET as Secret) as DecodedToken;

    next();
  } catch (err) {
    return res.status(401).send('Please authenticate');
  }
}