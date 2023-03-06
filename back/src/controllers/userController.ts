import {Request, Response} from 'express';
import {getErrorMessage} from "../utils/errors.js";
import * as userServices from '../services/userService.js';
import {User} from "../models/User.js";

export const loginOne = async (req: Request, res: Response) => {
  try {
    const foundUser = await userServices.login(req.body);
    foundUser ? res.status(200).send(foundUser) : res.status(404).send('User not found');
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const registerOne = async (req: Request, res: Response) => {
  const userToCreate: User = req.body;
  try {
    const createdUser = await userServices.register(userToCreate);
    res.status(200).send(createdUser);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};