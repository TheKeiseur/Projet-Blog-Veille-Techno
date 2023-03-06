import {User, UserModel} from "../models/User.js";
import {LoginRequestDto} from "../types/LoginRequestDto.js";

export async function register(user: User): Promise<User> {
  try {
    return await UserModel.create(user);
  } catch (error) {
    throw error;
  }
}

export async function login(loginRequest: LoginRequestDto): Promise<User | null> {
  try {
    return await UserModel.findOne({email: loginRequest.email, password: loginRequest.password});
  } catch (error) {
    throw error;
  }
}