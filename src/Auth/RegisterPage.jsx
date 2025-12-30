import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { toast } from "react-toastify"
import { Eye, EyeOff } from "lucide-react"
import { FormatPin } from "../helpers/lib"

export default function RegisterPage() {
  const { register } = useAuth()
  const [loading, setLoading] = useState(false)
  const [showPin, setShowPin] = useState(false)
  const [showConfirmPin, setShowConfirmPin] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    PhoneNumber: "",
    pin: "",
    confirmPin: "",
    role: "Customer",
    email: "example@email.com",
  })
  const navigate = useNavigate()

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const unformattedNumber = formData.PhoneNumber || "";
    const finalNumber = FormatPin(unformattedNumber);

    // ✅ Client-side validations
    if (formData.pin !== formData.confirmPin) {
      toast.error("Pins do not match!");
      return;
    }
    if (!formData.pin || formData.pin.length < 4) {
      toast.error("Pin must be at least 4 digits long!");
      return;
    }
    if (!formData.PhoneNumber || formData.PhoneNumber.length < 11) {
      toast.error("Phone number must be at least 11 digits long!");
      return;
    }

    const credentials = {
      phone: finalNumber,
      pin: formData.pin,
      role: formData.role,
      fullName: formData.fullName,
    };

    const result = await register(credentials);

    if (result?.response?.data?.status === "error" || result?.message?.includes("Error")) {
      toast.error(result?.response?.data?.message || "Error occurred in registration");
      return;
    }

    toast.success("Registration successful! Redirecting to login...");
    return result;
  } catch (error) {
    console.error("Error during registration:", error);
    toast.error("An unexpected error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
};


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="register-page flex-center flex justify-center items-center p-4 h-[100dvh]">
      <div className="register-container fade-in mt-[200px]">
        <div className="card" style={{ maxWidth: "450px", width: "100%" }}>
          <div className="text-center" style={{ marginBottom: "30px" }}>
            <div style={{ fontSize: "3rem", marginBottom: "10px" }}>🔧</div>
            <h1
              style={{
                color: "#FFD700",
                fontSize: "2.2rem",
                marginBottom: "10px",
              }}
            >
              Join Elisoft Assist
            </h1>
            <p style={{ color: "#ccc", fontSize: "1.1rem" }}>
              Create your account to get started
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#FFD700",
                  fontWeight: "500",
                }}
              >
                👤 Full Name
              </label>
              <input
                type="text"
                name="fullName"
                className="input"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone Number */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#FFD700",
                  fontWeight: "500",
                }}
              >
                Phone Number
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={11}
                name="PhoneNumber"
                className="input"
                placeholder="Enter your phone number"
                value={formData.PhoneNumber}
                onChange={(e) => {
                  if (/^\d*$/.test(e.target.value)) {
                    handleChange(e)
                  }
                }}
                required
              />
            </div>

            {/* PIN */}
            <div style={{ marginBottom: "20px", position: "relative" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#FFD700",
                  fontWeight: "500",
                }}
              >
                🔒 Pin
              </label>
              <input
                type={showPin ? "text" : "password"}
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                name="pin"
                className="input"
                placeholder="Create a strong pin"
                value={formData.pin}
                onChange={(e) => {
                  if (/^\d*$/.test(e.target.value)) {
                    handleChange(e)
                  }
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "40px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#FFD700",
                }}
              >
                {showPin ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {/* Confirm PIN */}
            <div style={{ marginBottom: "20px", position: "relative" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#FFD700",
                  fontWeight: "500",
                }}
              >
                🔒 Confirm Pin
              </label>
              <input
                type={showConfirmPin ? "text" : "password"}
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                name="confirmPin"
                className="input"
                placeholder="Confirm your pin"
                value={formData.confirmPin}
                onChange={(e) => {
                  if (/^\d*$/.test(e.target.value)) {
                    handleChange(e)
                  }
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPin(!showConfirmPin)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "38px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#FFD700",
                }}
              >
                {showConfirmPin ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {/* Role */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#FFD700",
                  fontWeight: "500",
                }}
              >
                👤 I am a
              </label>
              <select
                name="role"
                className="input"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="Customer">Customer</option>
                <option value="Mechanic">Mechanic</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: "100%",
                marginBottom: "15px",
                fontSize: "1.1rem",
              }}
            >
              {loading ? "Loading..." : "Create Account"}
            </button>
          </form>

          <div className="text-center">
            <p style={{ color: "#ccc" }}>
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                style={{
                  color: "#FFD700",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontWeight: "500",
                }}
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>

        <div className="text-center" style={{ marginTop: "20px" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              color: "#888",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
