import { writeMongoDB } from "../api/mongoDB/mongoSupport.js";
import { weatherModel } from "../model/weather.model.js";

export const findProjects = async (req, res) => {
  const { location } = req.params;
  try {
    if (location) {
      const query = weatherModel.where({
        location: { $regex: location, $options: "i" },
      });
      const locationResults = await query.sort([["createdAt", "desc"]]);
      setTimeout(() => {
        res.status(200).json(locationResults);
      }, 1000);
    } else {
      const results = await weatherModel.find({});
      setTimeout(() => {
        res.status(200).json({
          status: "OK",
          results: results,
        });
      }, 1000);
    }
  } catch (error) {
    res.status(500).json({
      info: "read data Weather.",
      message: error.message,
    });
  }
};

export const getLocation = async (req, res) => {
  try {
    const uniqueLocations = await weatherModel.distinct("location");
    const cleanedArray = uniqueLocations.map((item) =>
      item.replace(/[, -].*/, "")
    );
    const cleanArray = uniqueLocations
      .map((item) => item.split(",")[0].trim()) // Ambil kata pertama sebelum koma dan hapus spasi
      .filter((word) => word && word !== "-");
    res.status(200).json(cleanArray);
  } catch (error) {
    res.send(error);
  }
};

export const deleteProjectOneWeekAgo = async () => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  try {
    await weatherModel.deleteMany({
      createdAt: { $lt: oneWeekAgo },
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProjectEveryOneHour = async () => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  try {
    const totalCount = await weatherModel
      .find({
        createdAt: { $gte: oneHourAgo },
      })
      .countDocuments();

    if (totalCount > 12) {
      const documentsToKeep = 12;

      const docsToDelete = await weatherModel
        .find({
          createdAt: { $gte: oneHourAgo },
        })
        .sort([["createdAt", "asc"]])
        .limit(totalCount - documentsToKeep);
      const idsToDelete = docsToDelete.map((doc) => doc.location);
      // await weatherModel.deleteMany({
      //   _id: { $in: idsToDelete },
      // });
      console.log(idsToDelete.length);
      console.log(idsToDelete);
    } else {
      console.log("No Documents deleted.");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const createWeather = async (req, res) => {
  try {
    const result = writeMongoDB(req.body);
    res.status(200).json({
      message: "done",
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
