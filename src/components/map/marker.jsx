// import React, { useEffect } from "react";
// import GoogleMapReact from "google-map-react";
// import { useLocalStorage } from "../../helpers/UseLocalStorage";
// import { useMapContext } from "../../contexts/MapContext";

// // Custom marker component
// const Marker = ({ type, user, onClick }) => {
//   console.log("Marker user:", type);
//   const colors = {
//     Customer: "blue",
//     Mechanic: "gold",
//   };

//   return (
//     <div
//       onClick={() => onClick(user)}
//       style={{ background: colors[type] }}
//       title={user?.user?.fullName}
//       className="absolute -translate-x-1/2 -translate-y-1/2 
//              text-l px-2 py-2 rounded-full cursor-pointer select-none"
//     >
//       {type === "Customer" ? "👤" : "🔧"}
//     </div>

//   );
// };

// export default function NigeriaMap() {
//   const [user, setUser, removeUser] = useLocalStorage("Elisoft Assist_MapData", {});
//   const { setSelectedMechanic, clearSelectedMechanic } = useMapContext();

//   // Nigeria center
//   const defaultProps = {
//     center: {
//       lat: 9.082, // Nigeria approx center
//       lng: 8.6753,
//     },
//     zoom: 6,
//   };
//   // Example users
//   const users = [
//     {
//       id: 1,
//       name: "Customer John",
//       type: "Customer",
//       lat: 9.0765,
//       lng: 7.3986, // Abuja
//       user: {
//         "location": {
//           "type": "Point",
//           "coordinates": [
//             3.5205641,
//             6.4595481
//           ]
//         },
//         "_id": "68c833b513214eff92ac81ea",
//         "fullName": "Thompson Solomon Ayomideji",
//         "phone": "+2349124919117",
//         "role": "Mechanic",
//         "status": "Active",
//         "isAvailable": true,
//         "profileImage": null,
//         "isPhoneVerified": false,
//         "rating": 0,
//         "totalRatings": 0,
//         "lastLocationUpdate": "2025-09-26T01:26:20.143Z",
//         "createdAt": "2025-09-15T15:41:41.862Z",
//         "updatedAt": "2025-09-26T01:26:20.144Z",
//         "__v": 0,
//         "id": "68c833b513214eff92ac81ea"
//       }
//     },
//     {
//       id: 2,
//       name: "Mechanic Mike",
//       type: "Mechanic",
//       lat: 6.5244,
//       lng: 3.3792, // Lagos
//       user: {
//         "location": {
//           "type": "Point",
//           "coordinates": [
//             3.5205641,
//             6.4595481
//           ]
//         },
//         "_id": "68c833b513214eff92ac81ea",
//         "fullName": "Thompson Solomon",
//         "phone": "+2349124919117",
//         "role": "Mechanic",
//         "status": "Active",
//         "isAvailable": true,
//         "profileImage": null,
//         "isPhoneVerified": false,
//         "rating": 0,
//         "totalRatings": 0,
//         "lastLocationUpdate": "2025-09-26T01:26:20.143Z",
//         "createdAt": "2025-09-15T15:41:41.862Z",
//         "updatedAt": "2025-09-26T01:26:20.144Z",
//         "__v": 0,
//         "id": "68c833b513214eff92ac81ea"
//       }
//     },
//     {
//       id: 3,
//       name: "Customer Ada",
//       type: "Customer",
//       lat: 10.3157,
//       lng: 9.8442, // Jos
//       user: {
//         "location": {
//           "type": "Point",
//           "coordinates": [
//             3.5205641,
//             6.4595481
//           ]
//         },
//         "_id": "68c833b513214eff92ac81ea",
//         "fullName": "Thompson Solomon Ayomideji oluwafemi",
//         "phone": "+2349124919117",
//         "role": "Mechanic",
//         "status": "Active",
//         "isAvailable": true,
//         "profileImage": null,
//         "isPhoneVerified": false,
//         "rating": 0,
//         "totalRatings": 0,
//         "lastLocationUpdate": "2025-09-26T01:26:20.143Z",
//         "createdAt": "2025-09-15T15:41:41.862Z",
//         "updatedAt": "2025-09-26T01:26:20.144Z",
//         "__v": 0,
//         "id": "68c833b513214eff92ac81ea"
//       }
//     },
//     {
//       id: 4,
//       name: "Mechanic Musa",
//       type: "Mechanic",
//       lat: 11.747,
//       lng: 11.9608, // Maiduguri
//       user: {
//         "location": {
//           "type": "Point",
//           "coordinates": [
//             3.5205641,
//             6.4595481
//           ]
//         },
//         "_id": "68c833b513214eff92ac81ea",
//         "fullName": "Thompson",
//         "phone": "+2349124919117",
//         "role": "Mechanic",
//         "status": "Active",
//         "isAvailable": true,
//         "profileImage": null,
//         "isPhoneVerified": false,
//         "rating": 0,
//         "totalRatings": 0,
//         "lastLocationUpdate": "2025-09-26T01:26:20.143Z",
//         "createdAt": "2025-09-15T15:41:41.862Z",
//         "updatedAt": "2025-09-26T01:26:20.144Z",
//         "__v": 0,
//         "id": "68c833b513214eff92ac81ea"
//       }
//     },
//   ];
//   const HandleSetMapUser = (user) => {
//     setUser(user);
//     setSelectedMechanic(user?.user);
//   }
//   const MAP__KEYS = import.meta.env.VITE_GOOGLE_MAPS_API_KEY


//   return (
//     <div style={{ height: "100vh", width: "100%" }}>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: MAP__KEYS }}
//         defaultCenter={defaultProps.center}
//         defaultZoom={defaultProps.zoom}
//         yesIWantToUseGoogleMapApiInternals
//       //         onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
//       >
//         {users.map((user) => (
//           <Marker
//             key={user.id}
//             lat={user.lat}
//             lng={user.lng}
//             type={user?.user?.role}
//             user={user}
//             onClick={() =>
//               HandleSetMapUser(user)
//             }
//           />
//         ))}
//       </GoogleMapReact>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import GoogleMapReact from "google-map-react";

// const CarMarker = () => (
//   <div
//     style={{
//       position: "absolute",
//       transform: "translate(-50%, -50%)",
//       fontSize: "30px",
//     }}
//   >
//     🚗
//   </div>
// );

// export default function UberRoute() {
//   const [polylinePath, setPolylinePath] = useState([]);
//   const [carPosition, setCarPosition] = useState(null);

//   const origin = { lat: 6.5244, lng: 3.3792 }; // Lagos
//   const destination = { lat: 9.0765, lng: 7.3986 }; // Abuja
//   const MAP_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

//   // fetch directions once map API is loaded
//   const handleApiLoaded = (map, maps) => {
//     const directionsService = new maps.DirectionsService();

//     directionsService.route(
//       {
//         origin,
//         destination,
//         travelMode: maps.TravelMode.DRIVING,
//       },
//       (result, status) => {
//         if (status === "OK") {
//           const route = result.routes[0].overview_path.map((p) => ({
//             lat: p.lat(),
//             lng: p.lng(),
//           }));
//           setPolylinePath(route);
//           setCarPosition(route[0]);
//           // draw polyline
//           new maps.Polyline({
//             path: route,
//             geodesic: true,
//             strokeColor: "#4285F4",
//             strokeOpacity: 1.0,
//             strokeWeight: 5,
//             map,
//           });
//         }
//       }
//     );
//   };

//   // move car along polyline
//   useEffect(() => {
//     if (polylinePath.length > 0) {
//       let i = 0;
//       const interval = setInterval(() => {
//         if (i < polylinePath.length) {
//           setCarPosition(polylinePath[i]);
//           i++;
//         } else {
//           clearInterval(interval);
//         }
//       }, 500); // every 0.5s
//       return () => clearInterval(interval);
//     }
//   }, [polylinePath]);

//   return (
//     <div style={{ height: "100vh", width: "100%" }}>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: MAP_KEY }}
//         defaultCenter={origin}
//         defaultZoom={6}
//         yesIWantToUseGoogleMapApiInternals
//         onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
//       >
//         {carPosition && (
//           <CarMarker lat={carPosition.lat} lng={carPosition.lng} />
//         )}
//       </GoogleMapReact>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import GoogleMapReact from "google-map-react";

// // Car marker component
// const CarMarker = () => (
//   <div
//     style={{
//       position: "absolute",
//       transform: "translate(-50%, -50%)",
//       fontSize: "30px",
//     }}
//   >
//     🚗
//   </div>
// );

// export default function UberStyleRoute() {
//   const [polylinePath, setPolylinePath] = useState([]);
//   const [carPosition, setCarPosition] = useState(null);
//   const [mapInstance, setMapInstance] = useState(null);
//   const [mapsApi, setMapsApi] = useState(null);

//   const origin = { lat: 6.5244, lng: 3.3792 }; // Lagos
//   const destination = { lat: 9.0765, lng: 7.3986 }; // Abuja
//   const MAP_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

//   // fetch full path with DirectionsService
//   const handleApiLoaded = (map, maps) => {
//     setMapInstance(map);
//     setMapsApi(maps);
//     const directionsService = new maps.DirectionsService();

//     directionsService.route(
//       {
//         origin,
//         destination,
//         travelMode: maps.TravelMode.DRIVING,
//       },
//       (result, status) => {
//         if (status === "OK") {
//           // flatten all step paths into one big array of coordinates
//           const steps = result.routes[0].legs[0].steps;
//           const routePoints = [];
//           steps.forEach((s) => {
//             s.path.forEach((p) =>
//               routePoints.push({ lat: p.lat(), lng: p.lng() })
//             );
//           });

//           setPolylinePath(routePoints);
//           setCarPosition(routePoints[0]);

//           // draw polyline
//           new maps.Polyline({
//             path: routePoints,
//             geodesic: true,
//             strokeColor: "#4285F4",
//             strokeOpacity: 1.0,
//             strokeWeight: 5,
//             map,
//           });

//           // start at street level
//           map.setZoom(17);
//           map.setCenter(routePoints[0]);
//           map.setTilt(45); // slight 3D tilt
//         } else {
//           console.error("Directions request failed due to " + status);
//         }
//       }
//     );
//   };

//   // animate the car along the route
//   useEffect(() => {
//     if (polylinePath.length > 0) {
//       let i = 0;
//       const interval = setInterval(() => {
//         if (i < polylinePath.length) {
//           const pos = polylinePath[i];
//           setCarPosition(pos);
//           if (mapInstance) {
//             mapInstance.setCenter(pos);
//             mapInstance.setZoom(17); // keep street-level
//           }
//           i++;
//         } else {
//           clearInterval(interval);
//         }
//       }, 200); // every 0.2s for smooth movement
//       return () => clearInterval(interval);
//     }
//   }, [polylinePath, mapInstance]);

//   return (
//     <div style={{ height: "100vh", width: "100%" }}>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: MAP_KEY }}
//         defaultCenter={origin}
//         defaultZoom={17}
//         yesIWantToUseGoogleMapApiInternals
//         onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
//       >
//         {carPosition && (
//           <CarMarker lat={carPosition.lat} lng={carPosition.lng} />
//         )}
//       </GoogleMapReact>
//     </div>
//   );
// }



import React, { useCallback, useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";

// default map container style
const containerStyle = {
  width: "100%",
  height: "500px",
};

// lagos customer location
const customerLocation = { lat: 6.5244, lng: 3.3792 };

// ~10km away (0.09°)
const mechanicLocation = {
  lat: customerLocation.lat + 0.09,
  lng: customerLocation.lng + 0.09,
};

export default function UberLikeMap() {
  const MAP_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAP_KEY,
  });

  const [directions, setDirections] = useState(null);
  const mapRef = useRef();

  // fit bounds automatically
  const onLoad = useCallback((map) => {
    mapRef.current = map;

    // calculate route once map loads
    const service = new window.google.maps.DirectionsService();
    service.route(
      {
        origin: mechanicLocation,
        destination: customerLocation,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);

          // fit the route bounds
          const bounds = new window.google.maps.LatLngBounds();
          result.routes[0].overview_path.forEach((p) => bounds.extend(p));
          map.fitBounds(bounds);
        }
      }
    );
  }, []);

  if (!isLoaded) return <p>Loading…</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={onLoad}
      options={{
        mapTypeId: "roadmap", // street-level view
        streetViewControl: false,
        fullscreenControl: false,
      }}
    >
      {/* Customer marker */}
      <Marker position={customerLocation} label="Customer" />

      {/* Mechanic marker */}
      <Marker position={mechanicLocation} label="Mechanic" />

      {/* Directions (shaded road) */}
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: "#1E90FF",
              strokeOpacity: 0.7,
              strokeWeight: 6,
            },
          }}
        />
      )}
    </GoogleMap>
  );
}
