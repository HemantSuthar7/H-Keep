import {Router} from "express"

import {
            registerUser,
            loginUser,
            logoutUser,
            refreshAccessToken,
            changeCurrentPassword,
            getCurrentUser,
            updateAccountDetails,
        } from "../controllers/user.controller.js"

import { verifyJWT } from "../middlewares/auth.middleware.js"

const userRouter = Router();


// routes declaration
userRouter.route("/register").post(registerUser);

userRouter.route("/login").post(loginUser);

userRouter.route("/logout").post(verifyJWT, logoutUser);

userRouter.route("/refresh-access-token").post(refreshAccessToken);

userRouter.route("/change-password").post(verifyJWT, changeCurrentPassword)

userRouter.route("/get-current-user").post(verifyJWT, getCurrentUser)

userRouter.route("/update-user-details").patch(verifyJWT, updateAccountDetails)



export default userRouter;