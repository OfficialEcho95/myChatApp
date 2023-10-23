const mongoose = require("mongoose");
const uri = require("./dbDetails");
const { collection } = require("../model/userModel");

const dbConnect = async () => {
  try {
    await mongoose.connect(uri, {
      dbName: "chatAppdb",
    });
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("DB Connection Failed!", error.message);
  }
};

dbConnect();
