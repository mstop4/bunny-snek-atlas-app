import './Map.css';
import mapImage from '../img/test.png';
import mapDetails from '../data/mapDetails.json';
import { findCoordinates } from '../data/dataUtils';
import { useRef, useState } from 'react';
import { calculateCoords } from './Map_Utils';

const MapMarker = (props) => {
  const { mapDimensions, coords, selected } = props;
  const cssStyle = calculateCoords(mapDimensions, coords, mapDetails);

  return (
    <div
      className={selected ? "Map-markerSelected" : "Map-markerHovered"}
      style={cssStyle}
    >
    </div>
  );
}

const Map = (props) => {
  const { placeData, selectedPlace, hoveredPlace } = props;
  const [mapDimensions, setMapDimensions] = useState({ x: 0, y: 0 });
  const mapElem = useRef(null);

  const selectedCoords = selectedPlace ? findCoordinates(placeData, selectedPlace) : null;
  const hoveredCoords = hoveredPlace ? findCoordinates(placeData, hoveredPlace) : null;

  const onMapImgLoad = () => {
    const mapElemRect = mapElem.current.getBoundingClientRect();
    setMapDimensions({
      x: mapElemRect.width,
      y: mapElemRect.height
    });
  };

  return (
    <div className="Map-container">
      <img
        src={mapImage}
        alt="Map of Bunny Snek"
        ref={mapElem}
        onLoad={onMapImgLoad}
      />
      <MapMarker
        mapDimensions={mapDimensions}
        coords={selectedCoords}
        selected={true}
      />
      {selectedCoords !== hoveredCoords
      ? <MapMarker
        mapDimensions={mapDimensions}
        coords={hoveredCoords}
        selected={false}
      />
      : null}
    </div>
  )
}

export default Map;