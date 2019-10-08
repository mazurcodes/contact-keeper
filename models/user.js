const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Error name"]
  },
  email: {
    type: String,
    required: [true, "Error email"]
  },
  password: {
    type: String,
    required: [true, "Error password"]
  },
  contacts: {
    type: Array,
    default: []
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("User", userSchema);
