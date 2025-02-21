import "dotenv/config";
import mqtt from "mqtt";
import { Capitalize } from "../../lib/capitalize.js";
import { sendNotificationToTopic } from "../firebase/firebaseSupport.js";
import { writeMongoDB } from "../mongoDB/mongoSupport.js";
import {
  deleteProjectEveryOneHour,
  deleteProjectOneWeekAgo,
} from "../../controller/weather.controller.js";
import {
  ManageData,
  UpdateRainfallAndClassification,
} from "../../lib/manageData.js";

const protocol = process.env.protocol;
const port = process.env.port;
const host = process.env.host;
const topic = process.env.topic;
const clientId = process.env.clientId;
const serverUsername = process.env.mqttUsername;
const serverPassword = process.env.password;

console.log(protocol, port, host, topic, clientId, serverUsername, serverPassword)

const connectUrl = `${protocol}://${host}:${port}`;

const client = mqtt.connect(connectUrl, {
  rejectrejectUnauthorized: false,
  username: serverUsername,
  password: serverPassword,
  clientId,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
});

let publishArr = [];
let temporary = {};
let temporaryA = {};
let temporaryB = {};

export const MqttConnection = () => {
  client.on("connect", () => {
    console.log("Connected to MQTT!");
    client.subscribe([topic], () => {
      console.log(`Subscribe to topic '${topic}'`);
    });
  });

  client.on("message", async (topic, payload) => {
    const dataRecived = JSON.parse(payload.toString());
    temporary = await ManageData(dataRecived);

    const title = Capitalize(temporary.location);
    const content = `Wilayah ${Capitalize(
      temporary.location
    )} Terjadi ${Capitalize(temporary.rainfall)}`;

    if (temporary.classification !== "cerah") {
      sendNotificationToTopic(title, content);
      writeMongoDB(temporary);
    }

    if (publishArr.length <= 1 && temporary.deviceId !== temporaryA.deviceId) {
      temporaryA = temporary;
      publishArr.push(temporaryA);
    } else if (
      (publishArr.length <= 1 || temporary.deviceId !== temporaryA.deviceId) &&
      temporaryB.length === 0
    ) {
      temporaryB = temporary;
      publishArr.push(temporaryB);
    } else {
      publishArr = UpdateRainfallAndClassification(publishArr, temporary);
      writeMongoDB(publishArr);
    }
  });

  const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
  const oneHourInMilliseconds = 60 * 60 * 1000;
  setInterval(deleteProjectEveryOneHour, oneHourInMilliseconds); // 1 hour
  setInterval(deleteProjectOneWeekAgo, oneWeekInMilliseconds); // 7 days
};
