import express, {Response} from "express";
import * as userService from "../services/userService.js";
import {getErrorMessage} from "../utils/errors.js";

export async function getUserById(req: express.Request, res: express.Response): Promise<Response> {
  try {
    const user = await userService.getUserById(req.params.id);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(404).send(getErrorMessage(error));
  }
}