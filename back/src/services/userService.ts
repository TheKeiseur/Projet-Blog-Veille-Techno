import {User, UserModel} from "../models/User.js";

export async function getUserById(id: string): Promise<User> {
  const user: User | null = await UserModel.findById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}