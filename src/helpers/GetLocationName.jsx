import { useEffect, useState } from "react";

export function LocationName({ lat, lon }) {
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchAddr = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );
        const data = await res.json();

        // pick shorter fields from the address object
        const { road, suburb, city, town, state, country } = data.address || {};

        // build a short readable string (skip empty ones)
        const shortAddress = [road, suburb || city || town, state || country]
          .filter(Boolean)
          .join(", ");

        setAddress(shortAddress || "Unknown location");
      } catch (err) {
        setAddress("Unable to fetch location");
        console.error(err);
        
      }
    };

    if (lat && lon) fetchAddr();
  }, [lat, lon]);

  return <span>{address  || "Loading address... "}</span>;
}
