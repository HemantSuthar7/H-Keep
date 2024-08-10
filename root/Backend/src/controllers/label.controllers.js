import {asyncHandler} from "../utils/ascyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { Label } from "../Models/Label.models.js"

/*

    Some methods to write in here : 
        1. Create label (should be dynamic in the ui)

        2. Get User label data (should return all the user label associated notes and lists) 

        3. Update label 

        4. Delete label
        
        5. add more later ...S

*/


const createLabel = asyncHandler( async (req, res) => {

    const {labelName} = req.body;

    // Handle labelName

    if(!labelName){
        throw new ApiError(400, "Label-name is not being passed, please ensure its transfer")
    }

    if(typeof labelName !== "string"){
        throw new ApiError(400, "The label-name data type is not string")
    }

    if(labelName === ""){
        throw new ApiError(400, "You cannot provide empty label name")
    }

    if(labelName.length > 25){
        throw new ApiError(400, "The label-name length should not exceed 25 characters")
    }

    const labelNameToSave = String(labelName);


    // Handle createdBy

    const userId = req.user._id

    if(!userId){
        throw new ApiError(400, "The user is not authenticated for label operations")
    }


    const label = await Label.create({
        labelName : labelNameToSave,
        createdBy : userId
    })

    if(!label){
        throw new ApiError(500, "There was an error while creating label")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {label},
            "label created successfully"
        )
    )


} )



export {
    createLabel,
}