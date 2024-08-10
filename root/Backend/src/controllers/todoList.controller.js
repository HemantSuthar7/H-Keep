import {User} from "../Models/User.models.js"
import {asyncHandler} from "../utils/ascyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {Label} from "../Models/Label.models.js"
import {TodoList} from "../Models/TodoList.models.js"


/*


    << All list components : 
        1. title
        2. listItems
        3. image
        4. label
        5. color
    >>



    Some methods to write in here : 
        1. Create list 

        2. Get User lists

        3. Update list 

        4. Upload image (if image is provided by user)

        5. update image (after updating delete the previous one)

        6. Delete image

        7. Delete list (delete the whole list document from db. don't forget to delete it from local storage)

        8. add list item

        9. update list item (we will manage the list item toggle in frontend and store boolean in local storage)

        10. delete list item

*/



const createList = asyncHandler( async (req, res) => {


    const {title, todoItems, label, color} = req.body;

    if(
        [title, label, color].some( field => field?.trim() === "" )
    ){
        throw new ApiError(400, "Empty values are being passed, please check for empty values")
    }

    if(
        [title, label, color].some( field => typeof field !== "string" )
    ){
        throw new ApiError(400, "One or more fields have a type other than string. Please check your input.")
    }



    // Handle todoItems

    if(!todoItems){
        throw new ApiError(400, "the todo-items is not being passed, please ensure correct transfer")
    }

    if(!Array.isArray(todoItems)){
        throw new ApiError(400, "The todo items is not an array, please ensure the correct data type")
    }
 
    if(todoItems.length === 0){
        throw new ApiError(400, "The todo-items cannot be empty")
    }


    // check if every element is an object and every object should have two keys "value" & "status" and further these keys should not be empty, null or undefined
    for(let i = 0; i < todoItems.length; i++){
        const item = todoItems[i];

        if(typeof item !== "object" || item === null){
            throw  new ApiError(400, `Item at index ${i} is not an object`)
        }

        if(!item.hasOwnProperty("value")){
            throw new ApiError(400, `Item at index ${i} is missing the 'value' key`);
        }

        if(typeof item.value !== String){
            throw new ApiError(400, `value of current todoItem object at index ${i} is not string`)
        }

        if(item.value === "" || item.value === null || item.value === undefined){
            throw new ApiError(400, `The 'value' key in item at index ${i} cannot be empty, null, or undefined`);
        }

        if(!item.hasOwnProperty("status")){
            throw new ApiError(400, `Item at index ${i} is missing the 'status' key`);
        }

        if(typeof item.status !== Boolean){
            throw new ApiError(400, `status of current object at index ${i} is not a boolean`)
        }

        if (item.status === null || item.status === undefined) {
            throw new ApiError(400, `The 'status' key in item at index ${i} cannot be null or undefined`);
        }

    }

    const todoItemsToSave = todoItems



    // Handle title

    if(!title){
        throw new ApiError(400, "The title is not being passed, please ckeck")
    }

    if(title.length > 100){
        throw new ApiError(400, "The length of the title exceeds 100 characters, which is not allowed")
    }

    const titleToSave = String(title) || "Untitled" // just to ensure data type safety



    // Handle color

    if(!color){
        throw new ApiError(400, "The color is not being passed, please check")
    }

    const allowedColors = [
        "#F5D3B0", "#256377", "#0C625D", "#264D3B", "#77172E", 
        "#284255", "#472E5B", "#6C394F", "#692B17", "#7C4A03", 
        "#4B443A", "#232427"
    ];

    if (!allowedColors.includes(color)) {
        throw new ApiError(400, "Invalid color value, please check your input.");
    }

    const colorToSave = String(color)


    // Handle label

    let labelCategory;
    if (label) {
        labelCategory = await Label.findById(label);
        if (!labelCategory) {
            throw new ApiError(400, "Invalid label ID");
        }
    }

    // Handle createdBy

    const userId = req.user._id;

    if(!userId){
        throw new ApiError(400, "User is not authenticated")
    }

    // Handle image

    const listImageLocalPath = req.file?.path;
    let listImageUrlToSave = null

    if(listImageLocalPath){

        const listImage = await uploadOnCloudinary(listImageLocalPath)

        if(!listImage.url){
            throw new ApiError(500, "Error occured while uploading list-image")
        }

        listImageUrlToSave = listImage.url
    }


    const todoList = TodoList.create({
        title : titleToSave,
        todoItems : todoItemsToSave,
        createdBy : userId,
        color : colorToSave || "#232427",
        labelCategory : labelCategory ? labelCategory._id : null,
        imageUrl : listImageUrlToSave
    })


} )