import './Map.css';
import mapImage from '../img/map.png';
import settings from '../data/settings.json';
import { findCoordinates } from '../data/dataUtils';
import { useRef, useState } from 'react';
import { calculateCoords } from './Map_Utils';

const MapMarker = (props) => {
  const { mapDimensions, coords, type } = props;
  const { map: mapSettings} = settings;
  const cssStyle = calculateCoords(mapDimensions, coords, mapSettings);

  return (
    <circle
      className={type}
      style={cssStyle}
    />
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
      let type = 'Map-marker_unselected';

      if (place.name === selectedPlace) type = 'Map-marker_selected';
      else if (place.name === hoveredPlace) type = 'Map-marker_hovered';

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
      <svg className="Map-svgContainer" width="100%" height="100%">
        {mapMarkers}
      </svg>
    </div>
  )
}

export default Map;