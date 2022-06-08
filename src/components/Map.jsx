import './Map.css';
import mapImage from '../img/map.png';
import settings from '../data/settings.json';
import { findCoordinates } from '../data/dataUtils';
import { useRef, useState } from 'react';
import { calculateCoords, calculateConnectionCoords } from './Map_Utils';

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

const MapConnection = (props) => {
  const { mapDimensions, coordsPair } = props;
  const { map: mapSettings} = settings;
  const details = calculateConnectionCoords(mapDimensions, coordsPair, mapSettings);

  return (
    <line
      className="Map-netherConnection"
      x1={details.x1}
      y1={details.y1}
      x2={details.x2}
      y2={details.y2}
    />
  );
}

const Map = (props) => {
  const {
    placeData,
    selectedPlace,
    hoveredPlace,
    connectionsByCoordsPairs,
    showNetherConnections,
  } = props;
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

  const createMapConnections = () => {
    const connections = [];
    let keyId = 0;
    for (const coordsPair of connectionsByCoordsPairs) {
      connections.push(<MapConnection
        key={keyId}
        mapDimensions={mapDimensions}
        coordsPair={coordsPair}
      />);
      keyId++;
    }

    return connections;
  }

  const mapMarkers = createMapMarkers();
  const netherConnections = createMapConnections();

  return (
    <div className="Map-container">
      <img
        src={mapImage}
        alt="Map of Bunny Snek"
        ref={mapElem}
        onLoad={onMapImgLoad}
      />
      <svg className="Map-svgContainer" width="100%" height="100%">
        {showNetherConnections && netherConnections}
        {mapMarkers}
      </svg>
    </div>
  )
}

export default Map;