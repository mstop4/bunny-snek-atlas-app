import { faBuilding, faBuildingCircleExclamation, faBuildingCircleXmark, faHouse, faHouseCircleExclamation, faHouseCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Directory.css';

const RegionSection = (props) => {
  const { region, handlePlaceClick, handlePlaceHover } = props;
  const placesList = [];

  for (const place of region.places) {
    const { rating, type } = place;
    let icon;

    if (rating === -1) {
      icon = type === 'Village'
        ? <FontAwesomeIcon icon={faBuildingCircleXmark} className="Directory-typeIcon" title="Abandoned Village"/>
        : <FontAwesomeIcon icon={faHouseCircleXmark} className="Directory-typeIcon" title="Abandoned Base"/>
    } else if (rating === 0) {
      icon = type === 'Village'
        ? <FontAwesomeIcon icon={faBuildingCircleExclamation} className="Directory-typeIcon" title="Unsettled Village"/>
        : <FontAwesomeIcon icon={faHouseCircleExclamation} className="Directory-typeIcon" title="Unsettled Base"/>
    } else {
      icon = type === 'Village'
        ? <FontAwesomeIcon icon={faBuilding} className="Directory-typeIcon" title="Settled Village"/>
        : <FontAwesomeIcon icon={faHouse} className="Directory-typeIcon" title="Settled Base"/>
    }

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
        {icon}
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