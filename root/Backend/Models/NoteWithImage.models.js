import mongoose, { Schema } from "mongoose";

const NoteWithImageSchema = new Schema({
    title: {
        type: String,
        required: [true,"Title is required"] // pass in a default values from controller if no title passed by user
    },
    textContent: {
        type: String,
    },
    color: {
        type: String,
        required: [true, "Color is required"],
        uppercase: true,
        enum : ["#F5D3B0","#256377","#0C625D","#264D3B","#77172E","#284255","#472E5B","#6C394F","#692B17","#7C4A03","#4B443A","#232427"]
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    labelCategory: {
        type: Schema.Types.ObjectId,
        ref: "Label"
    },
    imageUrl: {
        type: String, // Cloudinary URL
        required: [true, "Image is required"]
    }
},{timestamps:true});

export const NoteWithImage = mongoose.model("NoteWithImage", NoteWithImageSchema);