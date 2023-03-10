import {Request, Response} from 'express';
import {getErrorMessage} from "../utils/errors.js";
import * as loginService from '../services/loginService.js';
import {LoginResponseDto} from "../types/LoginResponseDto.js";

export async function loginOne(req: Request, res: Response): Promise<LoginResponseDto | Response> {
  try {
    const responseDto = await loginService.login(req.body);
    return responseDto.token.length ? res.status(200).send(responseDto) : res.status(404).send('User not found');
  } catch (error) {
    return res.status(401).send(getErrorMessage(error));
  }
}