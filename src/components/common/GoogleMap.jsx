"use client"

import { useCallback, useState, useRef, useEffect } from "react"
import { Wrapper } from "@googlemaps/react-wrapper"

const MapComponent = ({ center, zoom, markers, onMarkerClick, className }) => {
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)
  const [googleMarkers, setGoogleMarkers] = useState([])

  const initMap = useCallback((map) => {
    setMap(map)
  }, [])

  // Clear existing markers
  const clearMarkers = useCallback(() => {
    googleMarkers.forEach((marker) => marker.setMap(null))
    setGoogleMarkers([])
  }, [googleMarkers])

  // Add markers to map
  useEffect(() => {
    if (!map || !markers) return

    clearMarkers()

    const newMarkers = markers.map((markerData) => {
      const marker = new window.google.maps.Marker({
        position: markerData.position,
        map: map,
        title: markerData.title,
        icon: {
          url:
            markerData.icon ||
            "data:image/svg+xml;charset=UTF-8," +
              encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="12" fill="${markerData.color || "#FFD700"}" stroke="#000" strokeWidth="2"/>
              <text x="16" y="20" textAnchor="middle" fill="#000" fontSize="12" fontWeight="bold">${markerData.label || "📍"}</text>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(32, 32),
          anchor: new window.google.maps.Point(16, 16),
        },
      })

      if (onMarkerClick) {
        marker.addListener("click", () => onMarkerClick(markerData))
      }

      return marker
    })

    setGoogleMarkers(newMarkers)
  }, [map, markers, onMarkerClick, clearMarkers])

  return <div ref={mapRef} className={className || "w-full h-96"} style={{ minHeight: "400px" }} />
}

const Map = ({ center, zoom = 13, markers, onMarkerClick, className }) => {
  const mapRef = useRef(null)

  const onLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  const onUnmount = useCallback(() => {
    mapRef.current = null
  }, [])

  return (
    <MapComponent
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      markers={markers}
      onMarkerClick={onMarkerClick}
      className={className}
    />
  )
}

const GoogleMap = (props) => {
  const render = (status) => {
    switch (status) {
      case "LOADING":
        return (
          <div className="w-full h-96 bg-gray-900 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="loading-spinner mb-2"></div>
              <p className="text-gray-400">Loading map...</p>
            </div>
          </div>
        )
      case "FAILURE":
        return (
          <div className="w-full h-96 bg-gray-900 rounded-xl flex items-center justify-center border border-red-500/30">
            <div className="text-center">
              <p className="text-red-400 mb-2">Failed to load map</p>
              <p className="text-gray-400 text-sm">Please check your internet connection</p>
            </div>
          </div>
        )
      case "SUCCESS":
        return <Map {...props} />
      default:
        return null
    }
  }

  return (
    <Wrapper
      apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY_HERE"}
      render={render}
      libraries={["places"]}
    />
  )
}

export default GoogleMap
