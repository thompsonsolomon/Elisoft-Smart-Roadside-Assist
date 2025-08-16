import { createContext, useContext, useReducer, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser, registerUser } from "../utils/api";
const fetchedDummeryUserRole = JSON.parse(localStorage.getItem("Elisoft_usercred"))
const AuthContext = createContext()
const initialState = {
  // user: {
  //   accountName: "thompson Solomon",
  //   accountNumber: "",
  //   address: "5 State line road duration south gate Akure",
  //   bankCode: "565",
  //   bankName: "9mobile 9Payment Service Bank",
  //   email: "thompsonsolomon123@gmail.com",
  //   latitude: 6.5243793,
  //   licenseNumber: "12345",
  //   longitude: 3.3792057,
  //   phone: "09124919117",
  //   priceRates: [],
  //   // role: "mechanic",
  //   role: fetchedDummeryUserRole?.role,
  //   services: [
  //     { name: "Roadside Assistant", price: "400" },
  //     { name: "Towing Service", price: "1000" },
  //     { name: "Wheel Alignment", price: "15000" },
  //     { name: "Flat Tyre", price: "10000" }
  //   ],
  //   yearsOfExperience: "13",
  //   name: "thompson Solomon",
  //   currentPlan: "basic",
  //   isVerified: true,
  //   subscribed: true,
  //   firstAssistance: 0,
  //   isAvailable: true,
  //   createdAt: "2023-07-20",
  //   car: "Toyota 2025"
  // },
  user: {},
  isAuthenticated: fetchedDummeryUserRole ? true : false,
  // isAuthenticated: true,
  loading: true,
  error: null,
}

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true, error: null }
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      }
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      }
    case "CLEAR_ERROR":
      return { ...state, error: null }
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    // Check for existing session on app load
    const checkAuthStatus = () => {
      try {
        const userData = localStorage.getItem("Elisoft_user")
        if (userData) {
          const user = JSON.parse(userData)
          dispatch({ type: "LOGIN_SUCCESS", payload: user })
        } else {
          dispatch({ type: "SET_LOADING", payload: false })
        }
      } catch (error) {
        console.error("Error checking auth status:", error)
        dispatch({ type: "SET_LOADING", payload: false })
      }
    }

    checkAuthStatus()
  }, [])



  const login = async (credentials) => {
    dispatch({ type: "LOGIN_START" })
    try {
      const response = await loginUser(credentials);
      if (response.status === "success") {
        const data = await response;
        console.log("Registration successful response:", data);
        // Correctly stringify the user object before storing it.
        localStorage.setItem("Elisoft_user", JSON.stringify(data.data.user));
        localStorage.setItem("token", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        navigate(`/` + data.data.user.role);
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data.user })
        return { success: true, user: data?.data?.user };
      }
      return response;
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.message })
      return { success: false, error: error.message }
    }
  }
  //   const registerUser = async (credentials) => {
  const register = async (credentials) => {
    try {
      const response = await registerUser(credentials);
      if (response.status === "success") {
        const data = await response;
        console.log("Registration successful response:", data);
        // Correctly stringify the user object before storing it.
        localStorage.setItem("Elisoft_user", JSON.stringify(data.data.user));
        localStorage.setItem("token", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        navigate(`/` + data.data.user.role);
        return { success: true, user: data?.data?.user };
      }
      return response;
    } catch (error) {
      console.error("Network error during registration:", error);
      return { success: false, error: new Error('Network error. Please check your connection and try again.') };
    }
  };



  const logout = () => {
    localStorage.removeItem("Elisoft_user")
    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
    dispatch({ type: "LOGOUT" })
    navigate("/", { replace: true })
  }

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" })
  }

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
