import mongoose from "mongoose";

const LabelSchema = new mongoose.Schema({});

export const Label = mongoose.model("Label", LabelSchema);