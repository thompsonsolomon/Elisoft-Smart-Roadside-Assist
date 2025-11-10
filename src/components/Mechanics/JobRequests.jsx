import { useEffect, useState } from "react";
import { MyPendingRequests, MechanicGetRequests } from "../../utils/api";
import axios from "axios";
import { toast } from "react-toastify";

function JobRequests() {
    const [MechanicRequest, setMechanicRequest] = useState([]);
    const [MyRequestsList, setMyRequestsList] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch all available mechanic requests
    useEffect(() => {
        let isMounted = true;

        const fetchMechanicRequests = async () => {
            setLoading(true);
            try {
                const res = await MechanicGetRequests();
                if (isMounted) setMechanicRequest(res?.data?.availableRequests || []);
            } catch (err) {
                console.error("❌ Failed to fetch mechanic requests:", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchMechanicRequests(); // ✅ Run immediately on mount

        return () => {
            isMounted = false;
        };
    }, []);

    // Fetch all pending requests for the mechanic
    useEffect(() => {
        let isMounted = true;

        const fetchPendingRequests = async () => {
            setLoading(true);
            try {
                const res = await MyPendingRequests();
                if (isMounted) setMyRequestsList(res?.data?.availableRequests || []);
            } catch (err) {
                console.error("❌ Failed to fetch pending requests:", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchPendingRequests(); // ✅ Run immediately on mount

        return () => {
            isMounted = false;
        };
    }, []);

    // Accept job handler
    const handleAcceptJob = async (jobId) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            const response = await axios.post(
                `https://elisoft-backend.onrender.com/api/service-requests/${jobId}/accept`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token ? `Bearer ${token}` : "",
                    },
                }
            );

            toast.success("✅ Job accepted successfully! Customer has been notified.");
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error("❌ Server responded with error:", error.response.data);
                toast.error(error.response.data?.message || "Failed to accept job.");
            } else if (error.request) {
                console.error("📡 No response from server:", error.request);
                toast.error("No response from server. Please check your connection.");
            } else {
                console.error("⚙️ Request setup error:", error.message);
                toast.error("Error setting up request.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
            {
                loading ? <p>Loading Job Requests...</p> : MechanicRequest?.length === 0 ? <p>No Job Requests Available</p> : null
            }
            {MechanicRequest?.map((job) => (
                <div key={job?._id} className="card w-full">
                    <div className="flex-between" style={{ marginBottom: "15px" }}>
                        <h3 style={{ color: "#FFD700", fontSize: "1.3rem" }}>{job?.customerId?.fullName}</h3>
                        <span className={`status-badge ${job.priority === "Medium" ? "status-blocked" : "status-pending"}`}>
                            {job.priority}
                        </span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
                        <p style={{ color: "#ccc" }}>🔧 Service: {job.serviceType}</p>
                        <p style={{ color: "#ccc" }}>📅 Date: {new Date(job.updatedAt).toLocaleString()}</p>
                        <p style={{ color: "#ccc" }}>📍 Location: {job.address}</p>
                        <p style={{ color: "#ccc" }}>📏 Distance: {job.distance}</p>
                        <p style={{ color: "#ccc" }}>💰 Payment: {job.estimatedPrice}</p>
                        <p style={{ color: "#ccc" }}> 📏 Duration{job.duration}</p>
                    </div>
                    <div className="d">
                        <p style={{ color: "#ccc" }}>  Description: {job.description}</p>
                    </div>

                    <div className="flex" style={{ gap: "12px" }}>
                        <button onClick={() => handleAcceptJob(job._id)} className="btn btn-primary" style={{ flex: 1 }}>
                            Accept Job
                        </button>
                        <button onClick={() => handleRejectJob(job.id)} className="btn btn-secondary" style={{ flex: 1 }}>
                            Decline
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default JobRequests