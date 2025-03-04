import { ObjectId, Schema, model } from "mongoose";
import { ITodo } from './Todo.js';

export interface IUser {
    name: string;
    email: string;
    username: string;
    phone?: string;
    company?: {
      name: string;
    };
    todos?: ObjectId[]
}

const UserSchema = new Schema <IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true},
  username: { type: String, required: true},
  phone: String,
  company: {
    name: String
  },
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }] 
});

export const UserModel =  model("User", UserSchema); 
