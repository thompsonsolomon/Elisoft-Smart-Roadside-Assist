import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function DashboardChart({ data }) {
  const { revenue = [], serviceRequests = {}, userGrowth = [] } = data || {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {/* User Growth */}
      <div className="bg-gray-800 p-4 rounded-2xl shadow">
        <h2 className="text-lg  text-yellow-300 font-semibold mb-2">📈 User Growth</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userGrowth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id.date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Service Requests */}
      <div className="bg-gray-800 p-4 rounded-2xl shadow">
        <h2 className="text-lg  text-yellow-300 font-semibold mb-2">🛠 Service Requests</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={Object.entries(serviceRequests).map(([key, value]) => ({
              type: key,
              count: value,
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue */}
      <div className="bg-gray-800 p-4 rounded-2xl shadow md:col-span-2">
        <h2 className="text-lg  text-yellow-300 font-semibold mb-2">💰 Revenue</h2>
        {revenue.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">No revenue data available</p>
        )}
      </div>
    </div>
  );
}
