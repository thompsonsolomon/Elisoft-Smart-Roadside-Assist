"use client"
import { Link } from "react-router-dom"
import { Home, ArrowLeft } from "lucide-react"

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-9xl font-bold text-gold mb-4">404</div>
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-400 mb-8 max-w-md">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn btn-primary flex items-center space-x-2">
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
          <button onClick={() => window.history.back()} className="btn btn-secondary flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
