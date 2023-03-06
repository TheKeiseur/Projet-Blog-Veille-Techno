import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  gender: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photo: { type: String, required: true },
  category: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false }
});

export const User = model("User", userSchema);