"use client"

import { useState } from "react"

export default function AdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchTerm, setSearchTerm] = useState("")

  const stats = {
    totalUsers: 1250,
    totalBookings: 3420,
    activeMechanics: 89,
    revenue: "$45,230",
  }

  const users = [
    { id: 1, name: "John Smith", email: "john@email.com", role: "Customer", status: "Active", joinDate: "2024-01-01" },
    {
      id: 2,
      name: "Mike Johnson",
      email: "mike@email.com",
      role: "Mechanic",
      status: "Active",
      joinDate: "2024-01-02",
    },
    {
      id: 3,
      name: "Sarah Wilson",
      email: "sarah@email.com",
      role: "Customer",
      status: "Blocked",
      joinDate: "2024-01-03",
    },
    {
      id: 4,
      name: "David Brown",
      email: "david@email.com",
      role: "Mechanic",
      status: "Active",
      joinDate: "2024-01-04",
    },
  ]

  const bookings = [
    {
      id: 1,
      customer: "John Smith",
      mechanic: "Mike Johnson",
      service: "Oil Change",
      date: "2024-01-15",
      status: "Completed",
      amount: "$45",
    },
    {
      id: 2,
      customer: "Alice Brown",
      mechanic: "Sarah Wilson",
      service: "Brake Repair",
      date: "2024-01-16",
      status: "Pending",
      amount: "$180",
    },
    {
      id: 3,
      customer: "Bob Davis",
      mechanic: "David Brown",
      service: "Engine Check",
      date: "2024-01-17",
      status: "In Progress",
      amount: "$120",
    },
  ]

  const handleUserAction = (userId, action) => {
    alert(`User ${userId} ${action}!`)
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "30px", color: "#FFD700" }}>📊 Dashboard Overview</h2>
            <div className="grid-2" style={{ marginBottom: "40px" }}>
              <div className="card text-center">
                <div style={{ fontSize: "3rem", color: "#FFD700", marginBottom: "10px" }}>{stats.totalUsers}</div>
                <h3 style={{ color: "#ccc", fontSize: "1.2rem" }}>Total Users</h3>
              </div>
              <div className="card text-center">
                <div style={{ fontSize: "3rem", color: "#FFD700", marginBottom: "10px" }}>{stats.totalBookings}</div>
                <h3 style={{ color: "#ccc", fontSize: "1.2rem" }}>Total Bookings</h3>
              </div>
              <div className="card text-center">
                <div style={{ fontSize: "3rem", color: "#FFD700", marginBottom: "10px" }}>{stats.activeMechanics}</div>
                <h3 style={{ color: "#ccc", fontSize: "1.2rem" }}>Active Mechanics</h3>
              </div>
              <div className="card text-center">
                <div style={{ fontSize: "3rem", color: "#FFD700", marginBottom: "10px" }}>{stats.revenue}</div>
                <h3 style={{ color: "#ccc", fontSize: "1.2rem" }}>Monthly Revenue</h3>
              </div>
            </div>

            <div className="card">
              <h3 style={{ color: "#FFD700", marginBottom: "20px", fontSize: "1.5rem" }}>📈 Recent Activity</h3>
              <div style={{ color: "#ccc" }}>
                <p style={{ marginBottom: "10px" }}>• 15 new user registrations today</p>
                <p style={{ marginBottom: "10px" }}>• 23 bookings completed this week</p>
                <p style={{ marginBottom: "10px" }}>• 5 new mechanics joined the platform</p>
                <p>• Average rating: 4.8/5 stars</p>
              </div>
            </div>
          </div>
        )

      case "users":
        return (
          <div>
            <div className="flex-between" style={{ marginBottom: "30px" }}>
              <h2 style={{ fontSize: "2.5rem", color: "#FFD700" }}>👥 User Management</h2>
              <input
                type="text"
                className="input"
                placeholder="🔍 Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ maxWidth: "300px" }}
              />
            </div>

            <div className="grid">
              {filteredUsers.map((user) => (
                <div key={user.id} className="card">
                  <div className="flex-between" style={{ marginBottom: "15px" }}>
                    <div>
                      <h3 style={{ color: "#FFD700", fontSize: "1.3rem" }}>{user.name}</h3>
                      <p style={{ color: "#ccc", fontSize: "0.9rem" }}>{user.email}</p>
                    </div>
                    <span className={`status-badge ${user.status === "Active" ? "status-active" : "status-blocked"}`}>
                      {user.status}
                    </span>
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <p style={{ color: "#ccc", marginBottom: "5px" }}>Role: {user.role}</p>
                    <p style={{ color: "#ccc" }}>Joined: {user.joinDate}</p>
                  </div>
                  <div className="flex" style={{ gap: "12px" }}>
                    <button
                      onClick={() => handleUserAction(user.id, user.status === "Active" ? "blocked" : "unblocked")}
                      className={`btn ${user.status === "Active" ? "btn-secondary" : "btn-primary"}`}
                      style={{ flex: 1 }}
                    >
                      {user.status === "Active" ? "Block User" : "Unblock User"}
                    </button>
                    <button
                      onClick={() => handleUserAction(user.id, "removed")}
                      className="btn btn-danger"
                      style={{ flex: 1 }}
                    >
                      Remove User
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "bookings":
        return (
          <div>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "30px", color: "#FFD700" }}>📅 Booking Management</h2>
            <div className="grid">
              {bookings.map((booking) => (
                <div key={booking.id} className="card">
                  <div className="flex-between" style={{ marginBottom: "15px" }}>
                    <h3 style={{ color: "#FFD700", fontSize: "1.3rem" }}>Booking #{booking.id}</h3>
                    <span
                      className={`status-badge ${
                        booking.status === "Completed"
                          ? "status-completed"
                          : booking.status === "In Progress"
                            ? "status-pending"
                            : "status-active"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "15px" }}>
                    <p style={{ color: "#ccc" }}>Customer: {booking.customer}</p>
                    <p style={{ color: "#ccc" }}>Mechanic: {booking.mechanic}</p>
                    <p style={{ color: "#ccc" }}>Service: {booking.service}</p>
                    <p style={{ color: "#ccc" }}>Date: {booking.date}</p>
                  </div>
                  <div className="flex-between">
                    <span style={{ color: "#FFD700", fontWeight: "600", fontSize: "1.1rem" }}>{booking.amount}</span>
                    <button className="btn btn-secondary" style={{ padding: "6px 12px", fontSize: "0.9rem" }}>
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="admin-dashboard fade-in" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <header
        className="bg-dark"
        style={{ padding: "20px 0", borderBottom: "1px solid #333", position: "sticky", top: 0, zIndex: 100 }}
      >
        <div className="container flex-between">
          <div>
            <h1 style={{ color: "#FFD700", fontSize: "1.8rem" }}>🔧  Elisoft Admin</h1>
            <p style={{ color: "#ccc" }}>Welcome back, {user?.name}!</p>
          </div>
          <button onClick={onLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </header>

      <div style={{ display: "flex", minHeight: "calc(100vh - 80px)" }}>
        {/* Sidebar */}
        <aside
          style={{ width: "280px", backgroundColor: "#1a1a1a", padding: "30px 20px", borderRight: "1px solid #333" }}
        >
          <nav>
            <ul style={{ listStyle: "none" }}>
              {[
                { id: "dashboard", label: "📊 Dashboard", icon: "📊" },
                { id: "users", label: "👥 Users", icon: "👥" },
                { id: "bookings", label: "📅 Bookings", icon: "📅" },
              ].map((item) => (
                <li key={item.id} style={{ marginBottom: "15px" }}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    style={{
                      width: "100%",
                      padding: "15px 20px",
                      backgroundColor: activeTab === item.id ? "#FFD700" : "transparent",
                      color: activeTab === item.id ? "#000" : "#ccc",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.3s ease",
                      fontSize: "1rem",
                      fontWeight: activeTab === item.id ? "600" : "400",
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: "40px" }}>{renderContent()}</main>
      </div>
    </div>
  )
}
