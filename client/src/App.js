import React, { useState } from 'react';
// import Map from './components/map';
import ReactMapGL, { Marker } from 'react-map-gl';
import barList from './data/bares_small.json';


function App () {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 41.3940,
    longitude: 2.1991,
    zoom: 10
  });

  return (
    <div className="App">
      {/* <Map /> */}
      <ReactMapGL
        {...viewport}
        // mapStyle="mapbox://styles/aleguti94/ck92mrrba2b8y1iocq2mi2rzi"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {/* <Marker
          latitude={41.393197}
          longitude={2.202265}
        >
          <button className="marker-btn">
            <img src="https://img.icons8.com/ios-filled/50/000000/marker-b.png"
              width="60px"
              height="60px"
              alt="Whatever" />
          </button>
        </Marker> */}
        {barList.map(bar => {
          console.log('bar: ', bar);
          return (
            <Marker
              key={bar.NOMBRE_BAR}
              latitude={bar.LATITUD}
              longitude={bar.LONGITUD}
              offsetLeft={-12}
              offsetTop={-24}
            >
              <button className="marker-btn">
                <img src="https://img.icons8.com/ios-filled/50/000000/marker-b.png"
                  alt={`${bar.NOMBRE_BAR}`} />
              </button>
            </Marker>
          );
        })}
      </ReactMapGL>
    </div>
  );
}

export default App;