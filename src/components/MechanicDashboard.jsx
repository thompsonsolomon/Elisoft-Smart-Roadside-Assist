import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { MechanicAvailability, MechanicGetRequests } from "../utils/api"
import { toast } from "react-toastify"
import JobRequests from "./Mechanics/JobRequests";
import ResponsiveHeader from "./common/ResponsiveHeader";
import { User } from "lucide-react";

export default function MechanicDashboard({ user, onLogout }) {
  const [isAvailable, setIsAvailable] = useState(() => {
    // read from localStorage, fallback to false
    const saved = localStorage.getItem("mechanicAvailability");
    return saved ? JSON.parse(saved) : false;
  });
  const navigate = useNavigate()
  const acceptedJobs = [
    {
      id: 1,
      customer: "Alice Brown",
      type: "Engine Diagnostic",
      date: "2024-01-14",
      status: "In Progress",
      location: "Eastside",
      price: "$150",
    },
    {
      id: 2,
      customer: "Bob Wilson",
      type: "Tire Replacement",
      date: "2024-01-12",
      status: "Completed",
      location: "Westside",
      price: "$200",
    },
  ]



  const handleAcceptJob = (jobId) => {
    alert(`Job ${jobId} accepted! Customer will be notified.`)
  }

  const handleRejectJob = (jobId) => {
    alert(`Job ${jobId} rejected.`)
  }
  const ToggleAvailability = async () => {
    try {
      const newAvailability = !isAvailable;

      // Call API with the new value
      const res = await MechanicAvailability({ isAvailable: newAvailability });
      console.log("API response:", res);

      // Save in state + localStorage
      setIsAvailable(newAvailability);
      localStorage.setItem(
        "mechanicAvailability",
        JSON.stringify(newAvailability)
      );

      toast.success(
        newAvailability
          ? "You are now available!"
          : "You are now unavailable!"
      );
    } catch (error) {
      console.error("Error toggling availability:", error);
      toast.error("Failed to update availability");
    }
  };


  return (
    <div className=" fade-in flex justify-center items-center flex-col w-full ">
      {/* Header */}
      <header
        className="bg-dark flex w-full justify-center mt-4"
      >
        <div className="container  flex justify-between">
          <div>
            <h1 style={{ color: "#FFD700", fontSize: "1.8rem" }}>🔧  Elisoft Assist</h1>
          </div>
          <div
           className="hidden justify-center items-center md:flex"

>            <Link
              to="/profile"
              className="flex flex-col items-center text-gray-400 hover:text-yellow-500 transition"
            >
              <User className="w-6 h-6" />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container" style={{ padding: "40px 20px" }}>
        {/* Status and Map Section */}
        <section style={{ marginBottom: "60px" }}>
          <div className="grid md:grid-cols-1 gap-12 items-center">
            <div className="card">
              <h2 style={{ fontSize: "1.5rem", marginBottom: "20px", color: "#FFD700" }}>🔄 Availability Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 justify-between  gap-4 " style={{ alignItems: "center", marginBottom: "20px" }}>
                <span style={{ color: "#ccc", fontSize: "1.1rem" }}>
                  Currently:{" "}
                  <strong style={{ color: isAvailable ? "#00FF00" : "#FF4444" }}>
                    {isAvailable ? "Available" : "Unavailable"}
                  </strong>
                </span>
                <div className="flex gap-4 w-full justify-end">

                  <button
                    onClick={() => ToggleAvailability()}
                    className={` btn ${isAvailable ? "btn-danger" : "btn-primary"}`}
                    style={{ padding: "8px 16px" }}
                  >
                    {isAvailable ? "Go Offline" : "Go Online"}
                  </button>
                  <button
                    onClick={() => navigate("/map")}
                    className="btn"
                    style={{ backgroundColor: "#000", color: "#FFD700", border: "none" }}
                  >
                    View Map
                  </button>
                </div>
              </div>
              {/* <div style={{ padding: "15px", backgroundColor: "#0a0a0a", borderRadius: "8px" }}>
                <p style={{ color: "#ccc", fontSize: "0.9rem", marginBottom: "8px" }}>📊 Today's Stats:</p>
                <p style={{ color: "#FFD700" }}>Jobs Completed: 3 • Earnings: $425</p>
              </div> */}
            </div>

            {/* <div
              className="card text-center"
              style={{ background: "linear-gradient(135deg, #FFD700, #FFA500)", color: "#000" }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "15px" }}>🗺️</div>
              <h3 style={{ marginBottom: "15px", fontSize: "1.3rem" }}>Customer Locations</h3>
              <p style={{ marginBottom: "20px", opacity: 0.8 }}>View customer requests on the interactive map</p>
              <button
                onClick={() => navigate("/map")}
                className="btn"
                style={{ backgroundColor: "#000", color: "#FFD700", border: "none" }}
              >
                View Map
              </button>
            </div> */}
          </div>
        </section>

        {/* Job Requests Section */}
        <section style={{ marginBottom: "60px" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "30px", color: "#FFD700" }}>📨 New Job Requests</h2>

          <JobRequests />
        </section>

        {/* Accepted Jobs Section */}
        <section style={{ marginBottom: "60px" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "30px", color: "#FFD700" }}>✅ Your Active Jobs</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {acceptedJobs.map((job) => (
              <div key={job.id} className="card">
                <div className="flex-between" style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#FFD700", fontSize: "1.3rem" }}>{job.customer}</h3>
                  <span
                    className={`status-badge ${job.status === "Completed" ? "status-completed" : "status-pending"}`}
                  >
                    {job.status}
                  </span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
                  <p style={{ color: "#ccc" }}>🔧 Service: {job.type}</p>
                  <p style={{ color: "#ccc" }}>📅 Date: {job.date}</p>
                  <p style={{ color: "#ccc" }}>📍 Location: {job.location}</p>
                  <p style={{ color: "#ccc" }}>💰 Payment: {job.price}</p>
                </div>
                {job.status === "In Progress" && (
                  <div style={{ display: "flex", gap: "12px" }}>
                    <button className="btn btn-primary" style={{ flex: 1 }}>
                      Mark Complete
                    </button>
                    <button className="btn btn-secondary" style={{ flex: 1 }}>
                      Update Status
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
        </section>
      </div>
      <ResponsiveHeader />
    </div>
  )
}
