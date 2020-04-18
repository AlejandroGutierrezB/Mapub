import React from 'react';
import Map from './components/map';
import Navbar from './components/navbar';
// import ReactMapGL, { Marker, GeolocateControl } from 'react-map-gl';
// import Geocoder from "react-map-gl-geocoder";
// import barList from './data/bares_small.json';
// import Card from './components/card';
// import NewBarForm from './components/new-bar-form';


function App () {
  return (
    <div className="App">
      <Navbar />
      <Map />
    </div>
  );
}

export default App;