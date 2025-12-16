import { useState, useMemo, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { mechanics, customers } from "../../data"
import { ArrowLeft, MapPin, Star, Clock, DollarSign, PhoneCall, LocateIcon, Locate, LucideLocate } from "lucide-react"
import { useLocalStorage } from "../helpers/UseLocalStorage"
import ResponsiveHeader from "../components/common/ResponsiveHeader"
import { useMapContext } from "../contexts/MapContext"
import { LocationName } from "../helpers/GetLocationName"
import MainMap from "../components/map/MainMap"

const MapPage = () => {
  const { user } = useAuth()
  const [selectedUser, setselectedUser] = useState(null)
  const { selectedMechanic } = useMapContext();


  useEffect(() => {
    setselectedUser(selectedMechanic);
  }, [selectedMechanic]);

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

  const renderMarkerDetails = (selectedUserDetails) => {
    const user = selectedUserDetails || null
    if (!user) {
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
    const type = user.role
    const data = user
    if (type === "Mechanic") {
      return (
        <div className="card">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gold mb-1">{data.fullName}</h3>
            </div>
            <span className={`status-badge ${data.isAvailable ? "status-active" : "status-blocked"}`}>
              {data.isAvailable ? "Available" : "Busy"}
            </span>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-gold" />
              <span className="text-gold font-medium">{data.rating}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">{
                data.location && (
                  <LocationName
                    lat={data?.location.coordinates[1]}
                    lon={data?.location.coordinates[0]}
                  />
                )}</span>
            </div>
            <div className="flex items-center space-x-2">
              <PhoneCall className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">{data.phone}</span>
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


  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gold flex items-center space-x-2">
                <MapPin className="w-6 h-6" />
                <span> Elisoft Assist Map</span>
              </h1>
              <p className="text-gray-400">
                {user?.role === "Customer" ? "Find mechanics near you" : "Locate Customer requests"}
              </p>
            </div>
            <div className="hidden md:flex space-x-3">
              <Link to={getBackRoute()} className="btn btn-ghost flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-0 overflow-hidden">
              <div className=" border-b border-gray-800">
                <h2 className="text-lg font-semibold text-gold">
                  {user?.role === "Customer" ? "🔧 Available Mechanics" : "📍 Customer Requests"}
                </h2>
              </div>
              <div className="py-4">
                <div className="bg-gold">
                  {/* {
                    user?.role === "Customer"? 
                    <UberLikeMap /> : 
                    <MechanicMAp />
                  } */}

                  <MainMap />
                </div>
              </div>
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
        </div>
      </div>

      <div className="mt-20 visible md:hidden">
        <ResponsiveHeader />
      </div>
    </div>
  )
}

export default MapPage
