import React from "react";
import GoogleMapReact from "google-map-react";
import { useLocalStorage } from "../../helpers/UseLocalStorage";

// Custom marker component
const Marker = ({ type, user, onClick }) => {
  const colors = {
    Customer: "blue",
    mechanic: "red",
  };

  return (
    <div
      onClick={() => onClick(user)}
      style={{
        color: "#fff",
        background: colors[type],
        borderRadius: "50%",
        padding: "10px",
        cursor: "pointer",
        textAlign: "center",
      }}
    >
      {type === "customer" ? "C" : "M"}
    </div>
  );
};

export default function NigeriaMap() {
  const [user, setUser, removeUser] = useLocalStorage("Elisoft_MapData", {});

  // Nigeria center
  const defaultProps = {
    center: {
      lat: 9.082, // Nigeria approx center
      lng: 8.6753,
    },
    zoom: 6,
  };
  // Example users
  const users = [
    {
      id: 1,
      name: "Customer John",
      type: "Customer",
      lat: 9.0765,
      lng: 7.3986, // Abuja
      user: {
        "createdAt": "2025-08-19T15:31:55.877Z",
        "email": "test@gmail.com",
        "fullName": "User1",
        "id": "68a498ebb2a14d5045e11b70",
        "isAvailable": false,
        "isPhoneVerified": false,
        "lastLocationUpdate": "2025-08-19T15:31:55.877Z",
        "location": {
          "type": "Point",
          "coordinates": [0, 0]
        },
        "phone": "2349049748370",
        "profileImage": null,
        "rating": 0,
        "role": "Mechanic",
        "totalRatings": 0,
        "updatedAt": "2025-08-20T19:04:03.394Z",
        "__v": 0,
        "_id": "68a498ebb2a14d5045e11b70"
      }
    },
    {
      id: 2,
      name: "Mechanic Mike",
      type: "Mechanic",
      lat: 6.5244,
      lng: 3.3792, // Lagos
      user: {
        "createdAt": "2025-08-19T15:31:55.877Z",
        "email": "test@gmail.com",
        "fullName": "User2",
        "id": "68a498ebb2a14d5045e11b70",
        "isAvailable": false,
        "isPhoneVerified": false,
        "lastLocationUpdate": "2025-08-19T15:31:55.877Z",
        "location": {
          "type": "Point",
          "coordinates": [0, 0]
        },
        "phone": "2349049748370",
        "profileImage": null,
        "rating": 0,
        "role": "Mechanic",
        "totalRatings": 0,
        "updatedAt": "2025-08-20T19:04:03.394Z",
        "__v": 0,
        "_id": "68a498ebb2a14d5045e11b70"
      }
    },
    {
      id: 3,
      name: "Customer Ada",
      type: "Customer",
      lat: 10.3157,
      lng: 9.8442, // Jos
      user: {
        "createdAt": "2025-08-19T15:31:55.877Z",
        "email": "test@gmail.com",
        "fullName": "User3",
        "id": "68a498ebb2a14d5045e11b70",
        "isAvailable": false,
        "isPhoneVerified": false,
        "lastLocationUpdate": "2025-08-19T15:31:55.877Z",
        "location": {
          "type": "Point",
          "coordinates": [0, 0]
        },
        "phone": "2349049748370",
        "profileImage": null,
        "rating": 0,
        "role": "Mechanic",
        "totalRatings": 0,
        "updatedAt": "2025-08-20T19:04:03.394Z",
        "__v": 0,
        "_id": "68a498ebb2a14d5045e11b70"
      }
    },
    {
      id: 4,
      name: "Mechanic Musa",
      type: "Mechanic",
      lat: 11.747,
      lng: 11.9608, // Maiduguri
      user: {
        "createdAt": "2025-08-19T15:31:55.877Z",
        "email": "test@gmail.com",
        "fullName": "User4",
        "id": "68a498ebb2a14d5045e11b70",
        "isAvailable": false,
        "isPhoneVerified": false,
        "lastLocationUpdate": "2025-08-19T15:31:55.877Z",
        "location": {
          "type": "Point",
          "coordinates": [0, 0]
        },
        "phone": "2349049748370",
        "profileImage": null,
        "rating": 0,
        "role": "Mechanic",
        "totalRatings": 0,
        "updatedAt": "2025-08-20T19:04:03.394Z",
        "__v": 0,
        "_id": "68a498ebb2a14d5045e11b70"
      }
    },
  ];
  const HandleSetMapUser = (user) => {
    setUser(user);
    window.location.reload(); // Reload to update the map with the selected user
  }
  const MAP__KEYS = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  // Handle click on marker


  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: MAP__KEYS }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {users.map((user) => (
          <Marker
            key={user.id}
            lat={user.lat}
            lng={user.lng}
            type={user.type}
            user={user}
            onClick={() =>
              HandleSetMapUser(user)
            }
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
