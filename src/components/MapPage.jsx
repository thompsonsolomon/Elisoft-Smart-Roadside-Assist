import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

export default function MapPage() {
  const [selectedMarker, setSelectedMarker] = useState(null)
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, content: "" })
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  // Sample data for mechanics and customers
  const mechanics = [
    { id: 1, name: "Mike's Auto Repair", lat: 40.7128, lng: -74.006, available: true, rating: 4.8 },
    { id: 2, name: "Sarah's Service Center", lat: 40.7589, lng: -73.9851, available: true, rating: 4.9 },
    { id: 3, name: "Quick Fix Garage", lat: 40.7505, lng: -73.9934, available: false, rating: 4.7 },
    { id: 4, name: "Elite Motors", lat: 40.7282, lng: -73.7949, available: true, rating: 4.6 },
  ]

  const customers = [
    { id: 1, name: "John Smith", lat: 40.7614, lng: -73.9776, service: "Oil Change" },
    { id: 2, name: "Mary Johnson", lat: 40.7549, lng: -73.984, service: "Brake Repair" },
    { id: 3, name: "David Wilson", lat: 40.74, lng: -73.99, service: "Engine Check" },
  ]

  const handleMarkerClick = (item, type) => {
    setSelectedMarker({ ...item, type })
  }

  const handleMarkerHover = (e, item, type) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTooltip({
      show: true,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
      content:
        type === "mechanic"
          ? `${item.name} - ${item.available ? "Available" : "Busy"}`
          : `${item.name} - ${item.service}`,
    })
  }

  const handleMarkerLeave = () => {
    setTooltip({ show: false, x: 0, y: 0, content: "" })
  }

  // Convert lat/lng to pixel coordinates (simplified)
  const coordsToPixels = (lat, lng) => {
    const mapWidth = 800
    const mapHeight = 400

    // Simple conversion (in real app, use proper map projection)
    const x = ((lng + 74.2) / 0.5) * mapWidth
    const y = ((40.8 - lat) / 0.2) * mapHeight

    return { x: Math.max(15, Math.min(x, mapWidth - 15)), y: Math.max(15, Math.min(y, mapHeight - 15)) }
  }

  return (
    <div className="map-page fade-in" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <header className="bg-dark" style={{ padding: "20px 0", borderBottom: "1px solid #333" }}>
        <div className="container flex-between">
          <div>
            <h1 style={{ color: "#FFD700", fontSize: "1.8rem" }}>🗺️  Elisoft Assist Map</h1>
            <p style={{ color: "#ccc" }}>
              {user?.role === "customer" ? "Find mechanics near you" : "Locate customer requests"}
            </p>
          </div>
          <div>
            <button
              onClick={() => navigate(user?.role === "customer" ? "customer-dashboard" : "mechanic-dashboard")}
              className="btn btn-secondary"
              style={{ marginRight: "12px" }}
            >
              Back to Dashboard
            </button>
            <button onClick={() => navigate("landing")} className="btn btn-primary">
              Home
            </button>
          </div>
        </div>
      </header>

      <div className="container" style={{ padding: "40px 20px" }}>
        <div className="grid-2" style={{ alignItems: "flex-start" }}>
          {/* Map Container */}
          <div>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "20px", color: "#FFD700" }}>
              {user?.role === "customer" ? "🔧 Available Mechanics" : "📍 Customer Requests"}
            </h2>

            <div className="map-container" style={{ position: "relative" }}>
              {/* Background grid pattern */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `
                  linear-gradient(rgba(255, 215, 0, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255, 215, 0, 0.1) 1px, transparent 1px)
                `,
                  backgroundSize: "40px 40px",
                }}
              />

              {/* City label */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  color: "#FFD700",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                New York City
              </div>

              {/* Render mechanics if user is customer or admin */}
              {(user?.role === "customer" || user?.role === "admin") &&
                mechanics.map((mechanic) => {
                  const { x, y } = coordsToPixels(mechanic.lat, mechanic.lng)
                  return (
                    <div
                      key={`mechanic-${mechanic.id}`}
                      className="map-marker mechanic"
                      style={{
                        left: `${x}px`,
                        top: `${y}px`,
                        backgroundColor: mechanic.available ? "#FFD700" : "#666",
                      }}
                      onClick={() => handleMarkerClick(mechanic, "mechanic")}
                      onMouseEnter={(e) => handleMarkerHover(e, mechanic, "mechanic")}
                      onMouseLeave={handleMarkerLeave}
                    >
                      🔧
                    </div>
                  )
                })}

              {/* Render customers if user is mechanic or admin */}
              {(user?.role === "mechanic" || user?.role === "admin") &&
                customers.map((customer) => {
                  const { x, y } = coordsToPixels(customer.lat, customer.lng)
                  return (
                    <div
                      key={`customer-${customer.id}`}
                      className="map-marker customer"
                      style={{
                        left: `${x}px`,
                        top: `${y}px`,
                      }}
                      onClick={() => handleMarkerClick(customer, "customer")}
                      onMouseEnter={(e) => handleMarkerHover(e, customer, "customer")}
                      onMouseLeave={handleMarkerLeave}
                    >
                      👤
                    </div>
                  )
                })}

              {/* Tooltip */}
              {tooltip.show && (
                <div
                  className="map-tooltip"
                  style={{
                    left: `${tooltip.x}px`,
                    top: `${tooltip.y}px`,
                    transform: "translateX(-50%) translateY(-100%)",
                  }}
                >
                  {tooltip.content}
                </div>
              )}
            </div>

            {/* Map Legend */}
            <div className="card" style={{ marginTop: "20px", padding: "16px" }}>
              <h3 style={{ color: "#FFD700", marginBottom: "12px" }}>Map Legend</h3>
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {(user?.role === "customer" || user?.role === "admin") && (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div
                        className="map-marker mechanic"
                        style={{ position: "static", width: "20px", height: "20px", fontSize: "12px" }}
                      >
                        🔧
                      </div>
                      <span style={{ color: "#ccc" }}>Available Mechanic</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div
                        className="map-marker"
                        style={{
                          position: "static",
                          width: "20px",
                          height: "20px",
                          fontSize: "12px",
                          backgroundColor: "#666",
                        }}
                      >
                        🔧
                      </div>
                      <span style={{ color: "#ccc" }}>Busy Mechanic</span>
                    </div>
                  </>
                )}
                {(user?.role === "mechanic" || user?.role === "admin") && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div
                      className="map-marker customer"
                      style={{ position: "static", width: "20px", height: "20px", fontSize: "12px" }}
                    >
                      👤
                    </div>
                    <span style={{ color: "#ccc" }}>Customer Request</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details Panel */}
          <div>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "20px", color: "#FFD700" }}>
              {selectedMarker ? "📋 Details" : "ℹ️ Select a marker"}
            </h2>

            {selectedMarker ? (
              <div className="card">
                <h3 style={{ color: "#FFD700", marginBottom: "15px" }}>{selectedMarker.name}</h3>

                {selectedMarker.type === "mechanic" ? (
                  <div>
                    <p style={{ color: "#ccc", marginBottom: "10px" }}>
                      <strong>Status:</strong>
                      <span
                        className={`status-badge ${selectedMarker.available ? "status-active" : "status-blocked"}`}
                        style={{ marginLeft: "8px" }}
                      >
                        {selectedMarker.available ? "Available" : "Busy"}
                      </span>
                    </p>
                    <p style={{ color: "#ccc", marginBottom: "10px" }}>
                      <strong>Rating:</strong> ⭐ {selectedMarker.rating}
                    </p>
                    <p style={{ color: "#ccc", marginBottom: "20px" }}>
                      <strong>Location:</strong> {selectedMarker.lat.toFixed(4)}, {selectedMarker.lng.toFixed(4)}
                    </p>

                    {user?.role === "customer" && selectedMarker.available && (
                      <div style={{ display: "flex", gap: "12px" }}>
                        <button className="btn btn-primary" style={{ flex: 1 }}>
                          Book Now
                        </button>
                        <button className="btn btn-secondary" style={{ flex: 1 }}>
                          Get Directions
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <p style={{ color: "#ccc", marginBottom: "10px" }}>
                      <strong>Service Needed:</strong> {selectedMarker.service}
                    </p>
                    <p style={{ color: "#ccc", marginBottom: "20px" }}>
                      <strong>Location:</strong> {selectedMarker.lat.toFixed(4)}, {selectedMarker.lng.toFixed(4)}
                    </p>

                    {user?.role === "mechanic" && (
                      <div style={{ display: "flex", gap: "12px" }}>
                        <button className="btn btn-primary" style={{ flex: 1 }}>
                          Accept Job
                        </button>
                        <button className="btn btn-secondary" style={{ flex: 1 }}>
                          Get Directions
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="card">
                <p style={{ color: "#ccc", textAlign: "center", padding: "40px 20px" }}>
                  Click on a marker to view details and take actions
                </p>
              </div>
            )}

            {/* Quick Stats */}
            <div className="card" style={{ marginTop: "20px" }}>
              <h3 style={{ color: "#FFD700", marginBottom: "15px" }}>📊 Quick Stats</h3>
              {user?.role === "customer" ? (
                <div>
                  <p style={{ color: "#ccc", marginBottom: "8px" }}>
                    Available Mechanics:{" "}
                    <strong style={{ color: "#00FF00" }}>{mechanics.filter((m) => m.available).length}</strong>
                  </p>
                  <p style={{ color: "#ccc" }}>
                    Total Mechanics: <strong style={{ color: "#FFD700" }}>{mechanics.length}</strong>
                  </p>
                </div>
              ) : (
                <div>
                  <p style={{ color: "#ccc", marginBottom: "8px" }}>
                    Pending Requests: <strong style={{ color: "#FFD700" }}>{customers.length}</strong>
                  </p>
                  <p style={{ color: "#ccc" }}>
                    Average Distance: <strong style={{ color: "#00FF00" }}>2.3 miles</strong>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}
