"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function RegisterPage({ onLogin }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
    location: "",
  })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    onLogin({
      name: formData.fullName,
      email: formData.email,
      role: formData.role,
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div
      className="register-page flex-center flex justify-center items-center p-4"
      // style={{ minHeight: "100vh", padding: "20px", background: "linear-gradient(135deg, #000000, #1a1a1a)" }}
    >
      <div className="register-container fade-in">
        <div className="card" style={{ maxWidth: "450px", width: "100%" }}>
          <div className="text-center" style={{ marginBottom: "30px" }}>
            <div style={{ fontSize: "3rem", marginBottom: "10px" }}>🔧</div>
            <h1 style={{ color: "#FFD700", fontSize: "2.2rem", marginBottom: "10px" }}>Join  Elisoft</h1>
            <p style={{ color: "#ccc", fontSize: "1.1rem" }}>Create your account to get started</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", color: "#FFD700", fontWeight: "500" }}>
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

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", color: "#FFD700", fontWeight: "500" }}>
                📧 Email Address
              </label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", color: "#FFD700", fontWeight: "500" }}>
                🔒 Password
              </label>
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", color: "#FFD700", fontWeight: "500" }}>
                🔒 Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="input"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", color: "#FFD700", fontWeight: "500" }}>
                👤 I am a
              </label>
              <select name="role" className="input" value={formData.role} onChange={handleChange}>
                <option value="customer">Customer</option>
                <option value="mechanic">Mechanic</option>
              </select>
            </div>

            <div style={{ marginBottom: "30px" }}>
              <label style={{ display: "block", marginBottom: "8px", color: "#FFD700", fontWeight: "500" }}>
                📍 Location
              </label>
              <input
                type="text"
                name="location"
                className="input"
                placeholder="Enter your city"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", marginBottom: "15px", fontSize: "1.1rem" }}
            >
              Create Account
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
            style={{ color: "#888", background: "none", border: "none", cursor: "pointer", fontSize: "1rem" }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
