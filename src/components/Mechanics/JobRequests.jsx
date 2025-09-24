import { useEffect, useState } from "react";
import { AcceptServiceREquest, MechanicGetRequests } from "../../utils/api";

function JobRequests() {
    const [MechanicRequest, setMechanicRequest] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        const HandleFetchREquest = async () => {
            const res = await MechanicGetRequests()
            console.log(res);
            
            setMechanicRequest(res?.data?.availableRequests)
            setLoading(false)
        }

        return () => {
            HandleFetchREquest()
        }
    }, [])

    const handleAcceptJob = async (jobId) => {
        // Implement accept job logic here
        const res = await AcceptServiceREquest(jobId)
        console.log(res);
        
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