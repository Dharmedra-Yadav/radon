const mongoose = require("mongoose");

/**********************************[Create-College-Schema]************************************/
const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, "College name already exists"],
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      // unique: [true, "College name already exists"],
      trim: true,
    },
    logoLink: {
      type: String,
      required: true,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamp: true }
);

/*************************************[Connection-Creation]***********************************/
module.exports = new mongoose.model("College", collegeSchema);
