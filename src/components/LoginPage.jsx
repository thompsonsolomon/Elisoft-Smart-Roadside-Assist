"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function LoginPage() {
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    phoneNumber: "",
    pin: "",
    role: "customer",
  })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      phoneNumber: formData.phoneNumber,
      pin: formData.pin,
      role: formData.role,
    };

    const result = await login(credentials); // 👈 now this will call your real login API

    if (result.success) {
      navigate( `/` + result.user.role); // Redirect based on role`);
    } else {
      console.error(result.error);
      // Optionally show error to user
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div
      className="register-page flex-center flex justify-center items-center p-4"
    >
      <div className="login-container fade-in">
        <div className="card" style={{ maxWidth: "450px", width: "100%" }}>
          <div className="text-center" style={{ marginBottom: "30px" }}>
            <div style={{ fontSize: "3rem", marginBottom: "10px" }}>🔧</div>
            <h1 style={{ color: "#FFD700", fontSize: "2.2rem", marginBottom: "10px" }}>Welcome Back</h1>
            <p style={{ color: "#ccc", fontSize: "1.1rem" }}>Sign in to your  Elisoft account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", color: "#FFD700", fontWeight: "500" }}>
                📧 Phone Number
              </label>
              <input
                type="number"
                name="phoneNumber"
                className="input"
                placeholder="Enter your phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", color: "#FFD700", fontWeight: "500" }}>
                🔒 Pin
              </label>
              <input
                type="number"
                name="pin"
                className="input"
                placeholder="Enter your pin"
                value={formData.pin}
                onChange={handleChange}
                required
                maxLength="7"
              />
            </div>

            <div style={{ marginBottom: "30px" }}>
              <label style={{ display: "block", marginBottom: "8px", color: "#FFD700", fontWeight: "500" }}>
                👤 Login as
              </label>
              <select name="role" className="input" value={formData.role} onChange={handleChange}>
                <option value="customer">Customer</option>
                <option value="mechanic">Mechanic</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", marginBottom: "15px", fontSize: "1.1rem" }}
            >
              Sign In
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              style={{ width: "100%", marginBottom: "20px", fontSize: "1.1rem" }}
            >
              Continue with Google
            </button>
          </form>

          <div className="text-center">
            <p style={{ color: "#ccc" }}>
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                style={{
                  color: "#FFD700",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontWeight: "500",
                }}
              >
                Create one here
              </button>
            </p>
          </div>
        </div>

        <div className="text-center" style={{ marginTop: "20px" }}>
          <button
            onClick={() => navigate("/")}
            style={{ color: "#888", background: "none", border: "none", cursor: "pointer", fontSize: "1rem" }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
