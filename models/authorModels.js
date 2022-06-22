const mongoose = require("mongoose");

/************************CREATE AUTHORS SCHEMA*********************************/
const authorSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      enum: ["Mr", "Mrs", "Miss"],
    },
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
/*********************************CREATE CONNECATION IN AUTHOR***************************************/
module.exports = mongoose.model("Author", authorSchema);
