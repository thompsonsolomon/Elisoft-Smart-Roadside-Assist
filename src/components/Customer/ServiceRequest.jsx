import React, { useState } from "react";
import { toast } from "react-toastify"; 

const ServiceRequestModal = ({ token }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    serviceType: "",
    address: "",
    latitude: "",
    longitude: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://elisoft-backend.onrender.com/api/service-requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            serviceType: formData.serviceType,
            address: formData.address,
            location: {
              coordinates: [
                parseFloat(formData.longitude),
                parseFloat(formData.latitude),
              ],
            },
            description: formData.description,
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create request");
      }

      const data = await res.json();
      toast.success("Service request created successfully!");
      console.log("Created request:", data);
      setShowModal(false);
      setFormData({
        serviceType: "",
        address: "",
        latitude: "",
        longitude: "",
        description: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="open-modal-btn" onClick={() => setShowModal(true)}>
        + New Service Request
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create Service Request</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Service Type</label>
                <input
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  placeholder="Battery Jump Start"
                  required
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  required
                />
              </div>
              <div className="form-group">
                <label>Latitude</label>
                <input
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  placeholder="6.5247"
                  required
                />
              </div>
              <div className="form-group">
                <label>Longitude</label>
                <input
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  placeholder="3.3795"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the issue"
                  required
                />
              </div>

              <div className="actions">
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceRequestModal;
