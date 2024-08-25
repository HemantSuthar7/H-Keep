import {Router} from "express"

import  {
    createList,
    updateList,
    deleteList
} from "../controllers/todoList.controller.js"

import { verifyJWT } from "../middlewares/auth.middleware.js"


const todoListRouter = Router();


// Routes declaration

todoListRouter.route("/create-TodoList").post(verifyJWT, createList);
todoListRouter.route("/update-TodoList").patch(verifyJWT, updateList);
todoListRouter.route("/delete-TodoList/:todoListId").get(verifyJWT, deleteList);



export default todoListRouter;