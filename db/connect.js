const mongoose = require("mongoose");

const connectDB = (url) => {
  console.log("Connecting to Databse");
  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on("timeout", (error) => console.log("timeout!"));
    db.on("error", () => console.log("connection error: "));
    db.once("open", function () {
      console.log("Connected successfully");
    });
    return;
  } catch (error) {
    console.log("Database Connection Failed!!!");
  }
};

module.exports = connectDB;