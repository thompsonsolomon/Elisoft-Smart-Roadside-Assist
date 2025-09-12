import React from "react";

export default function UserDetailsModal({ isOpen, onClose, user }) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-200 text-black rounded-2xl shadow-lg p-6 w-full max-w-lg overflow-y-auto max-h-[80vh]">
        <h2 className="text-xl font-bold mb-4">👤 User Details</h2>

        <div className="space-y-2 text-sm">
          <p><strong>Full Name:</strong> {user.fullName}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Status:</strong> {user.status}</p>
          <p><strong>Available:</strong> {user.isAvailable ? "Yes" : "No"}</p>
          <p><strong>Phone Verified:</strong> {user.isPhoneVerified ? "Yes" : "No"}</p>
          <p><strong>Rating:</strong> {user.rating} ⭐</p>
          <p><strong>Total Ratings:</strong> {user.totalRatings}</p>
          <p>
            <strong>Location:</strong>{" "}
            {user.location?.coordinates?.join(", ") || "N/A"}
          </p>
          <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
          <p><strong>Last Updated:</strong> {new Date(user.updatedAt).toLocaleString()}</p>
          <p><strong>ID:</strong> {user._id}</p>
        </div>

        {user.profileImage ? (
          <div className="mt-4">
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border"
            />
          </div>
        ) : (
          <p className="mt-4 text-gray-500">No profile image</p>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
