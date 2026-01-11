import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { PerformSystemCleanup, SendNotification, ToggleMaintenanceMode } from '../../utils/api';
import { toast } from 'react-toastify';

function Settings() {
    const { logout } = useAuth();
    const [loading, setLoading] = useState(false);
    const [maintenance, setMaintenance] = useState(false);
    const [notification, setNotification] = useState("");

    const handleCleanup = async () => {
        try {
            await PerformSystemCleanup();
            toast.success("System cleanup performed!");
            fetchAllData();
        } catch (err) {
            toast.error("Cleanup failed");
        }
    };
    const handleSendNotification = async () => {
        if (!notification) return toast.warning("Enter a message!");
        try {
            await SendNotification({
                message: notification,
                recipients: "all",
                type: "info",
                title: "Admin Notification"
            });
            toast.success("Notification sent!");
            setNotification("");
        } catch (err) {
            toast.error("Failed to send notification");
        }
    };

    const handleToggleMaintenance = async () => {
        try {
            await ToggleMaintenanceMode(!maintenance);
            setMaintenance(!maintenance);
            toast.success(`Maintenance mode ${!maintenance ? "enabled" : "disabled"}`);
        } catch (err) {
            toast.error("Failed to toggle maintenance mode");
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-semibold text-yellow-400 mb-6">Admin Settings  Management</h2>
            <button
                onClick={logout}
                className="bg-transparent text-yellow-400 hover:text-red-500"
            >
                Logout
            </button>
            {/* Actions */}
            <div className="flex flex-col gap-4 bg-gray-900 p-5 rounded-2xl shadow">
                <button onClick={handleCleanup} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
                    Perform System Cleanup
                </button>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Enter notification..."
                        value={notification}
                        onChange={(e) => setNotification(e.target.value)}
                        className="px-3 py-2 flex-1 rounded bg-gray-700 text-white outline-none"
                    />
                    <button onClick={handleSendNotification} className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg">
                        Send Notification
                    </button>
                </div>
                <button
                    onClick={handleToggleMaintenance}
                    className={`px-4 py-2 rounded-lg ${maintenance ? "bg-green-600" : "bg-gray-600"} text-white`}
                >
                    {maintenance ? "Disable Maintenance" : "Enable Maintenance"}
                </button>
            </div>
        </div>
    )
}

export default Settings