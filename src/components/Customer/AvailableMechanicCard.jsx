import React, { useEffect, useState } from "react";
import { CustomerGetAvailableMechanic, GetMechanicByID } from "../../utils/api";
import { toast } from "react-toastify";
import { LocationName } from "../../helpers/GetLocationName";
import ServiceRequest from "./ServicesRequest";

function AvailableMechanicCard() {
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [open, setOpen] = useState(false);
  const [serviceData, setServiceData] = useState()
  // ✅ Get location on mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setLocation({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Unable to get your location");
        }
      );
    }
  }, []);

  // ✅ Fetch data *after* location is set
  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetchAllData(location.latitude, location.longitude);
    }
  }, [location]);

  const fetchAllData = async (lat, lng) => {
    setLoading(true);
    try {
      // Send coordinates correctly
      const cred = {
        latitude: lat,
        longitude: lng,
      };
      const req = await CustomerGetAvailableMechanic(lat, lng);
      setMechanics(req?.data?.mechanics || []);
    } catch (err) {
      console.error("Error fetching data:", err);
      toast.error("Failed to load mechanics");
    } finally {
      setLoading(false);
    }
  };


  const HandleOPenProfile = (id) => async () => {
    // Implement navigation to mechanic profile page
    try {
      const res = await GetMechanicByID(id);
    } catch (error) {

    }
  }

  const HandelBookService = async (id) => {
    const data = {
      "longitude": location.longitude,
      "latitude": location.latitude,
      "mechanicId": id
    }
    setServiceData(data)
    setOpen(true);
  }
  return (
    <div className="p-4">
      {loading && <p>Loading mechanics near you...</p>}
      {!loading && mechanics.length === 0 && (
        <p>No mechanics available in your area.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mechanics.map((mechanic) => (
          <div key={mechanic.id} className="w-full bg-gray-800 p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-yellow-400 font-semibold text-lg">{mechanic.fullName}</h3>
              {/* <span
                    className={`text-sm px-3 py-1 rounded-full ${mechanic.available ? "bg-green-600" : "bg-red-600"
                      }`}
                  >
                    {mechanic.available ? "Available" : "Busy"}
                  </span> */}
            </div>
            <p className="text-gray-400 mb-1">🔧 {mechanic.expertise || "Car Mechanic"}</p>
            <p className="text-gray-400 mb-1">📞{mechanic.phone}</p>
            <p className="text-gray-400 mb-1"> 📍
              {
                mechanic.location && (
                  <LocationName
                    lat={mechanic.location.coordinates[1]}
                    lon={mechanic.location.coordinates[0]}
                  />
                )
              }

              • {mechanic.distance}
            </p>
            <div className="flex justify-between items-center mt-3 mb-4">
              <span className="text-yellow-400">⭐ {mechanic.totalRatings}</span>
              <span className="text-gray-400 text-sm">Verified ✅</span>
            </div>
            <div className="flex gap-3">
              <button
                className="btn btn-primary w-full"
                // disabled={!mechanic.available}
                onClick={() => HandelBookService(mechanic.id)}
              >
                Book Now
              </button>
              <button className="btn btn-secondary w-full" onClick={HandleOPenProfile(mechanic._id)} >View Profile</button>
            </div>
          </div>
        ))}
      </div>

      <ServiceRequest
        open={open}
        onClose={() => setOpen(false)}
        data={serviceData}
      />
    </div>
  );
}

export default AvailableMechanicCard;
