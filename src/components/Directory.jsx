import './Directory.css';

const RegionSection = (props) => {
  const { region, handlePlaceClick } = props;
  const placesList = [];

  for (const place of region.places) {
    placesList.push(
      <li key={place.name}>
        <span className="Directory-placeLink" onClick={() => handlePlaceClick(place.name)}>
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
  const { data, setSelectedPlace } = props;
  const placesSections = [];

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
  };

  for (const region of data) {
    placesSections.push(
    <RegionSection
      key={region.regionName}
      region={region}
      handlePlaceClick={handlePlaceClick}
    />);
  }

  return (
    <div className="Directory-container">
      {placesSections}
    </div>
  )
}

export default Directory;