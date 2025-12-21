import { useState } from "react";
import { toast } from "react-toastify";

export default function MembershipCard({ membership, onCancel }) {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this membership?")) {
      return;
    }

    try {
      setLoading(true);
      await onCancel(membership?._id);
    }
    catch(error){
     toast.error("Failed to cancel membership. Please try again.");
     console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!membership) return null;

  return (
    <div className="bg-gray-800 rounded-xl shadow p-6 text-sm text-gray-200">
      <h3 className="text-base font-semibold text-yellow-400 mb-4">
        Membership Details
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Plan */}
        <div className="space-y-1">
          <p className="text-xs text-gray-400">Plan Name</p>
          <p className="font-medium">{membership?.planId?.name}</p>
        </div>

        {/* Status */}
        <div className="space-y-1">
          <p className="text-xs text-gray-400">Status</p>
          <p
            className={`font-medium ${
              membership?.status === "Active"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {membership?.status}
          </p>
        </div>

        {/* Price */}
        <div className="space-y-1">
          <p className="text-xs text-gray-400">Plan Price</p>
          <p className="font-medium">
            ₦{membership?.planId?.price?.toLocaleString()}
          </p>
        </div>

        {/* Duration */}
        <div className="space-y-1">
          <p className="text-xs text-gray-400">Duration</p>
          <p className="font-medium">
            {membership?.planId?.durationMonths} month(s)
          </p>
        </div>

        {/* Credit */}
        <div className="space-y-1">
          <p className="text-xs text-gray-400">Total Credit</p>
          <p className="font-medium">{membership?.totalCredit}</p>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-gray-400">Remaining Credit</p>
          <p className="font-medium text-yellow-400">
            {membership?.remainingCredit}
          </p>
        </div>

        {/* Auto Renew */}
        <div className="space-y-1">
          <p className="text-xs text-gray-400">Auto Renew</p>
          <p className="font-medium">
            {membership?.autoRenew ? "Enabled" : "Disabled"}
          </p>
        </div>

        {/* Dates */}
        <div className="space-y-1">
          <p className="text-xs text-gray-400">Start Date</p>
          <p className="font-medium">
            {new Date(membership?.startDate).toDateString()}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-gray-400">End Date</p>
          <p className="font-medium">
            {new Date(membership?.endDate).toDateString()}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="mt-4">
        <p className="text-xs text-gray-400 mb-1">Plan Description</p>
        <p className="text-gray-300">
          {membership?.planId?.description}
        </p>
      </div>

      {/* Action */}
      {membership?.status === "Active" && (
        <div className="mt-6">
          <button
            onClick={handleCancel}
            disabled={loading}
            className="w-full border border-red-500 text-red-400 py-2 rounded-lg hover:bg-red-500 hover:text-white transition disabled:opacity-50"
          >
            {loading ? "Cancelling..." : "Cancel Membership"}
          </button>
        </div>
      )}
    </div>
  );
}
