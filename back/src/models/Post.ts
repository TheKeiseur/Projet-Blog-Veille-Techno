import mongoose from "mongoose";

const { Schema, model } = mongoose;

const postSchema = new Schema({
  content: { type: String, required: true, default: '' },
  author_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  image: { type: String, required: true, default: '' },
  date: { type: Date, required: true, default: new Date() },
  tag: { type: String, required: true, default: '' },
  likeCount: { type: Number, required: true, default: 0}
});

export const Post = model("Post", postSchema);