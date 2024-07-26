import {User} from "../Models/User.models.js"
import {asyncHandler} from "../utils/ascyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"


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

const registerUser = asyncHandler( async (req, res) => {

    // get the user detials
    const {username, password, email, fullName} = req.body;


    // validation for empty values
    if(
        [username, password, email, fullName].some( (field) => field.trim() === "" ) 
    ){
        throw new ApiError(400, "You cannot provide empty fields")
    }

    // set email & username to lowercase
    const lowerEmail = email.toLowerCase();
    const lowerUsername = username.toLowerCase()


    // Validate email pattern
    const pattern = "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}";
    const emailToBeMatched = lowerEmail.match(pattern);
    
    if (emailToBeMatched === null) {
        throw new ApiError(400, "Email pattern is Invalid")
    }

    const matchedEmail = emailToBeMatched[0]


    // Check if the user already exists:
    const existedUser = await User.findOne({
        $or : [{lowerUsername},{matchedEmail}]
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






// export all user methods
export {registerUser}