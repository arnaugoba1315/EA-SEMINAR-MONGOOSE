// Model and Interface
import { ITodo, TodoModel } from '../models/Todo.js';
import { IUser, UserModel } from '../models/User.js';
import { insertTodoOfUserById } from '../services/User.js';

// Insert a user's Todo
export async function createTodo(todo:Partial<ITodo>, user: IUser): Promise<ITodo|null> {

    // Find User by email
    const userFound = await UserModel.findOne({ email: user.email });
    if (!userFound) {
        return null;
    } 
    
    // Todo with user's _id
    todo.user = userFound._id;

    // Insert Todo
    const newTodo = new TodoModel(todo);
    const insertedTodo = await newTodo.save();
    if (!insertedTodo) {
        return null;
    } 

    // Insert Todo in User
    await insertTodoOfUserById(insertedTodo.user, insertedTodo._id);

    return insertedTodo;
}

// Find Todo by code
export async function findTodoByCode(code: number): Promise<ITodo|null> {
    return await TodoModel.findOne({ code: code });
}

// Find Todo by code with populated user
export async function findTodoByCodeWithUser(code: number): Promise<ITodo|null> {
    return await TodoModel.findOne({ code: code }).populate('user');
}