import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    GetRevenueReports,
    GetUserActivityReports,
    GetMechanicPerformanceReports,
    GetSystemHealth,
    PerformSystemCleanup,
    GetSystemLogs,
    SendNotification,
    ToggleMaintenanceMode,
    GetDashboard,
} from "../../../utils/api";

import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

function SystemDashboard() {
    const [revenue, setRevenue] = useState([]);
    const [userActivity, setUserActivity] = useState([]);
    const [mechanicPerf, setMechanicPerf] = useState([]);
    const [systemHealth, setSystemHealth] = useState([]);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const [rev, act, mech, health, logs] = await Promise.all([
                    GetDashboard(),
                    GetUserActivityReports(),
                    GetMechanicPerformanceReports(),
                    GetSystemHealth(),
                    GetSystemLogs(),
                ]);

                setRevenue(Status?.monthly?.revenue|| []);
                setUserActivity(act?.data || []);
                setMechanicPerf(mech?.data || []);
                setSystemHealth(health?.data || {}); //checked
                setLogs(logs?.data || []); //checked
            } catch (err) {
                console.error("Error loading dashboard:", err);
            }
        };

        fetchDashboard();
    }, []);
    console.log(revenue);


    return (
        <div className="p-6 space-y-6">
            <h2 className="text-3xl font-bold text-yellow-400">System Dashboard</h2>

            {loading && <p className="text-gray-400">Loading system data...</p>}

            {/* Revenue Reports */}
            <div className="bg-gray-800 p-5 rounded-2xl shadow">
                <h3 className="text-xl text-yellow-300 mb-4">Revenue Reports</h3>
                {revenue.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={revenue}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="amount" stroke="#ffc658" />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-gray-500">No revenue data available</p>
                )}
            </div>

            {/* User Activity */}
            <div className="bg-gray-800 p-5 rounded-2xl shadow">
                <h3 className="text-xl text-yellow-300 mb-4">User Activity</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={userActivity}>
                        <XAxis dataKey="date" stroke="#fff" />
                        <YAxis stroke="#fff" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="logins" stroke="#38bdf8" />
                        <Line type="monotone" dataKey="requests" stroke="#f87171" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Mechanic Performance */}
            <div className="bg-gray-800 p-5 rounded-2xl shadow">
                <h3 className="text-xl text-yellow-300 mb-4">Mechanic Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={mechanicPerf} dataKey="jobsCompleted" nameKey="name" outerRadius={120} fill="#82ca9d" label>
                            {mechanicPerf.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"][index % 4]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* System Health */}
            <div className="bg-gray-800 p-5 rounded-2xl shadow grid grid-cols-2 gap-4">
                <h3 className="text-xl text-yellow-300 mb-2 col-span-2">System Health</h3>
                <div className="text-white">Status: {systemHealth?.status}</div>
                <div className="text-white">Uptime: {systemHealth?.uptime}</div>
                <div className="text-white">CPU Load: {systemHealth?.cpuLoad}%</div>
                <div className="text-white">Memory: {systemHealth?.memoryUsage}</div>
            </div>

            {/* System Logs */}
            <div className="bg-gray-800 p-5 rounded-2xl shadow">
                <h3 className="text-xl text-yellow-300 mb-4">System Logs</h3>
                <div className="max-h-64 overflow-y-auto text-sm text-gray-300 space-y-2">
                    {logs.map((log, i) => (
                        <p key={i}>[{log.timestamp}] {log.message}</p>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default SystemDashboard;
