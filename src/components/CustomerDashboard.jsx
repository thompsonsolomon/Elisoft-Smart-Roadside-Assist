"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AvailableMechanicCard from "./Customer/AvailableMechanicCard";

export default function CustomerDashboard() {
  const { user } = useAuth()

  const [searchLocation, setSearchLocation] = useState("");
  const navigate = useNavigate();

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
  ];

  const appointments = [
    {
      id: 1,
      mechanic: "Mike's Auto Repair",
      type: "Oil Change",
      date: "2024-01-15",
      status: "Pending",
      price: "$45",
    },
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
  ];

  return (
    <div className="fade-in min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-950 py-4 shadow">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-yellow-400 text-2xl font-semibold">🔧 Elisoft</h1>
          <div className="flex gap-3">
            <button onClick={() => navigate("/profile")} className="btn btn-primary">
              Profile
            </button>
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

        {/* Appointments */}
        {/* <section>
          <h2 className="text-2xl font-bold text-yellow-400 mb-6">📋 Your Appointments</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {appointments.map((appt) => (
              <div key={appt.id} className="bg-gray-800 p-6 rounded-xl">
                <div className="flex justify-between mb-3">
                  <h3 className="text-yellow-400 font-semibold">{appt.mechanic}</h3>
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${appt.status === "Completed" ? "bg-green-600" : "bg-yellow-500 text-black"
                      }`}
                  >
                    {appt.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 text-sm text-gray-300 gap-2 mb-4">
                  <p>🔧 Service: {appt.type}</p>
                  <p>📅 Date: {appt.date}</p>
                  <p>💰 Price: {appt.price}</p>
                  <p>📍 Type: Workshop</p>
                </div>
                {appt.status === "Pending" && (
                  <div className="flex gap-3">
                    <button className="btn btn-secondary w-full">Reschedule</button>
                    <button className="btn btn-danger w-full">Cancel</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section> */}
      </main>
    </div>
  );
}
