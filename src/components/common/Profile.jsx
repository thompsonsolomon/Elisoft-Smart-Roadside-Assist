
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const mechanicServices = [
  "Roadside Assistant",
  "Mechanic Repair",
  "Towing Service",
  "Electric Rewire / Battery Jumpstart",
  "Flat Tyre",
  "Car Service Center",
  "Body Repair",
  "Break Repair",
  "Car AC Repair",
  "Engine Diagnostic",
  "Wheel Alignment",
  "Oil Change",
  "Body Painting",
  "Key Lockout"
];

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const PAYSTACK_SECRET = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    services: user?.services || [],
    yearsOfExperience: user?.yearsOfExperience || "",
    licenseNumber: user?.licenseNumber || "",
    accountNumber: user?.accountNumber
      || (user?.phone
        ? user.phone.startsWith("0")
          ? user.phone.slice(1)
          : user.phone.startsWith("+234")
            ? user.phone.replace("+234", "")
            : user.phone
        : "")
    ,
    bankName: user?.bankName || "",
    accountName: user?.accountName || user?.name || "",
    latitude: user?.latitude || "",
    longitude: user?.longitude || "",
    role: user?.role || "Mechanic",
  });

  const userType = user?.role
  const [banks, setBanks] = useState([]);
  const [selectedBankCode, setSelectedBankCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setFormData((prev) => ({
            ...prev,
            latitude: coords.latitude,
            longitude: coords.longitude
          }));
        },
        (error) => console.error("Error getting location:", error)
      );
    }
  }, []);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await axios.get("https://api.paystack.co/bank", {
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET}`,
          },
        });
        setBanks(res.data.data);
        setFormData((prev) => ({
          ...prev,
          bankName: res.data.data[0]?.name || "", // set first bank's name as default
        }));
      } catch (error) {
        console.error("Failed to fetch banks", error);
      }
    };

    fetchBanks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prev) => {
      const updatedServices = checked
        ? [...prev.services, { name: value, price: "" }]
        : prev.services.filter((s) => s.name !== value);

      return {
        ...prev,
        services: updatedServices
      };
    });
  };

  const handlePriceChange = (serviceName, price) => {
    console.log("Typed Price:", price);

    setFormData((prev) => {
      const updatedServices = prev.services.map((service) =>
        service.name === serviceName ? { ...service, price } : service
      );

      console.log("Updated Services:", updatedServices);
      return {
        ...prev,
        services: updatedServices,
      };
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving profile:", formData);
  };


  // Plan limit logic
  const planLimits = {
    basic: 1,
    standard: 3,
    premium: "Unlimited",
  };

  const assistanceLimit = planLimits[user?.currentPlan] || 1;
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-sm text-yellow-400 font-bold  text-left cursor-pointer" onClick={() => navigate(-1)} >My Profile</h4>
        <button onClick={logout} className="outline-none border-none bg-transparent text-yellow-400 p-0 hover:text-red-500">Logout</button>
      </div>
      <div className="flex flex-col items-center justify-center gap-6 mb-8">
        <img
          src={"placeholder-user.jpg"}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-2 border-yellow-500"
        />
        <div className="flex  flex-col text-center justify-center sm:text-left">
          <h2 className="text-2xl font-bold text-black capitalize">{user?.name || "John Doe"}</h2>
          <p className="text-gray-600 capitalize">{user?.role || "Mechanic"}</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded shadow border max-w-2xl mx-auto mt-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">User Bio</h2>
        {userType === "mechanic" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            {/* ============ Mechanic Bio ============ */}
            <div>
              <strong>License Number:</strong>{" "}
              <span>{user?.licenseNumber || "N/A"}</span>
            </div>

            <div>
              <strong>Verified:</strong>{" "}
              <span className={user?.isVerified ? "text-green-600" : "text-red-500"}>
                {user?.isVerified ? "Yes" : "No"}
              </span>
            </div>

            <div>
              <strong>Status:</strong>{" "}
              <span className={user?.isAvailable ? "text-green-600" : "text-red-500"}>
                {user?.isAvailable ? "Available" : "Unavailable"}
              </span>
            </div>

            <div>
              <strong>Joined:</strong>{" "}
              {user?.createdAt ? new Date(user?.createdAt).toDateString() : "N/A"}
            </div>
          </div>
        )}

        {userType === "customer" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            {/* ============ Customer Bio ============ */}
            <div>
              <strong>Plan:</strong>{" "}
              {user?.currentPlan.charAt(0).toUpperCase() + user?.currentPlan.slice(1)}
            </div>

            <div>
              <strong>Verified:</strong>{" "}
              <span className={user?.isVerified ? "text-green-600" : "text-red-500"}>
                {user?.isVerified ? "Yes" : "No "}
                {!user?.isVerified && (
                  <span className="text-[10px] text-green-600">
                    Complete profile to get verified
                  </span>
                )}
              </span>
            </div>

            <div>
              <strong>Subscription:</strong>{" "}
              <span className={user?.subscribed ? "text-green-600" : "text-red-500"}>
                {user?.subscribed ? "Active" : "Inactive"}
              </span>
            </div>
            <div>
              <strong>Car Type:</strong>{" "}
              {user?.car}
            </div>
            <div>
              <strong>Free Assistance Left:</strong>{" "}
              {user?.currentPlan === "premium" ? (
                <span className="text-green-600">Unlimited</span>
              ) : (
                `${user?.firstAssistance} / ${user?.currentPlan === "basic" ? 1 : 3}`
              )}
            </div>

            <div>
              <strong>Joined:</strong>{" "}
              {user?.createdAt ? new Date(user?.createdAt).toDateString() : "N/A"}
            </div>
          </div>
        )}


      </div>
      {/* Profile Details */}
      <div className="max-w-3xl mx-auto py-10 px-6">
        <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow p-6 rounded-lg">
          <div>
            <label className="block text-black font-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full border px-3 py-2 rounded"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-black font-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border px-3 py-2 rounded"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-black font-semibold">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="w-full border px-3 py-2 rounded"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-black font-semibold">Address</label>
            <input
              type="text"
              name="address"
              className="w-full border px-3 py-2 rounded"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          {userType === "mechanic" && (
            <>
              <div>
                <label className="block text-black font-semibold mb-2">Service Areas</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto border p-3 rounded">
                  {mechanicServices.map((service) => {
                    const selected = formData.services.find((s) => s.name === service);

                    return (
                      <div key={service} className="mb-3 flex items-center gap-3">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            value={service}
                            // checked={formData.services.includes(service)}
                            checked={!!selected}
                            onChange={handleServiceChange}
                            className="accent-yellow-500"
                          />
                          <span className="text-sm text-black">{service}</span>
                        </label>

                        {selected && (
                          <input
                            type="number"
                            placeholder="Enter price"
                            value={selected.price}
                            onChange={(e) => handlePriceChange(service, e.target.value)}
                            className="border px-2 py-1 rounded w-40"
                          />
                        )}
                      </div>
                    );
                  })}

                </div>
              </div>

              <div>
                <label className="block text-black font-semibold">Years of Experience</label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  className="w-full border px-3 py-2 rounded"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                />
              </div>



              <div>
                <label className="block text-black font-semibold">Account Number</label>
                <input
                  type="number"
                  name="accountNumber"
                  className="w-full border px-3 py-2 rounded"
                  maxLength={10}
                  value={formData.accountNumber}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-black font-semibold">Bank</label>
                <select
                  name="bankName"
                  className="w-full text-black border px-3 py-2 rounded"
                  value={selectedBankCode}
                  onChange={(e) => {
                    const selectedCode = e.target.value;
                    setSelectedBankCode(selectedCode);

                    // Find the selected bank object by its code
                    const selectedBank = banks.find((bank) => bank.code === selectedCode);

                    // Update form data with bank name and code
                    if (selectedBank) {
                      setFormData((prev) => ({
                        ...prev,
                        bankName: selectedBank.name,
                        bankCode: selectedBank.code, // optional: in case you need it separately
                      }));
                    }
                  }}
                >
                  <option className="text-black" value="">Select a bank</option>
                  {banks.map((bank) => (
                    <option className="text-black" key={bank.id} value={bank.code}>
                      {bank.name}
                    </option>
                  ))}
                </select>

              </div>

              <div>
                <label className="block text-black font-semibold">Account Name</label>
                <input
                  type="text"
                  name="accountName"
                  className="w-full border px-3 py-2 rounded "
                  value={formData.accountName}
                  onChange={handleChange}
                />
                {loading && <p className="text-sm text-gray-500">Resolving account...</p>}
              </div>

              <div>
                <label className="block text-black font-semibold">License Number</label>
                <input
                  type="text"
                  name="licenseNumber"
                  className="w-full border px-3 py-2 rounded"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>

  );
}