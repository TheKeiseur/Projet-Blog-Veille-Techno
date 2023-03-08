import {User, UserModel} from "../models/User.js";

export async function getUserById(id: string): Promise<User> {
  const user: User | null = await UserModel.findById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
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