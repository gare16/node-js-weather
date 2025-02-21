import mongoose from "mongoose";
import { weatherModel } from "../../model/weather.model.js";

const uri = process.env.URI;

export const mongoConnection = () => {
  console.log("MongoDB Connecting...");
  mongoose
    .connect(uri)
    .then(() => {
      console.log("MongoDB Connected!");
    })
    .catch((err) => {
      console.log(`MongoDB failed to connect ${err.message}`);
    });
};

export const writeMongoDB = async (value) => {
  try {
    const res = await weatherModel.create(value);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
