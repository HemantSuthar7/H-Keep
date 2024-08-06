import {User} from "../Models/User.models.js"
import {asyncHandler} from "../utils/ascyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import JWT from "jsonwebtoken"


/* SOME METHODS TO WRITE :

    1. RegisterUser
    2. Login
    3. Logout // testing -- make sure the refresh token is getting deleted from db
    4. Change current password - if the user knows the old password
    5. Forgot password
    6. refresh access token 
    7. get current user
    8. update account details
    9. add more methods as per requirement

*/


// method for generating access and refresh token
const generateAccessAndRefreshToken = async (userId) => {
    try {

        const user = await User.findById(userId);

        const accessToken = await user.generateAccessToken()

        const refreshToken = await user.generateRefreshToken()

        user.refreshToken = refreshToken
        user.save({ validateBeforeSave : false})

        return {accessToken, refreshToken}

        
    } catch (error) {
        throw new ApiError(500, "Access and Refresh token generation failed")
    }
}



const registerUser = asyncHandler( async (req, res) => {

    // get the user detials
    const {username, password, email, fullName} = req.body;

    
    // validation for empty values
    if(
        [username, password, email, fullName].some( (field) => field?.trim() === "" ) 
    ){
        throw new ApiError(400, "You cannot provide empty fields")
    }


    // set email & username to lowercase
    const lowerEmail = email.toLowerCase();
    const lowerUsername = username.toLowerCase();


    // Validate email pattern
    const pattern = "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}";
    const emailToBeMatched = lowerEmail.match(pattern);
    
    if (emailToBeMatched === null) {
        throw new ApiError(400, "Email pattern is Invalid")
    }

    const matchedEmail = emailToBeMatched[0]

    
    // Check if the user already exists:
    const existedUser = await User.findOne({
        $or : [{username : lowerUsername},{email : matchedEmail}]
    })


    if (existedUser) {
        throw new ApiError(409, "The user with this username or email already exists")
    }


    // create user
    const user = await User.create({
        username: lowerUsername,
        email: matchedEmail,
        password,
        fullName: fullName
    })


    // check if user is created 
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }



    // if everything goes well, send the response
    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered Successfully")
    )


} )


const loginUser = asyncHandler( async (req, res) => {

    // Algorithm for LoginUser :

    // step - 1 : get the username or email & password
    // step - 2 : validate the inputs i.e. check for empty values & patterns 
    // step - 3 : check in the database if the inputs match with the data in the database
    //            if it matches proceed forward, if it not matches tell the user to 
    //            register first
    // step - 4 : if the user is matched successfully then generate access token & 
    //            refresh token (store the refresh token in the db)
    // step - 5 : if everything goes well then send the response with the access token &
    //            refresh token and also set the cookies.


    // get the user details
    const {username, email, password} = req.body;


    // validate the user inputs

    // validation for empty values
    if (
        [username, email, password].some( (field) => field?.trim() === "" )
    ) {
        throw new ApiError(400, "you cannot provide empty fields")
    }


    // set email & username to lowercase
    if(username){
        var lowerUsername = username.toLowerCase();
    }


    if(email){
        var lowerEmail = email.toLowerCase();

        // Validate email pattern
        var pattern = "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}";
        var emailToBeMatched = lowerEmail?.match(pattern);

        if (emailToBeMatched === null) {
            throw new ApiError(400, "Email pattern is Invalid");
        };
    
        var matchedEmail = emailToBeMatched[0];
    };
    
    

    // find the user in the database 
    const existingUser = await User.findOne({
        $or : [{username : lowerUsername},{email : matchedEmail}]
    })
    

    if(!existingUser){
        throw new ApiError(400, "The user does not exists, Please register yourself first !")
    }


    // if user exists already, check the provided password
    const passwordCheck = await existingUser.isPasswordCorrect(password);
    

    if(!passwordCheck){
        throw new ApiError(401, "Password is incorrect !")
    }



    // generate accessToken & refreshToken 
    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(existingUser._id)

    // the token generation method has already stored the refresh token in the database so no need to do it here again 

    // send cookie

    // first bring the loggedIn user from db
    const loggedInUser = await User.findById(existingUser._id).select("-password -refreshToken")

    const cookieOptions = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .cookie("AccessToken", accessToken, cookieOptions)
    .cookie("RefreshToken", refreshToken, cookieOptions)
    .json(
        new ApiResponse(
            200,
            {
                user : loggedInUser, 
                accessToken, 
                refreshToken
            },
            "User Logged-in successfully"
        )
    );
    
});



const logoutUser = asyncHandler( async (req, res,) => {

    // logout logic :
    // 1. get the userdetails from db and set the refreshtoken value to empty
    // 2. if successfull, then send response and clear the existing cookies

    console.log("logout is running")

    const updatedUser =  await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset : {
                refreshToken : ""
            }
        },
        {
            new : true
        }
    )

    if(!updatedUser){
        throw new ApiError(500, "Something went wrong while updating the user refresh token")
    }

    const cookieOptions = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("AccessToken", cookieOptions)
    .clearCookie("RefreshToken", cookieOptions)
    .json(
        new ApiResponse(
            200,
            {},
            "User logged out successfully"
        )
    )


} )


const refreshAccessToken = asyncHandler( async (req, res) => {

    const incomingRefreshToken = req.cookies.RefreshToken || req.body.RefreshToken

    if(!incomingRefreshToken){
        throw new ApiError(400, "Refresh token not found")
    }

    try {
        
        const decodedToken = JWT.verify(
            incomingRefreshToken, 
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)

        if(!user){
            throw new ApiError(400, "Invalid refresh Token")
        }

        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(400, "Refresh token is invalid or expired")
        }

        // generate new refresh token
        const {accessToken, newRefreshToken} = await generateAccessAndRefreshToken(user._id)

        const cookieOptions = {
            httpOnly : true,
            secure : true
        }

        return res
        .status(200)
        .cookie("AccessToken", accessToken, cookieOptions)
        .cookie("RefreshToken", newRefreshToken, cookieOptions)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken,
                    refreshToken : newRefreshToken
                },
                "Access Token Refresh Successfully"
            )
        )

    } catch (error) {
        throw new ApiError(400, error?.message || "Invalid Refresh Token")
    }


} )


// export all user methods
export {
    registerUser, // TESTING ==> SUCCESSFULL
    loginUser,  // TESTING ==> SUCCESSFULL
    logoutUser, // TESTING ==> SUCCESSFULL
    refreshAccessToken, // TESTING ==> SUCCESSFULL
}