import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "username is required"],
        lowercase: true,
        unique: true,
        trim:true,
        minLength: 6,
        maxLength: 32,
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minLength: 8,
        maxLength: 32,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,
        maxLength: 32,
    }
},{timestamps:true});

export const User = mongoose.model("User", UserSchema);