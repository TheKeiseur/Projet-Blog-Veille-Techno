import express, {Response} from "express";
import * as userService from "../services/userService.js";
import {getErrorMessage} from "../utils/errors.js";
import {User} from "../models/User.js";
import {CustomRequest} from "../middlewares/auth.js";

export async function getUserById(req: express.Request, res: express.Response): Promise<Response> {
  try {
    const user = await userService.getUserById(req.params.id);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(404).send(getErrorMessage(error));
  }
}

export async function deleteUserById(req: express.Request, res: express.Response): Promise<Response> {
  const result = await userService.deleteUserById(req.params.id);
  return result
    ? res.status(200).send('User has been deleted')
    : res.status(404).send('No user found for this id');
}

export async function createUser(req: express.Request, res: express.Response): Promise<Response> {
  const userToCreate: User = req.body;
  try {
    const createdUser = await userService.createUser(userToCreate);
    return res.status(201).send(createdUser);
  } catch (error) {
    return res.status(400).send(`User with email ${userToCreate.email} already exists`);
  }
}

export async function getFavoredPosts(req: express.Request, res: express.Response): Promise<Response> {
  const token = (req as CustomRequest).token;
  const favoredPosts = await userService.getFavoredPostsAsCards(token.id);
  return res.status(200).send(favoredPosts);
}

export async function addToFavoredPosts(req: express.Request, res: express.Response): Promise<Response> {
  const postId = req.params.id;
  const userId = (req as CustomRequest).token.id;
  const updatedList = await userService.addFavoredPost(postId, userId);
  return res.status(200).send(updatedList);
}