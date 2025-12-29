// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { CustomerGetAvailableMechanic, GetMechanicByID } from "../../utils/api";
// import { toast } from "react-toastify";
// import { LocationName } from "../../helpers/GetLocationName";
// import ServiceRequest from "./ServicesRequest";
// import MechanicProfileModal from "./MechanicProfile";
// import { useGeolocated } from "react-geolocated";
// import { Loader2 } from "lucide-react";

// function AvailableMechanicCard() {
//   const [selectedMechanic, setSelectedMechanic] = useState(null);
//   const [mechanics, setMechanics] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [serviceData, setServiceData] = useState(null);

//   // 🛑 Prevent memory leaks
//   const isMountedRef = useRef(true);

//   /* ----------------------------------------
//    * 📍 Get user location (mobile-safe)
//    * -------------------------------------- */
//   const {
//     coords,
//     isGeolocationAvailable,
//     isGeolocationEnabled,
//   } = useGeolocated({
//     positionOptions: {
//       enableHighAccuracy: true,
//       maximumAge: 1000 * 60 * 2, // cache for 2 mins (mobile friendly)
//     },
//     userDecisionTimeout: 7000,
//   });

//   /* ----------------------------------------
//    * 🚨 Handle geolocation errors safely
//    * -------------------------------------- */
//   useEffect(() => {
//     if (!isGeolocationAvailable) {
//       toast.error("Geolocation is not supported by your browser.");
//     } else if (!isGeolocationEnabled) {
//       toast.error("Please enable location access to continue.");
//     }
//   }, [isGeolocationAvailable, isGeolocationEnabled]);

//   /* ----------------------------------------
//    * 📦 Fetch mechanics (safe & stable)
//    * -------------------------------------- */
//   const fetchMechanics = useCallback(async (lat, lng) => {
//     if (!lat || !lng) return;

//     try {
//       setLoading(true);
//       if (isMountedRef.current) setLoading(true);

//       const res = await CustomerGetAvailableMechanic(lat, lng);
//       console.log("Mechanics response:", res);

//       if (!isMountedRef.current) return;
//       setMechanics(res?.data?.mechanics || []);

//       setLoading(false);
//     } catch (err) {
//       console.error("Fetch mechanics error:", err);
//       toast.error("Failed to load mechanics");
//     } finally {
//       if (isMountedRef.current) {
//         setLoading(false);
//       }
//     }
//   }, []);

//   /* ----------------------------------------
//    * 🚀 Fetch AFTER location is ready
//    * -------------------------------------- */
//   useEffect(() => {
//     if (coords?.latitude && coords?.longitude) {
//       fetchMechanics(coords.latitude, coords.longitude);
//     }
//   }, [coords?.latitude, coords?.longitude, fetchMechanics]);

//   /* ----------------------------------------
//    * 🛠 Book service
//    * -------------------------------------- */
//   const handleBookService = (mechanicId) => {
//     if (!coords) return;

//     setServiceData({
//       latitude: coords.latitude,
//       longitude: coords.longitude,
//       mechanicId,
//     });
//     setOpen(true);
//   };

//   return (
//     <div className="p-4">
//       {
//         loading &&
//         <p className="flex gap-4">Loading mechanics near you..
//           <Loader2 className="animate-spin text-yellow-400" size={32} />
//         </p>
//       }
//       {!loading && mechanics.length === 0 && (
//         <p>No mechanics available in your area.</p>
//       )}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {mechanics.map((mechanic) => (
//           <div key={mechanic.id} className="w-full bg-gray-800 p-6 rounded-xl shadow">
//             <div className="flex justify-between items-center mb-3">
//               <h3 className="text-yellow-400 font-semibold text-lg">{mechanic.fullName}</h3>
//               {/* <span
//                     className={`text-sm px-3 py-1 rounded-full ${mechanic.available ? "bg-green-600" : "bg-red-600"
//                       }`}
//                   >
//                     {mechanic.available ? "Available" : "Busy"}
//                   </span> */}
//             </div>
//             <p className="text-gray-400 mb-1">🔧 {mechanic.expertise || "Car Mechanic"}</p>
//             <p className="text-gray-400 mb-1">📞{mechanic.phone}</p>
//             <p className="text-gray-400 mb-1"> 📍
//               {
//                 mechanic.location && (
//                   <LocationName
//                     lat={mechanic.location.coordinates[1]}
//                     lon={mechanic.location.coordinates[0]}
//                   />
//                 )
//               }

//               • {mechanic.distance}
//             </p>
//             <div className="flex justify-between items-center mt-3 mb-4">
//               <span className="text-yellow-400">⭐ {mechanic.totalRatings}</span>
//               <span className="text-gray-400 text-sm">Verified ✅</span>
//             </div>
//             <div className="flex gap-3">
//               <button
//                 className="btn btn-primary w-full"
//                 // disabled={!mechanic.available}
//                 onClick={() => HandelBookService(mechanic.id)}
//               >
//                 Book Now
//               </button>
//               <button className="btn btn-secondary w-full" onClick={() => setSelectedMechanic(mechanic)} >View Profile</button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <ServiceRequest
//         open={open}
//         onClose={() => setOpen(false)}
//         data={serviceData}
//       />

//       <MechanicProfileModal
//         mechanic={selectedMechanic}
//         onClose={() => setSelectedMechanic(null)}
//       />
//     </div>
//   );
// }

// export default AvailableMechanicCard;





import React, { useCallback, useEffect, useRef, useState } from "react";
import { CustomerGetAvailableMechanic } from "../../utils/api";
import { toast } from "react-toastify";
import { LocationName } from "../../helpers/GetLocationName";
import ServiceRequest from "./ServicesRequest";
import MechanicProfileModal from "./MechanicProfile";
import { useGeolocated } from "react-geolocated";
import { Loader2 } from "lucide-react";

function AvailableMechanicCard() {
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [serviceData, setServiceData] = useState(null);

  // 🛑 Prevent memory leaks
  const isMountedRef = useRef(true);

  // useEffect(() => {
  //   return () => {
  //     isMountedRef.current = false;
  //   };
  // }, []);

  /* ----------------------------------------
   * 📍 Get user location (mobile safe)
   * -------------------------------------- */
  const {
    coords,
    isGeolocationAvailable,
    isGeolocationEnabled,
  } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
      maximumAge: 1000 * 60 * 2, // cache 2 mins
    },
    userDecisionTimeout: 7000,
  });

  /* ----------------------------------------
   * 🚨 Handle geolocation issues
   * -------------------------------------- */
  useEffect(() => {
    if (!isGeolocationAvailable) {
      toast.error("Geolocation is not supported by your browser.");
    } else if (!isGeolocationEnabled) {
      toast.error("Please enable location access.");
    }
  }, [isGeolocationAvailable, isGeolocationEnabled]);

  /* ----------------------------------------
   * 📦 Fetch mechanics safely
   * -------------------------------------- */
  const fetchMechanics = useCallback(async (lat, lng) => {
    if (!lat || !lng) return;

    try {
      setLoading(true);

      const res = await CustomerGetAvailableMechanic(lat, lng);
      if (!isMountedRef.current) return;      
      setMechanics(res?.data?.mechanics || []);
      setLoading(false);
    } catch (err) {
      console.error("Fetch mechanics error:", err);
      toast.error("Failed to load mechanics");
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  /* ----------------------------------------
   * 🚀 Fetch AFTER coords are ready
   * -------------------------------------- */
  useEffect(() => {
    if (coords?.latitude && coords?.longitude) {
      fetchMechanics(coords.latitude, coords.longitude);
    }
  }, [coords?.latitude, coords?.longitude, fetchMechanics]);

  /* ----------------------------------------
   * 🛠 Book Service (FIXED)
   * -------------------------------------- */
  const handleBookService = (mechanicId) => {
    if (!coords?.latitude || !coords?.longitude) {
      toast.error("Location not available");
      return;
    }

    if (!mechanicId) {
      toast.error("Invalid mechanic selected");
      return;
    }

    const payload = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      mechanicId,
    };

    setServiceData(payload);
    setOpen(true);
  };
  console.log(mechanics)
  return (
    <div className="p-4">
      {loading && (
        <p className="flex items-center gap-3 text-white">
          Loading mechanics near you…
          <Loader2 className="animate-spin text-yellow-400" size={28} />
        </p>
      )}

      {!loading && mechanics.length === 0 && (
        <p className="text-gray-400">No mechanics available in your area.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mechanics.map((mechanic) => (
          <div
            key={mechanic.id}
            className="w-full bg-gray-800 p-6 rounded-xl shadow"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-yellow-400 font-semibold text-lg">
                {mechanic.fullName}
              </h3>
            </div>

            <p className="text-gray-400 mb-1">
              🔧 {mechanic.expertise || "Car Mechanic"}
            </p>
            <p className="text-gray-400 mb-1">📞 {mechanic.phone}</p>

            <p className="text-gray-400 mb-1">
              📍{" "}
              {mechanic.location && (
                <LocationName
                  lat={mechanic.location.coordinates[1]}
                  lon={mechanic.location.coordinates[0]}
                />
              )}{" "}
              • {mechanic.distance}
            </p>

            <div className="flex justify-between items-center mt-3 mb-4">
              <span className="text-yellow-400">
                ⭐ {mechanic.totalRatings || 0}
              </span>
              <span className="text-gray-400 text-sm">Verified ✅</span>
            </div>

            <div className="flex gap-3">
              <button
                className="btn btn-primary w-full"
                onClick={() => handleBookService(mechanic.id)}
              >
                Book Now
              </button>

              <button
                className="btn btn-secondary w-full"
                onClick={() => setSelectedMechanic(mechanic)}
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Service Modal */}
      <ServiceRequest
        open={open}
        onClose={() => setOpen(false)}
        data={serviceData}
      />

      {/* Profile Modal */}
      <MechanicProfileModal
        mechanic={selectedMechanic}
        onClose={() => setSelectedMechanic(null)}
      />
    </div>
  );
}

export default AvailableMechanicCard;
