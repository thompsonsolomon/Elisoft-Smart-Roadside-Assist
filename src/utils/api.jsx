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
export const forgotPin = (email) => apiRequest("/api/auth/forgot-pin", "POST", { email });
export const resetPin = (resetToken, newPin) => apiRequest(`/api/auth/reset-pin/${resetToken}`, "POST", { newPin });
export const changePin = (credentials, token) => apiRequest("/api/auth/change-pin", "POST", credentials, token);
// 🔹 Product & User
export const fetchUsers = () => apiRequest("/api/users/profile");
export const updateUserProfile = (data, token) => apiRequest("/api/users/profile", "PUT", data, token);
export const updateUserLocation = (data) => apiRequest("/api/users/location", "PUT", data, token);
export const DeliveryDetails = (data, token) => apiRequest("/api/users/location", "POST", data, token);
export const fetchDeliveryDetails = (token) => apiRequest("/api/users/location", "GET", null, token);
export const updateLocation = (data, token) => apiRequest(`/api/users/location/`, "PUT", data, token);

// 🔹 Cart
export const fetchCart = (token) => apiRequest("/api/cart", "GET", null, token);
export const updateCart = (cartData, token) => apiRequest("/api/cart", "PUT", cartData, token);
export const addToCartAPI = (product, token) => apiRequest("/api/cart/add", "POST", product, token);
export const removeFromCartAPI = (productId) => apiRequest(`/api/cart/${productId}`, "DELETE");
export const clearCartAPI = (token) => apiRequest("/api/cart", "DELETE", null, token);

// 🔹 Orders
export const placeOrders = (orders, token) => apiRequest("/api/orders/place", "POST", orders, token);
export const fetchOrders = (token) => apiRequest("/api/orders/all", "GET", null, token);
export const orderDetails = (orderId, token) => apiRequest(`/api/details/${orderId}`, "GET", null, token);
export const VerifyPayment = (session_id , orderId) => apiRequest("/api/payment/verify", "POST",session_id , orderId);