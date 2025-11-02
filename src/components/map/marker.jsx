import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation } from "react-router-dom";

// default map container style
const containerStyle = {
  width: "100%",
  height: "500px",
};

// lagos customer location



export default function UberLikeMap() {
  const MAP_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAP_KEY,
  });

  const location = useLocation();
  const [job, setJob] = useState(location.state?.job || null);
  useEffect(() => {
    if (location.state?.job) {
      setJob(location.state.job);
    }
  }, [location.state]);
  const { user } = useAuth();

  const [directions, setDirections] = useState(null);
  const mapRef = useRef();

  console.log("Job location data:", job);

  // ✅ Safety checks (avoid undefined crashes)
  const jobCoords = job?.location?.coordinates || [];
  const userCoords = user?.location?.coordinates || [];

  // ✅ Mechanic/Job Location
  const JobLocation =
    jobCoords.length === 2
      ? { lat: jobCoords[1], lng: jobCoords[0] }
      : null;

  // ✅ User Location
  const MyLocation =
    userCoords.length === 2
      ? { lat: userCoords[1], lng: userCoords[0] }
      : null;

  // fit bounds automatically
  const onLoad = useCallback((map) => {
    mapRef.current = map;
    // calculate route once map loads
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
    <div>

      <div className="relative w-full">
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
          <Marker
            position={JobLocation}
            label="Customer"
            onClick={() => setSelectedMarker("customer")}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: "#22C55E", // green
              fillOpacity: 1,
              scale: 10,
              strokeColor: "#fff",
              strokeWeight: 2,
            }}
          />

          {/* Mechanic marker */}
          <Marker position={MyLocation} label="Mechanic"
            onClick={() => setSelectedMarker("mechanic")}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: "#2563EB", // blue
              fillOpacity: 1,
              scale: 10,
              strokeColor: "#fff",
              strokeWeight: 2,
            }}
          />

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

        <div className="absolute bottom-3 left-3 bg-white/90 rounded-xl p-3 shadow-lg space-y-2 text-sm">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              👤
            </div>
            <span className="text-gray-700 font-medium">Customer Request</span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              🔧
            </div>
            <span className="text-gray-700 font-medium">Mechanic</span>
          </div>
        </div>
      </div>


    </div>

  );
}



//  <div className="relative w-full">
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         onLoad={(map) => {
//           mapRef.current = map;
//           map.setZoom(14); // Default zoom level before fitting
//         }}
//         options={{
//           mapTypeId: "roadmap",
//           streetViewControl: false,
//           fullscreenControl: false,
//         }}
//       >
//         {/* Customer marker */}
//         <Marker
//           position={JobLocation}
//           onClick={() => setSelectedMarker("customer")}
//           icon={{
//             path: window.google.maps.SymbolPath.CIRCLE,
//             fillColor: "#22C55E", // green
//             fillOpacity: 1,
//             scale: 10,
//             strokeColor: "#fff",
//             strokeWeight: 2,
//           }}
//         />

//         {/* Mechanic marker */}
//         <Marker
//           position={MyLocation}
//           onClick={() => setSelectedMarker("mechanic")}
//           icon={{
//             path: window.google.maps.SymbolPath.CIRCLE,
//             fillColor: "#2563EB", // blue
//             fillOpacity: 1,
//             scale: 10,
//             strokeColor: "#fff",
//             strokeWeight: 2,
//           }}
//         />

//         {/* Directions route */}
//         {directions && (
//           <DirectionsRenderer
//             directions={directions}
//             options={{
//               suppressMarkers: true,
//               polylineOptions: {
//                 strokeColor: "#1E90FF",
//                 strokeOpacity: 0.7,
//                 strokeWeight: 6,
//               },
//             }}
//           />
//         )}

//         {/* Info popups */}
//         {selectedMarker === "customer" && (
//           <InfoWindow
//             position={JobLocation}
//             onCloseClick={() => setSelectedMarker(null)}
//           >
//             <div className="flex items-center space-x-3">
//               <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
//                 👤
//               </div>
//               <span className="text-gray-800 font-semibold">
//                 Customer Request
//               </span>
//             </div>
//           </InfoWindow>
//         )}

//         {selectedMarker === "mechanic" && (
//           <InfoWindow
//             position={MyLocation}
//             onCloseClick={() => setSelectedMarker(null)}
//           >
//             <div className="flex items-center space-x-3">
//               <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
//                 🔧
//               </div>
//               <span className="text-gray-800 font-semibold">
//                 Mechanic Location
//               </span>
//             </div>
//           </InfoWindow>
//         )}
//       </GoogleMap>

//       {/* Legend (bottom left) */}
//       <div className="absolute bottom-3 left-3 bg-white/90 rounded-xl p-3 shadow-lg space-y-2 text-sm">
//         <div className="flex items-center space-x-3">
//           <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
//             👤
//           </div>
//           <span className="text-gray-700 font-medium">Customer Request</span>
//         </div>

//         <div className="flex items-center space-x-3">
//           <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
//             🔧
//           </div>
//           <span className="text-gray-700 font-medium">Mechanic</span>
//         </div>
//       </div>
//     </div>