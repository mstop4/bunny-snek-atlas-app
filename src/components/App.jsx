import './App.css';
import Directory from './Directory';
import Header from './Header';
import InfoDisplay from './InfoDisplay';
import placesJson from '../data/placesOfInterest.json';
import connections from '../data/connections.json';
import { calculateConnectionDistances, flattenPlaceData } from '../data/dataUtils';
import { useState } from 'react';

const flattenedPlacesData = flattenPlaceData(placesJson);
const processedConnections = calculateConnectionDistances(connections, flattenedPlacesData);

const App = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [hoveredPlace, setHoveredPlace] = useState(null);

  return (
    <section className="App">
      <Header/>
      <Directory
        placesData={placesJson}
        setSelectedPlace={setSelectedPlace}
        setHoveredPlace={setHoveredPlace}
      />
      <InfoDisplay
        placesData={flattenedPlacesData}
        connectionsData={processedConnections}
        selectedPlace={selectedPlace}
        hoveredPlace={hoveredPlace}
      />
    </section>
  );
}

export default App;
