import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "username is required"],
        lowercase: true,
        unique: true,
        trim:true,
    },
    password:{
        type: String,
        required: [true, "Password is required"],
    },
    email:{
        type: String,
        required: [true,"Email is required"],
        unique: true,
        lowecase: true,
        trim: true,
    }
},{timestamps:true});



userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema);