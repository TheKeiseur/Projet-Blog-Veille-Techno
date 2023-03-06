import mongoose from "mongoose";

const {Schema, model} = mongoose;

export interface User extends mongoose.Document {
  gender: string,
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  photo: string,
  category: string,
  isAdmin: boolean
}

const UserSchema: mongoose.Schema<User> = new Schema({
  gender: {type: String, required: true},
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  photo: {type: String, required: true},
  category: {type: String, required: true},
  isAdmin: {type: Boolean, required: true, default: false}
});

export const UserModel: mongoose.Model<User> = model('User', UserSchema);