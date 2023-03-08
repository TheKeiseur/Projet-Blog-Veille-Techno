import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const saltRounds = 8;
const {Schema, model} = mongoose;

export interface User extends mongoose.Document {
  gender: string,
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  photo: string,
  category: string,
  isAdmin: boolean,
  favoredPosts: string[]
}

const UserSchema: mongoose.Schema<User> = new Schema({
  gender: {type: String, required: true},
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  photo: {type: String, required: true},
  category: {type: String, required: true},
  isAdmin: {type: Boolean, required: true, default: false},
  favoredPosts: [{type: String, ref: 'Post', default: []}]
});

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
  next();
});

export const UserModel: mongoose.Model<User> = model('User', UserSchema);