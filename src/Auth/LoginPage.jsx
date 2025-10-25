import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { toast } from "react-toastify"
import { Eye, EyeOff } from "lucide-react"
import { FormatPin } from "../helpers/lib"

export default function LoginPage() {
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const HandleSee = () => {
    setIsOpen(!isOpen)
  }
  const [formData, setFormData] = useState({
    phoneNumber: "",
    pin: "",
  })
  const navigate = useNavigate()

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const FinalNumber = FormatPin(formData.phoneNumber || "");
    const credentials = { phone: FinalNumber, pin: formData.pin };

    const result = await login(credentials);
    console.log(result);

    // Handle API errors gracefully
    if (result?.response?.data?.status === "error" || result?.message?.includes("Error")) {
      toast.error(result?.response?.data?.message || "Login failed. Please try again.");
      return;
    }

    toast.success("Login successful! Redirecting...");
    navigate("/" + result?.user?.role);

    return result;
  } catch (error) {
    console.error("Error during login:", error);
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


    <div
      className="register-page flex-center flex justify-center items-center p-4"
    >
      <div className="login-container fade-in">
        <div className="card" style={{ maxWidth: "450px", width: "100%" }}>
          <div className="text-center" style={{ marginBottom: "30px" }}>
            <div style={{ fontSize: "3rem", marginBottom: "10px" }}>🔧</div>
            <h1 style={{ color: "#FFD700", fontSize: "2.2rem", marginBottom: "10px" }}>Welcome Back</h1>
            <p style={{ color: "#ccc", fontSize: "1.1rem" }}>Sign in to your  Elisoft Assist account</p>
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
              <div className="input flex items-center gap-2 relative">
                <input
                  type={isOpen ? "text" : "password"}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  onChange={(e) => {
                    if (/^\d*$/.test(e.target.value)) {
                      setFormData({
                        ...formData,
                        pin: e.target.value,
                      })
                    }
                  }}
                  name="pin"
                  className="bg-transparent border-none outline-none w-full text-white placeholder:text-gray-400"
                  placeholder="Enter your pin"
                  value={formData.pin}
                  required
                />
                {
                  isOpen ?
                    <Eye className="cursor-pointer" onClick={HandleSee} />
                    :
                    <EyeOff className="cursor-pointer" onClick={HandleSee} />
                }

              </div>

            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", marginBottom: "5px", fontSize: "1.1rem" }}
            >
              {
                loading ? "Loading..." :
                  "Sign In"
              }
            </button>

            <Link to="/forgot-pin"

              style={{
                color: "blue",
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
                fontWeight: "400",
                fontSize: "14px"
              }}

            >Forgotten pin</Link>
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
