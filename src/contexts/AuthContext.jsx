import { createContext, useContext, useReducer, useEffect } from "react"

const AuthContext = createContext()

const initialState = {
  user: null,
  isAuthenticated: false,
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
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    // Check for existing session on app load
    const checkAuthStatus = () => {
      try {
        const userData = localStorage.getItem(" Elisoft_user")
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
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock authentication logic
      const mockUser = {
        id: Date.now(),
        name:
          credentials.role === "admin" ? "Admin User" : credentials.role === "mechanic" ? "Mike Johnson" : "John Doe",
        email: credentials.email,
        role: credentials.role,
        joinDate: new Date().toISOString(),
        isVerified: true,
      }

      // Store in localStorage for persistence
      localStorage.setItem(" Elisoft_user", JSON.stringify(mockUser))

      dispatch({ type: "LOGIN_SUCCESS", payload: mockUser })
      return { success: true, user: mockUser }
    } catch (error) {
      const errorMessage = error.message || "Login failed"
      dispatch({ type: "LOGIN_FAILURE", payload: errorMessage })
      return { success: false, error: errorMessage }
    }
  }

  const register = async (userData) => {
    dispatch({ type: "LOGIN_START" })

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1200))

      // Mock registration logic
      const newUser = {
        id: Date.now(),
        name: userData.fullName,
        email: userData.email,
        role: userData.role,
        avatar: "/api/placeholder/40/40",
        joinDate: new Date().toISOString(),
        isVerified: false,
        location: userData.location,
      }

      // Store in localStorage for persistence
      localStorage.setItem(" Elisoft_user", JSON.stringify(newUser))

      dispatch({ type: "LOGIN_SUCCESS", payload: newUser })
      return { success: true, user: newUser }
    } catch (error) {
      const errorMessage = error.message || "Registration failed"
      dispatch({ type: "LOGIN_FAILURE", payload: errorMessage })
      return { success: false, error: errorMessage }
    }
  }

  const logout = () => {
    localStorage.removeItem(" Elisoft_user")
    dispatch({ type: "LOGOUT" })
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
