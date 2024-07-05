import mongoose from "mongoose";

const TodoItemsSchema = new mongoose.Schema({
});

export const Todo_items = mongoose.model("Todo_items", TodoItemsSchema);