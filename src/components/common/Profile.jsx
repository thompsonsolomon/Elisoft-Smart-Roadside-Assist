import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { fetchUsers, updateUserLocation, updateUserProfile } from "../../utils/api";
import { toast } from "react-toastify";
import ChangePinModal from "../../Auth/ChangePIn";

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
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const PAYSTACK_SECRET = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const [loadAction, setLoadAction] = useState(false);
  const [UserData, setUserData] = useState(user || null);
  const [banks, setBanks] = useState([]);
  const [selectedBankCode, setSelectedBankCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const [formData, setFormData] = useState({
    name: user?.fullName || "",
    phone: user?.phone || "",
    address: user?.address || "",
    services: user?.services || [],
    yearsOfExperience: user?.yearsOfExperience || "",
    licenseNumber: user?.licenseNumber || "",
    accountNumber:
      user?.accountNumber ||
      (user?.phone
        ? user.phone.startsWith("0")
          ? user.phone.slice(1)
          : user.phone.startsWith("+234")
            ? user.phone.replace("+234", "")
            : user.phone
        : ""),
    bankName: user?.bankName || "",
    accountName: user?.accountName || user?.name || "",
    role: user?.role || "Mechanic",
  });

  const userType = user?.role?.toLowerCase();

  // ✅ Fetch user details
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await fetchUsers();
        setUserData(data?.data?.user?.user || user);
        console.log(user)
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUserData();
  }, [user]);

  // ✅ Get location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setLocation({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        (error) => console.error("Error getting location:", error)
      );
    }
  }, []);

  // ✅ Fetch banks
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await axios.get("https://api.paystack.co/bank", {
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET}`,
          },
        });
        setBanks(res.data.data);
      } catch (error) {
        console.error("Failed to fetch banks", error);
      }
    };
    fetchBanks();
  }, []);

  // ✅ Form handlers
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
      return { ...prev, services: updatedServices };
    });
  };

  const handlePriceChange = (serviceName, price) => {
    setFormData((prev) => {
      const updatedServices = prev.services.map((service) =>
        service.name === serviceName ? { ...service, price } : service
      );
      return { ...prev, services: updatedServices };
    });
  };
  const handleChangeLocation = async (e) => {
    setLoadAction(true);
    e.preventDefault();
    try {
      const Credentials = {
        coordinates: [
          Number(location.longitude),
          Number(location.latitude)
        ],
      };
      const res = await updateUserLocation(Credentials);
      console.log("Location updated:", res);
      setLoadAction(false);
      toast.success(res.message || "Location updated successfully!");
    } catch (err) {
      console.error("Error updating location:", err);
      setLoadAction(false);
    }
  };

  const handleSubmit = async (e) => {
    setLoadAction(true);
    e.preventDefault();
    try {
      const Credentials = {
        fullName: formData.name,
        phone: formData.phone,
        address: formData.address,
        services: formData.services,
        yearsOfExperience: formData.yearsOfExperience,
        licenseNumber: formData.licenseNumber,
        accountNumber: formData.accountNumber,
        bankName: formData.bankName,
        accountName: formData.accountName,
        role: formData.role,
      };
      const res = await updateUserProfile(Credentials);
      toast.success(res.message || "Profile updated successfully!");

      console.log("Profile updated:", res);
      setLoadAction(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setLoadAction(false);
    }
  };

  // ✅ Plan limits
  const planLimits = { basic: 1, standard: 3, premium: "Unlimited" };
  const assistanceLimit = planLimits[UserData?.currentPlan] || 1;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h4
          className="text-sm text-yellow-400 font-bold cursor-pointer"
          onClick={() => navigate(-1)}
        >
          My Profile
        </h4>
        <button
          onClick={logout}
          className="bg-transparent text-yellow-400 hover:text-red-500"
        >
          Logout
        </button>
      </div>

      {/* Profile Summary */}
      <div className="flex flex-col items-center gap-4">
        <img
          src={"placeholder-user.jpg"}
          alt="Profile"
          className="w-28 h-28 rounded-full border-2 border-yellow-500"
        />
        <div className="text-center">
          <h2 className="text-2xl font-bold capitalize">
            {UserData?.fullName || "John Doe"}
          </h2>
          <p className="text-gray-600 capitalize">{UserData?.role || "Mechanic"}</p>
        </div>
      </div>

      {/* Bio Section */}
      <div className="bg-white text-black p-6 mt-6 border rounded shadow">
        <h2 className="text-xl font-bold mb-4">User Bio</h2>
        {userType === "mechanic" ? (
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div><strong>License Number:</strong> {UserData?.licenseNumber || "N/A"}</div>
            <div><strong>Verified:</strong> {UserData?.isPhoneVerified ? "Yes" : "No"}</div>
            <div><strong>Status:</strong> {UserData?.isAvailable ? "Available" : "Unavailable"}</div>
            <div><strong>Joined:</strong> {UserData?.createdAt ? new Date(UserData?.createdAt).toDateString() : "N/A"}</div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div><strong>Plan:</strong> {UserData?.currentPlan || "N/A"}</div>
            <div><strong>Verified:</strong> {UserData?.isPhoneVerified ? "Yes" : "No"}</div>
            <div><strong>Subscription:</strong> {UserData?.subscribed ? "Active" : "Inactive"}</div>
            <div><strong>Car Type:</strong> {UserData?.car || "N/A"}</div>
            <div><strong>Free Assistance Left:</strong> {UserData?.currentPlan === "premium" ? "Unlimited" : `${UserData?.firstAssistance} / ${assistanceLimit}`}</div>
            <div><strong>Joined:</strong> {UserData?.createdAt ? new Date(UserData?.createdAt).toDateString() : "N/A"}</div>
          </div>
        )}
  <ChangePinModal />      </div>

      {/* Edit Form */}
      <div className="max-w-3xl mx-auto py-10">
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
          {/* Full Name */}
          <div>
            <label className="block font-semibold">Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-semibold">Phone Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>

          {userType === "mechanic" && (
            <>
              {/* Services */}
              <div>
                <label className="block font-semibold mb-2">Service Areas</label>
                <div className="grid sm:grid-cols-2 gap-2 border p-3 rounded max-h-60 overflow-y-auto">
                  {mechanicServices.map((service) => {
                    const selected = formData.services.find((s) => s.name === service);
                    return (
                      <div key={service} className="flex gap-3">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" value={service} checked={!!selected} onChange={handleServiceChange} />
                          <span>{service}</span>
                        </label>
                        {selected && (
                          <input type="number" placeholder="Price" value={selected.price} onChange={(e) => handlePriceChange(service, e.target.value)} className="border px-2 py-1 rounded w-28" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Years of Experience */}
              <div>
                <label className="block font-semibold">Years of Experience</label>
                <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
              </div>

              {/* Bank Details */}
              <div>
                <label className="block font-semibold">Account Number</label>
                <input type="number" name="accountNumber" value={formData.accountNumber} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
              </div>

              <div>
                <label className="block font-semibold">Bank</label>
                <select
                  value={selectedBankCode}
                  onChange={(e) => {
                    const code = e.target.value;
                    setSelectedBankCode(code);
                    const bank = banks.find((b) => b.code === code);
                    if (bank) {
                      setFormData((prev) => ({ ...prev, bankName: bank.name, bankCode: bank.code }));
                    }
                  }}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Select a bank</option>
                  {banks.map((bank) => (
                    <option key={bank.id} value={bank.code}>{bank.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold">Account Name</label>
                <input type="text" name="accountName" value={formData.accountName} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                {loading && <p className="text-sm text-gray-500">Resolving account...</p>}
              </div>


          {/* Location */}
          <div>
            <label className="block font-semibold">Address / Location</label>
            <button onClick={handleChangeLocation} className="w-full text-black border rounded p-2">   Change Location</button>
          </div>

              <div>
                <label className="block font-semibold">License Number</label>
                <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
              </div>
            </>
          )}

          <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
            {
              loadAction ? "Loading..." : "Save Profile"
            }
          </button>
        </form>
      </div>

    
    </div>
  );
}
