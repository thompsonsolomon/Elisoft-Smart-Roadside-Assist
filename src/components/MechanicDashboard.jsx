"use client"

import { useState } from "react"

export default function MechanicDashboard({ user, navigate, onLogout }) {
  const [isAvailable, setIsAvailable] = useState(true)

  const jobRequests = [
    {
      id: 1,
      customer: "John Smith",
      type: "Oil Change",
      date: "2024-01-15",
      location: "Downtown",
      distance: "2.1 miles",
      urgency: "Normal",
      price: "$45",
    },
    {
      id: 2,
      customer: "Mary Johnson",
      type: "Brake Repair",
      date: "2024-01-16",
      location: "Midtown",
      distance: "1.8 miles",
      urgency: "Urgent",
      price: "$180",
    },
    {
      id: 3,
      customer: "David Wilson",
      type: "Engine Check",
      date: "2024-01-17",
      location: "Uptown",
      distance: "3.2 miles",
      urgency: "Normal",
      price: "$120",
    },
  ]

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

  return (
    <div className=" fade-in flex justify-center items-center flex-col w-full ">
      {/* Header */}
      <header
        className="bg-dark flex w-full justify-center mt-4"
      >
        <div className="container  flex justify-between">
          <div>
            <h1 style={{ color: "#FFD700", fontSize: "1.8rem" }}>🔧  Elisoft</h1>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <button onClick={() => navigate("/map")} className="btn btn-primary" style={{ padding: "8px 16px" }}>
              🗺️ View Map
            </button>
            <button onClick={onLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container" style={{ padding: "40px 20px" }}>
        {/* Status and Map Section */}
        <section style={{ marginBottom: "60px" }}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="card">
              <h2 style={{ fontSize: "1.5rem", marginBottom: "20px", color: "#FFD700" }}>🔄 Availability Status</h2>
              <div className="flex justify-between " style={{ alignItems: "center", marginBottom: "20px" }}>
                <span style={{ color: "#ccc", fontSize: "1.1rem" }}>
                  Currently:{" "}
                  <strong style={{ color: isAvailable ? "#00FF00" : "#FF4444" }}>
                    {isAvailable ? "Available" : "Unavailable"}
                  </strong>
                </span>
                <button
                  onClick={() => setIsAvailable(!isAvailable)}
                  className={`btn ${isAvailable ? "btn-danger" : "btn-primary"}`}
                  style={{ padding: "8px 16px" }}
                >
                  {isAvailable ? "Go Offline" : "Go Online"}
                </button>
              </div>
              <div style={{ padding: "15px", backgroundColor: "#0a0a0a", borderRadius: "8px" }}>
                <p style={{ color: "#ccc", fontSize: "0.9rem", marginBottom: "8px" }}>📊 Today's Stats:</p>
                <p style={{ color: "#FFD700" }}>Jobs Completed: 3 • Earnings: $425</p>
              </div>
            </div>

            <div
              className="card text-center"
              style={{ background: "linear-gradient(135deg, #FFD700, #FFA500)", color: "#000" }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "15px" }}>🗺️</div>
              <h3 style={{ marginBottom: "15px", fontSize: "1.3rem" }}>Customer Locations</h3>
              <p style={{ marginBottom: "20px", opacity: 0.8 }}>View customer requests on the interactive map</p>
              <button
                onClick={() => navigate("map")}
                className="btn"
                style={{ backgroundColor: "#000", color: "#FFD700", border: "none" }}
              >
                View Map
              </button>
            </div>
          </div>
        </section>

        {/* Job Requests Section */}
        <section style={{ marginBottom: "60px" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "30px", color: "#FFD700" }}>📨 New Job Requests</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
          {jobRequests.map((job) => (
              <div key={job.id} className="card">
                <div className="flex-between" style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#FFD700", fontSize: "1.3rem" }}>{job.customer}</h3>
                  <span className={`status-badge ${job.urgency === "Urgent" ? "status-blocked" : "status-pending"}`}>
                    {job.urgency}
                  </span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
                  <p style={{ color: "#ccc" }}>🔧 Service: {job.type}</p>
                  <p style={{ color: "#ccc" }}>📅 Date: {job.date}</p>
                  <p style={{ color: "#ccc" }}>📍 Location: {job.location}</p>
                  <p style={{ color: "#ccc" }}>📏 Distance: {job.distance}</p>
                  <p style={{ color: "#ccc" }}>💰 Payment: {job.price}</p>
                  <p style={{ color: "#ccc" }}>⏰ Type: On-site</p>
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

        {/* Profile Section */}
        <section>
          <div className="card" style={{ maxWidth: "500px" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "20px", color: "#FFD700" }}>👤 Profile & Settings</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <button className="btn btn-primary">Update Profile</button>
              <button className="btn btn-secondary">View Earnings</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
