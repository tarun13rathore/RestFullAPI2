const mongoose = require("mongoose");
//import mongoose from "mongoose";
const validator = require("validator");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email is already exist.."],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email id is invalid.");
      }
    },
  },
  phone: {
    type: Number,
    minlength: [10, "minimum legth 10"],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    require: true,
  },
});

//create new colletion
const Student = mongoose.model("Student", studentSchema, "student");

module.exports = Student;
