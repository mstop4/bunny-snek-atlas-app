import { faBuilding, faBuildingCircleExclamation, faBuildingCircleXmark, faFire, faHouse, faHouseCircleExclamation, faHouseCircleXmark, faQuestion, faRoad, faStar, faTrain, faWater } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cloneElement } from "react";

const CONNECTION_SYMBOLS = {
  land: <FontAwesomeIcon
    icon={faRoad}
    alt="Land"
    title="Land Route"
    className="InfoDisplay-connectionIcon"
  />,
  rail: <FontAwesomeIcon
    icon={faTrain}
    alt="Rail"
    title="Rail Route"
    className="InfoDisplay-connectionIcon"
  />,
  water: <FontAwesomeIcon
    icon={faWater}
    alt="Water"
    title="Water Route"
    className="InfoDisplay-connectionIcon"
  />,
  nether: <FontAwesomeIcon
    icon={faFire}
    alt="Nether"
    title="Nether Route"
    className="InfoDisplay-connectionIcon"
  />,
  unknown: <FontAwesomeIcon
    icon={faQuestion}
    alt="Unknown"
    title="Unknown Route"
    className="InfoDisplay-connectionIcon"
  />,
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
      const connectionDetails = ` (${connection.distance.toFixed(0)} m) `;
      const connectionSymbols = [];


      for (const connectionType of connectionTypes) {
        const symbolType = Object.keys(CONNECTION_SYMBOLS).includes(connectionType)
          ? connectionType
          : 'unknown';
        
        connectionSymbols.push(cloneElement(CONNECTION_SYMBOLS[symbolType], {
          key: `${currentPlaceId}-${otherPlaceId}_${connectionType}`
        }));
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
          {connectionSymbols}
        </li>
      );
    }
  }

  return connectionList;
}

export const parseType = (type, rating, baseStructureType) => {
  if (rating === -1) {
    return (
      <>
        {type === 'Village'
          ? <FontAwesomeIcon key="abandonedVillage" icon={faBuildingCircleXmark} className="InfoDisplay-typeIcon" title="Abandoned Village"/>
          : <FontAwesomeIcon key="abandonedBase" icon={faHouseCircleXmark} className="InfoDisplay-typeIcon" title="Abandoned Base"/>
        }
        {`Abandoned ${type}`}
      </>
    );
  } else if (rating === 0) {
    return (
      <>
        {type === 'Village'
          ? <FontAwesomeIcon key="unsettledVillage" icon={faBuildingCircleExclamation} className="InfoDisplay-typeIcon" title="Unsettled Village"/>
          : <FontAwesomeIcon key="unsettledBase" icon={faHouseCircleExclamation} className="InfoDisplay-typeIcon" title="Unsettled Base"/>
        }
        {`Unsettled ${type}`}
      </>
    );
  } else {
    return (
      <>
        {type === 'Village'
          ? <FontAwesomeIcon key="settledVillage" icon={faBuilding} className="InfoDisplay-typeIcon" title="Settled Village"/>
          : <FontAwesomeIcon key="settledBase" icon={faHouse} className="InfoDisplay-typeIcon" title="Settled Base"/>
        }
        {`${type}: ${baseStructureType}`}
      </>
    );
  }
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
        ratingStars.push(<FontAwesomeIcon key={i} icon={faStar}/>);
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

export const parseNetherPortalDetails = (details) => {
  const {
    netherLocation,
    overworldPortalType,
    netherPortalType,
  } = details;

  if (netherLocation[0] === 'None') {
    return <td>None</td>;
  }

  const netherLocationsString = [];
  for (const location of netherLocation) {
    netherLocationsString.push(
      <li key={location} className="InfoDisplay-netherLocationItem">{location}</li>
    );
  }

  return <td>
    <ul>
      <li className="InfoDisplay-netherLocations">
        <span className="InfoDisplay-netherPortalHeading">Location{(netherLocation.length > 1 ? 's' : '')}: {netherLocation.length === 0 ? 'None' : ''}</span>
        <ul>
          {netherLocationsString}
        </ul>
      </li>
      <li><span className="InfoDisplay-netherPortalHeading">Overworld:</span> {capitalizeWord(overworldPortalType)}</li>
      <li><span className="InfoDisplay-netherPortalHeading">Nether:</span> {capitalizeWord(netherPortalType)}</li>
    </ul>
  </td>;
}

export const parseMineralSources = (mineralSources) => {
  const mineralSourcesList = [];

  if (mineralSources.length === 0) {
    mineralSourcesList.push(<li key="none">None</li>);
    return mineralSourcesList;
  }

  for (const mineralSource of mineralSources) {
    mineralSourcesList.push(
      <li key={mineralSource}>{mineralSource}</li>
    );
  }
  return mineralSourcesList;
}

const capitalizeWord = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}