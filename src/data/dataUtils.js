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

export const calculateConnectionDistances = (connectionsData, placeData) => {
  return connectionsData.map((connection) => {
    const placeAId = connection.ids[0];
    const placeBId = connection.ids[1];
    const locationA = placeData.find((place) => place.id === placeAId).location;
    const locationB = placeData.find((place) => place.id === placeBId).location;
    const distance = locationA && locationB
      ? Math.sqrt(Math.pow(locationA.x - locationB.x, 2) + Math.pow(locationA.z - locationB.z, 2))
      : 0;

    return {
      ...connection,
      distance,
    } 
  })
}