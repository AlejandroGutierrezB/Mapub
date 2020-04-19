import React, { useState, useRef } from 'react';
import ReactMapGL, { Marker, GeolocateControl, NavigationControl } from 'react-map-gl';
import Geocoder from "react-map-gl-geocoder";
import barList from '../data/bares_small.json';
import Card from '../components/card';
import NewBarForm from '../components/new-bar-form';


const geolocateStyle = {
  position: 'absolute',
  right: 0,
  bottom: 132,
  margin: 15,
};

function Map () {

  const mapRef = useRef();

  const [addBar, setAddBar] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [togglePopup, setTogglePopup] = useState({});
  const [selectedBar, setSelectedBar] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '98vh',
    latitude: 41.3940,
    longitude: 2.1991,
    zoom: 14
  });

  const addNewBarMarker = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddBar({
      latitude,
      longitude,
    });
    setSelectedBar(null);
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleOnResult = result => {
    const longitude = result.result.geometry.coordinates[0];
    const latitude = result.result.geometry.coordinates[1];
    setAddBar({
      latitude,
      longitude,
    });
  };

  return (
    <div className="Map">
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        // mapStyle="mapbox://styles/aleguti94/ck92mrrba2b8y1iocq2mi2rzi"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={setViewport}
        onDblClick={addNewBarMarker}
      >
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          showUserLocation={true}
        />
        <div style={{ position: 'absolute', right: 0, bottom: 40, margin: 15 }} >
          <NavigationControl />
        </div>
        <Geocoder
          mapRef={mapRef}
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onViewportChange={setViewport}
          position="top-right"
          zoom={10}
          clearOnBlur={true}
          proximity={{ latitude: `${viewport.latitude}`, longitude: `${viewport.longitude}` }}
          trackProximity={true}
          onResult={(result) => handleOnResult(result)}
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
                  onClick={() => {
                    setTogglePopup({
                      [bar.NOMBRE_BAR]: true,
                    });
                    setSelectedBar(bar.NOMBRE_BAR);
                    setAddBar(null);
                  }}
                >
                  <img src="https://img.icons8.com/ios-filled/50/000000/marker-b.png"
                    alt={`${bar.NOMBRE_BAR}`} />
                </div>
              </Marker>
              {
                togglePopup[bar.NOMBRE_BAR] && selectedBar ? (
                  <Card
                    bar={bar}
                    setTogglePopup={setTogglePopup}
                    setSelectedBar={setSelectedBar}
                  />
                )
                  : null
              }
            </React.Fragment>
          );
        })}
        {
          addBar && !selectedBar ? (
            <>
              <Marker
                latitude={addBar.latitude}
                longitude={addBar.longitude}
                offsetLeft={-12}
                offsetTop={-24}
              >
                <div
                  className="new-marker-btn"
                  onClick={() => handleShowForm()}
                >
                  <img src="../public/color-pin.png"
                    alt="new bar" />
                </div>
              </Marker>
              {
                showForm ? (
                  <NewBarForm
                    addBar={addBar}
                    setAddBar={setAddBar}
                    setSelectedBar={setSelectedBar}
                    handleShowForm={handleShowForm}
                  />
                )
                  : null
              }
            </>
          )
            : null
        }
      </ReactMapGL>
    </div>
  );
}

export default Map;