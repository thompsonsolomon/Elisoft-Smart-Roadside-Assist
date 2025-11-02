import { useEffect, useState } from "react";
import { mechanicServices } from "../../../data";
import { CreateServiceRequest } from "../../utils/api";

export default function ServiceRequestForm({ open, onClose, data }) {
  const [selectedService, setSelectedService] = useState("");
  const [description, setDescription] = useState("");
  const [shortAddress, setShortAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  
  // Convert coords to human-readable short address
  useEffect(() => {
    const fetchAddr = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${data?.latitude}&lon=${data?.longitude}`
        );
        const json = await res.json();
        const { road, suburb, city, town, state, country } = json.address || {};
        const addr = [road, suburb || city || town, state || country]
          .filter(Boolean)
          .join(", ");
        setShortAddress(addr || "Unknown location");
      } catch {
        setShortAddress("Unable to fetch location");
      }
    };
    if (data?.latitude && data?.longitude) fetchAddr();
  }, [data?.latitude, data?.longitude]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedService) {
      alert("Please select a service");
      return;
    }
    if (!description.trim()) {
      alert("Please enter a description");
      return;
    }

    const payload = {
      serviceType: selectedService,
      address: shortAddress,
      location: {
        coordinates: [data.longitude, data.latitude],
      },
      description,
      mechanicId: data?.mechanicId || null,
    };

    try {
      setLoading(true);
      setSuccessMsg("");
      const res = await CreateServiceRequest(payload);
      if (res.error) {
        setSuccessMsg(res.error || "Failed to create request");
        return;
      }
      setSuccessMsg("Request created successfully!");
      setDescription("");
      setSelectedService("");
    } catch (err) {
      console.error(err);
      setSuccessMsg("Failed to create request");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-gray-800 rounded-xl shadow-xl w-96 p-5">
        <h2 className="text-lg font-semibold mb-3">Request a Service</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Service select */}
          <div>
            <label className="block text-sm font-medium mb-1">Select Service</label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full border text-black rounded-lg px-3 py-2"
            >
              <option value="" className="text-black">-- Select Service --</option>
              {mechanicServices.map((svc) => (
                <option key={svc} value={svc}>
                  {svc}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border rounded-lg px-3 py-2 text-black"
              placeholder="Describe the issue..."
            />
          </div>

          {/* Address (read-only) */}
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              readOnly
              value={shortAddress || "Detecting location..."}
              className="w-full border rounded-lg px-3 py-2 bg-gray-50"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-400 disabled:bg-yellow-600"
            disabled={loading || !shortAddress || !selectedService || !description.trim()}
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>

        {successMsg && (
          <p className="mt-3 text-center text-sm text-green-600">{successMsg}</p>
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
