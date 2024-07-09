import mongoose, { Schema } from "mongoose";

const LabelSchema = new Schema({
    LabelName: {
        type: String,
        maxlength: 100,
        required: [true, "Label name is required"]
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

export const Label = mongoose.model("Label", LabelSchema);