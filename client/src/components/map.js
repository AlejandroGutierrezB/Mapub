import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, { Marker, GeolocateControl, NavigationControl } from 'react-map-gl';
import Geocoder from "react-map-gl-geocoder";
import Card from '../components/card';
import NewBarForm from '../components/new-bar-form';
import EditBarForm from '../components/edit-bar-form';
import { useForm } from "react-hook-form";

import { getAllBars, getFilteredBars } from '../API.js';


const geolocateStyle = {
  position: 'absolute',
  right: 0,
  bottom: 135,
  margin: 10,
};

function Map () {

  const mapRef = useRef();

  const [barList, setBarList] = useState([]);
  const [filtered, setFiltered] = useState(null);
  const [addBar, setAddBar] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [dragPanState, setDragPanState] = useState(true);
  const [togglePopup, setTogglePopup] = useState({});
  const [selectedBar, setSelectedBar] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '98vh',
    latitude: 41.3940,
    longitude: 2.1991,
    zoom: 14,
    pitch: 40, // pitch in degrees
    bearing: 5, // bearing in degrees
  });

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = data => {
    const filteredCriteria = data.filter;
    setFiltered(filteredCriteria);
  };

  const getBarPins = async () => {
    if (!filtered) {
      const barList = await getAllBars();
      setBarList(barList);
    } else {
      const barList = await getFilteredBars(filtered);
      barList.length && setBarList(barList);
    }
  };

  useEffect(() => {
    getBarPins();
  }, [filtered]);

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
        //mapStyle="mapbox://styles/url" for a custom style
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={setViewport}
        onDblClick={addNewBarMarker}
        dragPan={dragPanState}
        doubleClickZoom={false}
      >
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          showUserLocation={true}
        />
        <div style={{ position: 'absolute', right: 10, top: 80 }} >
          <form className="form" onSubmit={handleSubmit(onSubmit)} autocomplete="off">
            <input className="input" name="filter"
              defaultValue=""
              ref={register}
              placeholder="  Filter by your favourite Beer"
            />
            <button
              className="reset"
              onClick={() => {
                setFiltered(null);
                reset();
              }} >
              Clear
            </button>
            <button type="submit" className="filter_submit">Filter</button>
          </form>
        </div>
        <div style={{ position: 'absolute', right: 0, bottom: 45, margin: 10 }} >
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
                  <span className="material-icons main">room</span>
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
                      setDragPanState(!dragPanState);
                      getBarPins();
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