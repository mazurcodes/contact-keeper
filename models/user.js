const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Error name"]
  },
  email: {
    type: String,
    required: [true, "Error email"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Error password"]
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("user", UserSchema);
