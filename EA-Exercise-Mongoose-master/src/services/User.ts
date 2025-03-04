// Model and Interface
import { IUser, UserModel } from '../models/User.js';
import { Types } from 'mongoose';

// Insert User
export async function createUser(user: Partial<IUser>): Promise<IUser|null> {
    const newUser = new UserModel(user);
    return await newUser.save()
}

// Find User by _id
export async function findUserById(id: string): Promise<IUser|null> {
    return await UserModel.findById(id);
}

// Find User by email
export async function findUserByEmail(email: string): Promise<IUser|null> {
    return await UserModel.findOne({email: email});
}

// Delete User by _id
export async function deleteUserById(id: string): Promise<IUser|null> {
    return await UserModel.findByIdAndDelete(id);
}

// Insert Todo of User by _id
export async function insertTodoOfUserById(userId: Types.ObjectId, todoId: Types.ObjectId): Promise<void|null> {
    return await UserModel.findByIdAndUpdate(userId ,{$addToSet:{todos: todoId}});
}

// Find All Users
export async function findAllUsers(): Promise<IUser[]> {
    return await UserModel.find();
}
