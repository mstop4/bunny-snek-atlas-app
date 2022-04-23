import './App.css';
import Directory from './Directory';
import Header from './Header';
import InfoDisplay from './InfoDisplay';
import Map from './Map';

const App = () => {
  return (
    <section className="App">
      <Header/>
      <Directory/>
      <Map/>
      <InfoDisplay/>
    </section>
  );
}

export default App;
