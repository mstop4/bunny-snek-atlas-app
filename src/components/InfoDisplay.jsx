import './InfoDisplay.css';
import Map from './Map';
import {
  findConnections,
  parseBiomes,
  parseDescription,
  parseLocation,
  parseMineralSources,
  parseNetherPortalDetails,
  parseRating,
  parseType
} from './InfoDisplay_Utils';
import { Gallery } from './Gallery';
import { useState } from 'react';

const ConnectionsToggle = (props) => {
  const { showNetherConnections, setShowNetherConnections } = props;

  const handleChange = (value) => {
    setShowNetherConnections(value);
  }

  return (
    <div className="InfoDisplay-toggleConnectionsContainer">
      <label htmlFor="InfoDisplay-connectionsToggle">Show Nether Connections</label>
      <input id="InfoDisplay-connectionsToggle" type="checkbox" checked={showNetherConnections} onChange={() => handleChange(!showNetherConnections)} />
    </div>
  )
}

const InfoDisplay = (props) => {
  const {
    placesData,
    connectionsByDistance,
    connectionsByCoordsPairs,
    selectedPlace,
    hoveredPlace,
    setSelectedPlace,
    setHoveredPlace,
  } = props;
  const [showNetherConnections, setShowNetherConnections] = useState(true);

  const onPlaceSelected = (place) => {
    setSelectedPlace(place);
  }

  const onPlaceHovered = (place) => {
    setHoveredPlace(place);
  }

  const currentPlace = placesData.find(place => place.name === selectedPlace);

  if (!currentPlace) {
    return (
      <div className="InfoDisplay-container">
        <h2>No place selected</h2>
      </div>
    );
  }

  const {
    biomes,
    description,
    location,
    name,
    id,
    raidCount,
    rating,
    type,
    baseStructureType,
    photos,
    netherPortalDetails,
    mineralSources,
    lavaSource,
  } = currentPlace;

  const typeIcon = parseType(type, rating, baseStructureType);
  const biomeList = parseBiomes(biomes);
  const descriptionList = parseDescription(description);
  const locationString = parseLocation(location);
  const ratingStars = parseRating(rating);
  const connectionByDistanceList = findConnections(connectionsByDistance, placesData, selectedPlace, onPlaceSelected, onPlaceHovered);
  const netherPortalList = parseNetherPortalDetails(netherPortalDetails);
  const mineralSourceList = parseMineralSources(mineralSources);

  return (
    <div className="InfoDisplay-outerContainer">
      <header>
        <h1 className="InfoDisplay-title"><span className="InfoDisplay-idNumber">{id}</span> {name}</h1>
      </header>
      <main>
        <section className="InfoDisplay-summary">
          <div className="InfoDisplay-innerContainer">
            <table className="InfoDisplay-infobox">
              <tbody>
                <tr>
                  <th>Type</th>
                  <td>{typeIcon}</td>
                </tr>
                <tr>
                  <th>Biome</th>
                  <td>
                    <ul>
                      {biomeList}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>Rating</th>
                  <td>{ratingStars}</td>
                </tr>
                <tr>
                  <th>Location</th>
                  <td>{locationString}</td>
                </tr>
                <tr>
                  <th>Raids</th>
                  <td>{raidCount === -1 ? "N/A" : raidCount}</td>
                </tr>
                <tr>
                  <th>Mineral Sources</th>
                  <td>
                    <ul>{mineralSourceList}</ul>
                  </td>
                </tr>
                <tr>
                  <th>Lava Source</th>
                  <td>{lavaSource ? "Yes" : "No"}</td>
                </tr>
                <tr>
                  <th>Nether Portal</th>
                  {netherPortalList}
                </tr>
                <tr>
                  <th>Connections</th>
                  <td>
                    <ul>
                      {connectionByDistanceList}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
            <ConnectionsToggle
              showNetherConnections={showNetherConnections}
              setShowNetherConnections={setShowNetherConnections}
            />
          </div>
          <Map
            selectedPlace={selectedPlace}
            hoveredPlace={hoveredPlace}
            placeData={placesData}
            connectionsByCoordsPairs={connectionsByCoordsPairs}
            showNetherConnections={showNetherConnections}
          />
        </section>
        <section className="InfoDisplay-description">
          {descriptionList}
        </section>
        <section>
          <Gallery
            photos={photos}
          />
        </section>
      </main>
    </div>
  )
}

export default InfoDisplay;