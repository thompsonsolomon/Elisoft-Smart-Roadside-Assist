import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Dashboard from "./Admin/Container/Dashboard"
import Users from "./Admin/Container/Users"
import MechanicsDashboard from "./Admin/Container/Mechanics"
import ServiceRequestsDashboard from "./Admin/Container/Services"
import SystemDashboard from "./Admin/Container/Reports"
import Settings from "./Admin/Settings"
import { Button, MenuButton } from "@headlessui/react"
import AdminPlans from "./Admin/Container/MembershipPlan"

export default function AdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isOpen, setIsOpen] = useState(false);


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


  const tabList = [
    { id: "dashboard", label: "📊 Dashboard" },
    { id: "reports", label: "📑 Reports Analysis" },
    { id: "users", label: "👥 Users" },
    { id: "mechanics", label: "🔧 Mechanics" },
    { id: "services", label: "🛠️ Services" },
    { id: "plans", label: "💳 Plans" },
    { id: "bookings", label: "📅 Bookings" },
    { id: "settings", label: "⚙️ Settings" },

  ]

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <Dashboard />
        )
      case "users":
        return (
          <Users />
        )
      case "mechanics":
        return (
          <MechanicsDashboard />
        )

      case "services":
        return (
          <ServiceRequestsDashboard />
        )

      case "reports":
        return (
          <SystemDashboard />
        )
      case "plans":
        return (
          <AdminPlans />
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
                    className={`text-xs px-3 py-1 rounded-full ${booking.status === "Completed"
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


      case "settings":
        return (
          <Settings />
        )
      default:
        return null
    }
  }

  return (
    // <div className="bg-gray-900 text-white min-h-screen">
    //   <div className="flex">
    //     {/* Sidebar */}
    //     <aside className="w-64 bg-gray-800 border-r h-[100dvh] border-gray-700 p-5 space-y-4">
    //       {tabList.map((tab) => (
    //         <button
    //           key={tab.id}
    //           onClick={() => setActiveTab(tab.id)}
    //           className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === tab.id
    //             ? "bg-yellow-400 text-black"
    //             : "hover:bg-gray-700 text-gray-300"
    //             }`}
    //         >
    //           {tab.label}
    //         </button>
    //       ))}
    //     </aside>

    //     {/* Main */}
    //     <main className="flex-1 p-8 h-[100dvh] overflow-y-auto">{renderContent()}</main>
    //   </div>
    // </div>

    <div className="bg-gray-900 text-white min-h-screen">
      <div className="flex h-[100dvh]">
        {/* Sidebar */}
        <aside
          className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-800 border-r border-gray-700 p-5 space-y-4 transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          {/* Close button (mobile only) */}
          <div className="flex justify-end md:hidden mb-4">
            <button onClick={() => setIsOpen(false)}>
              <span className="w-6 h-6" > ✖</span>

            </button>
          </div>

          {tabList.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsOpen(false); // auto close on mobile
              }}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === tab.id
                ? "bg-yellow-400 text-black"
                : "hover:bg-gray-700 text-gray-300"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Overlay when sidebar open on mobile */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          ></div>
        )}

        {/* Main content */}
        <main className="flex-1 p-8 h-[100dvh] overflow-y-auto w-full">
          {/* Mobile toggle button */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-md bg-gray-800 text-gray-300"
            >

              <span className="w-7 h-6" > ☰ </span>
            </button>
          </div>

          {renderContent()}
        </main>
      </div>
    </div>
  )
}