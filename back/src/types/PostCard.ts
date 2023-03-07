import {User} from "../models/User.js";
import mongoose from "mongoose";

export interface PopulatedPost extends mongoose.Document{
  title: string,
  content: string,
  date: Date,
  author_id: User,
  image: string,
  tag: string,
  likeCount: number
}

export interface PostCard {
  title: string,
  photo: string,
  id: string,
  author_id: string,
  author_photo: string
  date: Date,
  tag: string,
  likeCount: number
}