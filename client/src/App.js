import React, { useState, useRef } from 'react';
// import Map from './components/map';
import ReactMapGL, { Marker, GeolocateControl } from 'react-map-gl';
import Geocoder from "react-map-gl-geocoder";
import barList from './data/bares_small.json';
import Card from './components/card';
import NewBarForm from './components/new-bar-form';



const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: 10,
};

// Geocoder

function App () {

  const [addBar, setAddBar] = useState(null);

  const [togglePopup, setTogglePopup] = useState({});
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 41.3940,
    longitude: 2.1991,
    zoom: 10
  });

  const addNewBarMarker = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddBar({
      latitude,
      longitude,
    });
  };

  //needed to pass the mapref from initiail map to geocoder
  const mapRef = useRef();
  //geocoder add a marker
  const handleOnResult = result => {
    console.log(result);
    console.log(result.result.geometry.coordinates);
    // const [longitude] = result.geometry.coordinates[0];
    // const [latitude] = result.geometry.coordinates[1];
    // setAddBar({
    //   latitude,
    //   longitude,
    // });
  };
  console.log('geolocateStyle: ', geolocateStyle);

  return (
    <div className="App">
      {/* <Map /> */}
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        // mapStyle="mapbox://styles/aleguti94/ck92mrrba2b8y1iocq2mi2rzi"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={setViewport}
        onDblClick={addNewBarMarker}
      >
        <Geocoder
          mapRef={mapRef}
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onViewportChange={setViewport}
          position="top-right"
          collapsed={true}
          clearOnBlur={true}
          proximity={{ latitude: `${viewport.latitude}`, longitude: `${viewport.longitude}` }}
          trackProximity={true}
          onResult={handleOnResult}
        />
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          // trackUserLocation={true}
          style={geolocateStyle}
        />
        {barList.map(bar => {
          return (
            <React.Fragment key={bar.NOMBRE_BAR}>
              <Marker
                // key={bar.NOMBRE_BAR}
                latitude={bar.LATITUD}
                longitude={bar.LONGITUD}
                offsetLeft={-12}
                offsetTop={-24}
              >
                <div
                  className="marker-btn"
                  onClick={() => setTogglePopup({
                    [bar.NOMBRE_BAR]: true,
                  })}
                >
                  <img src="https://img.icons8.com/ios-filled/50/000000/marker-b.png"
                    alt={`${bar.NOMBRE_BAR}`} />
                </div>
              </Marker>
              {
                togglePopup[bar.NOMBRE_BAR] ? (
                  <Card
                    bar={bar}
                    setTogglePopup={setTogglePopup}
                  />
                ) : null
              }
            </React.Fragment>
          );
        })}
        {
          addBar ? (
            <>
              <Marker
                latitude={addBar.latitude}
                longitude={addBar.longitude}
                offsetLeft={-12}
                offsetTop={-24}
              >
                <div
                  className="new-marker-btn"
                >
                  <img src="https://lh3.googleusercontent.com/proxy/eHK573GOSOYoQpWrsbSXoxytrfVP0aQ35vTTYofQFFWSeU-sq1wuzRcJy1aThC-AZVLkrCTQTIZpxgaS2-UzW_i58hN-NUAtf4qqze6CZAIr_nwUFAMSXKt67CglyRLcACEAMEBL4jg58s2lWDowWZY5fNKy"
                    alt="new bar" />
                </div>
              </Marker>
              <NewBarForm
                setAddBar={setAddBar}
              />
            </>
          ) : null
        }
      </ReactMapGL>
    </div>
  );
}

export default App;