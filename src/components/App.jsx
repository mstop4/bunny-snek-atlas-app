import './App.css';
import Directory from './Directory';
import Header from './Header';
import InfoDisplay from './InfoDisplay';
import Map from './Map';
import placesJson from '../data/placesOfInterest.json';
import { flattenPlaceData } from '../data/dataUtils';
import { useState } from 'react';

const flattenedPlacesData = flattenPlaceData(placesJson);

const App = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <section className="App">
      <Header/>
      <Directory
        data={placesJson}
        setSelectedPlace={setSelectedPlace}
      />
      <Map/>
      <InfoDisplay
        data={flattenedPlacesData}
        selectedPlace={selectedPlace}
      />
    </section>
  );
}

export default App;
