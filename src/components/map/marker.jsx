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
