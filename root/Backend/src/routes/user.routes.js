import {Router} from "express"

import {
            registerUser,
            loginUser,
            logoutUser,
            refreshAccessToken,
            changeCurrentPassword,
        } from "../controllers/user.controller.js"

import { verifyJWT } from "../middlewares/auth.middleware.js"

const userRouter = Router();


// routes declaration
userRouter.route("/register").post(registerUser);

userRouter.route("/login").post(loginUser);

userRouter.route("/logout").post(verifyJWT, logoutUser);

userRouter.route("/refresh-access-token").post(refreshAccessToken);

userRouter.route("/change-password").post(verifyJWT, changeCurrentPassword)



export default userRouter;