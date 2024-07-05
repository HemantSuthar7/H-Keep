import mongoose, { Schema } from "mongoose";

const TodoListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100,
    },
    todoItems:{
        type: Schema.Types.ObjectId,
        ref: "Todo_items"
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    color: {
        type: String,
        uppercase: true,
        enum : ["#F5D3B0",]
    }

});

export const Todo_list = mongoose.model("Todo_list", TodoListSchema);