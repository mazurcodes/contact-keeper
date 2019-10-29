const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true
    });

    console.log("We're connected to DB");
  } catch (err) {
    console.log("DB connection error: ", err);
    process.exit(1);
  }
};

module.exports = connectDB;
