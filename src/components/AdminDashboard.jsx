"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  const stats = {
    totalUsers: 1250,
    totalBookings: 3420,
    activeMechanics: 89,
    revenue: "$45,230",
  }

  const users = [
    { id: 1, name: "John Smith", email: "john@email.com", role: "Customer", status: "Active", joinDate: "2024-01-01" },
    { id: 2, name: "Mike Johnson", email: "mike@email.com", role: "Mechanic", status: "Active", joinDate: "2024-01-02" },
    { id: 3, name: "Sarah Wilson", email: "sarah@email.com", role: "Customer", status: "Blocked", joinDate: "2024-01-03" },
    { id: 4, name: "David Brown", email: "david@email.com", role: "Mechanic", status: "Active", joinDate: "2024-01-04" },
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

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleUserAction = (userId, action) => {
    alert(`User ${userId} ${action}!`)
  }

  const tabList = [
    { id: "dashboard", label: "📊 Dashboard" },
    { id: "users", label: "👥 Users" },
    { id: "bookings", label: "📅 Bookings" },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <h2 className="text-3xl font-semibold text-yellow-400 mb-6">Dashboard Overview</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {Object.entries(stats).map(([key, value]) => (
                <div key={key} className="bg-gray-800 p-6 rounded-lg shadow text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">{value}</div>
                  <div className="text-sm text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                </div>
              ))}
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">📈 Recent Activity</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• 15 new user registrations today</li>
                <li>• 23 bookings completed this week</li>
                <li>• 5 new mechanics joined the platform</li>
                <li>• Average rating: 4.8/5 stars</li>
              </ul>
            </div>
          </>
        )

      case "users":
        return (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-semibold text-yellow-400">User Management</h2>
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 w-72"
              />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="bg-gray-800 p-5 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h4 className="text-yellow-400 font-medium text-lg">{user.name}</h4>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        user.status === "Active" ? "bg-green-600 text-white" : "bg-red-600 text-white"
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">Role: {user.role} | Joined: {user.joinDate}</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleUserAction(user.id, user.status === "Active" ? "blocked" : "unblocked")}
                      className={`btn ${
                        user.status === "Active" ? "btn-secondary" : "btn-primary"
                      } flex-1`}
                    >
                      {user.status === "Active" ? "Block" : "Unblock"}
                    </button>
                    <button
                      onClick={() => handleUserAction(user.id, "removed")}
                      className="btn btn-danger flex-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )

      case "bookings":
        return (
          <>
            <h2 className="text-3xl font-semibold text-yellow-400 mb-6">Booking Management</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">              {bookings.map((booking) => (
                <div key={booking.id} className="bg-gray-800 p-5 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-yellow-400 font-medium">Booking #{booking.id}</h4>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        booking.status === "Completed"
                          ? "bg-green-600 text-white"
                          : booking.status === "Pending"
                          ? "bg-yellow-500 text-black"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400 grid grid-cols-2 gap-1 mb-3">
                    <p>Customer: {booking.customer}</p>
                    <p>Mechanic: {booking.mechanic}</p>
                    <p>Service: {booking.service}</p>
                    <p>Date: {booking.date}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-400 font-semibold">{booking.amount}</span>
                    <button className="btn btn-secondary px-4 py-2 text-sm">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 border-r h-[100dvh] border-gray-700 p-5 space-y-4">
          {tabList.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-yellow-400 text-black"
                  : "hover:bg-gray-700 text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Main */}
        <main className="flex-1 p-8 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  )
}
