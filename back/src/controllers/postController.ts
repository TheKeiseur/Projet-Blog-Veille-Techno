import express, {Response} from "express";
import * as postService from "../services/postService.js";
import {getErrorMessage} from "../utils/errors.js";
import {Post} from "../models/Post.js";

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
  const response = await postService.deletePostById(req.body.id);
  return response
    ? res.status(200).send('The post has been deleted')
    : res.status(404).send(`Post with id ${req.body.id} was either not found or could not be deleted`);
}

export async function updatePost(req: express.Request, res: express.Response): Promise<Response> {
  const payload: Post = req.body;
  const updatedPost = await postService.editPost(payload);
  return updatedPost
    ? res.status(200).send(updatedPost)
    : res.status(404).send(`Post with id ${payload._id} was not found or update failed`);
}

export async function getRecentPosts(req: express.Request, res: express.Response): Promise<any> {
  const recentPosts = await postService.getRecentPosts();
  console.log(recentPosts);
  return res.status(200).send({posts: recentPosts});
}