import mongoose from "mongoose";
let isConnected = false;

export const connectToDB = async () => {
  try {
    const mongoURI = process.env.MONGODBURL as string;
    if (isConnected) {
      console.log("Connection already exists");
      return;
    }
    mongoose.connect(mongoURI, {
      dbName: "food-delivery",
    });
    isConnected = true;
    console.log("Connection established");
  } catch (error) {
    console.log("There is some error in connection", error);
  }
};
