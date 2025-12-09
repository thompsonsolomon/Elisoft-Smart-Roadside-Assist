import React, { useEffect, useState } from "react";
import {
    GetAllServiceRequests,
    GetPendingServiceRequests,
    AssignMechanicToRequest,
    ReassignServiceRequest,
    GetServiceRequestReports,
    GetAvailableMechanics,
} from "../../../utils/api";
import { GetAllMechanics } from "../../../utils/api";
import { toast } from "react-toastify";
import { Tab } from "@headlessui/react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const ServiceRequestsDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [pending, setPending] = useState([]);
    const [mechanics, setMechanics] = useState([]);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);

    // ✅ Fetch only once on mount
    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            // 🔹 Sequential fetching to avoid 429 errors
            const all = await GetAllServiceRequests();
            setRequests(all?.data?.serviceRequests || []);

            const pend = await GetPendingServiceRequests();
            setPending(pend?.data?.pendingRequests || []);

            const mechs = await GetAvailableMechanics();
            setMechanics(mechs?.data?.mechanics || []);

            const rep = await GetServiceRequestReports();
            console.log(rep)
            setReports(rep?.data?.reports || []);

        } catch (err) {
            console.error("Error fetching data:", err);
            toast.error("Failed to load service data");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Assign/Reassign mechanic properly
    const handleAssign = async (requestId, mechanicId, isReassign = false, reason = "") => {
        try {
            if (isReassign) {
                const cred = {
                    "mechanicId": mechanicId,
                    "reason": reason
                }
                await ReassignServiceRequest(requestId,cred);
                toast.success("Service request reassigned!");
            } else {
                await AssignMechanicToRequest(requestId, mechanicId);
                toast.success("Mechanic assigned!");
            }
            fetchAllData(); // refresh after update
        } catch (err) {
            console.error("Error assigning mechanic:", err);
            toast.error("Failed to update request");
        }
    };
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Service Requests Dashboard</h1>

            <Tab.Group>
                <Tab.List className="flex gap-4 border-b mb-6">
                    <Tab className="px-4 py-2 focus:outline-none data-[selected]:border-b-2 data-[selected]:border-blue-600">
                        All Requests
                    </Tab>
                    <Tab className="px-4 py-2 focus:outline-none data-[selected]:border-b-2 data-[selected]:border-blue-600">
                        Pending Requests
                    </Tab>
                    <Tab className="px-4 py-2 focus:outline-none data-[selected]:border-b-2 data-[selected]:border-blue-600">
                        Reports
                    </Tab>
                </Tab.List>

                {/* All Requests */}
                <Tab.Panel>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="space-y-4">
                            {requests.map((req) => (
                                <div key={req._id} className="p-4 border rounded-lg shadow-sm">
                                    <p><strong>ID:</strong> {req._id}</p>
                                    <p><strong>Status:</strong> {req.status}</p>
                                    <p><strong>Customer:</strong> {req.customerId?.fullName}</p>
                                    <p>
                                        <strong>Mechanic:</strong>{" "}
                                        {req.mechanic ? req.mechanic.fullName : "Not assigned"}
                                    </p>
                                    <div className="mt-2">
                                        <select
                                            defaultValue=""
                                            onChange={(e) =>
                                                handleAssign(req._id, e.target.value, !!req.mechanic)
                                            }
                                            className="border bg-yellow-500 rounded p-2"
                                        >
                                            <option value="" disabled>
                                                {req.mechanic ? "Reassign mechanic" : "Assign mechanic"}
                                            </option>
                                            {mechanics.map((m) => (
                                                <option key={m._id} value={m._id}>
                                                    {m.fullName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Tab.Panel>

                {/* Pending Requests */}
                <Tab.Panel>
                    {pending.length > 0 ? (
                        <div className="space-y-4">
                            {pending.map((req) => (
                                <div key={req._id} className="p-4 border rounded-lg shadow-sm">
                                    <p><strong>ID:</strong> {req._id}</p>
                                    <p><strong>Status:</strong> {req.status}</p>
                                    <p><strong>Customer:</strong> {req.customerId?.fullName}</p>
                                    <div className="mt-2">
                                        <select
                                            defaultValue=""
                                            onChange={(e) => handleAssign(req._id, e.target.value)}
                                            className="border bg-yellow-500 rounded p-2"
                                        >
                                            <option value="" disabled>Assign mechanic</option>
                                            {mechanics.map((m) => (
                                                <option key={m._id} value={m._id}>
                                                    {m.fullName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No pending requests</p>
                    )}
                </Tab.Panel>

                {/* Reports */}
                <Tab.Panel>
                    {reports.length > 0 ? (
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={reports}>
                                    <XAxis dataKey="status" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#2563eb" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <p className="text-gray-500">No reports available</p>
                    )}
                </Tab.Panel>
            </Tab.Group>
        </div>
    );
};

export default ServiceRequestsDashboard;
