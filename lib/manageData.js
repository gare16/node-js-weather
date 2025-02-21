import { WeatherDataCalculation } from "./calculationWeather.js";
import { FetchLocation } from "./fetchLocation.js";

const AddLocation = (payload, location) => {
  let valuePublish = {};
  valuePublish = {
    ...payload,
    location: location,
  };
  return valuePublish;
};

const AddRainfallAndClassification = (prevObject, valueObject) => {
  let finalObject = {};
  finalObject = {
    ...prevObject,
    rainfall: valueObject?.rainfall,
    classification: valueObject?.classification,
  };
  return finalObject;
};

export const UpdateRainfallAndClassification = (existing, payload) => {
  const updated = Array.from(existing);
  updated.forEach((item) => {
    item.deviceId !== payload.deviceId
      ? null
      : ((item.rainfall = payload.rainfall),
        (item.classification = payload.classification));
  });
  return updated;
};

export const ManageData = async (newValue) => {
  const calculatedRainfall = WeatherDataCalculation(newValue?.rainfall);
  const location = await FetchLocation(newValue?.latitude, newValue?.longitude);
  const addedLocation = AddLocation(newValue, location);
  const addedRainfallAndClassification = AddRainfallAndClassification(
    addedLocation,
    calculatedRainfall
  );
  return addedRainfallAndClassification;
};
