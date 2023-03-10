import {User, UserModel} from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt, {Secret} from 'jsonwebtoken';
import dotenv from "dotenv";
import {LoginResponseDto} from "../types/LoginResponseDto.js";
import {LoginRequest} from "../types/LoginRequest.js";

dotenv.config();
const {AUTH_SECRET, EXPIRES_IN} = process.env;

export async function login(loginRequest: LoginRequest): Promise<LoginResponseDto> {
  const foundUser = await UserModel.findOne({email: loginRequest.email});
  if (!foundUser) {
    return {token: ''};
  }
  const isMatch = bcrypt.compareSync(loginRequest.password, foundUser.password);
  if (isMatch) {
    const payload = mapToPayload(foundUser);
    return {token: jwt.sign(payload, AUTH_SECRET as Secret, {expiresIn: EXPIRES_IN})};
  } else {
    throw new Error('Unauthorized');
  }
}

function mapToPayload(user: User) {
  return {
    id: user._id.toString(),
    gender: user.gender,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    photo: user.photo,
    category: user.category,
    isAdmin: user.isAdmin,
    favoredPosts: user.favoredPosts
  }
}