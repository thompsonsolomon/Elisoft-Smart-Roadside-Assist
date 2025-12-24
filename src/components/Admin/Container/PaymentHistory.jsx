import { useEffect, useState } from "react";
import { GetUserPaymentHistory } from "../../../utils/api";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

function AdminPaymentHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchPaymentHistory = async () => {
    try {
      setLoading(true);
      const res = await GetUserPaymentHistory();
      console.log(res)
      setHistory(res?.data?.payments || []);
    } catch (err) {
      toast.error("Failed to fetch payment history");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  return (
    <div className="min-h-screen px-6 py-8">
      <h2 className="text-3xl font-bold text-yellow-400 mb-8">
        Payment History (Admin)
      </h2>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-yellow-400" size={36} />
        </div>
      ) : history.length === 0 ? (
        <div className="text-center text-gray-400 py-20">
          No payment records found.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((payment) => (
            <div
              key={payment._id}
              className="bg-gradient-to-br from-black via-gray-900 to-yellow-900/20 border border-yellow-500/20 rounded-2xl p-6 shadow-lg hover:shadow-yellow-500/20 transition"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-yellow-400 font-semibold">
                  ₦{(payment.amount / 100).toLocaleString()}
                </h4>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium
                    ${
                      payment.status === "Success"
                        ? "bg-green-600 text-white"
                        : payment.status === "Pending"
                        ? "bg-yellow-500 text-black"
                        : "bg-red-600 text-white"
                    }
                  `}
                >
                  {payment.status}
                </span>
              </div>

              {/* Details */}
              <div className="text-sm text-gray-400 space-y-1 mb-4">
                <p>
                  <span className="text-gray-500">User:</span>{" "}
                  {payment.user?.fullName || "N/A"}
                </p>
                <p>
                  <span className="text-gray-500">Plan:</span>{" "}
                  {payment.plan?.name || "—"}
                </p>
                <p>
                  <span className="text-gray-500">Reference:</span>{" "}
                  {payment.reference}
                </p>
                <p>
                  <span className="text-gray-500">Date:</span>{" "}
                  {new Date(payment.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  Paystack
                </span>
              
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPaymentHistory;
