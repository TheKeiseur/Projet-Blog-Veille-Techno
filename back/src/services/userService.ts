import {User, UserModel} from "../models/User.js";
import {PostModel} from "../models/Post.js";
import {PopulatedPost} from "../types/PostCard.js";
import {mapToCards} from "./postService.js";
import {AddToFavoredRequest} from "../types/AddToFavoredRequest.js";

export async function getUserById(id: string): Promise<User> {
  const user: User | null = await UserModel.findById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}

export async function editUser(payload: User): Promise<User | null> {
  return UserModel.findByIdAndUpdate(payload._id, payload, {new: true});
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

export async function addFavoredPost(request: AddToFavoredRequest) {
  const {postId, userId, add} = request;
  const update = add
    ? {$push: {favoredPosts: postId}}
    : {$pull: {favoredPosts: postId}};
  return UserModel.updateOne({_id: userId}, update, {new: true});
}

export async function getFavoredPostsAsCards(userId: string) {
  const user: User = await getUserById(userId);
  if (!user) {
    throw new Error(`No user with id ${userId}`);
  }
  const favoredPosts: PopulatedPost[] = await PostModel.find({_id: {$in: user.favoredPosts}}).populate('author_id');
  return mapToCards(favoredPosts);
}