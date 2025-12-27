import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AvailableMechanicCard from "./Customer/AvailableMechanicCard";
import ResponsiveHeader from "./common/ResponsiveHeader";
import { Loader2, User } from "lucide-react";
import { useMapContext } from "../contexts/MapContext";
import { CancleJobRequest, GetServiceRequest } from "../utils/api";

export default function CustomerDashboard() {
  const { user } = useAuth()
  const [searchLocation, setSearchLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setSelectedMechanic, clearSelectedMechanic } = useMapContext();
  const [appointments, setAppointments] = useState();
  // clear on mount if you want
  useEffect(() => {
    clearSelectedMechanic();
  }, []);

  // const handleSetMapMarker = (mechanic) => () => {
  //   setSelectedMechanic(mechanic);
  //   navigate("/map");
  // };

  const handleCancleRequest = async (id) => {
    const res = await CancleJobRequest(id)
    if ( res.status === 200  ) {
      const res = await GetServiceRequest()
      setAppointments(res.data)
    }
    console.log(res);
  }

  const handleSetMapMarker = (job) => {
    navigate("/map", { state: { job } });
  }

  useEffect(() => {
    let mounted = true;
    const HandleFetchREquest = async () => {
      setLoading(true)
      const res = await GetServiceRequest()
      setAppointments(res.data)
      setLoading(false)
    }

    HandleFetchREquest()


    return () => (mounted = false);
  }, [])

  return (
    <div className="fade-in min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-950 py-4 shadow">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-yellow-400 text-2xl font-semibold">🔧 Elisoft Assist</h1>
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

      <main className="container mx-auto px-4 py-10 space-y-20">
        {/* Quick Actions */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-tr from-yellow-400 to-yellow-500 text-black rounded-xl p-6 shadow">
            <div className="text-4xl mb-4">🗺️</div>
            <h3 className="text-xl font-bold mb-2">Find on Map</h3>
            <p className="text-gray-800 mb-4">Locate mechanics near you with our interactive map</p>
            <button
              onClick={() => navigate("/map")}
              className="bg-black text-yellow-400 px-5 py-2 rounded hover:bg-gray-800 transition"
            >
              Open Map
            </button>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="text-yellow-400 text-xl font-bold mb-2">Emergency Service</h3>
            <p className="text-gray-400 mb-4">Need immediate roadside assistance?</p>
            <button className="btn btn-danger">Call Emergency</button>
          </div>
        </section>

        {/* Search & Mechanics */}
        <section>
          <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-yellow-400">🔍 Find Mechanics</h2>
            <input
              type="text"
              className="input w-full md:w-[400px] px-4 py-2 rounded bg-gray-800 text-white"
              placeholder="Search by location, service, or name..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
          </div>

          <AvailableMechanicCard />
        </section>

        {/* Appointments */}
        <section>
          <h2 className="text-2xl font-bold text-yellow-400 mb-6">📋 Your Appointments</h2>
          <div className="grid md:grid-cols-2 gap-6">

            {
              loading && <Loader2 className="animate-spin text-yellow-400" size={32} />
            }
            {appointments?.serviceRequests?.map((appt) => (
              <div key={appt.id} className="bg-gray-800 p-6 rounded-xl">

                {/* Mechanic Name */}
                <div className="flex justify-between mb-3">
                  <h3 className="text-yellow-400 font-semibold">
                    {appt.mechanicId?.fullName}
                  </h3>
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${appt.assignedMechanics?.responseStatus === "Completed"
                      ? "bg-green-600"
                      : "bg-yellow-500 text-black"
                      }`}
                  >
                    {appt.status || appt.assignedMechanics?.[0].responseStatus}
                  </span>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 text-sm text-gray-300 gap-2 mb-4">
                  <p>🔧 Service: {appt.serviceType}</p>
                  <p>📅 Requested: {new Date(appt.requestedAt).toLocaleString()}</p>
                  <p>📍 Address: {appt.address}</p>
                  <p>💰 Payment: {appt.paymentMethod} ({appt.paymentStatus})</p>
                </div>

                {/* Actions */}

                <div className="flex gap-3">
                  <button
                    className="btn btn-secondary w-full"
                    onClick={() => handleSetMapMarker(appt)}
                  >
                    View on Map
                  </button>
                  {appt.status === "Pending" && (
                    <button onClick={() => handleCancleRequest(appt.id)} className="btn btn-danger w-full">Cancel</button>
                  )}
                </div>
              </div>
            ))}
          </div>

        </section>


        {/* Service Options */}
        <section>
          <h2 className="text-2xl font-bold text-yellow-400 mb-6">📦 Service Options</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">🏪</div>
              <h3 className="text-yellow-400 text-lg font-bold mb-2">Workshop Visit</h3>
              <p className="text-gray-400 mb-4">
                Bring your vehicle to our partner workshops for expert service
              </p>
              <button className="btn btn-primary">Find Workshop</button>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">🏠</div>
              <h3 className="text-yellow-400 text-lg font-bold mb-2">Home Service</h3>
              <p className="text-gray-400 mb-4">
                Let our professionals come to your location for convenient repairs
              </p>
              <button className="btn btn-primary">Request Home Service</button>
            </div>
          </div>
        </section>

      </main>
      <div className="mt-20 visible md:hidden">
        <ResponsiveHeader />
      </div>
    </div>
  );
}
