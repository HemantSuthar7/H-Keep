import mongoose, { Schema } from "mongoose";

const LabelSchema = new Schema({
    LabelName: {
        type: String,
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps:true});

export const Label = mongoose.model("Label", LabelSchema);