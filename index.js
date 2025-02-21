import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import weatherRouter from "./routes/weather.routes.js";
import { mongoConnection } from "./api/mongoDB/mongoSupport.js";
import { MqttConnection } from "./api/mqtt/mqttSupport.js";

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
res.send("welcome!");
});
app.use(bodyParser.json());
app.use(weatherRouter);

mongoConnection();
MqttConnection();

app.listen(port, () => console.log(`Server up to ${port}`));
