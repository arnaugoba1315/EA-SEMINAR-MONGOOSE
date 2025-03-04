import { startConnection } from './database.js';
import { IUser } from './models/User.js';
import { createUser, findAllUsers } from './services/User.js';
import { ITodo } from './models/Todo.js';
import { createTodo, findTodoByCode, findTodoByCodeWithUser  } from './services/Todo.js';

async function main() {
    startConnection();    

    // One user
    const user1: IUser = {
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "phone": "1-770-736-8031 x56442",
        "company": {
        "name": "Romaguera-Crona",
        }
    } 
    
    // Insert user
    const newUser = await createUser(user1);
    console.log('User Inserted ' + newUser);

    // One todo
    const todo1: Partial<ITodo> = {
        "code": 1,
        "name": "delectus aut autem",
        "completed": false
    }

    // Insert todo
    const newTodo = await createTodo(todo1, user1);
    console.log('Todo Inserted ' + newTodo);

    // Find Todo
    const todo2 = await findTodoByCode(1);
    console.log('Todo  ' + todo2);

    // Find Todo with User
    const todo3 = await findTodoByCodeWithUser(1);
    console.log('Todo with User ' + todo3);

    // Find All Users
    const users = await findAllUsers();
    console.log('All Users ' + users);
}


main();