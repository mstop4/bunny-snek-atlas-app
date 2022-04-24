import './Directory.css';

const RegionSection = (props) => {
  const { region, handlePlaceClick, handlePlaceHover } = props;
  const placesList = [];

  for (const place of region.places) {
    placesList.push(
      <li key={place.name}>
        <span 
          className="Directory-placeLink"
          onClick={() => handlePlaceClick(place.name)}
          onMouseEnter={() => handlePlaceHover(place.name)}
          onMouseLeave={() => handlePlaceHover(null)}
        >
          {place.name}
        </span>
      </li>
    );
  }

  return (
    <div className="Directory-regionSection">
      <h2>{region.regionName}</h2>
      <ul>
        {placesList}
      </ul>
    </div>
  )
}

const Directory = (props) => {
  const { placesData, setSelectedPlace, setHoveredPlace } = props;
  const placesSections = [];

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
  };

  const handlePlaceHover = (place) => {
    setHoveredPlace(place);
  }

  for (const region of placesData) {
    placesSections.push(
    <RegionSection
      key={region.regionName}
      region={region}
      handlePlaceClick={handlePlaceClick}
      handlePlaceHover={handlePlaceHover}
    />);
  }

  return (
    <div className="Directory-container">
      {placesSections}
    </div>
  )
}

export default Directory;