import {Request, Response} from 'express';
import {getErrorMessage} from "../utils/errors.js";
import * as loginService from '../services/loginService.js';
import {User} from "../models/User.js";
import {LoginResponseDto} from "../types/LoginResponseDto.js";

export async function loginOne(req: Request, res: Response): Promise<LoginResponseDto | Response> {
  try {
    const responseDto = await loginService.login(req.body);
    return responseDto.token.length ? res.status(200).send(responseDto) : res.status(404).send('User not found');
  } catch (error) {
    return res.status(401).send(getErrorMessage(error));
  }
}

export async function registerOne(req: Request, res: Response): Promise<User | Response>  {
  const userToCreate: User = req.body;
  try {
    const createdUser = await loginService.register(userToCreate);
    return res.status(201).send(createdUser);
  } catch (error) {
    return res.status(400).send(getErrorMessage(error));
  }
}