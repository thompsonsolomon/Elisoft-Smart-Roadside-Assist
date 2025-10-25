import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_Base_Url;
// const API_Key = import.meta.env.VITE_API_KEY;

// Utility to get and set tokens
const getAccessToken = () => localStorage.getItem("token");
const getRefreshToken = () => localStorage.getItem("refreshToken");
const setAccessToken = (token) => localStorage.setItem("token", token);
// Create Axios instance
export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        // "x-api-key": API_Key,
    },
});
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const errorMessage = error?.response?.data?.message;
        const isTokenExpired =
            error.response?.status === 401 || error.response?.status === 403 &&
            errorMessage?.toLowerCase().includes("token");
        if (isTokenExpired && !originalRequest._retry && getRefreshToken()) {
            originalRequest._retry = true;
            try {
                toast.info("Token expired. Refreshing...");
                const token = getAccessToken();
                const refreshRes = await axios.post(
                    `${API_BASE_URL}/api/auth/refresh-token`,
                    { refreshToken: getRefreshToken() },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            // "x-api-key": API_Key,
                            ...(token ? { Authorization: `Bearer ${token}` } : {}),
                        },
                    }
                );
                const newAccessToken = refreshRes.data?.data?.accessToken;
                if (!newAccessToken) {
                    console.log("No access token received");
                    localStorage.removeItem("token")
                    throw new Error("No access token received");
                }

                
                setAccessToken(newAccessToken);
                toast.success("Token refreshed successfully");
                // Update the original request with the new token
                toast.info("Retrying original request...");
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error("🔴 Token refresh failed:", refreshError);
                toast.error("We could not refresh your token. Please log in again.");
                localStorage.removeItem("token")
                throw new Error("Session expired. Please log in again.");
            }
        }
        // 🔸 Other API errors
        return Promise.reject(error);
    }
);




// 🔹 Generic API Request Function
export const apiRequest = async (endpoint, method = "GET", data = null, token = getAccessToken()) => {
    try {
        const response = await api({
            url: endpoint,
            method,
            data,
            headers: {
                "Content-Type": "application/json",
                // "x-api-key": API_Key,
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(data),
        });
        return response.data;
    } catch (error) {
        let errorMessage = "An unexpected error occurred. Please try again.";

        if (error.response) {
            const { status, data } = error.response;
            switch (status) {
                case 400:
                    errorMessage = data?.message || "Invalid request.";
                    break;
                case 401:
                    errorMessage = "Unauthorized. Please log in.";
                    break;
                case 403:
                    errorMessage = "Forbidden access.";
                    break;
                case 404:
                    errorMessage = "Not found.";
                    break;
                case 500:
                    errorMessage = "Server error.";
                    break;
                default:
                    errorMessage = data?.message || "Something went wrong.";
            }
        } else if (error.request) {
            // errorMessage = "Network error.";
            errorMessage = error
        } else {
            errorMessage = error.message;
        }
        console.error("API Error:", errorMessage);
        return error
        // throw new Error(errorMessage);
    }
};
const token = getAccessToken();
// 🔹 Auth Functions
export const registerUser = (credentials) => apiRequest("/api/auth/register", "POST", credentials);
export const loginUser = (credentials) => apiRequest("/api/auth/login", "POST", credentials);
export const forgotPin = (pin) => apiRequest("/api/auth/request-reset", "POST", { pin });
export const resetPin = (resetToken, newPin) => apiRequest(`/api/auth/reset-pin/${resetToken}`, "POST", { newPin });
export const changePin = (credentials, token) => apiRequest("/api/auth/change-pin", "POST", credentials, token);
// 🔹  User
export const fetchUsers = () => apiRequest("/api/users/profile");
export const updateUserProfile = (data, token) => apiRequest("/api/users/profile", "PUT", data, token);
export const updateUserLocation = (data) => apiRequest("/api/users/location", "PUT", data, token);
// export const updateLocation = (data, token) => apiRequest(`/api/users/location/`, "PUT", data, token);



// Mechanics
export const MechanicAvailability = ( data) =>  apiRequest(`/api/users/availability`, "PUT", data);
export const MechanicGetRequests = () => apiRequest("/api/service-requests/available", "GET");
export const GetMechanicByID = (id) => apiRequest(`/api/users/mechanics/${id}`);
export const MyPendingRequests = ( ) => apiRequest(`/api/service-requests/available`, "GET");
export const MyAcceptedRequests = ( ) => apiRequest(`/api/service-requests/accepted`, "GET");



//Customers
export const CustomerGetAvailableMechanic = (lat, lng) => apiRequest(`/api/users/nearby-mechanics?coordinates=${lng}, ${lat}`, "GET");
export const CreateServiceRequest = (data) => apiRequest("/api/service-requests", "POST", data);
export const GetServiceRequest = () => apiRequest(`/api/service-requests/my-requests`);


//payments
export const GetPaymentPlans = () => apiRequest("/api/memberships/plans", "GET", null, token);
export const InitializePayment = (planId) => apiRequest("/api/payments/initialize", "POST", { planId }, token);
export const VerifyPayment = (reference) => apiRequest(`/api/payments/verify?reference=${reference}`, "GET", null, token);
export const GetPaymentHistory = () => apiRequest("/api/payments/history", "GET", null, token);

// Admin Dashboard & Analytics
export const GetDashboard = () => apiRequest("/api/admin/dashboard");
export const GetAnalysis = () => apiRequest("/api/admin/analytics?period=30days");
export const GetRevenueAnalysis = () => apiRequest("/api/admin/revenue-analytics?startDate=2024-01-01&endDate=2024-01-31"); // not fetched yet
export const GetAllUsers = () => apiRequest("/api/admin/users?page=1&limit=20&role=&search="); //admin users start
export const GetUserById = (id) => apiRequest(`/api/admin/users/${id}`);
export const UpdateUserStatus = (id, data) =>  apiRequest(`/api/admin/users/${id}/status`, "PUT", data);
export const DeleteUser = (id) => apiRequest(`/api/admin/users/${id} `, "DELETE"); //admin users stop


export const GetAllMechanics = () => apiRequest("api/admin/mechanics?page=1&limit=20&available="); //mechanic start
export const GetAvailableMechanics = () => apiRequest("/api/admin/mechanics/available");
export const UpdateMechanicAvailability = (id, data) =>  apiRequest(`/api/admin/mechanics/${id}/availability`, "PUT", data); //mechanic stop


export const GetAllServiceRequests = () => apiRequest("/api/admin/service-requests?page=1&limit=20&status=Pending&serviceType="); //service start
export const GetPendingServiceRequests = () => apiRequest("/api/admin/service-requests/pending")
export const AssignMechanicToRequest = (requestId, mechanicId) =>  apiRequest(`/api/admin/service-requests/${requestId}/assign `, "POST", { mechanicId });
export const ReassignServiceRequest = (requestId, credentials) =>  apiRequest(`/api/admin/service-requests/${requestId}/reassign`, "POST", { credentials }); //fetch nc
export const GetServiceRequestReports = () => apiRequest("/api/admin/reports/service-requests"); //service stop


export const GetRevenueReports = () => apiRequest("/api/admin/reports/revenue"); //revenue report start
export const GetUserActivityReports = () => apiRequest("/api/admin/reports/user-activity");
export const GetMechanicPerformanceReports = () =>  apiRequest("/api/admin/reports/mechanic-performance");
export const GetSystemHealth = () => apiRequest("/api/admin/system/health");
export const PerformSystemCleanup = () => apiRequest("/api/admin/system/cleanup", "POST");
export const GetSystemLogs = () => apiRequest("/api/admin/system/logs");
export const SendNotification = (data) =>  apiRequest("/api/admin/notifications/send", "POST", data);
export const ToggleMaintenanceMode = (data) =>  apiRequest("/api/admin/system/maintenance", "POST", { data });
