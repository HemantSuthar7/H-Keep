import mongoose , {Schema} from "mongoose";

const TodoItemsSchema = new Schema({
    todoText: {
        type: String,

    },
    todoListId:{
        type: Schema.Types.ObjectId,
        ref:"TodoList"
    },
    indexNum: {
        type: Number,
        required: [true, "index number is required"]
    }
});

export const TodoItem = mongoose.model("TodoItem", TodoItemsSchema);