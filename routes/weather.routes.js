import express from "express";
import {
  findProjects,
  getLocation,
  createWeather,
} from "../controller/weather.controller.js";
const weatherRouter = express.Router();

weatherRouter.get("/api/weather/", findProjects);
weatherRouter.get("/api/weather/:location", findProjects);
weatherRouter.get("/api/location", getLocation);
weatherRouter.post("/api/weather", createWeather);

export default weatherRouter;
