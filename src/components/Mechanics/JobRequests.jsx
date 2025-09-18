import { useEffect, useState } from "react";
import { MechanicGetRequests } from "../../utils/api";
import { LocationName } from "../../helpers/GetLocationName";

function JobRequests() {
    const [MechanicRequest, setMechaniqueRequest] = useState([])
    useEffect(() => {

        const HandleFetchREquest = async () => {
            const res = await MechanicGetRequests()
            setMechaniqueRequest(res?.data?.availableRequests)
        }

        return () => {
            HandleFetchREquest()
        }
    }, [])
    return (
        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
            {MechanicRequest.map((job) => (
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
                        <button onClick={() => handleAcceptJob(job.id)} className="btn btn-primary" style={{ flex: 1 }}>
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