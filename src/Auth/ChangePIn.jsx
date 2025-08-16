import { useState } from "react";
import { toast } from "react-toastify";
import { changePin } from "../utils/api";

export default function ChangePinModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [oldPin, setOldPin] = useState("");
    const [newPin, setNewPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)


    const handleSave = async () => {
        setLoading(true);
        if (newPin.length < 4) {
            setError("PIN must be at least 4 digits");
            return;
        }
        if (newPin !== confirmPin) {
            setError("New PIN and Confirm PIN do not match");
            return;
        }
        setError("");
        try {
            const credentials = {
                "currentPin": oldPin,
                "newPin": newPin
            }
            const result = await changePin(credentials)
            if (result.response?.data.status === "error") {
                toast.error(result.response?.data.message);
                setLoading(false);
                return;
            }
            toast.success("password update successfully");
            setIsOpen(false);

        } catch (error) {
            toast.error("Failed to update PIN");
        }
        finally {
            setLoading(false);
            setOldPin("");
            setNewPin("");
            setConfirmPin("");
        }

    };

    return (
        <div className="flex justify-center items-center">
            {/* Button to open modal */}
            <div className="w-full mt-3" >
                <button
                    onClick={() => setIsOpen(true)}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                >
                    Change PIN
                </button>
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-2xl shadow-lg w-96 p-6 relative">
                        <h2 className="text-xl font-bold mb-4 text-center">Change PIN</h2>

                        {error && (
                            <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
                        )}

                        <div className="space-y-3">
                            <input
                                placeholder="Old PIN"
                                value={oldPin}
                                type="password"
                                onChange={(e) => {
                                    // Allow only digits
                                    if (/^\d*$/.test(e.target.value)) {
                                        setOldPin(e.target.value);
                                    }
                                }}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-yellow-300"
                            />
                            <input
                                type="password"
                                placeholder="New PIN"
                                value={newPin}
                                onChange={(e) => {
                                    // Allow only digits
                                    if (/^\d*$/.test(e.target.value)) {
                                        setNewPin(e.target.value)
                                    }
                                }}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-yellow-300"
                            />
                            <input
                                type="password"
                                placeholder="Confirm New PIN"
                                value={confirmPin}
                                onChange={(e) => {
                                    // Allow only digits
                                    if (/^\d*$/.test(e.target.value)) {
                                        setConfirmPin(e.target.value)
                                    }
                                }}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-yellow-300"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                            >
                                {
                                    loading ? "loading.." :
                                        "Save"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
