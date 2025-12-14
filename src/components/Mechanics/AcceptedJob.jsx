import { useEffect, useState } from "react"
import { MyAcceptedRequests, UpdateServiceRequestStatus } from "../../utils/api"
import { useNavigate } from "react-router-dom";

function AcceptedJob() {
    const [loading, setLoading] = useState(false)
    const [myAceptedJobs, setAcceptedJobs] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        let isMounted = true;

        const fetchJobs = async () => {
            setLoading(true);
            try {
                const res = await MyAcceptedRequests();
                console.log(res);
                if (isMounted) setAcceptedJobs(res?.data?.serviceRequests || []);
            } catch (err) {
                console.error(err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchJobs();

        return () => {
            isMounted = false;
        };
    }, []);


    const HandleAcceptJobRequest = async (jobId) => {
        setLoading(true)
        const res = await UpdateServiceRequestStatus(jobId, { status: "Completed" })
        setLoading(false)
    }

    const OpenMap = (job) => {
        console.log(job)
        navigate("/map", { state: { job } });
    }
    return (
        <div className="grid md:grid-cols-2 gap-12 items-center">
            {
                loading ? <p className="text-white">Loading Accepted Jobs...</p> : null
            }
            {myAceptedJobs?.map((job) => (
                <div key={job.id} className="card">
                    <div className="flex-between" style={{ marginBottom: "15px" }}>
                        <h3 style={{ color: "#FFD700", fontSize: "1.3rem" }}>{job.customerId.fullName}</h3>
                        <span
                            className={`status-badge ${job.status === "Completed" ? "status-completed" : "status-pending"}`}
                        >
                            {job.paymentStatus}
                        </span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
                        <p style={{ color: "#ccc" }}>🔧 Service: {job.serviceType}</p>
                        <p style={{ color: "#ccc" }}>📅 Date: {job.requestedAt}</p>
                        <p style={{ color: "#ccc" }}>📍 Location: {job.address}</p>
                        <p style={{ color: "#ccc" }}>💰 Payment: {job.finalPrice}</p>
                    </div>
                    {job.status === "Accepted" && (
                        <div style={{ display: "flex", gap: "12px" }}>
                            <button onClick={() => HandleAcceptJobRequest(job.id)} className="btn btn-primary" style={{ flex: 1 }}>
                                Mark Complete
                            </button>
                            <button onClick={() => OpenMap(job)} className="btn btn-secondary" style={{ flex: 1 }}>
                                View On Map
                            </button>
                        </div>
                    )}
                    {job.status === "Completed" && (
                        <div className="text-center">
                            <span style={{ color: "#00FF00", fontWeight: "500" }}>✅ Job Completed Successfully</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default AcceptedJob