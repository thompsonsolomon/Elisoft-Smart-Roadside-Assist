import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CreditCard, History, Loader2, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import {
  GetPaymentPlans,
  GetUserPaymentHistory,
  InitializePayment,
} from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";
import ResponsiveHeader from "../common/ResponsiveHeader";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [history, setHistory] = useState([]);
  const [reference, setReference] = useState("");
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // 🔹 Load membership plans (for customers)
  const fetchPlans = async () => {
    try {
      setLoadingPlans(true);
      const res = await GetPaymentPlans();
      setPlans(res?.data?.plans || []);

    } catch {
      toast.error("Failed to load membership plans");
    } finally {
      setLoadingPlans(false);
    }
  };

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

  const fetchHistory = async () => {
    try {
      setLoadingHistory(true);
      const res = []
      console.log(res);

      setHistory(res?.data?.data || []);
    } catch {
      toast.error("Failed to fetch payment history");
    } finally {
      setLoadingHistory(false);
    }
  };



  // 🔹 Handle user membership subscription
  const handlePayment = async (planId, amount) => {
    try {
      toast.info("Redirecting to payment...");
      const payload = {
        amount: Number(amount),
        planId: planId,
      };
      const res = await InitializePayment(payload);
      if (res?.data?.authorizationUrl) {
        window.open(res.data.authorizationUrl, "_self");
      } else {
        toast.error("Payment URL missing");
      }
    } catch (err) {
      toast.error("Payment initialization failed");
      console.log(err);
    }
  };



  useEffect(() => {
    if (user?.role === "Customer") fetchPlans();
    if (user?.role === "Customer") fetchCustomerHistory();
    if (user?.role === "Mechanic") fetchHistory();

  }, [user]);
  return (
    <div className="min-h-screen bg-black text-white py-10 flex flex-col items-center">
      <header className="w-full max-w-6xl flex justify-between items-center px-5 mb-10">
        <h1 className="text-3xl font-extrabold text-yellow-500">
          ⚙️ Elisoft Membership
        </h1>
        <div className="flex items-center gap-2 text-gray-400">
          <p>Role:</p>
          <Link
            to={"/profile"}
            className="bg-yellow-500/10 text-yellow-400 border border-yellow-400/30 rounded-lg px-3 py-1 outline-none"
          >
            {
              user.role === "Customer" ? "Customer" : "Mechanic"
            }
          </Link>
        </div>
      </header>

      <main className="w-full max-w-6xl space-y-10 px-5">
        {user?.role === "Customer" && (
          <>
            {/* Customer Membership Section */}
            <section className="bg-gradient-to-br from-yellow-700/10 via-black to-yellow-900/10 border border-yellow-500/10 rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
                <CreditCard size={22} /> Membership Plans
              </h2>

              {loadingPlans ? (
                <div className="flex justify-center items-center py-16">
                  <Loader2 className="animate-spin text-yellow-400" size={32} />
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {plans.map((plan) => (
                    <div
                      key={plan._id}
                      className="bg-gradient-to-br from-yellow-600/20 via-black to-yellow-900/10 border border-yellow-500/20 rounded-2xl p-6 backdrop-blur-md hover:border-yellow-400 hover:shadow-yellow-500/20 transition-all duration-300"
                    >
                      <div className="flex flex-col justify-between h-full">
                        <div>
                          <h3 className="text-xl font-semibold text-yellow-400 mb-1">
                            {plan.name}
                          </h3>
                          <p className="text-gray-400 text-sm mb-4">
                            {plan.description}
                          </p>
                          <p className="text-2xl font-bold text-yellow-500">
                            ₦{plan.price}
                          </p>
                        </div>
                        <button
                          onClick={() => handlePayment(plan._id, plan.price)}
                          className="mt-6 w-full bg-yellow-500 text-black font-semibold py-2 rounded-lg hover:bg-yellow-400 transition"
                        >
                          Subscribe Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
            <section className="bg-gradient-to-br from-yellow-700/10 via-black to-yellow-900/10 border border-yellow-500/10 p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
                <History size={22} /> Payment History
              </h2>

              {loadingHistory ? (
                <div className="flex justify-center items-center py-16">
                  <Loader2 className="animate-spin text-yellow-400" size={32} />
                </div>
              ) : history.length === 0 ? (
                <p className="text-gray-400 text-center py-8">
                  No payments recorded yet.
                </p>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {history.map((item, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-r from-yellow-700/10 via-black to-yellow-900/10 border border-yellow-500/20 rounded-xl p-5 flex justify-between items-center shadow-md hover:border-yellow-400 transition"
                    >
                      <div>
                        <h3 className="font-semibold text-yellow-400">
                          {item?.planId?.name || "Customer Payment"}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Ref:{" "}
                          <span className="text-yellow-500">
                            {item.paymentReference}
                          </span>
                        </p>

                        <p className="text-gray-400 text-sm mt-4" >
                          Created At: 
                          <span className="text-yellow-500">
                             {new Date(item.createdAt).toLocaleString()}
                          </span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-yellow-500">
                          ₦{item.amount}
                        </p>
                        <p
                          className={`text-sm ${item.status === "success"
                            ? "text-green-500"
                            : item.status === "pending"
                              ? "text-yellow-500"
                              : "text-red-500"
                            }`}
                        >
                          {item.status}
                        </p>

                        {
                          item.status === "Pending" && (
                            <button
                              onClick={() => navigate(`/verify-payment?reference=${item.paymentReference}`)}
                              className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-400 transition"
                            >
                              Verify
                            </button>
                          )
                        }

                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {user?.role === "Mechanic" && (
          <>
            {/* Mechanic Earnings Section */}
            <section className="bg-gradient-to-br from-yellow-700/10 via-black to-yellow-900/10 border border-yellow-500/10 p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
                <History size={22} /> Payment History
              </h2>

              {loadingHistory ? (
                <div className="flex justify-center items-center py-16">
                  <Loader2 className="animate-spin text-yellow-400" size={32} />
                </div>
              ) : history.length === 0 ? (
                <p className="text-gray-400 text-center py-8">
                  No payments recorded yet.
                </p>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {history.map((item, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-r from-yellow-700/10 via-black to-yellow-900/10 border border-yellow-500/20 rounded-xl p-5 flex justify-between items-center shadow-md hover:border-yellow-400 transition"
                    >
                      <div>
                        <h3 className="font-semibold text-yellow-400">
                          {item.planName || "Customer Payment"}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Ref:{" "}
                          <span className="text-yellow-500">
                            {item.reference}
                          </span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-yellow-500">
                          ₦{item.amount}
                        </p>
                        <p
                          className={`text-sm ${item.status === "success"
                            ? "text-green-500"
                            : item.status === "pending"
                              ? "text-yellow-500"
                              : "text-red-500"
                            }`}
                        >
                          {item.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>

      <ResponsiveHeader />
    </div>
  );
};

export default Payment;




// import React, { useEffect, useState } from "react";
// import { CreditCard, History, Loader2, Wallet } from "lucide-react";

// const Payment = () => {
//   // 👇 Change this to "mechanic" or "customer" to preview each view
//   const [user, setUser] = useState({ role: "customer" });

//   const [plans, setPlans] = useState([]);
//   const [history, setHistory] = useState([]);
//   const [reference, setReference] = useState("");

//   useEffect(() => {
//     if (user.role === "customer") {
//       // Dummy Membership Plans
//       setPlans([
//         {
//           _id: "1",
//           name: "Basic Plan",
//           description: "Access to standard repair services for one month.",
//           price: 3000,
//         },
//         {
//           _id: "2",
//           name: "Pro Plan",
//           description:
//             "Full access to all premium vehicle repair services for 3 months.",
//           price: 8000,
//         },
//         {
//           _id: "3",
//           name: "Elite Plan",
//           description:
//             "Exclusive benefits, faster response, and top-tier support for 6 months.",
//           price: 15000,
//         },
//       ]);
//     } else if (user.role === "mechanic") {
//       // Dummy Payment History
//       setHistory([
//         {
//           id: 1,
//           planName: "Pro Plan",
//           reference: "PAY123456",
//           amount: 5000,
//           status: "success",
//         },
//         {
//           id: 2,
//           planName: "Elite Plan",
//           reference: "PAY789012",
//           amount: 15000,
//           status: "pending",
//         },
//         {
//           id: 3,
//           planName: "Basic Plan",
//           reference: "PAY345678",
//           amount: 3000,
//           status: "failed",
//         },
//       ]);
//     }
//   }, [user]);

//   return (
//     <div className="min-h-screen bg-black text-white py-10 flex flex-col items-center">
//       {/* Header */}
//       <header className="w-full max-w-6xl flex justify-between items-center px-5 mb-10">
//         <h1 className="text-3xl font-extrabold text-yellow-500">
//           ⚙️ Elisoft Membership
//         </h1>
//         <div className="flex items-center gap-2 text-gray-400">
//           <p>Role:</p>
//           <select
//             value={user.role}
//             onChange={(e) => setUser({ role: e.target.value })}
//             className="bg-yellow-500/10 text-yellow-400 border border-yellow-400/30 rounded-lg px-3 py-1 outline-none"
//           >
//             <option value="customer">Customer</option>
//             <option value="mechanic">Mechanic</option>
//           </select>
//         </div>
//       </header>

//       <main className="w-full max-w-6xl space-y-10 px-5">
//         {/* CUSTOMER VIEW */}
//         {user.role === "customer" && (
//           <>
//             <section className="bg-gradient-to-br from-yellow-700/10 via-black to-yellow-900/10 border border-yellow-500/10 rounded-2xl shadow-lg p-6">
//               <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
//                 <CreditCard size={22} /> Membership Plans
//               </h2>

//               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {plans.map((plan) => (
//                   <div
//                     key={plan._id}
//                     className="bg-gradient-to-br from-yellow-600/20 via-black to-yellow-900/10 border border-yellow-500/20 rounded-2xl p-6 backdrop-blur-md hover:border-yellow-400 hover:shadow-yellow-500/20 transition-all duration-300"
//                   >
//                     <div className="flex flex-col justify-between h-full">
//                       <div>
//                         <h3 className="text-xl font-semibold text-yellow-400 mb-1">
//                           {plan.name}
//                         </h3>
//                         <p className="text-gray-400 text-sm mb-4">
//                           {plan.description}
//                         </p>
//                         <p className="text-2xl font-bold text-yellow-500">
//                           ₦{plan.price.toLocaleString()}
//                         </p>
//                       </div>
//                       <button className="mt-6 w-full bg-yellow-500 text-black font-semibold py-2 rounded-lg hover:bg-yellow-400 transition">
//                         Subscribe Now
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* Verify Payment */}
//             <section className="bg-gradient-to-br from-yellow-700/10 via-black to-yellow-900/10 border border-yellow-500/10 p-8 rounded-2xl shadow-inner">
//               <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
//                 <Wallet size={22} /> Verify Payment
//               </h2>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <input
//                   type="text"
//                   placeholder="Enter payment reference"
//                   value={reference}
//                   onChange={(e) => setReference(e.target.value)}
//                   className="flex-1 px-4 py-3 bg-black/70 border border-yellow-500/20 rounded-lg text-gray-300 focus:outline-none focus:border-yellow-500 transition"
//                 />
//                 <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
//                   Verify
//                 </button>
//               </div>
//             </section>
//           </>
//         )}

//         {/* MECHANIC VIEW */}
//         {user.role === "mechanic" && (
//           <>
//             <section className="bg-gradient-to-br from-yellow-700/10 via-black to-yellow-900/10 border border-yellow-500/10 p-6 rounded-2xl shadow-lg">
//               <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
//                 <History size={22} /> Payment History
//               </h2>

//               {history.length === 0 ? (
//                 <div className="flex justify-center items-center py-16">
//                   <Loader2 className="animate-spin text-yellow-400" size={32} />
//                 </div>
//               ) : (
//                 <div className="grid md:grid-cols-2 gap-6">
//                   {history.map((item) => (
//                     <div
//                       key={item.id}
//                       className="bg-gradient-to-r from-yellow-700/10 via-black to-yellow-900/10 border border-yellow-500/20 rounded-xl p-5 flex justify-between items-center shadow-md hover:border-yellow-400 transition"
//                     >
//                       <div>
//                         <h3 className="font-semibold text-yellow-400">
//                           {item.planName}
//                         </h3>
//                         <p className="text-gray-400 text-sm">
//                           Ref:{" "}
//                           <span className="text-yellow-500">
//                             {item.reference}
//                           </span>
//                         </p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-xl font-bold text-yellow-500">
//                           ₦{item.amount.toLocaleString()}
//                         </p>
//                         <p
//                           className={`text-sm ${
//                             item.status === "success"
//                               ? "text-green-500"
//                               : item.status === "pending"
//                               ? "text-yellow-500"
//                               : "text-red-500"
//                           }`}
//                         >
//                           {item.status}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </section>
//           </>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Payment;
