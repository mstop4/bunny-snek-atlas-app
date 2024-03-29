import './Map.css';
import settings from '../data/settings.json';
import regionBordersSVG from '../img/regionBorders/regions.svg';
import { findCoordinates } from '../data/dataUtils';
import { useRef, useState } from 'react';
import { calculateCoords, calculateConnectionCoords } from './Map_Utils';
import { useEffect } from 'react';

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
  const [mapReady, setMapReady] = useState(false);
  const [mapDimensions, setMapDimensions] = useState({ x: 0, y: 0 });
  const mapElem = useRef(null);
  const regionBordersElem = useRef(null);
  const { mapBaseUrl } = settings;
 
  const onMapImgLoad = () => {
    const mapElemRect = mapElem.current.getBoundingClientRect();
    setMapDimensions({
      x: mapElemRect.width,
      y: mapElemRect.height
    });
    setMapReady(true);
  };

  const createMapMarkers = () => {
    const markers = []
    for (const place of placeData) {
      const coords = findCoordinates(placeData, place.name);
      let type = 'Map-marker_unselected';

      if (place.name === selectedPlace) type = 'Map-marker_selected';
      else if (hoveredPlace?.type === 'base' && place.name === hoveredPlace?.name) type = 'Map-marker_hovered';

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

  /**
   * Updates region highlights
   */
  const highlightRegion = () => {
    if (!mapReady) return;
    const svgData = regionBordersElem.current.contentDocument;
    const borderPaths = svgData.getElementsByTagName('path');

    // Hide all border paths
    for (const path of borderPaths) {
      path.style.display = 'none';
    }

    if (hoveredPlace?.type === 'region') {
      const id = hoveredPlace.name.split(' ').join('_');
      const path = borderPaths.namedItem(id);
      if (path) path.style.display = 'block';
    }
  }

  // Update region highlights
  useEffect(highlightRegion, [hoveredPlace, mapReady]);

  const mapMarkers = createMapMarkers();
  const netherConnections = createMapConnections();


  return (
    <div
      className="Map-container"
    >
      <img
        src={`${mapBaseUrl}map.png`}
        alt="Map of Bunny Snek"
        ref={mapElem}
        onLoad={onMapImgLoad}
        style={{visibility: mapReady ? 'visible' : 'hidden'}}
      />
      <object
        className="Map-regionBorders"
        data={regionBordersSVG}
        type="image/svg+xml"
        ref={regionBordersElem}
        style={{visibility: mapReady ? 'visible' : 'hidden'}}
      >
        Region Border
      </object>

      <svg
        className="Map-svgContainer"
        width="100%"
        height="100%"
        style={{visibility: mapReady ? 'visible' : 'hidden'}}
      >
        {showNetherConnections && netherConnections}
        {mapMarkers}
      </svg>

      <div
        className="Map-loading"
        style={{visibility: !mapReady ? 'visible' : 'hidden'}}
      >
      </div>
    </div>
  )
}

export default Map;