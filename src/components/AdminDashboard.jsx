import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Dashboard from "./Admin/Container/Dashboard"
import Users from "./Admin/Container/Users"
import MechanicsDashboard from "./Admin/Container/Mechanics"
import ServiceRequestsDashboard from "./Admin/Container/Services"
import SystemDashboard from "./Admin/Container/Reports"
import Settings from "./Admin/Settings"
import { Button, MenuButton } from "@headlessui/react"
import AdminPlans from "./Admin/Container/MembershipPlan"
import AdminServicePrices from "./Admin/Container/ServicePricing"
import PaymentHistory from "./Admin/Container/PaymentHistory"
import AdminMechanicCheckout from "./Admin/Container/MechaniCheckoutPage"
import { GetAllServiceRequests } from "../utils/api"

export default function AdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completedJObList, setCompletedJobList] = useState([])


  /* ----------------------------------------
    * 📦 Fetch Mechanic CheckOut report
    * -------------------------------------- */
  const fetchReports = async () => {
    try {
      setLoading(true);

      const res = await GetAllServiceRequests();
      const serviceRequests = res?.data?.serviceRequests || [];
      const completedJobs = serviceRequests.filter(
        (job) => job.status === "Completed" && job.paymentStatus === "Pending"
      );
      // console.log(completedJobs);
      setCompletedJobList(completedJobs);

    } catch (err) {
      console.error(err);
      toast.error("Failed to load service reports");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchReports();
  }, []);


  const tabList = [
    { id: "dashboard", label: "📊 Dashboard" },
    { id: "reports", label: "📑 Reports Analysis" },
    { id: "users", label: "👥 Users" },
    { id: "mechanics", label: "🔧 Mechanics" },
    { id: "mechanicCheckout", label: "🧾 Mechanic Checkout" },
    { id: "services", label: "🛠️ Services" },
    { id: "plans", label: "💳 Plans" },
    { id: "Pricing", label: "💲 Pricing" },
    { id: "Paymentshistory", label: "📅 Payment History" },
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
      case "Pricing":
        return (
          <AdminServicePrices />
        )
      case "mechanicCheckout":
        return (
          <AdminMechanicCheckout />
        )

      case "Paymentshistory":
        return (
          <PaymentHistory />
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
                : "hover:bg-gray-700 text-gray-300 relative"
                }`}
            >
              {tab.label}
              {tab.label.includes("Checkout") && completedJObList.length > 0 && (
                <span
                  className="absolute right-5 mb-4 flex items-center justify-center
               w-5 h-5 text-xs font-bold text-white
               bg-red-500 rounded-full"
                >
                  {completedJObList.length}
                </span>
              )}

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