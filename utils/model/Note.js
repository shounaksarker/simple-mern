const mongoose = require("mongoose");


const NoteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please fill the Name"],
    maxlength: [30, "Can not be more than 30 characters"],
    trim: true,
  },
  gender: {
    type: String,
    required: [true, "Please fill the Name"],
  },
  mobile: {
    type: String,
    unique: [true, "Number has already exists"],
    required: [true, "Please fill the Mobile"],
  },
  area: {
    type: String,
    required: [true, "Please fill the Area Name"],
  },
  blood: {
    type: String,
    required: [true, "Please fill the Blood"],
  },
  status: {
    type: String,
    required: [true, "Please fill the Status"],
  },
});

const Note = mongoose.models.Note || mongoose.model("Note", NoteSchema); 
module.exports = Note;
