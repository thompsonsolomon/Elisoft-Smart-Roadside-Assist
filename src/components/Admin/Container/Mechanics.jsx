import React, { useEffect, useState } from "react";
import {
    GetAllMechanics,
    GetAvailableMechanics,
    UpdateMechanicAvailability,
    GetAllServiceRequests
} from "../../../utils/api";
import { toast } from "react-toastify";

const MechanicsDashboard = () => {
    const [mechanics, setMechanics] = useState([]);
    const [available, setAvailable] = useState([]);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch data on mount
    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const [all, avail, reqs] = await Promise.all([
                GetAllMechanics(),
                    GetAvailableMechanics(),
            ]);
            setMechanics(all?.data?.mechanics || []);
            setAvailable(avail?.data?.mechanics || []);
            setRequests(reqs?.data?.requests || []);
        } catch (err) {
            console.error("Error fetching data:", err);
            toast.error("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    const toggleAvailability = async (id, current) => {
        try {
            await UpdateMechanicAvailability(id, { isAvailable: !current });
            toast.success("Availability updated");
            fetchAllData(); // refresh
        } catch (err) {
            console.error("Error updating availability:", err);
            toast.error("Failed to update availability");
        }
    };

    return (
        <div className="p-6 space-y-8">
            <h1 className="text-2xl font-bold">Mechanics Dashboard</h1>

            {loading && <p>Loading...</p>}

            {/* All Mechanics */}
            <section>
                <h2 className="text-xl font-semibold mb-2">All Mechanics</h2>
                <ul className=" grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl space-y-2">
                    {mechanics.map((m) => (
                        <li key={m._id} className="flex justify-between items-center border p-3 rounded-lg shadow-sm">
                            <span>{m.fullName} ({m.isAvailable ? "Available" : "Unavailable"})</span>
                            <button
                                onClick={() => toggleAvailability(m._id, m.isAvailable)}
                                className={`px-3 py-1 rounded text-white ${m.isAvailable ? "bg-red-500" : "bg-yellow-500"
                                    }`}
                            >
                                {m.isAvailable ? "Set Unavailable" : "Set Available"}
                            </button>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Available Mechanics */}
            <section>
                <h2 className="text-xl font-semibold mb-2">Available Mechanics</h2>
                <ul className="list-disc pl-5 cursor-pointer">
                    {available.length > 0 ? (
                        available.map((m) => <li key={m._id}>
                            <span onClick={() => toggleAvailability(m._id, m.isAvailable)} >
                                {m.fullName}
                            </span>
                        </li>)
                    ) : (
                        <p className="text-gray-500">No mechanics available</p>
                    )}
                </ul>
            </section>
        </div>
    );
};

export default MechanicsDashboard;
