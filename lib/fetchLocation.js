import opencage from "opencage-api-client";

export const FetchLocation = async (latitude, longitude) => {
  try {
    const result = await opencage.geocode({
      q: `${latitude}, ${longitude}`,
      key: process.env.openCageApiKey,
      language: "id",
    });
    const village = result?.results[0]?.components?.village || "-";
    const county = result?.results[0]?.components?.county || "-";
    console.log(village, county);
    return `${village}, ${county}`;
  } catch (error) {
    console.error("Error Fetching location: ", error);
  }
};
