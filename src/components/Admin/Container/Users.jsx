import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DeleteUser, GetAllUsers, GetUserById, UpdateUserStatus } from '../../../utils/api'
import UserDetailsModal from './UserDetails'
import { toast } from 'react-toastify';

function Users() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [singleUser, setSingleUser] = useState([]);

    // fetch all users
    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const data = await GetAllUsers();
                setUserData(data?.data?.users || []);
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        };
        fetchAllUsers();
    }, []);

    // filter users by search
    const filteredUsers = userData?.filter(
        (user) =>
            user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user?.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user?.status?.toLowerCase().includes(searchTerm.toLowerCase())

    );

    // handle block/unblock/suspend
    const handleUserAction = async (userId, newStatus) => {
        try {
            // call your update user status API
            const res = await UpdateUserStatus(userId, { status: newStatus });

            // update UI immediately (optimistic update)
            setUserData((prev) =>
                prev.map((user) =>
                    user._id === userId ? { ...user, status: newStatus } : user
                )
            );

            alert(`User ${userId} status updated to ${newStatus}`);
        } catch (err) {
            console.error("Error updating user status:", err);
            alert("Failed to update user status. Try again.");
        }
    };


    // open modal and fetch user details
    const handleModalPopup = (userId) => {
        const fetchUserById = async () => {
            try {
                const data = await GetUserById(userId);
                if (data?.data?.user) {
                    setSingleUser(data?.data?.user);
                    setIsModalOpen(true);
                }
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };
        fetchUserById();
    };


    const handleDeleteUser = async (userId) => {
        setIsModalOpen(false);
        toast.info(
            <div>
                <p>Are you sure you want to delete this user?</p>
                <div className="flex gap-2 mt-2">
                    {/* ✅ Yes button */}
                    <button
                        onClick={async () => {
                            try {
                                // 🔥 Delete user with fetch
                                const response = await fetch(
                                    `https://Elisoft Assist-backend.onrender.com/api/admin/users/${userId}`,
                                    {
                                        method: "DELETE",
                                        headers: {
                                            "Content-Type": "application/json",
                                            Authorization: `Bearer ${localStorage.getItem("token")}`, // if you use auth
                                        },
                                    }
                                );

                                if (!response.ok) {
                                    throw new Error(`Failed to delete: ${response.status}`);
                                }

                                toast.dismiss(); // close confirm toast
                                toast.success("User deleted successfully ✅");

                                // Optional: refetch your user list here
                                // fetchAllUsers();
                            } catch (err) {
                                console.error("Error deleting user:", err);
                                toast.dismiss();
                                toast.error("Failed to delete user ❌");
                            }
                        }}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                        Yes
                    </button>

                    {/* ❌ No button */}
                    <button
                        onClick={() => toast.dismiss()}
                        className="bg-gray-400 text-black px-3 py-1 rounded"
                    >
                        No
                    </button>
                </div>
            </div>,
            { autoClose: false, closeOnClick: false }
        );
    };



    return (
        <>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-yellow-400">
                    User Management
                </h2>
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 outline-none py-2 rounded bg-gray-700 text-white placeholder-gray-400 w-72"
                />
            </div>

            {/* User Cards */}
            <div className="flex flex-wrap gap-6">
                {filteredUsers.map((user) => (
                    <div
                        key={user._id}
                        className="bg-gray-800 w-[350px] p-5 rounded-lg shadow cursor-pointer"
                        onClick={() => handleModalPopup(user._id)}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <div>
                                <h4 className="text-yellow-400 font-medium text-lg capitalize">{user.fullName}</h4>
                                <p className="text-gray-400 text-sm">{user.phone}</p>
                            </div>
                            <span
                                className={`px-3 py-1 rounded-full text-xs ${user.status === "Active"
                                        ? "bg-green-600 text-white"
                                        : user.status === "Pending"
                                            ? "bg-fuchsia-400 text-white"
                                            : "bg-red-600 text-white"
                                    }`}

                            >
                                {user.isAvailable ? "Available" : "UnAvailable"}
                                {/* {user.status} */}
                            </span>
                        </div>
                        <p className="text-gray-400 text-[13px] mb-2">Role: <span className="text-yellow-600">
                            {user.role}
                        </span>
                            | Joined:{new Date(user.createdAt).toDateString()}</p>
                        <div className="flex gap-3">
                            <select
                                value={user.status}
                                onChange={(e) => handleUserAction(user._id, e.target.value)}
                                className="flex-1 outline-none px-3 py-1 rounded bg-gray-700 text-white"
                            >
                                <option value="Active">Active</option>
                                <option value="Suspended">Suspended</option>
                                <option value="Pending">Pending</option>
                            </select>

                            <button
                                onClick={() => handleDeleteUser(user._id)}
                                className="btn btn-danger flex-1"
                            >
                                Remove
                            </button>
                        </div>

                    </div>
                ))}
            </div>
            <div>
                <UserDetailsModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    user={singleUser}
                />
            </div >
        </>
    )

}
export default Users