import mongoose , {Schema} from "mongoose";

const todoListSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required in list"], // pass in a default values from controller if no title passed by user
        maxlength: 100, 
    },
    todoItems:{
        type: [String],
        required: [true, "Content is required in list"],
        validate: {
            validator: function(v){
                return v.every(item => item.length <= 150);
            },
            message: props => "Each todo item should not exceed 150 characters in length"
        }
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    color: {
        type: String,
        required: [true, "Color is required"], // pass in default value if user does not selects any color
        uppercase: true,
        enum : ["#F5D3B0","#256377","#0C625D","#264D3B","#77172E","#284255","#472E5B","#6C394F","#692B17","#7C4A03","#4B443A","#232427"]
    },
    labelCategory: {
        type: Schema.Types.ObjectId,
        ref: "Label"
    }

},{timestamps:true});

export const TodoList = mongoose.model("TodoList", todoListSchema);