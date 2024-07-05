import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({});

export const Note = mongoose.model("Note", NoteSchema);