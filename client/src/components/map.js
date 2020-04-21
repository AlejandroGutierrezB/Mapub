import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, { Marker, GeolocateControl, NavigationControl } from 'react-map-gl';
import Geocoder from "react-map-gl-geocoder";
import Card from '../components/card';
import NewBarForm from '../components/new-bar-form';
import EditBarForm from '../components/edit-bar-form';

import { getAllBars } from '../API.js';


const geolocateStyle = {
  position: 'absolute',
  right: 0,
  bottom: 132,
  margin: 15,
};

function Map () {

  const mapRef = useRef();

  const [barList, setBarList] = useState([]);
  const [addBar, setAddBar] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [dragPanState, setDragPanState] = useState(true);
  const [togglePopup, setTogglePopup] = useState({});
  const [selectedBar, setSelectedBar] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '98vh',
    latitude: 41.3940,
    longitude: 2.1991,
    zoom: 13,
  });

  const getBarPins = async () => {
    const barList = await getAllBars();
    setBarList(barList);
  };

  useEffect(() => {
    getBarPins();
  }, []);

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
        dragPan={dragPanState}
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
          clearOnBlur={true}
          proximity={{ latitude: `${viewport.latitude}`, longitude: `${viewport.longitude}` }}
          trackProximity={true}
          onResult={(result) => handleOnResult(result)}
        />
        {barList.map(bar => {
          return (
            <React.Fragment key={bar.barName}>
              <Marker
                // key={bar.barName}
                latitude={bar.latitude}
                longitude={bar.longitude}
                offsetLeft={-12}
                offsetTop={-24}
              >
                <div
                  className="marker-btn"
                  onClick={() => {
                    setTogglePopup({
                      [bar.barName]: true,
                    });
                    setSelectedBar(bar.barName);
                    setAddBar(null);
                  }}
                >
                  <span className="material-icons main">add_location</span>
                </div>
              </Marker>
              {
                togglePopup[bar.barName] && selectedBar ? (
                  <Card
                    bar={bar}
                    setTogglePopup={setTogglePopup}
                    setSelectedBar={setSelectedBar}
                    setEditForm={setEditForm}
                    editForm={editForm}
                    dragPanState={dragPanState}
                    setDragPanState={setDragPanState}
                  />
                )
                  : null
              }
              {
                editForm && togglePopup[bar.barName] ? (
                  <EditBarForm
                    bar={bar}
                    setTogglePopup={setTogglePopup}
                    setSelectedBar={setSelectedBar}
                    setEditForm={setEditForm}
                    editForm={editForm}
                    dragPanState={dragPanState}
                    setDragPanState={setDragPanState}
                    onClose={() => {
                      setTogglePopup({});
                      setSelectedBar(null);
                      setEditForm(!editForm);
                      getBarPins();
                      setDragPanState(!dragPanState);
                    }
                    }
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
                  <span className="material-icons add">add_location</span>
                </div>
              </Marker>
              {
                showForm ? (
                  <NewBarForm
                    addBar={addBar}
                    setAddBar={setAddBar}
                    setSelectedBar={setSelectedBar}
                    handleShowForm={handleShowForm}
                    onClose={() => {
                      handleShowForm();
                      getBarPins();
                    }
                    }
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