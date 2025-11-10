import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { DummyMapData } from "../../../data";

const containerStyle = {
  width: "100%",
  height: "500px",
};

export default function UberLikeMap() {
  const MAP_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAP_KEY,
  });

  const location = useLocation();
  const [job, setJob] = useState(location.state?.job || DummyMapData);
  const { user } = useAuth();

  const [directions, setDirections] = useState(null);
  const mapRef = useRef();

  // 🧠 Ensure job state is updated dynamically when user navigates with new data
  useEffect(() => {
    if (location.state?.job) {
      setJob(location.state.job);
    } else {
      setJob(DummyMapData);
    }
  }, [location.state]);


  // ✅ Safety checks (avoid undefined)
  const jobCoords = job?.location?.coordinates || [3.3792, 6.5244]; // Default: Lagos
  const userCoords = user?.location?.coordinates || [3.3869, 6.5167]; // Default: Mechanic near Lagos

  // ✅ Google Maps requires { lat, lng }
  const JobLocation = { lat: jobCoords[1], lng: jobCoords[0] };
  const MyLocation = { lat: userCoords[1], lng: userCoords[0] };

  // ✅ Automatically generate route
  const onLoad = useCallback(
    (map) => {
      mapRef.current = map;

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

            // Fit route to bounds
            const bounds = new window.google.maps.LatLngBounds();
            result.routes[0].overview_path.forEach((p) => bounds.extend(p));
            map.fitBounds(bounds);
          } else {
            console.warn("Directions request failed:", status);
          }
        }
      );
    },
    [JobLocation, MyLocation]
  );

  if (!isLoaded) return <p>Loading map…</p>;

  return (
    <div className="relative w-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        onLoad={onLoad}
        options={{
          mapTypeId: "roadmap",
          streetViewControl: false,
          fullscreenControl: false,
        }}
      >
        {/* Customer marker */}
        <Marker
          position={JobLocation}
          label="Customer"
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: "#22C55E",
            fillOpacity: 1,
            scale: 10,
            strokeColor: "#fff",
            strokeWeight: 2,
          }}
        />

        {/* Mechanic marker */}
        <Marker
          position={MyLocation}
          label="Mechanic"
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: "#2563EB",
            fillOpacity: 1,
            scale: 10,
            strokeColor: "#fff",
            strokeWeight: 2,
          }}
        />

        {/* Directions line */}
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

      {/* Legend */}
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
  );
}
