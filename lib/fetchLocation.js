import node_geocoder from "node-geocoder";

export const FetchLocation = async (latitude, longitude) => {
  var geocoder = node_geocoder({
    provider: "opencage",
    apiKey: process.env.openCageApiKey,
  });

  // Get location opencage
  try {
    let res = await geocoder.geocode(`${latitude}, ${longitude}`);
    let subdistrict = res[0]?.raw?.components?.subdistrict || "-";
    let village = res[0]?.raw?.components?.village || "-";
    return `${village}, ${subdistrict}`;
  } catch (err) {
    console.error("Error fetching location:", err);
    return "-";
  }
};
