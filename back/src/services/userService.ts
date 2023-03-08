import {User, UserModel} from "../models/User.js";
import {PostModel} from "../models/Post.js";
import {PopulatedPost} from "../types/PostCard.js";
import {mapToCards} from "./postService.js";

export async function getUserById(id: string): Promise<User> {
  const user: User | null = await UserModel.findById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}

export async function deleteUserById(id: string): Promise<boolean | null> {
  return UserModel.findByIdAndDelete(id);
}

export async function createUser(user: User): Promise<User> {
  const existingUser = await UserModel.findOne({email: user.email}).exec();
  if (existingUser) {
    throw new Error('User already exists');
  }
  return await UserModel.create(user);
}

export async function addFavoredPost(postId: string, userId: string) {
  return UserModel.updateOne({_id: userId, favoredPosts: {$ne: postId}}, {$push: {favoredPosts: postId}}, {new: true});
}

export async function getFavoredPostsAsCards(userId: string) {
  const user: User = await getUserById(userId);
  if (!user) {
    throw new Error(`No user with id ${userId}`);
  }
  const favoredPosts: PopulatedPost[] = await PostModel.find({_id: {$in: user.favoredPosts}}).populate('author_id');
  return mapToCards(favoredPosts);
}