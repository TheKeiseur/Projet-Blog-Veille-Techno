import jwt, {JwtPayload, Secret} from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';
import dotenv from "dotenv";

dotenv.config();

export interface CustomRequest extends Request {
  token: DecodedToken;
}

export interface DecodedToken extends JwtPayload {
  id: string,
  isAdmin: string
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
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
};