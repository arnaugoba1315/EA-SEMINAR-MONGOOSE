import { Types, Schema, model } from "mongoose";

export interface ITodo {
    code: number;
    user: Types.ObjectId;
    name: string;
    completed: boolean
}


const TodoSchema = new Schema<ITodo>({
  code: { type: Number, required: true, unique: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String },
  completed: { type: Boolean, default: false }
});

export const TodoModel =  model("Todo", TodoSchema); 