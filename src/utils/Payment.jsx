import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { GetPaymentHistory } from "./api";

const PaymentSection = () => {
    const [formData, setFormData] = useState({
        accountNumber: "",
        bankName: "",
        bankCode: "",
        accountName: "",
    });
    const [selectedBankCode, setSelectedBankCode] = useState("");
    const [banks, setBanks] = useState([]);
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [paymentHistory, setPaymentHistory] = useState([]);

    const token = localStorage.getItem("token");
    const API_BASE = import.meta.env.VITE_Base_Url;
    const PAYSTACK_SECRET = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;



    // ✅ Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Fetch banks
    useEffect(() => {
        const fetchBanks = async () => {
            try {
                const res = await axios.get("https://api.paystack.co/bank", {
                    headers: {
                        Authorization: `Bearer ${PAYSTACK_SECRET}`,
                    },
                });
                setBanks(res.data.data || []);
            } catch (error) {
                console.error("Failed to fetch banks", error);
            }
        };
        fetchBanks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ✅ Fetch all payment plans
    const getAllPlans = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/memberships/plans`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(res.data);
            setPlans(res?.data?.data?.plans || []);
            // toast.success("Payment plans loaded", "success");
        } catch (err) {
            toast.error("Failed to load payment plans", "error");
        }
    };

    // ✅ Initiate payment
    const initiatePayment = async (planId) => {
        try {
            const res = await axios.post(
                `${API_BASE}/api/payments/initialize`,
                { planId },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // toast.notify("Redirecting to payment gateway...", "info");
            window.location.href = res.data?.authorization_url; // Paystack redirect
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to initiate payment", "error");
        }
    };

    // ✅ Verify payment
    const verifyPayment = async (reference) => {
        try {
            const res = await axios.get(`${API_BASE}/api/payments/verify?reference=${reference}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // toast.success("Payment verified successfully!", "success");
            return res.data;
        } catch (err) {
            toast.error("Payment verification failed", "error");
        }
    };

    // ✅ Get payment history
    const getPaymentHistory = async () => {
        try {
            const res = await GetPaymentHistory()
            setPaymentHistory(res.data || []);
        } catch (err) {
            toast.error("Could not load payment history", "error");
            console.log(err);
        }
    };

    // ✅ Example: Load data on mount
    useEffect(() => {
        getAllPlans();
        getPaymentHistory();
    }, []);
    console.log(plans);

    return (
        <div className="card shadow p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-3">Bank & Payment</h3>

            {/* Bank Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="text-sm text-gray-200 block mb-2">Account number</label>
                    <input
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-200 block mb-2">Bank</label>
                    <select
                        value={selectedBankCode}
                        onChange={(e) => {
                            const code = e.target.value;
                            setSelectedBankCode(code);
                            const bank = banks.find((b) => b.code === code);
                            if (bank) {
                                setFormData((prev) => ({ ...prev, bankName: bank.name, bankCode: bank.code }));
                            } else {
                                setFormData((prev) => ({ ...prev, bankName: "", bankCode: "" }));
                            }
                        }}
                        className="w-full border text-black border-gray-200 rounded px-3 py-2"
                    >
                        <option value="">Select a bank</option>
                        {banks.map((bank) => (
                            <option key={bank.code} value={bank.code}>
                                {bank.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label className="text-sm text-gray-200 block mb-2">Account name</label>
                    <input
                        name="accountName"
                        value={formData.accountName}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded px-3 py-2"
                    />
                    {loading && <p className="text-xs text-gray-500 mt-2">Resolving account...</p>}
                </div>
            </div>

            {/* Plans Section */}
            <h4 className="font-semibold mb-2 text-gray-200">Available Plans</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {plans?.map((plan) => (
                    <div key={plan.id} className="border rounded-xl p-3 shadow-sm">
                        <p className="font-semibold text-gray-800">{plan.name}</p>
                        <p className="text-sm text-gray-500">₦{plan.amount}</p>
                        <button
                            onClick={() => initiatePayment(plan.id)}
                            className="mt-2 w-full bg-black text-white rounded-lg py-1.5 text-sm"
                        >
                            Subscribe
                        </button>
                    </div>
                ))}
            </div>

            {/* Payment History */}
            <h4 className="font-semibold mb-2 text-gray-200">Payment History</h4>
            {paymentHistory.length > 0 ? (
                <ul className="space-y-2 text-sm text-gray-100">
                    {paymentHistory.map((p) => (
                        <li key={p.id} className="flex justify-between border-b pb-1">
                            <span>{p.planName}</span>
                            <span className="text-gray-200">{p.status}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-100 text-sm">No payment history yet.</p>
            )}
        </div>
    );
};

export default PaymentSection;
