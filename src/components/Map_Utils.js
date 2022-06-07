export const calculateCoords = (mapDimensions, coords, mapDetails) => {
  const { left, right, top, bottom } = mapDetails;

  const mapImgCoords = {
    x: (coords.x - left) / (right - left) * mapDimensions.x,
    z: (coords.z - top) / (bottom - top) * mapDimensions.y,
  }

  return {
    cx: `${mapImgCoords.x}`,
    cy: `${mapImgCoords.z}`,
  };
}

export const calculateConnectionCoords = (mapDimensions, coordsPair, mapDetails) => {
  const { left, right, top, bottom } = mapDetails;

  const lineCoords = coordsPair.map((coords) => {
    return {
      x: (coords.x - left) / (right - left) * mapDimensions.x,
      z: (coords.z - top) / (bottom - top) * mapDimensions.y,
    }
  });

  return {
    x1: `${lineCoords[0].x}`,
    y1: `${lineCoords[0].z}`,
    x2: `${lineCoords[1].x}`,
    y2: `${lineCoords[1].z}`,
  };
}