import React, { useState, useEffect } from "react";
import { PlusCircle, Edit, Trash2, Save } from "lucide-react";
import { toast } from "react-toastify";
import {
  GetPaymentPlans,
  CreatePlan,
  UpdatePlan,
  DeletePlan,
} from "../../../utils/api";
import { useAuth } from "../../../contexts/AuthContext";
import LoadingSpinner from "../../common/LoadingSpinner";

const AdminPlans = () => {
  const { user } = useAuth();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loadFetch, setLoadFetch] = useState(false)

  const planNames = ["Basic", "Standard", "Premium", "Fleet"];

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    durationMonths: "",
    description: "",
  });

  // Fetch Plans
  const fetchPlans = async () => {
    setLoadFetch(true)
    try {
      const res = await GetPaymentPlans();
      setPlans(res?.data?.plans || []);
      setLoadFetch(false)
    } catch (err) {
      toast.error("Failed to load plans");
      setLoadFetch(false)
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Create Plan
  const handleCreate = async () => {
    if (!formData.name || !formData.price || !formData.durationMonths) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: formData.name,
        price: Number(formData.price),
        durationMonths: Number(formData.durationMonths),
        description: formData.description,
      };

      const res = await CreatePlan(payload);
      if (res) {
        toast.success("Plan created successfully!");
      }
      setIsModalOpen(false);
      resetForm();
      fetchPlans();
    } catch (err) {
      console.error("error" + err);
      toast.error("Failed to create plan");
    } finally {
      setLoading(false);
    }
  };

  // Edit Plan
  const handleEdit = async (planId) => {
    try {
      setLoading(true);

      const payload = {
        price: Number(formData.price),
        durationMonths: Number(formData.durationMonths),
        description: formData.description,
      };

      await UpdatePlan(planId, payload);

      toast.success("Plan updated successfully");
      setEditing(null);
      resetForm();
      fetchPlans();
    } catch (err) {
      toast.error("Failed to update plan");
    } finally {
      setLoading(false);
    }
  };

  // Delete Plan
  const handleDelete = async (planId) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;

    try {
      await DeletePlan(planId);
      toast.success("Plan deleted successfully");
      fetchPlans();
    } catch {
      toast.error("Failed to delete plan");
    }
  };

  const resetForm = () =>
    setFormData({
      name: "",
      price: "",
      durationMonths: "",
      description: "",
    });

  return (
    <div className="min-h-screen text-white py-10 px-5 flex flex-col items-center">
      {/* Header */}
      <header className="max-w-6xl w-full flex justify-between items-center mb-10">
        <h1 className="text-3xl font-extrabold text-yellow-500 flex items-center gap-2">
          Membership Plans
        </h1>

        {/* Create Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-yellow-500 text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-400 transition font-semibold"
        >
          <PlusCircle size={18} /> Create Plan
        </button>
      </header>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {
          loadFetch && <span className="flex gap-3" >
            Loading ...
            <div className={`loading-spinner size-4 mb-4`}></div>
          </span>
        }
        {plans.map((plan) => (
          <div
            key={plan._id}
            className="bg-gradient-to-br from-yellow-800/10 via-black to-yellow-900/10 border border-yellow-600/30 rounded-2xl p-6 shadow-lg hover:shadow-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300"
          >
            {editing === plan._id ? (
              <>
                {/* Edit - Price */}
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price (₦)"
                  className="w-full bg-black/80 border border-yellow-500/20 rounded-lg px-3 py-2 mb-3 text-gray-100"
                />

                {/* Edit - Duration */}
                <select
                  name="durationMonths"
                  value={formData.durationMonths}
                  onChange={handleChange}
                  className="w-full bg-black/80 border border-yellow-500/20 rounded-lg px-3 py-2 mb-3 text-gray-100"
                >
                  <option value="">Select Duration</option>
                  <option value="1">1 Month</option>
                  <option value="3">3 Months</option>
                  <option value="6">6 Months</option>
                  <option value="12">1 Year</option>
                </select>

                {/* Edit - Description */}
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="w-full bg-black/80 border border-yellow-500/20 rounded-lg px-3 py-2 mb-4 text-gray-100"
                />

                <button
                  onClick={() => handleEdit(plan._id)}
                  className="w-full bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:bg-yellow-400 transition flex justify-center items-center gap-2"
                >
                  <Save size={16} /> Save Changes
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-yellow-400 mb-2">
                  {plan.name}
                </h2>
                <p className="text-gray-400 mb-1">
                  <strong>Price:</strong>
                  ₦{new Intl.NumberFormat("en-NG").format(plan.price)}

                </p>
                <p className="text-gray-400 mb-1">
                  <strong>Duration:</strong> {plan.durationMonths} month(s)
                </p>
                <p className="text-gray-400 mb-3">
                  <strong>Description:</strong> {plan.description || "—"}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditing(plan._id);
                      setFormData({
                        price: plan.price,
                        durationMonths: plan.durationMonths,
                        description: plan.description,
                      });
                    }}
                    className="flex-1 bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:bg-yellow-400 transition flex justify-center items-center gap-2"
                  >
                    <Edit size={16} /> Edit
                  </button>

                  <button
                    onClick={() => handleDelete(plan._id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-400 transition flex justify-center items-center gap-2"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}


      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <div className="bg-gradient-to-br from-black via-gray-900 to-yellow-900/20 border border-yellow-600/30 rounded-2xl p-8 shadow-2xl w-full max-w-md relative animate-fadeIn">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-yellow-500"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
              Create New Plan
            </h2>

            {/* Plan Name */}
            <label className="block text-gray-400 text-sm mb-2">Plan Name</label>
            <select
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-black/80 border border-yellow-500/20 rounded-lg px-3 py-2 mb-4 text-gray-100"
            >
              <option value="">Select Plan</option>
              {planNames.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            {/* Price */}
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price (₦)"
              className="w-full bg-black/80 border border-yellow-500/20 rounded-lg px-3 py-2 mb-4 text-gray-100"
            />

            {/* Duration */}
            <select
              name="durationMonths"
              value={formData.durationMonths}
              onChange={handleChange}
              className="w-full bg-black/80 border border-yellow-500/20 rounded-lg px-3 py-2 mb-4 text-gray-100"
            >
              <option value="">Select Duration</option>
              <option value="1">1 Month</option>
              <option value="3">3 Months</option>
              <option value="6">6 Months</option>
              <option value="12">1 Year</option>
            </select>

            {/* Description */}
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full bg-black/80 border border-yellow-500/20 rounded-lg px-3 py-2 mb-5 text-gray-100"
            />

            {/* Submit */}
            <button
              onClick={handleCreate}
              disabled={loading}
              className="w-full bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              {loading ? "Creating..." : "Create Plan"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPlans;