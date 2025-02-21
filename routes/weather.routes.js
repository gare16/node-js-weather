import express from "express";
import {
  findProjects,
  deleteProjectEveryOneHour,
  getLocation,
} from "../controller/weather.controller.js";
const weatherRouter = express.Router();

weatherRouter.get("/api/weather/", findProjects);
weatherRouter.get("/api/weather/:location", findProjects);
weatherRouter.get("/api/location", getLocation);
// weatherRouter.delete("/api/weather/", deleteProjectEveryOneHour);

export default weatherRouter;
