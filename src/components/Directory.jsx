import './Directory.css';
import placesJson from '../data/placesOfInterest.json';

const RegionSection = (props) => {
  const { region } = props;
  const placesList = [];

  for (const place of region.places) {
    placesList.push(
      <li key={place.name}>
        <a className="Directory-placeLink" href="">{place.name}</a>
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

const Directory = () => {
  const placesSections = [];

  for (const region of placesJson) {
    placesSections.push(
    <RegionSection
      key={region.regionName}
      region={region}
    />);
  }

  return (
    <div className="Directory-container">
      {placesSections}
    </div>
  )
}

export default Directory;