// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { Settings, Save } from "lucide-react";
// import { UpdatePlan } from "../../utils/api"; // You already have this setup

// const AdminPlans = () => {
//   const [plans, setPlans] = useState([]);
//   const [editingPlan, setEditingPlan] = useState(null);
//   const [formData, setFormData] = useState({
//     price: "",
//     services: [],
//     coverageRadius: "",
//   });
//   const [loading, setLoading] = useState(false);

//   // Dummy data for preview
//   useEffect(() => {
//     setPlans([
//       {
//         _id: "1",
//         name: "Basic Plan",
//         price: 3000,
//         services: ["Tyre Change", "Battery Jump Start"],
//         coverageRadius: 10,
//       },
//       {
//         _id: "2",
//         name: "Pro Plan",
//         price: 8000,
//         services: ["Fuel Delivery", "Tyre Change", "Battery Jump Start"],
//         coverageRadius: 25,
//       },
//       {
//         _id: "3",
//         name: "Elite Plan",
//         price: 15000,
//         services: [
//           "Battery Jump Start",
//           "Tyre Change",
//           "Fuel Delivery",
//           "Key Lockout",
//         ],
//         coverageRadius: 50,
//       },
//     ]);
//   }, []);

//   const handleEdit = (plan) => {
//     setEditingPlan(plan._id);
//     setFormData({
//       price: plan.price,
//       services: plan.services,
//       coverageRadius: plan.coverageRadius,
//     });
//   };

//   const handleServiceChange = (index, value) => {
//     const newServices = [...formData.services];
//     newServices[index] = value;
//     setFormData({ ...formData, services: newServices });
//   };

//   const addService = () => {
//     setFormData({ ...formData, services: [...formData.services, ""] });
//   };

//   const removeService = (index) => {
//     const newServices = formData.services.filter((_, i) => i !== index);
//     setFormData({ ...formData, services: newServices });
//   };

//   const handleSubmit = async (id) => {
//     try {
//       setLoading(true);
//       await UpdatePlan(id, formData);
//       toast.success("Plan updated successfully!");
//       setEditingPlan(null);
//     } catch (err) {
//       toast.error("Failed to update plan");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white py-10 px-5 flex flex-col items-center">
//       <header className="max-w-6xl w-full flex justify-between items-center mb-10">
//         <h1 className="text-3xl font-extrabold text-yellow-500 flex items-center gap-2">
//           <Settings size={24} /> Manage Membership Plans
//         </h1>
//       </header>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
//         {plans.map((plan) => (
//           <div
//             key={plan._id}
//             className="bg-gradient-to-br from-yellow-700/10 via-black to-yellow-900/10 border border-yellow-600/20 rounded-2xl p-6 shadow-lg hover:border-yellow-500/40 hover:shadow-yellow-500/10 transition-all duration-300"
//           >
//             <h2 className="text-xl font-bold text-yellow-400 mb-2">
//               {plan.name}
//             </h2>
//             {editingPlan === plan._id ? (
//               <>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="text-gray-400 text-sm">Price (₦)</label>
//                     <input
//                       type="number"
//                       value={formData.price}
//                       onChange={(e) =>
//                         setFormData({ ...formData, price: e.target.value })
//                       }
//                       className="w-full bg-black/70 border border-yellow-500/20 rounded-lg px-3 py-2 text-gray-200 focus:border-yellow-400 outline-none"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-gray-400 text-sm mb-2 block">
//                       Services
//                     </label>
//                     {formData.services.map((service, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center gap-2 mb-2 animate-fadeIn"
//                       >
//                         <input
//                           type="text"
//                           value={service}
//                           onChange={(e) =>
//                             handleServiceChange(index, e.target.value)
//                           }
//                           className="flex-1 bg-black/70 border border-yellow-500/20 rounded-lg px-3 py-2 text-gray-200 focus:border-yellow-400 outline-none"
//                         />
//                         <button
//                           onClick={() => removeService(index)}
//                           className="text-red-400 hover:text-red-500"
//                         >
//                           ✕
//                         </button>
//                       </div>
//                     ))}
//                     <button
//                       onClick={addService}
//                       className="text-yellow-400 text-sm hover:text-yellow-300"
//                     >
//                       + Add Service
//                     </button>
//                   </div>

//                   <div>
//                     <label className="text-gray-400 text-sm">
//                       Coverage Radius (km)
//                     </label>
//                     <input
//                       type="number"
//                       value={formData.coverageRadius}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           coverageRadius: e.target.value,
//                         })
//                       }
//                       className="w-full bg-black/70 border border-yellow-500/20 rounded-lg px-3 py-2 text-gray-200 focus:border-yellow-400 outline-none"
//                     />
//                   </div>

//                   <button
//                     onClick={() => handleSubmit(plan._id)}
//                     disabled={loading}
//                     className="w-full bg-yellow-500 text-black py-2 mt-3 rounded-lg font-semibold hover:bg-yellow-400 transition disabled:opacity-50 flex items-center justify-center gap-2"
//                   >
//                     {loading ? (
//                       <>
//                         <Save className="animate-spin" size={16} />
//                         Updating...
//                       </>
//                     ) : (
//                       <>
//                         <Save size={16} /> Save Changes
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <p className="text-gray-400 text-sm mb-3">
//                   <strong>Price:</strong> ₦{plan.price.toLocaleString()}
//                 </p>
//                 <p className="text-gray-400 text-sm mb-3">
//                   <strong>Coverage:</strong> {plan.coverageRadius} km
//                 </p>
//                 <div className="mb-4">
//                   <p className="text-gray-400 text-sm mb-1 font-semibold">
//                     Services:
//                   </p>
//                   <ul className="list-disc list-inside text-gray-400 text-sm">
//                     {plan.services.map((s, i) => (
//                       <li key={i}>{s}</li>
//                     ))}
//                   </ul>
//                 </div>
//                 <button
//                   onClick={() => handleEdit(plan)}
//                   className="w-full bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
//                 >
//                   Edit Plan
//                 </button>
//               </>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminPlans;



import React, { useState, useEffect } from "react";
import { PlusCircle, Eye, Edit, Trash2, Save } from "lucide-react";
import { toast } from "react-toastify";
import {
  GetPaymentPlans,
  CreatePlan,
  UpdatePlan,
  DeletePlan,
} from "../../../utils/api"; // You already have these
import { useAuth } from "../../../contexts/AuthContext";

const AdminPlans = () => {
  const { user } = useAuth();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    services: [""],
    coverageRadius: "",
    description: "",
    duration:""
  });

  // ✅ Fetch existing plans
  const fetchPlans = async () => {
    try {
      const res = await GetPaymentPlans();
      setPlans(res?.data?.data || []);
    } catch (err) {
      toast.error("Failed to load plans");
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // ✅ Handle create plan
  const handleCreate = async () => {
    try {
      setLoading(true);
      await CreatePlan({
        name: formData.name,
        price: Number(formData.price),
        services: formData.services.filter((s) => s.trim() !== ""),
        coverageRadius: Number(formData.coverageRadius),
      });
      toast.success("New plan created successfully!");
      setIsModalOpen(false);
      setFormData({ name: "", price: "", services: [""], coverageRadius: "" });
      fetchPlans();
    } catch (err) {
      toast.error("Error creating plan");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle edit plan
  const handleEdit = async (planId) => {
    try {
      setLoading(true);
      await UpdatePlan(planId, {
        price: Number(formData.price),
        services: formData.services,
        coverageRadius: Number(formData.coverageRadius),
      });
      toast.success("Plan updated successfully");
      setEditing(null);
      fetchPlans();
    } catch {
      toast.error("Failed to update plan");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle delete plan
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

  // ✅ Handle input changes
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleServiceChange = (index, value) => {
    const newServices = [...formData.services];
    newServices[index] = value;
    setFormData({ ...formData, services: newServices });
  };

  const addService = () =>
    setFormData({ ...formData, services: [...formData.services, ""] });

  const removeService = (index) => {
    const newServices = formData.services.filter((_, i) => i !== index);
    setFormData({ ...formData, services: newServices });
  };

  return (
    <div className="min-h-screen  text-white py-10 px-5 flex flex-col items-center">
      {/* Header */}
      <header className="max-w-6xl w-full flex justify-between items-center mb-10">
        <h1 className="text-3xl font-extrabold text-yellow-500 flex items-center gap-2">
          Membership Plans
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-yellow-500 text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-400 transition font-semibold"
        >
          <PlusCircle size={18} /> Create Plan
        </button>
      </header>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className="bg-gradient-to-br from-yellow-800/10 via-black to-yellow-900/10 border border-yellow-600/30 rounded-2xl p-6 shadow-lg hover:shadow-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300"
          >
            {editing === plan._id ? (
              <>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price (₦)"
                  className="w-full bg-black/80 border border-yellow-500/20 rounded-lg px-3 py-2 mb-2 text-gray-100"
                />
                <input
                  type="number"
                  name="coverageRadius"
                  value={formData.coverageRadius}
                  onChange={handleChange}
                  placeholder="Coverage Radius (km)"
                  className="w-full bg-black/80 border border-yellow-500/20 rounded-lg px-3 py-2 mb-3 text-gray-100"
                />

                {formData.services.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={s}
                      onChange={(e) => handleServiceChange(i, e.target.value)}
                      placeholder="Service"
                      className="flex-1 bg-black/80 border border-yellow-500/20 rounded-lg px-3 py-2 text-gray-100"
                    />
                    <button
                      onClick={() => removeService(i)}
                      className="text-red-400 hover:text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={addService}
                  className="text-yellow-400 text-sm mb-3"
                >
                  + Add Service
                </button>

                <button
                  onClick={() => handleEdit(plan._id)}
                  className="w-full bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
                >
                  <Save size={16} className="inline mr-2" />
                  Save Changes
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-yellow-400 mb-2">
                  {plan.name}
                </h2>
                <p className="text-gray-400 text-sm mb-1">
                  <strong>Price:</strong> ₦{plan.price}
                </p>
                <p className="text-gray-400 text-sm mb-1">
                  <strong>Coverage:</strong> {plan.coverageRadius} km
                </p>
                
                <p className="text-gray-400 text-sm font-semibold mt-3 mb-2">
                  Services:
                </p>
                <ul className="list-disc list-inside text-gray-400 text-sm mb-4">
                  {plan.services.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditing(plan._id);
                      setFormData({
                        price: plan.price,
                        services: plan.services,
                        coverageRadius: plan.coverageRadius,
                      });
                    }}
                    className="flex-1 bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:bg-yellow-400 transition flex justify-center items-center gap-1"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(plan._id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-400 transition flex justify-center items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Create Modal */}
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

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Plan Name"
              className="w-full bg-black/80 border border-yellow-500/20 rounded-lg px-3 py-2 mb-3 text-gray-100"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price (₦)"
              className="w-full bg-black/80 border border-yellow-500/20 rounded-lg px-3 py-2 mb-3 text-gray-100"
            />
            <input
              type="number"
              name="coverageRadius"
              value={formData.coverageRadius}
              onChange={handleChange}
              placeholder="Coverage Radius (km)"
              className="w-full bg-black/80 border border-yellow-500/20 rounded-lg px-3 py-2 mb-4 text-gray-100"
            />

             <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="duration"
              className="w-full bg-black/80 border border-yellow-500/20 rounded-lg px-3 py-2 mb-4 text-gray-100"
            />

            {formData.services.map((s, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={s}
                  onChange={(e) => handleServiceChange(i, e.target.value)}
                  placeholder="Service"
                  className="flex-1 bg-black/80 border border-yellow-500/20 rounded-lg px-3 py-2 text-gray-100"
                />
                <button
                  onClick={() => removeService(i)}
                  className="text-red-400 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}


             <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="description"
              className="w-full bg-black/80 border border-yellow-500/20 rounded-lg px-3 py-2 mb-4 text-gray-100"
            />


            <button
              onClick={addService}
              className="text-yellow-400 text-sm mb-4"
            >
              + Add Service
            </button>

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