import {Router} from "express"

import {
    createLabel,
    getLabelData,
    updateLabel,
    deleteLabel
} from "../controllers/label.controllers.js"

import { verifyJWT } from "../middlewares/auth.middleware.js"



const labelRouter = Router();


// Routes declaration

labelRouter.route("/create-Label").post(verifyJWT, createLabel);
labelRouter.route("/get-Label-Data").post(verifyJWT, getLabelData);
labelRouter.route("/update-Label").post(verifyJWT, updateLabel);
labelRouter.route("/delete-Label").post(verifyJWT, deleteLabel);



export default labelRouter;