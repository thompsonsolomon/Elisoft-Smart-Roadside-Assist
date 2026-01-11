import { useEffect, useState } from "react";
import { GetAllServiceRequests, GetAnalysis, GetDashboard } from "../../../utils/api";
import DashboardChart from "./Analysis";

function Dashboard() {
    const [Status, setStatus] = useState()
    const [analytics, getAnalysis] = useState()
    const [loading, setLoading] = useState(false);
    // ✅ Fetch dashboard details
    useEffect(() => {
        setLoading(true);
        const fetchDashboard = async () => {
            try {
                const data = await GetDashboard();
                setStatus(data?.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching user:", err);
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);
    const stats = {
        totalUsers: Status?.overview?.totalUsers,
        totalBookings: Status?.overview?.totalServiceRequests,
        activeMechanics: Status?.overview?.totalMechanics,
        "Monthly Revenue": Status?.monthly?.revenue,
        "active membership": Status?.overview?.activeMemberships,
    }

    //fetch analysis details
    useEffect(() => {
        const FetchAnalysis = async () => {
            try {
                const data = await GetAnalysis();
                getAnalysis(data?.data);
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };
        FetchAnalysis();
    }, []);

    const mockAnalysis = {
        revenue: [
            { date: "2025-09-01", amount: 1200 },
            { date: "2025-09-02", amount: 1800 },
            { date: "2025-09-03", amount: 950 },
            { date: "2025-09-04", amount: 2200 },
            { date: "2025-09-05", amount: 1750 },
            { date: "2025-09-06", amount: 2000 },
            { date: "2025-09-07", amount: 2500 },
        ],
        serviceRequests: {
            pending: 15,
            inProgress: 8,
            completed: 22,
            cancelled: 3,
        },
        userGrowth: [
            { _id: { date: "2025-09-01" }, count: 5, role: "Customer" },
            { _id: { date: "2025-09-02" }, count: 8, role: "Customer" },
            { _id: { date: "2025-09-03" }, count: 12, role: "Customer" },
            { _id: { date: "2025-09-04" }, count: 20, role: "Customer" },
            { _id: { date: "2025-09-05" }, count: 25, role: "Customer" },
            { _id: { date: "2025-09-06" }, count: 30, role: "Customer" },
            { _id: { date: "2025-09-07" }, count: 40, role: "Customer" },
        ],
    };

    const statusBreakdown = analytics?.serviceRequests?.statusBreakdown || [];

    const statusCounts = statusBreakdown.reduce(
        (acc, item) => {
            const status = item.status?.toLowerCase();

            if (status === "pending") acc.pending += item.count;
            if (status === "completed") acc.completed += item.count;
            if (status === "cancelled") acc.cancelled += item.count;
            if (status === "inprogress" || status === "in progress")
                acc.inProgress += item.count;

            return acc;
        },
        {
            pending: 0,
            inProgress: 0,
            completed: 0,
            cancelled: 0,
        }
    );
    const normalizedAnalytics = {


        revenue:
            analytics?.revenue?.map((item) => ({
                date: item.date || item._id?.date,
                amount: item.amount || item.revenue || 0,
            })) || [],

        serviceRequests: {
            pending: statusCounts.pending,
            inProgress: statusCounts.inProgress,
            completed: statusCounts.completed,
            cancelled: statusCounts.cancelled,
        },

        userGrowth:
            analytics?.userGrowth?.map((item) => ({
                _id: { date: item._id?.date || item.date },
                count: item.count || 0,
                role: item._id?.role || "Customer",
            })) || [],
    };






    return (
        <>
            <h2 className="text-3xl font-semibold text-yellow-400 mb-6">Dashboard Overview</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {loading && (
                    <div className="col-span-full text-center text-gray-500">
                        Loading dashboard...
                    </div>
                )}
                {Object.entries(stats).map(([key, value]) => {
                    const isRevenue = key.toLowerCase().includes("revenue");

                    const displayValue = isRevenue
                        ? `₦${new Intl.NumberFormat("en-NG").format(value)}`
                        : value;

                    return (
                        <div
                            key={key}
                            className="bg-gray-800 p-6 rounded-lg shadow text-center"
                        >
                            <div className="text-2xl font-bold text-yellow-400 mb-2">
                                {displayValue}
                            </div>

                            <div className="text-sm text-gray-300 capitalize">
                                {key.replace(/([A-Z])/g, " $1")}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-yellow-400 mb-4">📈 Recent Activity</h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• {Status?.today?.revenue} total revenue made today</li>
                    <li>• {Status?.today?.requests} bookings completed today</li>
                    <li>• {Status?.overview?.pendingRequests}  pending requests</li>
                    <li>• {Status?.overview?.activeRequests}   active requests</li>
                    <li>• {Status?.overview?.availableMechanics} total mechanics available </li>

                </ul>
            </div>

            {analytics && <DashboardChart data={normalizedAnalytics} />}

        </>
    )
}

export default Dashboard