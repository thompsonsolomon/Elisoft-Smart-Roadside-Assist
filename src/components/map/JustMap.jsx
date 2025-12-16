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

const DEFAULT_CENTER = { lat: 6.5244, lng: 3.3792 }; // Lagos

const AvailableMechanics = [
  { id: 1, name: "Mechanic - Yaba", coordinates: [3.3755, 6.517] },
  { id: 2, name: "Mechanic - Ikeja", coordinates: [3.348, 6.6018] },
  { id: 3, name: "Mechanic - Lekki", coordinates: [3.4835, 6.441] },
];

export default function JustMap() {
  const MAP_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAP_KEY,
  });

  const { user } = useAuth();
  const location = useLocation();
  const mapRef = useRef(null);

  const [job, setJob] = useState(location.state?.job || DummyMapData);
  const [directions, setDirections] = useState(null);

  const hasJob = Boolean(location.state?.job);

  useEffect(() => {
    setJob(location.state?.job || DummyMapData);
  }, [location.state]);

  const jobCoords = job?.location?.coordinates || [3.3792, 6.5244];
  const userCoords = user?.location?.coordinates || [3.3869, 6.5167];

  const JobLocation = { lat: jobCoords[1], lng: jobCoords[0] };
  const MyLocation = { lat: userCoords[1], lng: userCoords[0] };

  // 🔥 SAFE ICONS
  const icons = useMemo(() => {
    if (!isLoaded || !window.google) return null;

    const pin = (color) => ({
      url:
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path fill="${color}" d="M192 0C86 0 0 86 0 192c0 87.4 156 320 168.5 337a24 24 0 0039 0C228 512 384 279.4 384 192 384 86 298 0 192 0z"/>
          <circle cx="192" cy="192" r="72" fill="white"/>
        </svg>`),
      scaledSize: new window.google.maps.Size(42, 42),
      anchor: new window.google.maps.Point(21, 42),
    });

    return {
      customer: pin("#22C55E"),
      mechanic: pin("#2563EB"),
    };
  }, [isLoaded]);

  // 🛣️ DIRECTIONS (runs whenever job changes)
  useEffect(() => {
    if (!hasJob || !window.google || !mapRef.current) return;

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
          bounds.extend(MyLocation);
          bounds.extend(JobLocation);
          mapRef.current.fitBounds(bounds);
        }
      }
    );
  }, [hasJob, JobLocation, MyLocation]);

  if (!isLoaded) return <p>Loading map…</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={hasJob ? MyLocation : DEFAULT_CENTER}
      zoom={hasJob ? 14 : 12}
      onLoad={(map) => (mapRef.current = map)}
      options={{
        streetViewControl: false,
        fullscreenControl: false,
      }}
    >
  
 
          {hasJob && (
            <>
              <Marker
                position={JobLocation}
                icon={icons.customer}
                label={{
                  text: "Customer",
                  color: "#16A34A",
                  fontWeight: "bold",
                }}
              />

              <Marker
                position={MyLocation}
                icon={icons.mechanic}
                label={{
                  text: "You",
                  color: "#2563EB",
                  fontWeight: "bold",
                }}
              />

              {directions && (
                <DirectionsRenderer
                  directions={directions}
                  options={{
                    suppressMarkers: true,
                    polylineOptions: {
                      strokeColor: "#1E90FF",
                      strokeOpacity: 0.85,
                      strokeWeight: 6,
                    },
                  }}
                />
              )}
            </>
         
      )}
    </GoogleMap>
  );
}
