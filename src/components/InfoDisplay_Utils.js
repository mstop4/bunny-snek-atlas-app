const CONNECTION_SYMBOLS = {
  land: '🥾',
  rail: '🚊',
  water: '⛵',
  nether: '🔥',
  unknown: '?',
};

// TODO: refactor this to use only placeIds
export const findConnections = (connectionsData, placeData, placeName, onPlaceSelected, onPlaceHovered) => {
  const currentPlace = placeData.find(place => place.name === placeName);
  const { id: currentPlaceId } = currentPlace;

  const myConnections = connectionsData
    .filter((connection) => connection.ids.includes(currentPlaceId))
    .sort((a, b) => a.distance - b.distance);

  const connectionList = [];

  if (myConnections.length) {
    for (const connection of myConnections) {
      const otherPlaceId = connection.ids[0] === currentPlaceId ? connection.ids[1] : connection.ids[0];
      const { types: connectionTypes } = connection;
      const otherPlaceName = placeData.find((place) => place.id === otherPlaceId).name;

      const connectionLink = `${otherPlaceName}`;
      let connectionDetails = ` (${connection.distance.toFixed(0)} m)`
      for (const connectionType of connectionTypes) {
        if (Object.keys(CONNECTION_SYMBOLS).includes(connectionType)) {
          connectionDetails += CONNECTION_SYMBOLS[connectionType];
        } else {
          connectionDetails += CONNECTION_SYMBOLS.unknown;
        }
      }

      connectionList.push(
        <li key={otherPlaceId}>
          <span
            className="InfoDisplay-connectionListItem"
            onClick={() => onPlaceSelected(otherPlaceName)}
            onMouseEnter={() => onPlaceHovered(otherPlaceName)}
            onMouseLeave={() => onPlaceHovered(null)}
          >
            {connectionLink}
          </span>
          {connectionDetails}
        </li>
      );
    }
  }

  return connectionList;
}

export const parseBiomes = (biomes) => {
  const biomeList = [];
  if (biomes) {
    for (const biome of biomes) {
      biomeList.push(
        <li key={biome}>{biome}</li>
      );
    }
  }

  return biomeList;
}

export const parseRating = (rating) => {
  const ratingStars = [];
  if (rating || rating === 0) {
    if (rating === -1) ratingStars.push(<span>Abandoned</span>);
    else if (rating === 0) ratingStars.push(<span>Unsettled</span>);
    else {
      for (let i = 0; i < rating; i++) {
        ratingStars.push(<span key={i}>★</span>);
      }
    }
  }

  return ratingStars;
}

export const parseDescription = (description) => {
  const descriptionList = [];
  if (description) {
    for (const line of description) {
      descriptionList.push(
        <p key={line}>{line}</p>
      );
    }
  }

  return descriptionList;
}

export const parseLocation = (location) => {
  return location ? `${location.x}, ${location.y}, ${location.z}` : "";
}