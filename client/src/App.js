import React, { useEffect } from 'react';
import Map from './components/map';
import Navbar from './components/navbar';
import ReactGA from 'react-ga';

function App() {
  useEffect(() => {
    ReactGA.initialize('UA-169415450-1');
    // To Report Page View
    ReactGA.pageview('/');
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Map />
    </div>
  );
}

export default App;
