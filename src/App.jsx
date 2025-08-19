import { Suspense, lazy } from "react"
import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import LoadingSpinner from "./components/common/LoadingSpinner"
import ProtectedRoute from "./components/common/ProtectedRoute"
// import ProfilePage from "./components/common/Profile"

// Lazy load components for better performance
const LandingPage = lazy(() => import("./pages/LandingPage"))
const LoginPage = lazy(() => import("./Auth/LoginPage"))
const RegisterPage = lazy(() => import("./Auth/RegisterPage"))
const ForgotPin = lazy(() => import("./Auth/ForgotPin"))
const ResetPin = lazy(() => import("./Auth/ResetPin"))
const ProfilePage = lazy(() => import("./components/common/Profile"))
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
            <Route path="/forgot-pin" element={<ForgotPin />} />
            <Route path="/reset-pin/:id" element={<ResetPin />} />


            <Route
              path="/Customer"
              element={
                <ProtectedRoute allowedRoles={["Customer"]}>
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/Mechanic"
              element={
                <ProtectedRoute allowedRoles={["Mechanic"]}>
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
                <ProtectedRoute allowedRoles={["Customer", "mechanic", "admin"]}>
                  <MapPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedRoles={["Customer", "Mechanic"]}>
                  <ProfilePage />
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
