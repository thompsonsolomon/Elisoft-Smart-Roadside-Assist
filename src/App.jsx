import { Suspense, lazy } from "react"
import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import LoadingSpinner from "./components/common/LoadingSpinner"
import ProtectedRoute from "./components/common/ProtectedRoute"

// Lazy load components for better performance
const LandingPage = lazy(() => import("./pages/LandingPage"))
const LoginPage = lazy(() => import("./components/LoginPage"))
const RegisterPage = lazy(() => import("./components/RegisterPage"))
const CustomerDashboard = lazy(() => import("./components/CustomerDashboard"))
const MechanicDashboard = lazy(() => import("./components/MechanicDashboard"))
const AdminDashboard = lazy(() => import("./components/AdminDashboard"))
const MapPage = lazy(() => import("./pages/MapPage"))
const NotFound = lazy(() => import("./pages/NotFound"))

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-black text-white">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
              path="/customer"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/mechanic"
              element={
                <ProtectedRoute allowedRoles={["mechanic"]}>
                  <MechanicDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/map"
              element={
                <ProtectedRoute allowedRoles={["customer", "mechanic", "admin"]}>
                  <MapPage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </AuthProvider>
  )
}

export default App
