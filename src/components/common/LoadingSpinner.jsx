const LoadingSpinner = ({ size = "default", text = "Loading..." }) => {
  const sizeClasses = {
    small: "h-4 w-4",
    default: "h-8 w-8",
    large: "h-12 w-12",
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className={`loading-spinner ${sizeClasses[size]} mb-4`}></div>
      <p className="text-gray-400 text-sm">{text}</p>
    </div>
  )
}

export default LoadingSpinner
