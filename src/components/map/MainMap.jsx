import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { DummyMapData } from "../../../data";
import JustMap from "./JustMap";

const containerStyle = {
  width: "100%",
  height: "500px",
};

// Dummy mechanics
const AvailableMechanics = [
  { id: 1, name: "Mechanic - Yaba", coordinates: [6.517, 3.3755] },
  { id: 2, name: "Mechanic - Ikeja", coordinates: [6.6018, 3.348] },
  { id: 3, name: "Mechanic - Lekki", coordinates: [6.441, 3.4835] },
];

export default function MainMap() {
  const MAP_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { user } = useAuth();
  const location = useLocation  ();
  const mapRef = useRef(null);

  const [job, setJob] = useState(location.state?.job || DummyMapData);

  const hasJob = Boolean(location.state?.job);

  useEffect(() => {
    setJob(location.state?.job || DummyMapData);
  }, [location.state]);




  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAP_KEY,
  });
  
  // 📍 Coordinates
  const jobCoords = job?.location?.coordinates || [3.3792, 6.5244];
  const userCoords = user?.location?.coordinates || [3.3869, 6.5167];

  const JobLocation = { lat: jobCoords[1], lng: jobCoords[0] };
  const MyLocation = { lat: userCoords[1], lng: userCoords[0] };

  // 🎯 REAL MAP PIN ICONS (created only after map loads)
  const icons = useMemo(() => {
    if (!isLoaded || !window.google) return {};

    return {
      customer: {
        url:
          "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path fill="#22C55E" d="M192 0C86 0 0 86 0 192c0 77.4 27 99.5 172.3 309.7a24 24 0 0039.4 0C357 291.5 384 269.4 384 192 384 86 298 0 192 0z"/>
            <circle cx="192" cy="192" r="72" fill="white"/>
          </svg>`),
        scaledSize: new window.google.maps.Size(40, 40),
        anchor: new window.google.maps.Point(20, 40),
      },

      mechanic: {
        url:
          "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path fill="#2563EB" d="M192 0C86 0 0 86 0 192c0 77.4 27 99.5 172.3 309.7a24 24 0 0039.4 0C357 291.5 384 269.4 384 192 384 86 298 0 192 0z"/>
            <circle cx="192" cy="192" r="72" fill="white"/>
            <path d="M232 256l-40-40-40 40" fill="#2563EB"/>
          </svg>`),
        scaledSize: new window.google.maps.Size(40, 40),
        anchor: new window.google.maps.Point(20, 40),
      },
    };
  }, [isLoaded]);

  // 🛣️ Route
  const onLoad = useCallback(
    (map) => {
      mapRef.current = map;

      if (!hasJob) return;

      const service = new window.google.maps.DirectionsService();
      service.route(
        {
          origin: MyLocation,
          destination: JobLocation,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK" && result) {
            setDirections(result);

            const bounds = new window.google.maps.LatLngBounds();
            result.routes[0].overview_path.forEach((p) => bounds.extend(p));
            map.fitBounds(bounds);
          }
        }
      );
    },
    [hasJob, JobLocation, MyLocation]
  );




  const [directions, setDirections] = useState(null);

  if (!isLoaded) return <p>Loading map…</p>;
  console.log("Rendering MechanicMap, hasJob:", hasJob);
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={onLoad}
      options={{ streetViewControl: false, fullscreenControl: false }}
    >
      {hasJob === true ? (
        <>
          {/* Customer */}
          <Marker
            position={JobLocation}
            icon={icons.customer}
            title="Customer Location"
            label={{
              text: "Customer",
              color: "#16A34A",
              fontWeight: "bold",
            }}
          />

          {/* Mechanic */}
          <Marker
            position={MyLocation}
            icon={icons.mechanic}
            title="You (Mechanic)"
            label={{
              text: "Mechanic",
              color: "#2563EB",
              fontWeight: "bold",
            }}
          />

          {/* Route */}
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: "#1E90FF",
                  strokeOpacity: 0.8,
                  strokeWeight: 6,
                },
              }}
            />
          )}
        </>
      ) : (
        <>
        <JustMap />
        </>
      )}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
}



// import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import {
//   GoogleMap,
//   Marker,
//   DirectionsRenderer,
//   useLoadScript,
// } from "@react-google-maps/api";
// import { useAuth } from "../../contexts/AuthContext";
// import { useLocation } from "react-router-dom";
// import { DummyMapData } from "../../../data";

// const containerStyle = {
//   width: "100%",
//   height: "500px",
// };

// // Dummy mechanics
// const AvailableMechanics = [
//   { id: 1, name: "Mechanic - Yaba", coordinates: [3.3755, 6.517] },
//   { id: 2, name: "Mechanic - Ikeja", coordinates: [3.348, 6.6018] },
//   { id: 3, name: "Mechanic - Lekki", coordinates: [3.4835, 6.441] },
// ];

// export default function UberLikeMap() {
//   const MAP_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: MAP_KEY,
//   });

//   const { user } = useAuth();
//   const location = useLocation();
//   const mapRef = useRef(null);

//   const [job, setJob] = useState(location.state?.job || DummyMapData);
//   const [directions, setDirections] = useState(null);

//   const hasJob = !!location.state?.job;

//   // 🔄 Sync job when navigating
//   useEffect(() => {
//     setJob(location.state?.job || DummyMapData);
//   }, [location.state]);

//   // 📍 Coordinates
//   const jobCoords = job?.location?.coordinates || [3.3792, 6.5244];
//   const userCoords = user?.location?.coordinates || [3.3869, 6.5167];

//   const JobLocation = { lat: jobCoords[1], lng: jobCoords[0] };
//   const MyLocation = { lat: userCoords[1], lng: userCoords[0] };

//   // 🎯 REAL MAP PIN ICONS (created only after map loads)
//   const icons = useMemo(() => {
//     if (!isLoaded || !window.google) return {};

//     return {
//       customer: {
//         url:
//           "data:image/svg+xml;charset=UTF-8," +
//           encodeURIComponent(`
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
//             <path fill="#22C55E" d="M192 0C86 0 0 86 0 192c0 77.4 27 99.5 172.3 309.7a24 24 0 0039.4 0C357 291.5 384 269.4 384 192 384 86 298 0 192 0z"/>
//             <circle cx="192" cy="192" r="72" fill="white"/>
//           </svg>`),
//         scaledSize: new window.google.maps.Size(40, 40),
//         anchor: new window.google.maps.Point(20, 40),
//       },

//       mechanic: {
//         url:
//           "data:image/svg+xml;charset=UTF-8," +
//           encodeURIComponent(`
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
//             <path fill="#2563EB" d="M192 0C86 0 0 86 0 192c0 77.4 27 99.5 172.3 309.7a24 24 0 0039.4 0C357 291.5 384 269.4 384 192 384 86 298 0 192 0z"/>
//             <circle cx="192" cy="192" r="72" fill="white"/>
//             <path d="M232 256l-40-40-40 40" fill="#2563EB"/>
//           </svg>`),
//         scaledSize: new window.google.maps.Size(40, 40),
//         anchor: new window.google.maps.Point(20, 40),
//       },
//     };
//   }, [isLoaded]);

//   // 🛣️ Route
//   const onLoad = useCallback(
//     (map) => {
//       mapRef.current = map;

//       if (!hasJob) return;

//       const service = new window.google.maps.DirectionsService();
//       service.route(
//         {
//           origin: MyLocation,
//           destination: JobLocation,
//           travelMode: window.google.maps.TravelMode.DRIVING,
//         },
//         (result, status) => {
//           if (status === "OK" && result) {
//             setDirections(result);

//             const bounds = new window.google.maps.LatLngBounds();
//             result.routes[0].overview_path.forEach((p) => bounds.extend(p));
//             map.fitBounds(bounds);
//           }
//         }
//       );
//     },
//     [hasJob, JobLocation, MyLocation]
//   );

//   if (!isLoaded) return <p>Loading map…</p>;

//   return (
//     <div className="relative w-full">
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         onLoad={onLoad}
//         options={{
//           mapTypeId: "roadmap",
//           streetViewControl: false,
//           fullscreenControl: false,
//         }}
//       >
//         {hasJob ? (
//           <>
//             {/* Customer */}
//             <Marker
//               position={JobLocation}
//               icon={icons.customer}
//               title="Customer Location"
//               label={{
//                 text: "Customer",
//                 color: "#16A34A",
//                 fontWeight: "bold",
//               }}
//             />

//             {/* Mechanic */}
//             <Marker
//               position={MyLocation}
//               icon={icons.mechanic}
//               title="You (Mechanic)"
//               label={{
//                 text: "Mechanic",
//                 color: "#2563EB",
//                 fontWeight: "bold",
//               }}
//             />

//             {/* Route */}
//             {directions && (
//               <DirectionsRenderer
//                 directions={directions}
//                 options={{
//                   suppressMarkers: true,
//                   polylineOptions: {
//                     strokeColor: "#1E90FF",
//                     strokeOpacity: 0.8,
//                     strokeWeight: 6,
//                   },
//                 }}
//               />
//             )}
//           </>
//         ) : (
//           <>
//             {AvailableMechanics.map((mec) => (
//               <Marker
//                 key={mec.id}
//                 position={{ lat: mec.coordinates[1], lng: mec.coordinates[0] }}
//                 icon={icons.mechanic}
//                 label={{
//                   text: mec.name,
//                   color: "#1D4ED8",
//                   fontSize: "12px",
//                   fontWeight: "bold",
//                 }}
//               />
//             ))}
//           </>
//         )}
//       </GoogleMap>
//     </div>
//   );
// }