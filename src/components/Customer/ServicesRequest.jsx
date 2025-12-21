import { useEffect, useState, useCallback } from "react";
import { mechanicServices, States } from "../../../data";
import { CreateServiceRequest } from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";

export default function ServiceRequestForm({ open, onClose, data }) {
  const { user } = useAuth();

  const [selectedService, setSelectedService] = useState("");
  const [state, setState] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [description, setDescription] = useState("");
  const [shortAddress, setShortAddress] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [vehicle, setVehicle] = useState({
    make: "",
    model: "",
    year: "",
    plateNumber: "",
    color: "",
  });

  const [emergency, setEmergency] = useState({
    name: "",
    phone: "",
  });

  // 📍 Reverse geocode
  const fetchAddress = useCallback(async () => {
    if (!data?.latitude || !data?.longitude) return;

    try {
      setLocationLoading(true);
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${data.latitude}&lon=${data.longitude}`
      );
      const json = await res.json();

      const { road, suburb, city, town, state, country } = json.address || {};
      const addr = [road, suburb || city || town, state || country]
        .filter(Boolean)
        .join(", ");

      setShortAddress(addr || "Unknown location");
    } catch {
      setShortAddress("Unable to fetch location");
    } finally {
      setLocationLoading(false);
    }
  }, [data?.latitude, data?.longitude]);

  useEffect(() => {
    if (open) fetchAddress();
  }, [fetchAddress, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !selectedService ||
      !description ||
      !shortAddress ||
      !vehicle.make ||
      !emergency.phone
    ) {
      alert("Please complete all required fields");
      return;
    }

    const payload = {
      location: {
        coordinates: [data.longitude, data.latitude],
      },
      address: shortAddress,
      serviceType: selectedService,
      state,
      description,
      priority,
      mechanicId: data?.mechanicId || null,

      vehicleDetails: {
        make: vehicle.make,
        model: vehicle.model,
        year: Number(vehicle.year),
        plateNumber: vehicle.plateNumber,
        color: vehicle.color,
      },

      emergencyContact: {
        name: emergency.name,
        phone: emergency.phone,
      },
    };

    try {
      setLoading(true);
      setSuccessMsg("");
      await CreateServiceRequest(payload);
      setSuccessMsg("Service request created successfully!");
    } catch {
      setSuccessMsg("Failed to create request");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center overflow-auto justify-center bg-black/60 px-3">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-5  md:mt-[500px] mb-[30px] animate-scaleIn">
        <h2 className="text-lg font-bold text-black mb-4 text-center">
          Request Mechanic Service
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Service */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">
              Service Type
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full text-black border border-black rounded-lg px-3 py-2"
            >
              <option value="">Select Service</option>
              {mechanicServices.map((svc) => (
                <option key={svc} value={svc}>
                  {svc}
                </option>
              ))}
            </select>
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">
              State
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full text-black border border-black rounded-lg px-3 py-2"
            >
              <option value="">Select State</option>
              {States.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">
              Priority Level
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full text-black border border-black rounded-lg px-3 py-2"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">
              Problem Description
            </label>
            <textarea
              rows={3}
              placeholder="Briefly describe what is wrong with the vehicle"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-black border border-black rounded-lg px-3 py-2"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">
              Your Location
            </label>
            <input
              readOnly
              value={
                locationLoading
                  ? "Fetching location..."
                  : shortAddress || "Location not available"
              }
              className="w-full border border-black rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>

          {/* Vehicle Details */}
          <div className="border border-yellow-500 rounded-lg p-3">
            <h4 className="font-semibold text-black mb-1">
              Vehicle Details
            </h4>
            <p className="text-xs text-gray-600 mb-2">
              Enter details of the vehicle that needs assistance
            </p>

            <div className="space-y-2">
              <input
                placeholder="Vehicle Make (e.g Toyota)"
                value={vehicle.make}
                onChange={(e) => setVehicle({ ...vehicle, make: e.target.value })}
                className="w-full border text-black border-black rounded-lg px-3 py-2"
              />
              <input
                placeholder="Model (e.g Camry)"
                value={vehicle.model}
                onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })}
                className="w-full border text-black border-black rounded-lg px-3 py-2"
              />
              <input
                placeholder="Year (e.g 2020)"
                value={vehicle.year}
                onChange={(e) => setVehicle({ ...vehicle, year: e.target.value })}
                className="w-full border text-black  border-black rounded-lg px-3 py-2"
              />
              <input
                placeholder="Plate Number"
                value={vehicle.plateNumber}
                onChange={(e) =>
                  setVehicle({ ...vehicle, plateNumber: e.target.value })
                }
                className="w-full border text-black border-black rounded-lg px-3 py-2"
              />
              <input
                placeholder="Color"
                value={vehicle.color}
                onChange={(e) => setVehicle({ ...vehicle, color: e.target.value })}
                className="w-full border text-black border-black rounded-lg px-3 py-2"
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h4 className="font-semibold text-black mb-1">
              Emergency Contact
            </h4>
            <p className="text-xs text-gray-600 mb-2">
              Who should we contact if we can’t reach you?
            </p>

            <input
              placeholder="Contact Name"
              value={emergency.name}
              onChange={(e) =>
                setEmergency({ ...emergency, name: e.target.value })
              }
              className="w-full border text-black border-black rounded-lg px-3 py-2 mb-2"
            />

            <input
              placeholder="Phone Number"
              value={emergency.phone}
              onChange={(e) =>
                setEmergency({ ...emergency, phone: e.target.value })
              }
              className="w-full border text-black border-black rounded-lg px-3 py-2"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:bg-yellow-400 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>

        {successMsg && (
          <p className="text-center mt-3 text-green-600 text-sm">
            {successMsg}
          </p>
        )}

        <button
          onClick={onClose}
          className="w-full mt-3 border border-black text-red-500 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}
