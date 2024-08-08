import {User} from "../Models/User.models.js"
import {asyncHandler} from "../utils/ascyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"


/*

    Some methods to write in here : 
        1. Create Note

        2. Get User Notes

        3. Update Note

        4. Delete Note

        5. Add to Label ==>> this should be a utility

        6. Delete from Label ==>> this should be a utility

        7. upload image (if image is provided by user)

        8. update image (after updating delete the previous one)
        
        9. Delete image (if image already exists)



    << NOTE COMPONENTS : 
        1. Title
        2. textContent
        3. Image
        4. Label (will not be provided by not itself, handle this in label controller)
        5. color

*/


const createNote = asyncHandler( async (req, res) => {

    // 1. Get the title, textContent, image, color, label
    // 2. Check for empty values
    // 3. As image and color are not required, let the image field be null and color be the default which is #232427
    // 4. If image is supplied then upload it and store the url in db
    // 5. If color is supplied then store the color in db
    // 6. Store the user reference in db
    // 7. if label is supplied then reference it in db

    const {title, textContent, color, label} = req.body; // remember to receive image later

    if(
        [title, textContent, color, label].some( field => field?.trim() === "")
    ){
        throw new ApiError(400, "Empty values are being passed, please check for empty values")
    }

    if(
        [title, textContent, color, label].some( field => typeof field !== "string")
    ){
        throw new ApiError(400, "One or more fields have a type other than string. Please check your input.")
    }


    // Handle title

    if(!title){
        throw new ApiError(400, "The title is not being passed, please ckeck")
    }

    if(typeof title !== "string"){
        throw new ApiError(400, "The type of title is not string, please ensure the correct data type")
    }

    if(title.length > 150){
        throw new ApiError(400, "The length of the title exceeds 150 characters, which is not allowed")
    }

    const titleToSave = String(title) || "Untitled" // just to ensure data type safety


    // Handle textContent

    if(!textContent){
        throw new ApiError(400, "The text-content is not being passed, please ckeck")
    }

    if(typeof textContent !== "string"){
        throw new ApiError(400, "The type of text-content is not string, please ensure the correct data type")
    }

    if(textContent.length > 50000){
        throw new ApiError(400, "The length of the text-content exceeds 50000 characters, which is not allowed")
    }

    const textContentToSave = String(textContent) // just to ensure data type safety


    // Handle color

    





} )


export {
    createNote
}