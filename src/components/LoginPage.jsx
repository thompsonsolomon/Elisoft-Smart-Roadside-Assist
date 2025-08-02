"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function LoginPage({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "customer",
  })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin({
      name: formData.role === "admin" ? "Admin User" : formData.role === "mechanic" ? "Mike Johnson" : "John Doe",
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
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
