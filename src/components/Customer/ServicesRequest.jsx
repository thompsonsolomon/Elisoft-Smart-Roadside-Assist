import { useEffect, useState, useCallback } from "react";
import { mechanicServices, States } from "../../../data";
import { CreateServiceRequest } from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";

export default function ServiceRequestForm({ open, onClose, data }) {
  const [selectedService, setSelectedService] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [shortAddress, setShortAddress] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const { user } = useAuth();
  console.log(user)
  // 🔹 Fetch human-readable address
  const fetchAddress = useCallback(async () => {
    if (!data?.latitude || !data?.longitude) return;

    try {
      setLocationLoading(true);
      setShortAddress("");

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

  // 🔹 Auto-fetch when modal opens or coords change
  useEffect(() => {
    if (open) fetchAddress();
  }, [fetchAddress, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedService || !description.trim() || !shortAddress) {
      alert("Please complete all fields");
      return;
    }

    const payload = {
      serviceType: selectedService,
      address: shortAddress,
      location: {
        coordinates: [data.longitude, data.latitude],
      },
      state: state,
      description,
      mechanicId: data?.mechanicId || null,
    };

    try {
      setLoading(true);
      setSuccessMsg("");
      await CreateServiceRequest(payload);
      setSuccessMsg("Request created successfully!");
      setDescription("");
      setSelectedService("");
    } catch {
      setSuccessMsg("Failed to create request");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-gray-800 rounded-xl shadow-xl w-96 p-5">
        <h2 className="text-lg font-semibold mb-3 text-white">
          Request a Service
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Service */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Select Service
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full border text-black rounded-lg px-3 py-2"
            >
              <option value="">-- Select Service --</option>
              {mechanicServices.map((svc) => (
                <option key={svc} value={svc}>
                  {svc}
                </option>
              ))}
            </select>
          </div>

           {/* State */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Select State
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full border text-black rounded-lg px-3 py-2"
            >
              <option value="">-- Select Service --</option>
              {States.map((svc) => (
                <option key={svc} value={svc}>
                  {svc}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border rounded-lg px-3 py-2 text-black"
              placeholder="Describe the issue..."
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Location
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={
                  locationLoading
                    ? "Fetching location..."
                    : shortAddress || "Location not available"
                }
                className="flex-1 border rounded-lg px-3 py-2 bg-gray-100 text-black"
              />

              <button
                type="button"
                onClick={fetchAddress}
                disabled={locationLoading}
                className="bg-yellow-600 text-black px-3 rounded-lg hover:bg-yellow-500 disabled:opacity-50"
              >
                ↻
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || locationLoading || !shortAddress}
            className="w-full bg-yellow-600 text-black py-2 rounded-lg hover:bg-yellow-500 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>

        {successMsg && (
          <p className="mt-3 text-center text-sm text-green-400">
            {successMsg}
          </p>
        )}

        <button
          onClick={onClose}
          className="mt-3 w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}
