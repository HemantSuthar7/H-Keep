import mongoose from "mongoose";

const NoteWithImageSchema = new mongoose.Schema({});

export const NoteWithImage = mongoose.model("NoteWithImage", NoteWithImageSchema);