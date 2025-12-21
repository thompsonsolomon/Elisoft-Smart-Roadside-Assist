import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import {
    createServicePrice,
    getServicePriceForState,
    activateServicePrice,
    deactivateServicePrice,
    getAllServicePrices,
} from "../../../utils/api";

import { toast } from "react-toastify";
import { RefreshCcw, ToggleRight, ToggleLeft, PlusCircle } from "lucide-react";
const AdminServicePrices = () => {
    const { user } = useAuth();
    const [servicePrices, setServicePrices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newPrice, setNewPrice] = useState({ serviceType: "", basePrice: "", state: "", description: "Quick service" });
    const [state, setState] = useState("Lagos");
    const fetchPrices = async () => {
        try {
            setLoading(true);
            const data = await getAllServicePrices(state);
            setServicePrices(data?.data?.prices || []);
        } catch (err) {
            toast.error("Failed to load service prices");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrices();
    }, []);

    const handleCreatePrice = async (e) => {
        e.preventDefault();
        if (!newPrice.serviceType || !newPrice.basePrice) {
            toast.warning("All fields are required");
            return;
        }

        try {
            setLoading(true);
            await createServicePrice(newPrice);
            toast.success("Service price added successfully");
            setNewPrice({ serviceType: "", basePrice: "", state: "" });
            fetchPrices();
        } catch (err) {
            toast.error("Error adding service price");
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = async (id, isActive) => {

        try {
            setLoading(true);
            if (isActive) {
                const res = await deactivateServicePrice(id);
                toast.info("Service deactivated");
            } else {
                await activateServicePrice(user?.token, id);
                toast.success("Service activated");
            }
            fetchPrices();
        } catch (err) {
            toast.error("Action failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-10 px-5 text-white flex flex-col items-center">
            <header className="flex justify-between items-center w-full max-w-6xl mb-8">
                <h1 className="text-3xl font-bold text-yellow-500">Service Price Management</h1>
                <button
                    onClick={fetchPrices}
                    disabled={loading}
                    className="bg-yellow-500 text-black px-4 py-2 rounded-lg flex items-center gap-2 font-semibold hover:bg-yellow-400 transition"
                >
                    <RefreshCcw size={18} className={loading ? "animate-spin" : ""} /> Refresh
                </button>
            </header>

            {/* Create New Service Price */}
            <form
                onSubmit={handleCreatePrice}
                className="bg-black/60 border border-yellow-500/40 rounded-2xl p-6 mb-10 w-full max-w-3xl shadow-lg flex flex-col gap-4"
            >
                <h2 className="text-xl text-yellow-400 font-semibold flex items-center gap-2">
                    <PlusCircle size={20} /> Add New Service Price
                </h2>

                <div className="grid md:grid-cols-3 gap-4">
                    {/* ✅ Service Type Dropdown */}
                    <select
                        className="bg-transparent border border-yellow-600/40 px-3 py-2 rounded-md text-white "
                        value={newPrice.serviceType}
                        onChange={(e) => setNewPrice({ ...newPrice, serviceType: e.target.value })}
                    >
                        <option value="">Select Service</option>
                        {[
                            "Fuel Delivery",
                            "Mechanic Repair",
                            "Towing Service",
                            "Battery Jump Start",
                            "Tyre Assist",
                            "Car Service Center",
                            "Body Repair",
                            "Break Repair",
                            "Car AC Repair",
                            "Engine Diagnostic",
                            "Wheel Alignment",
                            "Oil Change",
                            "Body Painting",
                            "Key Lockout",
                        ].map((service, index) => (
                            <option key={index} className="text-black bg-transparent" value={service}>
                                {service}
                            </option>
                        ))}
                    </select>

                    {/* ✅ Amount Input */}
                    <input
                        type="number"
                        placeholder="Amount (₦)"
                        className="bg-transparent border border-yellow-600/40 px-3 py-2 rounded-md text-white"
                        value={newPrice.basePrice}
                        onChange={(e) => setNewPrice({ ...newPrice, basePrice: e.target.value })}
                    />

                    {/* ✅ State Dropdown */}
                    <select
                        className="bg-transparent border border-yellow-600/40 px-3 py-2 rounded-md text-white"
                        value={newPrice.state}
                        onChange={(e) => setNewPrice({ ...newPrice, state: e.target.value })}
                    >
                        <option value="">Select State (optional)</option>
                        {[
                            "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
                            "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
                            "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi",
                            "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo",
                            "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT - Abuja",
                        ].map((state, index) => (
                            <option key={index} className="text-black" value={state}>
                                {state}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-3 bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
                >
                    Add Service
                </button>
            </form>


            {/* Service Price List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {servicePrices?.map((price) => (
                    <div
                        key={price._id}
                        className="bg-gradient-to-br from-yellow-800/10 via-black to-yellow-900/10 border border-yellow-600/30 rounded-2xl p-6 shadow-lg hover:shadow-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300"
                    >
                        <h2 className="text-xl font-bold text-yellow-400 mb-2">
                            {price.serviceType}
                        </h2>
                        <p className="text-gray-300">
                            <strong>Amount:</strong> ₦{price.basePrice}
                        </p>
                        <p className="text-gray-400">
                            <strong>State:</strong> {price.state || "All States"}
                        </p>
                        <p className="text-sm mt-2">
                            <strong>Status:</strong>{" "}
                            <span
                                className={`font-semibold ${price.isActive ? "text-green-400" : "text-red-400"
                                    }`}
                            >
                                {price.isActive ? "Active" : "Inactive"}
                            </span>
                        </p>

                        <button
                            onClick={() => handleToggle(price._id, price.isActive)}
                            disabled={loading}
                            className={`w-full mt-4 py-2 rounded-lg font-semibold transition flex justify-center items-center gap-2 ${price.isActive
                                ? "bg-red-500 text-white hover:bg-red-400"
                                : "bg-green-500 text-black hover:bg-green-400"
                                }`}
                        >
                            {price.isActive ? (
                                <>
                                    <ToggleLeft size={18} /> Deactivate
                                </>
                            ) : (
                                <>
                                    <ToggleRight size={18} /> Activate
                                </>
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminServicePrices;
