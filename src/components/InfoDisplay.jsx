import './InfoDisplay.css';
import Map from './Map';
import { findConnections, parseBiomes, parseDescription, parseLocation, parseRating } from './InfoDisplay_Utils';

const InfoDisplay = (props) => {
  const {
    placesData,
    connectionsData,
    selectedPlace,
    hoveredPlace,
    setSelectedPlace,
    setHoveredPlace,
  } = props;

  const onPlaceSelected = (place) => {
    setSelectedPlace(place);
  }

  const onPlacehovered = (place) => {
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
    raidCount,
    rating,
    type
  } = currentPlace;

  const biomeList = parseBiomes(biomes);
  const descriptionList = parseDescription(description);
  const locationString = parseLocation(location);
  const ratingStars = parseRating(rating);
  const connectionList = findConnections(connectionsData, placesData, selectedPlace, onPlaceSelected, onPlacehovered);

  return (
    <div className="InfoDisplay-container">
      <header>
        <h1 className="InfoDisplay-title">{name}</h1>
      </header>
      <main>
        <section className="InfoDisplay-summary">
          <table className="InfoDisplay-infobox">
            <tbody>
              <tr>
                <th>Type</th>
                <td>{type}</td>
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
                <th>Connections</th>
                <td>
                  <ul>
                    {connectionList}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          <Map
            selectedPlace={selectedPlace}
            hoveredPlace={hoveredPlace}
            placeData={placesData}
          />
        </section>
        <section className="InfoDisplay-description">
          {descriptionList}
        </section>
      </main>
    </div>
  )
}

export default InfoDisplay;