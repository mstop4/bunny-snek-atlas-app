import './Map.css';
import mapImage from '../img/map.png';
import mapDetails from '../data/mapDetails.json';
import { findCoordinates } from '../data/dataUtils';
import { useRef, useState } from 'react';
import { calculateCoords } from './Map_Utils';

const MapMarker = (props) => {
  const { mapDimensions, coords, type } = props;
  const cssStyle = calculateCoords(mapDimensions, coords, mapDetails);

  return (
    <div
      className={type}
      style={cssStyle}
    >
    </div>
  );
}

const Map = (props) => {
  const { placeData, selectedPlace, hoveredPlace } = props;
  const [mapDimensions, setMapDimensions] = useState({ x: 0, y: 0 });
  const mapElem = useRef(null);

  const onMapImgLoad = () => {
    const mapElemRect = mapElem.current.getBoundingClientRect();
    setMapDimensions({
      x: mapElemRect.width,
      y: mapElemRect.height
    });
  };

  const createMapMarkers = () => {
    const markers = []
    for (const place of placeData) {
      const coords = findCoordinates(placeData, place.name);
      let type = 'Map-markerUnselected';

      if (place.name === selectedPlace) type = 'Map-markerSelected';
      else if (place.name === hoveredPlace) type = 'Map-markerHovered';

      markers.push(<MapMarker
        key={place.name}
        mapDimensions={mapDimensions}
        coords={coords}
        type={type}
      />);
    }

    return markers;
  }

  const mapMarkers = createMapMarkers();

  return (
    <div className="Map-container">
      <img
        src={mapImage}
        alt="Map of Bunny Snek"
        ref={mapElem}
        onLoad={onMapImgLoad}
      />
      {mapMarkers}
    </div>
  )
}

export default Map;