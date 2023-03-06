import mongoose from "mongoose";

const {Schema, model} = mongoose;

export interface Post extends mongoose.Document {
  content: string,
  date: Date,
  author_id: mongoose.Types.ObjectId,
  image: string,
  tag: string,
  likeCount: number
}

const PostSchema: mongoose.Schema<Post> = new Schema({
  content: {type: String, required: true, default: ''},
  author_id: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  image: {type: String, required: true, default: ''},
  date: {type: Date, required: true, default: new Date()},
  tag: {type: String, required: true, default: ''},
  likeCount: {type: Number, required: true, default: 0}
});

export const PostModel: mongoose.Model<Post> = model("Post", PostSchema);