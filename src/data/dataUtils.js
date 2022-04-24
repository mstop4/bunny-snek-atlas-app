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

export const findCoordinates = (placeData, placeName) => {
  const currentPlace = placeData.find(place => place.name === placeName);
  return currentPlace.location;
};
