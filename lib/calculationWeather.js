// Hujan ringan (Light Rain): 0.5–2.5 mm/jam

// Hujan sedang (Moderate Rain): 2.5–7.5 mm/jam

// Hujan lebat (Heavy Rain): 7.5–50 mm/jam

export const WeatherDataCalculation = (valueWeather) => {
  let result = {};
  const maxValueWeather = 1024;
  const minValueWeather = 0;
  const threshold = 15.0;

  const rainfall =
    ((maxValueWeather - valueWeather) / (maxValueWeather - minValueWeather)) *
    threshold;
  const classification =
    rainfall < 0.5
      ? "cerah"
      : rainfall > 0.5 && rainfall <= 2.4
      ? "hujan ringan"
      : rainfall > 2.5 && rainfall <= 7.4
      ? "hujan sedang"
      : "hujan lebat";

  result = {
    rainfall: `${rainfall.toFixed(2)} mm/hour`,
    classification: classification,
  };
  return result;
};
