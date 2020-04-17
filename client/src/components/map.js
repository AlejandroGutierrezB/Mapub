import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import barList from '../data/bares_small.json';


// function Map () {
//   const [viewport, setViewport] = useState({
//     width: '100vw',
//     height: '100vh',
//     latitude: 41.3940,
//     longitude: 2.1991,
//     zoom: 15
//   });

//   return (
//     <div className="Map">
//       <ReactMapGL {...viewport}
//         // mapStyle="mapbox://styles/aleguti94/ck92mrrba2b8y1iocq2mi2rzi"
//         mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
//         onViewportChange={viewport => {
//           setViewport(viewport);
//         }}
//       >
//         {barList.map(bar => {
//           {/* console.log('bar: ', bar); */ }
//           return (
//             <React.Fragment key={bar.NOMBRE_BAR}>
//               <Marker
//                 key={bar.NOMBRE_BAR}
//                 longitude={bar.LATITUD}
//                 latitude={bar.LONGITUD}
//                 anchor="bottom"
//               >
//                 <div className="marker">
//                   <img src="https://img.icons8.com/ios-filled/50/000000/marker-b.png"
//                     width="60px"
//                     height="60px"
//                     alt={`${bar.NOMBRE_BAR}`} />
//                 </div>
//               </Marker>
//             </React.Fragment>
//           );
//         }
//         )
//         }
//       </ReactMapGL>
//     </div>
//   );
// }

export default Map;