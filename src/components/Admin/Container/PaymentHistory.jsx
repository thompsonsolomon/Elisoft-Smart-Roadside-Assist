import { useEffect, useState } from "react"
import { GetUserPaymentHistory } from "../../../utils/api";
import { Loader2 } from "lucide-react";

function PaymentHistory() {
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const bookings = [
    {
      id: 1,
      customer: "John Smith",
      mechanic: "Mike Johnson",
      service: "Oil Change",
      date: "2024-01-15",
      status: "Completed",
      amount: "$45",
    },
    {
      id: 2,
      customer: "Alice Brown",
      mechanic: "Sarah Wilson",
      service: "Brake Repair",
      date: "2024-01-16",
      status: "Pending",
      amount: "$180",
    },
    {
      id: 3,
      customer: "Bob Davis",
      mechanic: "David Brown",
      service: "Engine Check",
      date: "2024-01-17",
      status: "In Progress",
      amount: "$120",
    },
  ]

  useEffect(() => {
    // 🔹 Load mechanic’s earnings/payment history
    const fetchCustomerHistory = async () => {
      try {
        setLoadingHistory(true);
        const res = await GetUserPaymentHistory();
        console.log(res);
        setHistory(res?.data?.payments || []);
        console.log(history);

      } catch {
        toast.error("Failed to fetch payment history");
      } finally {
        setLoadingHistory(false);
      }
    };
    return () => {
      fetchCustomerHistory()

    }
  }, [])


  return (
    <div>
      <h2 className="text-3xl font-semibold text-yellow-400 mb-6">Booking Management</h2>

      {
        loadingHistory ?
          <div className="flex justify-center items-center py-16">
            <Loader2 className="animate-spin text-yellow-400" size={32} />
          </div>
          :

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">              {bookings.map((booking) => (
            <div key={booking.id} className="bg-gray-800 p-5 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-yellow-400 font-medium">Booking #{booking.id}</h4>
                <span
                  className={`text-xs px-3 py-1 rounded-full ${booking.status === "Completed"
                    ? "bg-green-600 text-white"
                    : booking.status === "Pending"
                      ? "bg-yellow-500 text-black"
                      : "bg-blue-500 text-white"
                    }`}
                >
                  {booking.status}
                </span>
              </div>
              <div className="text-sm text-gray-400 grid grid-cols-2 gap-1 mb-3">
                <p>Customer: {booking.customer}</p>
                <p>Mechanic: {booking.mechanic}</p>
                <p>Service: {booking.service}</p>
                <p>Date: {booking.date}</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-yellow-400 font-semibold">{booking.amount}</span>
                <button className="btn btn-secondary px-4 py-2 text-sm">View Details</button>
              </div>
            </div>
          ))}
          </div>
      }

    </div>
  )
}

export default PaymentHistory