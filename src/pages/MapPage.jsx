import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { mechanics, customers } from "../../data"
import GoogleMap from "../components/common/GoogleMap"
import GoogleMapReact from 'google-map-react';
import { ArrowLeft, MapPin, Star, Clock, DollarSign } from "lucide-react"
import AnyReactComponent from "../components/map/marker"
import NigeriaMap from "../components/map/marker"
import { useLocalStorage } from "../helpers/UseLocalStorage"



const MapPage = () => {
  const { user } = useAuth()
  const [MaPuser] = useLocalStorage("Elisoft_MapData", null);

  // Map center (New York City)
  const mapCenter = { lat: 40.7128, lng: -74.006 }

  console.log("Map user data:", MaPuser)

  // Prepare markers based on user role
  const markers = useMemo(() => {
    const markerData = []

    // Show mechanics for customers and admins
    if (user?.role === "Customer" || user?.role === "admin") {
      mechanics.forEach((mechanic) => {
        markerData.push({
          id: `Mechanic-${mechanic.id}`,
          type: "Mechanic",
          position: mechanic.location.coordinates,
          title: mechanic.name,
          data: mechanic,
          color: mechanic.available ? "#FFD700" : "#6B7280",
          label: "🔧",
        })
      })
    }

    // Show customers for mechanics and admins
    if (user?.role === "Mechanic" || user?.role === "admin") {
      customers.forEach((customer) => {
        markerData.push({
          id: `Customer-${customer.id}`,
          type: "Customer",
          position: customer.location.coordinates,
          title: customer.name,
          data: customer,
          color: "#10B981",
          label: "👤",
        })
      })
    }

    return markerData
  }, [user?.role])


  const getBackRoute = () => {
    switch (user?.role) {
      case "Customer":
        return "/Customer"
      case "Mechanic":
        return "/Mechanic"
      case "admin":
        return "/admin"
      default:
        return "/"
    }
  }

  const renderMarkerDetails = () => {
    if (!MaPuser) {
      return (
        <div className="card">
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Select a marker</h3>
            <p className="text-gray-500">Click on a marker to view details and take actions</p>
          </div>
        </div>
      )
    }

    const type = MaPuser.type
    const data = MaPuser.user
    console.log("Selected marker data:", data);


    if (type === "Mechanic") {
      return (
        <div className="card">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gold mb-1">{data.fullName}</h3>
              <p className="text-gray-400">{data.expertise.join(", ")}</p>
            </div>
            <span className={`status-badge ${data.available ? "status-active" : "status-blocked"}`}>
              {data.available ? "Available" : "Busy"}
            </span>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-gold" />
              <span className="text-gold font-medium">{data.rating}</span>
              <span className="text-gray-400">({data.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">{data.location.address}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">{data.workingHours}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">Price Range: {data.priceRange}</span>
            </div>
          </div>

          {user?.role === "Customer" && data.available && (
            <div className="grid grid-cols-2 gap-3">
              <button className="btn btn-primary">Book Now</button>
              <button className="btn btn-secondary">Get Directions</button>
            </div>
          )}

          {data.services && (
            <div className="mt-6">
              <h4 className="font-semibold text-gold mb-3">Services Offered</h4>
              <div className="space-y-2">
                {data.services.slice(0, 3).map((service, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">{service.name}</span>
                    <span className="text-gold">${service.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )
    }

    if (type === "Customer") {
      return (
        <div className="card">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gold mb-1">{data.fullName}</h3>
              <p className="text-gray-400">{data.serviceRequested}</p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">{data.location.address}Address </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">
                {data.lastLocationUpdate} at {data.lastLocationUpdate}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">Budget: ${data.budget}</span>
            </div>
          </div>

          {data.description && (
            <div className="mb-6">
              <h4 className="font-semibold text-gold mb-2">Description</h4>
              <p className="text-gray-300 text-sm">{data.description}</p>
            </div>
          )}

          {data.vehicleInfo && (
            <div className="mb-6">
              <h4 className="font-semibold text-gold mb-2">Vehicle Information</h4>
              <p className="text-gray-300 text-sm">
                {data.vehicleInfo.year} {data.vehicleInfo.make} {data.vehicleInfo.model} ({data.vehicleInfo.color})
              </p>
            </div>
          )}

          {user?.role === "Mechanic" && (
            <div className="grid grid-cols-2 gap-3">
              <button className="btn btn-primary">Accept Job</button>
              <button className="btn btn-secondary">Get Directions</button>
            </div>
          )}
        </div>
      )
    }

    return null
  }

  const getStatsData = () => {
    if (user?.role === "Customer") {
      const availableMechanics = mechanics.filter((m) => m.available).length
      return {
        title: "Available Mechanics",
        value: availableMechanics,
        total: mechanics.length,
        subtitle: `${mechanics.length} total mechanics`,
      }
    } else {
      return {
        title: "Pending Requests",
        value: customers.length,
        total: customers.length,
        subtitle: "Average distance: 2.3 miles",
      }
    }
  }

  const stats = getStatsData()


  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gold flex items-center space-x-2">
                <MapPin className="w-6 h-6" />
                <span> Elisoft Map</span>
              </h1>
              <p className="text-gray-400">
                {user?.role === "Customer" ? "Find mechanics near you" : "Locate Customer requests"}
              </p>
            </div>
            <div className="flex space-x-3">
              <Link to={getBackRoute()} className="btn btn-ghost flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-0 overflow-hidden">
              <div className="p-4 border-b border-gray-800">
                <h2 className="text-lg font-semibold text-gold">
                  {user?.role === "Customer" ? "🔧 Available Mechanics" : "📍 Customer Requests"}
                </h2>
              </div>
              <div className="p-4">
                <div style={{ height: '50vh', width: '100%' }}>
                  <NigeriaMap />
                </div>              </div>
            </div>

            {/* Map Legend */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gold mb-4">Map Legend</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(user?.role === "Customer" || user?.role === "admin") && (
                  <>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center text-black text-xs font-bold">
                        🔧
                      </div>
                      <span className="text-gray-300">Available Mechanic</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        🔧
                      </div>
                      <span className="text-gray-300">Busy Mechanic</span>
                    </div>
                  </>
                )}
                {(user?.role === "Mechanic" || user?.role === "admin") && (
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      👤
                    </div>
                    <span className="text-gray-300">Customer Request</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details Panel */}
          <div className="space-y-6">
            {/* Selected Marker Details */}
            <div>
              <h2 className="text-lg font-semibold text-gold mb-4">
                {MaPuser ? "📋 Details" : "ℹ️ Select a marker"}
              </h2>
              {renderMarkerDetails()}
            </div>

            {/* Quick Stats */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gold mb-4">📊 Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">{stats.title}:</span>
                  <span className="text-gold font-semibold text-lg">{stats.value}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Available:</span>
                  <span className="text-gray-400">{stats.total}</span>
                </div>
                <div className="text-sm text-gray-400 pt-2 border-t border-gray-800">{stats.subtitle}</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gold mb-4">⚡ Quick Actions</h3>
              <div className="space-y-3">
                {user?.role === "Customer" && (
                  <>
                    <button className="btn btn-primary w-full">Request Emergency Service</button>
                    <button className="btn btn-secondary w-full">Schedule Appointment</button>
                  </>
                )}
                {user?.role === "Mechanic" && (
                  <>
                    <button className="btn btn-primary w-full">Toggle Availability</button>
                    <button className="btn btn-secondary w-full">View All Requests</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapPage
