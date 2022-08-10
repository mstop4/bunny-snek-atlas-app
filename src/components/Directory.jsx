import { faBuilding, faHouse, faPlaceOfWorship, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Directory.css';

const RegionSection = (props) => {
  const { region, handlePlaceClick, handlePlaceHover } = props;
  const placesList = [];

  for (const place of region.places) {
    const { rating, type } = place;
    let iconType;
    let title;
    let classes = 'Directory-typeIcon';

    if (type.includes('Village')) {
      iconType = faBuilding;
      title = 'Village';
    } else if (type.includes('Ocean Monument')) {
      iconType = faPlaceOfWorship;
      title = 'Ocean Monument';
    } else if (type.includes('Base')) {
      iconType = faHouse;
      title = 'Base';
    } else {
      iconType = faCircleQuestion;
      title = 'Unknown';
    }

    if (rating === -1) {
      title = `Abandoned ${title}`;
      classes += ' Directory-type_abandoned';
    } else if (rating === 0) {
      title = `Unsettled ${title}`;
      classes += ' Directory-type_unsettled';
    } else {
      title = `Settled ${title}`;
      classes += ' Directory-type_settled';
    }
    
    const icon = <FontAwesomeIcon icon={iconType} className={classes} title={title}/>

    placesList.push(
      <li key={place.name}>
        <span 
          className="Directory-placeLink"
          onClick={() => handlePlaceClick(place.name)}
          onMouseEnter={() => handlePlaceHover({
            name: place.name,
            type: 'base',
          })}
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
      <h2
        onMouseEnter={() => handlePlaceHover({
          name: region.regionName,
          type: 'region',
        })}
        onMouseLeave={() => handlePlaceHover(null)}
      >
        {region.regionName}
      </h2>
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