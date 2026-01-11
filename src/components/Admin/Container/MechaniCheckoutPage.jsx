import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader2, Copy } from "lucide-react";
import { AdminUpdateJobPaymentStatus, GetAllServiceRequests, GetUserById } from "../../../utils/api";

function AdminMechanicCheckout() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  /* ----------------------------------------
    * 📦 Fetch reports + mechanics
    * -------------------------------------- */
 const fetchReports = async () => {
    try {
      setLoading(true);

      const res = await GetAllServiceRequests();
      const serviceRequests = res?.data?.serviceRequests || [];

      // 1️⃣ Collect unique mechanic IDs
      const mechanicIds = [
        ...new Set(
          serviceRequests
            .map((job) => job.mechanicId?._id || job.mechanicId?.id)
            .filter(Boolean)
        ),
      ];

      // 2️⃣ Fetch mechanics in parallel
      const mechanicsMap = {};

      await Promise.all(
        mechanicIds.map(async (id) => {
          try {
            const mechRes = await GetUserById(id);
            mechanicsMap[id] = mechRes?.data?.user;
          } catch (err) {
            console.error("Failed to fetch mechanic:", id, err);
          }
        })
      );

      // 3️⃣ Merge mechanic into job
      const enrichedJobs = serviceRequests.map((job) => ({
        ...job,
        mechanic:
          mechanicsMap[job.mechanicId?._id || job.mechanicId?.id] || null,
      }));

      setJobs(enrichedJobs);
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


  useEffect(() => {
    fetchReports();
  }, []);


  useEffect(() => {
    fetchReports();
  }, []);

  /* ----------------------------------
   * 💰 Mark job as paid
   * ---------------------------------- */
  const markAsPaid = async (jobId) => {
    try {
      setUpdatingId(jobId);
      const data = { paymentStatus: "Paid" };
      await AdminUpdateJobPaymentStatus(jobId, data);
      toast.success("Payment marked as paid");
      fetchReports(); // refresh list
    } catch (err) {
      console.error(err);
      toast.error("Failed to update payment status");
    } finally {
      setUpdatingId(null);
    }
  };

  /* ----------------------------------
   * 📋 Copy helper
   * ---------------------------------- */
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  /* ----------------------------------
   * 🎯 Filter completed jobs only
   * ---------------------------------- */
  const completedJobs = jobs.filter(
    (job) => job.status === "Completed" && job.paymentStatus === "Pending"
  );  

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-white mb-6">
        Service Reports (Completed Jobs)
      </h2>

      {loading && (
        <div className="flex items-center gap-3 text-yellow-400">
          <Loader2 className="animate-spin" />
          Loading reports...
        </div>
      )}

      {!loading && completedJobs.length === 0 && (
        <p className="text-gray-400">No completed jobs yet.</p>
      )}

      <div className="space-y-4">
        {completedJobs.map((job) => (
          <div
            key={job._id}
            className="bg-gray-800 rounded-xl p-5 shadow border border-gray-700"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-white font-semibold">
                  Job ID: {job._id}
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(job.createdAt).toLocaleString()}
                </p>
              </div>

              {/* <span
                className={`px-3 py-1 rounded-full text-sm ${
                  job.paymentStatus === "Paid"
                    ? "bg-green-600"
                    : "bg-yellow-500 text-black"
                }`}
              >
                {job.paymentStatus}
              </span> */}
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <p><strong>Customer:</strong> {job.customerId?.fullName}</p>
                <p><strong>Phone:</strong> {job.customerId?.phone}</p>
              </div>

              <div>
                <p><strong>Mechanic:</strong> {job.mechanicId?.fullName}</p>
                <p><strong>Phone:</strong> {job.mechanicId?.phone}</p>
              </div>

              <div>
                <p><strong>Service Type:</strong> {job.serviceType}</p>
                <p><strong>Address:</strong> {job.address}</p>
                <p><strong>Amount:</strong> {job.price}</p>
              </div>

            </div>

            {/* Bank Details */}
            <div className="mt-4 bg-gray-900 p-4 rounded-lg">
              <p className="text-yellow-400 font-medium mb-2">
                Mechanic Bank Details
              </p>

              <div className="text-sm text-gray-300 space-y-1">
                <p className="flex justify-between">
                  Bank: {job.mechanic?.bankName}
                  <Copy
                    className="cursor-pointer"
                    size={16}
                    onClick={() => copyText(job.mechanic?.bankName)}
                  />
                </p>

                <p className="flex justify-between">
                  Account Number: {job.mechanic?.accountNumber}
                  <Copy
                    className="cursor-pointer"
                    size={16}
                    onClick={() =>
                      copyText(job.mechanic?.accountNumber)
                    }
                  />
                </p>

                <p className="flex justify-between">
                  Account Name: {job.mechanic?.accountName}
                  <Copy
                    className="cursor-pointer"
                    size={16}
                    onClick={() =>
                      copyText(job.mechanic?.accountName)
                    }
                  />
                </p>
              </div>
            </div>

            {/* Action */}
            {job.paymentStatus !== "Paid" && (
              <button
                onClick={() => markAsPaid(job._id)}
                disabled={updatingId === job._id}
                className="mt-4 px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 disabled:opacity-50"
              >
                {updatingId === job._id ? "Updating..." : "Mark as Paid"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminMechanicCheckout;
