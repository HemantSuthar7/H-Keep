import {Router} from "express"

import {
    createNote,
    getUserNotes,
    updateNote,
    deleteNote
} from "../controllers/note.controllers.js"

import { verifyJWT } from "../middlewares/auth.middleware.js"


const noteRouter = Router();


// Routes declaration 

noteRouter.route("/create-Note").post(verifyJWT, createNote);
noteRouter.route("/get-User-Notes").post(verifyJWT, getUserNotes);
noteRouter.route("/update-Note").post(verifyJWT, updateNote);
noteRouter.route("/delete-Note").post(verifyJWT, deleteNote);




export default noteRouter;