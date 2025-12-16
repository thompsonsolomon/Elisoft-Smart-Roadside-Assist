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

const containerStyle = {
  width: "100%",
  height: "500px",
};

const AvailableMechanics = [
  { id: 1, name: "Mechanic - Yaba", coordinates: [3.3755, 6.517] },
  { id: 2, name: "Mechanic - Ikeja", coordinates: [3.348, 6.6018] },
  { id: 3, name: "Mechanic - Lekki", coordinates: [3.4835, 6.441] },
];

export default function UberLikeMap() {
  const MAP_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAP_KEY,
  });

  const location = useLocation();
  const { user } = useAuth();

  const [job, setJob] = useState(location.state?.job || DummyMapData);
  const [directions, setDirections] = useState(null);
  const mapRef = useRef(null);

  const hasJob = !!location.state?.job;

  useEffect(() => {
    if (location.state?.job) {
      setJob(location.state.job);
    } else {
      setJob(DummyMapData);
    }
  }, [location.state]);

  // Coordinates safety
  const jobCoords = job?.location?.coordinates || [3.3792, 6.5244];
  const userCoords = user?.location?.coordinates || [3.3869, 6.5167];

  const JobLocation = { lat: jobCoords[1], lng: jobCoords[0] };
  const MyLocation = { lat: userCoords[1], lng: userCoords[0] };

  // ✅ CREATE ICONS ONLY AFTER MAP IS LOADED
  const customerIcon = useMemo(() => {
    if (!isLoaded || !window.google) return null;
    return {
      url:
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44">
          <circle cx="22" cy="22" r="12" fill="#22C55E" stroke="white" stroke-width="3"/>
        </svg>
      `),
      scaledSize: new window.google.maps.Size(44, 44),
      anchor: new window.google.maps.Point(22, 22),
    };
  }, [isLoaded]);

  const mechanicIcon = useMemo(() => {
    if (!isLoaded || !window.google) return null;
    return {
      url:
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44">
          <circle cx="22" cy="22" r="12" fill="#2563EB" stroke="white" stroke-width="3"/>
        </svg>
      `),
      scaledSize: new window.google.maps.Size(44, 44),
      anchor: new window.google.maps.Point(22, 22),
    };
  }, [isLoaded]);

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
    [JobLocation, MyLocation, hasJob]
  );

  if (!isLoaded) return <p className="text-center">Loading map…</p>;

  return (
    <div className="relative w-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        onLoad={onLoad}
        center={MyLocation}
        zoom={13}
        options={{
          streetViewControl: false,
          fullscreenControl: false,
        }}
      >
        {hasJob ? (
          <>
            <Marker
              position={JobLocation}
              icon={customerIcon}
              label={{
                text: "Customer",
                color: "#15803D",
                fontWeight: "bold",
                fontSize: "12px",
              }}
            />

            <Marker
              position={MyLocation}
              icon={mechanicIcon}
              label={{
                text: "You",
                color: "#1D4ED8",
                fontWeight: "bold",
                fontSize: "12px",
              }}
            />

            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  suppressMarkers: true,
                  polylineOptions: {
                    strokeColor: "#2563EB",
                    strokeOpacity: 0.8,
                    strokeWeight: 6,
                  },
                }}
              />
            )}
          </>
        ) : (
          <>
            {AvailableMechanics.map((m) => (
              <Marker
                key={m.id}
                position={{ lat: m.coordinates[1], lng: m.coordinates[0] }}
                icon={mechanicIcon}
                label={{
                  text: m.name,
                  color: "#1D4ED8",
                  fontSize: "11px",
                  fontWeight: "bold",
                }}
              />
            ))}
          </>
        )}
      </GoogleMap>
    </div>
  );
}
