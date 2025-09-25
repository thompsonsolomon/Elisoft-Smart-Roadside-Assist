import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { fetchUsers, updateUserLocation, updateUserProfile } from "../../utils/api";
import { toast } from "react-toastify";
import ChangePinModal from "../../Auth/ChangePIn";
import ResponsiveHeader from "./ResponsiveHeader";
import { LocationName } from "../../helpers/GetLocationName";

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
    services: Array.isArray(user?.services) ? user.services : [],
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
    bankCode: user?.bankCode || "",
    accountName: user?.accountName || user?.name || "",
    role: user?.role || "Mechanic",
  });

  const userType = user?.role?.toLowerCase();

  // Fetch (refresh) user details
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await fetchUsers();
        setUserData(data?.data?.user?.user || user);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Get geolocation
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

  // Fetch banks
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await axios.get("https://api.paystack.co/bank", {
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET}`,
          },
        });
        setBanks(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch banks", error);
      }
    };
    fetchBanks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Services are now stored as simple strings (no price)
  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const services = new Set(prev.services || []);
      if (checked) services.add(value);
      else services.delete(value);
      return { ...prev, services: Array.from(services) };
    });
  };

  const handleChangeLocation = async (e) => {
    e?.preventDefault?.();
    setLoadAction(true);
    try {
      const Credentials = {
        location: {
          type: "Point",
          coordinates: [Number(location.longitude), Number(location.latitude)],
        }
      };
      const res = await updateUserLocation(Credentials);
      toast.success(res.message || "Location updated successfully!");
      setLoadAction(false);
    } catch (err) {
      console.error("Error updating location:", err);
      toast.error("Failed to update location");
      setLoadAction(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadAction(true);
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
        bankCode: formData.bankCode,
        accountName: formData.accountName,
        role: formData.role,
      };
      const res = await updateUserProfile(Credentials);
      localStorage.setItem("Elisoft Assist_user", JSON.stringify(res.data.user));
      toast.success(res.message || "Profile updated successfully!");
      setLoadAction(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile");
      setLoadAction(false);
    }
  };

  // Plan limits (display purposes)
  const planLimits = { basic: 1, standard: 3, premium: "Unlimited" };
  const assistanceLimit = planLimits[UserData?.currentPlan] || 1;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Top bar */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-sm text-gray-600 hover:text-gray-900">
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900">Profile</h1>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={logout} className="text-sm font-medium text-yellow-600 hover:text-yellow-700">Logout</button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Hero & Summary */}
        <div className="lg:col-span-5 space-y-6">
          {/* Hero / Gradient Card */}
          <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-yellow-500 via-orange-400 to-pink-500 p-6 shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none"></div>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full ring-4 ring-white overflow-hidden shadow-lg bg-white/30 flex items-center justify-center">
                <img src={"placeholder-user.jpg"} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="text-white">
                <h2 className="text-2xl font-bold leading-tight">{UserData?.fullName || "John Doe"}</h2>
                <p className="text-sm opacity-90">{UserData?.role || "Mechanic"}</p>
                <div className="mt-2 text-xs bg-white/20 py-1 px-3 rounded-full inline-flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 00-6 6v1H3a1 1 0 000 2h1v1a6 6 0 006 6 6 6 0 006-6v-1h1a1 1 0 000-2h-1V8a6 6 0 00-6-6z" /></svg>
                  <span>{UserData?.isPhoneVerified ? "Verified" : "Not Verified"}</span>
                </div>
              </div>
            </div>

            {/* small stats */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="bg-white/20 rounded-lg p-3 text-white">
                <p className="text-xs">Joined</p>
                <p className="text-sm font-semibold">{UserData?.createdAt ? new Date(UserData.createdAt).toLocaleDateString() : "N/A"}</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-white">
                <p className="text-xs">Status</p>
                <p className="text-sm font-semibold">{UserData?.isAvailable ? "Available" : "Unavailable"}</p>
              </div>
            </div>
          </div>

          {/* Bio Card */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">User Bio</h3>

            {userType === "mechanic" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                <div className="space-y-1">
                  <p className="text-xs text-gray-400">License</p>
                  <p className="font-medium">{UserData?.licenseNumber || "N/A"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400">Verified</p>
                  <p className="font-medium">{UserData?.isPhoneVerified ? "Yes" : "No"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400">Status</p>
                  <p className="font-medium">{UserData?.isAvailable ? "Available" : "Unavailable"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400">Joined</p>
                  <p className="font-medium">{UserData?.createdAt ? new Date(UserData.createdAt).toDateString() : "N/A"}</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                <div className="space-y-1">
                  <p className="text-xs text-gray-400">Plan</p>
                  <p className="font-medium">{UserData?.currentPlan || "N/A"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400">Verified</p>
                  <p className="font-medium">{UserData?.isPhoneVerified ? "Yes" : "No"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400">Car Type</p>
                  <p className="font-medium">{UserData?.car || "N/A"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400">Free Assistance</p>
                  <p className="font-medium">{UserData?.currentPlan === "premium" ? "Unlimited" : `${UserData?.firstAssistance || 0} / ${assistanceLimit}`}</p>
                </div>
              </div>
            )}

            <div className="mt-6">
              <ChangePinModal />
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex flex-col gap-5 items-start justify-between">
              <div>
                <h4 className="text-sm font-semibold text-gray-700">Location</h4>
                <p className="text-xs text-gray-500 mt-1">Update your current coordinates for quicker service matching.</p>
              </div>
              <div className="text-sm text-gray-500">
                <LocationName
                  lat={location.latitude}
                  lon={location.longitude}
                />
                
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={handleChangeLocation}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg py-2 px-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold"
              >
                {loadAction ? "Updating..." : "Set Current Location"}
              </button>

              <button
                onClick={() => {
                  navigator.geolocation?.getCurrentPosition?.(({ coords }) => {
                    setLocation({ latitude: coords.latitude, longitude: coords.longitude });
                    toast.success("Coordinates refreshed");
                  });
                }}
                className="inline-flex items-center justify-center gap-2 rounded-lg py-2 px-3 border border-gray-200 bg-white text-gray-700"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Right: Edit Form (cards) */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info Card */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600 block mb-2">Full name</label>
                  <input name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-2">Phone number</label>
                  <input name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-600 block mb-2">Address</label>
                  <input name="address" value={formData.address} onChange={handleChange} className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300" />
                </div>
              </div>
            </div>

            {/* Services & Experience Card (only for mechanics) */}
            {userType === "mechanic" && (
              <div className="bg-white rounded-2xl shadow p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Services & Experience</h3>
                  <p className="text-sm text-gray-500">Select services you offer</p>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-56 overflow-y-auto">
                  {mechanicServices.map((svc) => {
                    const checked = (formData.services || []).includes(svc);
                    return (
                      <label key={svc} className="flex items-center gap-3 p-3 border rounded-lg hover:shadow">
                        <input
                          type="checkbox"
                          value={svc}
                          checked={checked}
                          onChange={handleServiceChange}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-700">{svc}</span>
                      </label>
                    );
                  })}
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 block mb-2">Years of experience</label>
                    <input name="yearsOfExperience" type="number" value={formData.yearsOfExperience} onChange={handleChange} className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300" />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600 block mb-2">License number</label>
                    <input name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300" />
                  </div>
                </div>
              </div>
            )}

            {/* Bank Card */}
            {userType === "mechanic" && (
              <div className="bg-white rounded-2xl shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Bank & Payment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 block mb-2">Account number</label>
                    <input name="accountNumber" value={formData.accountNumber} onChange={handleChange} className="w-full border border-gray-200 rounded px-3 py-2" />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600 block mb-2">Bank</label>
                    <select
                      value={selectedBankCode}
                      onChange={(e) => {
                        const code = e.target.value;
                        setSelectedBankCode(code);
                        const bank = banks.find((b) => b.code === code);
                        if (bank) {
                          setFormData((prev) => ({ ...prev, bankName: bank.name, bankCode: bank.code }));
                        } else {
                          setFormData((prev) => ({ ...prev, bankName: "", bankCode: "" }));
                        }
                      }}
                      className="w-full border text-black border-gray-200 rounded px-3 py-2"
                    >
                      <option value="">Select a bank</option>
                      {banks.map((bank) => (
                        <option key={bank.id} value={bank.code}>{bank.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-600 block mb-2">Account name</label>
                    <input name="accountName" value={formData.accountName} onChange={handleChange} className="w-full border border-gray-200 rounded px-3 py-2" />
                    {loading && <p className="text-xs text-gray-500 mt-2">Resolving account...</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={loadAction}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-400 hover:from-yellow-600 hover:to-orange-500 text-white font-semibold py-3 rounded-xl shadow-lg"
              >
                {loadAction ? "Saving..." : "Save Profile"}
              </button>

              <button
                type="button"
                onClick={() => {
                  // Reset form to last saved values
                  setFormData({
                    name: UserData?.fullName || "",
                    phone: UserData?.phone || "",
                    address: UserData?.address || "",
                    services: Array.isArray(UserData?.services) ? UserData.services : [],
                    yearsOfExperience: UserData?.yearsOfExperience || "",
                    licenseNumber: UserData?.licenseNumber || "",
                    accountNumber: UserData?.accountNumber || "",
                    bankName: UserData?.bankName || "",
                    bankCode: UserData?.bankCode || "",
                    accountName: UserData?.accountName || UserData?.name || "",
                    role: UserData?.role || "Mechanic",
                  });
                  toast.info("Form reset to current profile");
                }}
                className="px-4 py-3 border rounded-xl bg-white text-gray-700"
              >
                Reset
              </button>
            </div>
          </form>

        </div>
      </div>
      <div className="mt-20 visible md:hidden">
          <ResponsiveHeader />
      </div>
    </div>
  );
}
