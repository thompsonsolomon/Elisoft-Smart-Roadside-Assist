"use client"

import { useState } from "react"

export default function CustomerDashboard({ user, navigate, onLogout }) {
  const [searchLocation, setSearchLocation] = useState("")

  const mechanics = [
    {
      id: 1,
      name: "Mike's Auto Repair",
      expertise: "Engine Specialist",
      rating: 4.8,
      location: "Downtown",
      available: true,
      distance: "2.1 miles",
    },
    {
      id: 2,
      name: "Sarah's Service Center",
      expertise: "Brake Expert",
      rating: 4.9,
      location: "Midtown",
      available: true,
      distance: "1.8 miles",
    },
    {
      id: 3,
      name: "Quick Fix Garage",
      expertise: "General Repair",
      rating: 4.7,
      location: "Uptown",
      available: false,
      distance: "3.2 miles",
    },
    {
      id: 4,
      name: "Elite Motors",
      expertise: "Transmission",
      rating: 4.6,
      location: "Eastside",
      available: true,
      distance: "2.7 miles",
    },
  ]

  const appointments = [
    { id: 1, mechanic: "Mike's Auto Repair", type: "Oil Change", date: "2024-01-15", status: "Pending", price: "$45" },
    {
      id: 2,
      mechanic: "Sarah's Service Center",
      type: "Brake Repair",
      date: "2024-01-10",
      status: "Completed",
      price: "$180",
    },
    {
      id: 3,
      mechanic: "Quick Fix Garage",
      type: "Engine Check",
      date: "2024-01-08",
      status: "Completed",
      price: "$120",
    },
  ]

  return (
    <div className="customer-dashboard fade-in" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <header
        className="bg-dark"
        style={{ padding: "20px 0", borderBottom: "1px solid #333", position: "sticky", top: 0, zIndex: 100 }}
      >
        <div className="container flex-between">
          <div>
            <h1 style={{ color: "#FFD700", fontSize: "1.8rem" }}>🔧  Elisoft</h1>
            <p style={{ color: "#ccc" }}>Welcome back, {user?.name}!</p>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <button onClick={() => navigate("map")} className="btn btn-primary" style={{ padding: "8px 16px" }}>
              🗺️ View Map
            </button>
            <button onClick={onLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container" style={{ padding: "40px 20px" }}>
        {/* Quick Actions */}
        <section style={{ marginBottom: "60px" }}>
          <div className="grid-2">
            <div
              className="card text-center"
              style={{ background: "linear-gradient(135deg, #FFD700, #FFA500)", color: "#000" }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "15px" }}>🗺️</div>
              <h3 style={{ marginBottom: "15px", fontSize: "1.3rem" }}>Find on Map</h3>
              <p style={{ marginBottom: "20px", opacity: 0.8 }}>Locate mechanics near you with our interactive map</p>
              <button
                onClick={() => navigate("map")}
                className="btn"
                style={{ backgroundColor: "#000", color: "#FFD700", border: "none" }}
              >
                Open Map
              </button>
            </div>

            <div className="card text-center">
              <div style={{ fontSize: "3rem", marginBottom: "15px" }}>📞</div>
              <h3 style={{ color: "#FFD700", marginBottom: "15px", fontSize: "1.3rem" }}>Emergency Service</h3>
              <p style={{ color: "#ccc", marginBottom: "20px" }}>Need immediate roadside assistance?</p>
              <button className="btn btn-danger">Call Emergency</button>
            </div>
          </div>
        </section>

        {/* Find Mechanics Section */}
        <section style={{ marginBottom: "60px" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "30px", color: "#FFD700" }}>🔍 Find Mechanics</h2>

          <div style={{ marginBottom: "30px" }}>
            <input
              type="text"
              className="input"
              placeholder="🔍 Search by location, service type, or mechanic name..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              style={{ maxWidth: "500px" }}
            />
          </div>

          <div className="grid-2">
            {mechanics.map((mechanic) => (
              <div key={mechanic.id} className="card">
                <div className="flex-between" style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#FFD700", fontSize: "1.3rem" }}>{mechanic.name}</h3>
                  <span className={`status-badge ${mechanic.available ? "status-active" : "status-blocked"}`}>
                    {mechanic.available ? "Available" : "Busy"}
                  </span>
                </div>
                <p style={{ color: "#ccc", marginBottom: "8px" }}>🔧 {mechanic.expertise}</p>
                <p style={{ color: "#ccc", marginBottom: "8px" }}>
                  📍 {mechanic.location} • {mechanic.distance}
                </p>
                <div className="flex-between" style={{ alignItems: "center", marginBottom: "15px" }}>
                  <span style={{ color: "#FFD700" }}>⭐ {mechanic.rating}</span>
                  <span style={{ color: "#ccc", fontSize: "0.9rem" }}>Verified ✅</span>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    className="btn btn-primary"
                    style={{ flex: 1, padding: "8px 16px", fontSize: "0.9rem" }}
                    disabled={!mechanic.available}
                  >
                    Book Now
                  </button>
                  <button className="btn btn-secondary" style={{ flex: 1, padding: "8px 16px", fontSize: "0.9rem" }}>
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Service Options */}
        <section style={{ marginBottom: "60px" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "30px", color: "#FFD700" }}>📅 Service Options</h2>

          <div className="grid-2">
            <div className="card text-center">
              <div style={{ fontSize: "3rem", marginBottom: "20px" }}>🏪</div>
              <h3 style={{ color: "#FFD700", marginBottom: "15px" }}>Workshop Visit</h3>
              <p style={{ color: "#ccc", marginBottom: "20px" }}>
                Bring your vehicle to our partner workshops for comprehensive service
              </p>
              <button className="btn btn-primary">Find Workshop</button>
            </div>

            <div className="card text-center">
              <div style={{ fontSize: "3rem", marginBottom: "20px" }}>🏠</div>
              <h3 style={{ color: "#FFD700", marginBottom: "15px" }}>Home Service</h3>
              <p style={{ color: "#ccc", marginBottom: "20px" }}>
                Get your vehicle serviced at your location for convenience
              </p>
              <button className="btn btn-primary">Request Home Service</button>
            </div>
          </div>
        </section>

        {/* Your Appointments Section */}
        <section>
          <h2 style={{ fontSize: "2rem", marginBottom: "30px", color: "#FFD700" }}>📋 Your Appointments</h2>

          <div className="grid">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="card">
                <div className="flex-between" style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#FFD700" }}>{appointment.mechanic}</h3>
                  <span
                    className={`status-badge ${appointment.status === "Completed" ? "status-completed" : "status-pending"}`}
                  >
                    {appointment.status}
                  </span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "15px" }}>
                  <p style={{ color: "#ccc" }}>🔧 Service: {appointment.type}</p>
                  <p style={{ color: "#ccc" }}>📅 Date: {appointment.date}</p>
                  <p style={{ color: "#ccc" }}>💰 Price: {appointment.price}</p>
                  <p style={{ color: "#ccc" }}>📍 Type: Workshop</p>
                </div>
                {appointment.status === "Pending" && (
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button className="btn btn-secondary" style={{ flex: 1, fontSize: "0.9rem" }}>
                      Reschedule
                    </button>
                    <button className="btn btn-danger" style={{ flex: 1, fontSize: "0.9rem" }}>
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
