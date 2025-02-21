import mongoose from "mongoose";

const weatherSchema = mongoose.Schema(
  {
    deviceId: {
      type: String,
    },
    rainfall: {
      type: String,
    },
    classification: {
      type: String,
    },
    location: {
      type: String,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const weatherModel = mongoose.model("databaseWeatherAPI", weatherSchema);
