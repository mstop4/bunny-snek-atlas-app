export const calculateCoords = (mapDimensions, coords, mapDetails) => {
  const { left, right, top, bottom } = mapDetails;

  if (coords) {
    const mapImgCoords = {
      x: (coords.x - left) / (right - left) * mapDimensions.x,
      z: (coords.z - top) / (bottom - top) * mapDimensions.y,
    }

    return {
      cx: `${mapImgCoords.x}px`,
      cy: `${mapImgCoords.z}px`,
      display: 'inline',
    };
  }

  return {
    display: 'none',
  };
}