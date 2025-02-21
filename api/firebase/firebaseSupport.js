import admin from "firebase-admin";
import serviceAccount from "../../data/serviceAccount.json" with { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const sendNotificationToTopic = async (title, body) => {
  try {
    const message = {
      notification: {
        title: title,
        body: body,
      },
      topic: "weather",
    };

    await admin.messaging().send(message);
    console.log("Successfully sent message.");
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
