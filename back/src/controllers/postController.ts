import express, {Response} from "express";
import * as postService from "../services/postService.js";
import {getErrorMessage} from "../utils/errors.js";
import {PostModel} from "../models/Post.js";
import {CustomRequest} from "../middlewares/auth.js";
import {LikeOrDislike} from "../types/LikeOrDislike.js";

export async function createPost(req: express.Request, res: express.Response): Promise<Response> {
  try {
    const createdPost = await postService.createPost(req.body);
    return createdPost ? res.status(201).send(createdPost) : res.status(400).send('An error occurred');
  } catch (error) {
    return res.status(400).send(getErrorMessage(error));
  }
}

export async function findPostById(req: express.Request, res: express.Response): Promise<Response> {
  const post = await postService.getPostById(req.params.id);
  return post ? res.status(200).send(post) : res.status(404).send(`No post found with id ${req.params.id}`);
}

export async function deletePostById(req: express.Request, res: express.Response): Promise<Response> {
  const postToDelete = await PostModel.findById(req.params.id);
  const token = (req as CustomRequest).token;
  if (!postToDelete) {
    return res.status(404).send(`Post with id ${req.params.id} was either not found or could not be deleted`);
  }
  if (postToDelete!.author_id.toString() !== token.id && !token.isAdmin) {
    return res.status(401).send(`The post with id ${req.params.id} does not belong to you`);
  }
  await postService.deletePostById(req.params.id);
  return res.status(200).send('The post has been deleted');
}

export async function updatePost(req: express.Request, res: express.Response): Promise<Response> {
  const postToUpdate = await PostModel.findById(req.body._id);
  const token = (req as CustomRequest).token;
  if (!postToUpdate) {
    return res.status(404).send(`Post with id ${req.body._id} was either not found or could not be deleted`);
  }
  if (postToUpdate.author_id.toString() !== token.id && !token.isAdmin) {
    return res.status(401).send('This post does not belong to you');
  }
  const updatedPost = await postService.editPost(req.body);
  return res.status(200).send(updatedPost);
}

export async function getRecentPosts(req: express.Request, res: express.Response): Promise<Response> {
  const recentPosts = await postService.getRecentPosts();
  console.log(recentPosts);
  return res.status(200).send({posts: recentPosts});
}

export async function likeOrDislike(req: express.Request, res: express.Response): Promise<Response> {
  const newCount = await postService.likeOrDislike(req.body as LikeOrDislike);
  return res.status(200).send(newCount);
}