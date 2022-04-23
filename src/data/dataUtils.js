export const flattenPlaceData = (placeData) => {
  const flattenedPlaceData = [];

  for (const region of placeData) {
    for (const place of region.places) {
      flattenedPlaceData.push({
        ...place,
        region: region.region,
      });
    }
  }

  return flattenedPlaceData;
}