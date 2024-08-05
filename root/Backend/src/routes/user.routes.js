import {Router} from "express"

import {
            registerUser,
            loginUser,
            logoutUser,
            refreshAccessToken,
        } from "../controllers/user.controller.js"

import { verifyJWT } from "../middlewares/auth.middleware.js"

const userRouter = Router();


// routes declaration
userRouter.route("/register").post(registerUser);

userRouter.route("/login").post(loginUser);

userRouter.route("/logout").post( verifyJWT, logoutUser);

userRouter.route("/refresh-access-token").post(refreshAccessToken)



export default userRouter;