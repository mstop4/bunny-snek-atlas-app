import './App.css';
import Directory from './Directory';
import Header from './Header';
import InfoDisplay from './InfoDisplay';
import placesJson from '../data/placesOfInterest.json';
import { flattenPlaceData } from '../data/dataUtils';
import { useState } from 'react';

const flattenedPlacesData = flattenPlaceData(placesJson);

const App = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [hoveredPlace, setHoveredPlace] = useState(null);

  return (
    <section className="App">
      <Header/>
      <Directory
        data={placesJson}
        setSelectedPlace={setSelectedPlace}
        setHoveredPlace={setHoveredPlace}
      />
      <InfoDisplay
        data={flattenedPlacesData}
        selectedPlace={selectedPlace}
        hoveredPlace={hoveredPlace}
      />
    </section>
  );
}

export default App;
