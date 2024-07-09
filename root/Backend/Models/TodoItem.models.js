import mongoose , {Schema} from "mongoose";

const TodoItemsSchema = new Schema({
    todoText: {
        type: String,
        required: [true, "Content is required in list"]

    },
    todoListId:{
        type: Schema.Types.ObjectId,
        ref:"TodoList"
    },
    indexNum: {
        type: Number,
        required: [true, "index number is required for ordering purpose"]
    }
});

export const TodoItem = mongoose.model("TodoItem", TodoItemsSchema);