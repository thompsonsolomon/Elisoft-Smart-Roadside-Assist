// Dummy data for the application
export const mechanics = [
  {
    id: 1,
    name: "Mike's Auto Repair",
    email: "mike@mikesauto.com",
    phone: "+1-555-0101",
    expertise: ["Engine Specialist", "Transmission", "Diagnostics"],
    rating: 4.8,
    reviewCount: 127,
    location: {
      address: "123 Main St, Downtown",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      coordinates: { lat: 40.7128, lng: -74.006 },
    },
    available: true,
    distance: 2.1,
    priceRange: "$$",
    workingHours: "8:00 AM - 6:00 PM",
    services: [
      { name: "Oil Change", price: 45, duration: "30 min" },
      { name: "Brake Repair", price: 180, duration: "2 hours" },
      { name: "Engine Diagnostic", price: 120, duration: "1 hour" },
    ],
    certifications: ["ASE Certified", "AAA Approved"],
    yearsExperience: 15,
    profileImage: "/api/placeholder/150/150",
  },
  {
    id: 2,
    name: "Sarah's Service Center",
    email: "sarah@sarahservice.com",
    phone: "+1-555-0102",
    expertise: ["Brake Expert", "Electrical", "AC/Heating"],
    rating: 4.9,
    reviewCount: 203,
    location: {
      address: "456 Oak Ave, Midtown",
      city: "New York",
      state: "NY",
      zipCode: "10018",
      coordinates: { lat: 40.7589, lng: -73.9851 },
    },
    available: true,
    distance: 1.8,
    priceRange: "$$$",
    workingHours: "7:00 AM - 7:00 PM",
    services: [
      { name: "Brake Repair", price: 200, duration: "2.5 hours" },
      { name: "AC Service", price: 150, duration: "1.5 hours" },
      { name: "Electrical Repair", price: 180, duration: "2 hours" },
    ],
    certifications: ["ASE Master Technician", "NAPA AutoCare"],
    yearsExperience: 12,
    profileImage: "/api/placeholder/150/150",
  },
  {
    id: 3,
    name: "Quick Fix Garage",
    email: "info@quickfix.com",
    phone: "+1-555-0103",
    expertise: ["General Repair", "Tire Service", "Quick Service"],
    rating: 4.7,
    reviewCount: 89,
    location: {
      address: "789 Pine St, Uptown",
      city: "New York",
      state: "NY",
      zipCode: "10025",
      coordinates: { lat: 40.7505, lng: -73.9934 },
    },
    available: false,
    distance: 3.2,
    priceRange: "$",
    workingHours: "9:00 AM - 5:00 PM",
    services: [
      { name: "Oil Change", price: 35, duration: "20 min" },
      { name: "Tire Rotation", price: 50, duration: "45 min" },
      { name: "Basic Inspection", price: 75, duration: "1 hour" },
    ],
    certifications: ["State Licensed", "BBB Accredited"],
    yearsExperience: 8,
    profileImage: "/api/placeholder/150/150",
  },
  {
    id: 4,
    name: "Elite Motors",
    email: "service@elitemotors.com",
    phone: "+1-555-0104",
    expertise: ["Luxury Cars", "Import Specialist", "Performance"],
    rating: 4.6,
    reviewCount: 156,
    location: {
      address: "321 Broadway, Eastside",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      coordinates: { lat: 40.7282, lng: -73.7949 },
    },
    available: true,
    distance: 2.7,
    priceRange: "$$$$",
    workingHours: "8:00 AM - 8:00 PM",
    services: [
      { name: "Premium Service", price: 300, duration: "3 hours" },
      { name: "Performance Tuning", price: 500, duration: "4 hours" },
      { name: "Luxury Car Maintenance", price: 250, duration: "2.5 hours" },
    ],
    certifications: ["BMW Certified", "Mercedes Specialist", "Audi Expert"],
    yearsExperience: 20,
    profileImage: "/api/placeholder/150/150",
  },
]

export const customers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1-555-0201",
    location: {
      address: "567 Park Ave, Manhattan",
      city: "New York",
      state: "NY",
      zipCode: "10065",
      coordinates: { lat: 40.7614, lng: -73.9776 },
    },
    vehicleInfo: {
      make: "Toyota",
      model: "Camry",
      year: 2020,
      color: "Silver",
      licensePlate: "ABC-1234",
    },
    serviceRequested: "Oil Change",
    urgency: "Normal",
    preferredDate: "2024-01-15",
    preferredTime: "10:00 AM",
    budget: 50,
    description: "Regular maintenance oil change",
    status: "Pending",
    requestedAt: "2024-01-14T09:30:00Z",
  },
  {
    id: 2,
    name: "Mary Johnson",
    email: "mary.johnson@email.com",
    phone: "+1-555-0202",
    location: {
      address: "890 5th Ave, Manhattan",
      city: "New York",
      state: "NY",
      zipCode: "10021",
      coordinates: { lat: 40.7549, lng: -73.984 },
    },
    vehicleInfo: {
      make: "Honda",
      model: "Civic",
      year: 2019,
      color: "Blue",
      licensePlate: "XYZ-5678",
    },
    serviceRequested: "Brake Repair",
    urgency: "Urgent",
    preferredDate: "2024-01-16",
    preferredTime: "2:00 PM",
    budget: 200,
    description: "Brake pads making squeaking noise",
    status: "Accepted",
    requestedAt: "2024-01-14T11:15:00Z",
  },
  {
    id: 3,
    name: "David Wilson",
    email: "david.wilson@email.com",
    phone: "+1-555-0203",
    location: {
      address: "234 West St, Manhattan",
      city: "New York",
      state: "NY",
      zipCode: "10013",
      coordinates: { lat: 40.74, lng: -73.99 },
    },
    vehicleInfo: {
      make: "Ford",
      model: "F-150",
      year: 2021,
      color: "Black",
      licensePlate: "DEF-9012",
    },
    serviceRequested: "Engine Check",
    urgency: "Normal",
    preferredDate: "2024-01-17",
    preferredTime: "9:00 AM",
    budget: 150,
    description: "Check engine light is on",
    status: "In Progress",
    requestedAt: "2024-01-14T14:20:00Z",
  },
]

export const appointments = [
  {
    id: 1,
    customerId: 1,
    mechanicId: 1,
    customerName: "John Smith",
    mechanicName: "Mike's Auto Repair",
    service: "Oil Change",
    date: "2024-01-15",
    time: "10:00 AM",
    status: "Pending",
    price: 45,
    duration: "30 min",
    location: "Workshop",
    notes: "Regular maintenance",
    createdAt: "2024-01-14T09:30:00Z",
    updatedAt: "2024-01-14T09:30:00Z",
  },
  {
    id: 2,
    customerId: 2,
    mechanicId: 2,
    customerName: "Mary Johnson",
    mechanicName: "Sarah's Service Center",
    service: "Brake Repair",
    date: "2024-01-16",
    time: "2:00 PM",
    status: "Accepted",
    price: 180,
    duration: "2 hours",
    location: "Home Service",
    notes: "Urgent brake repair needed",
    createdAt: "2024-01-14T11:15:00Z",
    updatedAt: "2024-01-14T12:00:00Z",
  },
  {
    id: 3,
    customerId: 3,
    mechanicId: 4,
    customerName: "David Wilson",
    mechanicName: "Elite Motors",
    service: "Engine Check",
    date: "2024-01-10",
    time: "9:00 AM",
    status: "Completed",
    price: 120,
    duration: "1 hour",
    location: "Workshop",
    notes: "Diagnostic completed successfully",
    createdAt: "2024-01-09T16:45:00Z",
    updatedAt: "2024-01-10T11:00:00Z",
  },
]

export const reviews = [
  {
    id: 1,
    customerId: 1,
    mechanicId: 1,
    customerName: "John Smith",
    mechanicName: "Mike's Auto Repair",
    rating: 5,
    comment: "Excellent service! Mike was professional and completed the work quickly. Highly recommended!",
    date: "2024-01-11",
    verified: true,
  },
  {
    id: 2,
    customerId: 2,
    mechanicId: 2,
    customerName: "Mary Johnson",
    mechanicName: "Sarah's Service Center",
    rating: 5,
    comment: "Sarah's team did an amazing job with my brake repair. Very knowledgeable and fair pricing.",
    date: "2024-01-12",
    verified: true,
  },
  {
    id: 3,
    customerId: 3,
    mechanicId: 4,
    customerName: "David Wilson",
    mechanicName: "Elite Motors",
    rating: 4,
    comment: "Good service for luxury vehicles. A bit pricey but worth it for the quality of work.",
    date: "2024-01-13",
    verified: true,
  },
]

export const adminStats = {
  totalUsers: 1250,
  totalCustomers: 890,
  totalMechanics: 89,
  totalBookings: 3420,
  completedBookings: 2890,
  pendingBookings: 245,
  cancelledBookings: 285,
  monthlyRevenue: 45230,
  averageRating: 4.7,
  activeUsers: 456,
  newUsersThisMonth: 127,
  topMechanics: [
    { id: 2, name: "Sarah's Service Center", bookings: 89, rating: 4.9 },
    { id: 1, name: "Mike's Auto Repair", bookings: 76, rating: 4.8 },
    { id: 4, name: "Elite Motors", bookings: 65, rating: 4.6 },
  ],
  popularServices: [
    { name: "Oil Change", count: 456, percentage: 35 },
    { name: "Brake Repair", count: 234, percentage: 18 },
    { name: "Engine Diagnostic", count: 189, percentage: 15 },
    { name: "Tire Service", count: 167, percentage: 13 },
  ],
}

export const serviceTypes = [
  { id: 1, name: "Oil Change", category: "Maintenance", avgPrice: 45, avgDuration: "30 min" },
  { id: 2, name: "Brake Repair", category: "Safety", avgPrice: 180, avgDuration: "2 hours" },
  { id: 3, name: "Engine Diagnostic", category: "Diagnostic", avgPrice: 120, avgDuration: "1 hour" },
  { id: 4, name: "Tire Service", category: "Maintenance", avgPrice: 80, avgDuration: "45 min" },
  { id: 5, name: "AC Service", category: "Comfort", avgPrice: 150, avgDuration: "1.5 hours" },
  { id: 6, name: "Transmission", category: "Major Repair", avgPrice: 500, avgDuration: "4 hours" },
  { id: 7, name: "Electrical Repair", category: "Electrical", avgPrice: 180, avgDuration: "2 hours" },
  { id: 8, name: "Battery Service", category: "Electrical", avgPrice: 120, avgDuration: "30 min" },
]



export const testimonials = [
  {
    name: "Sarah Johnson",
    rating: 5,
    comment: "The map feature made it so easy to find a nearby mechanic. Service was excellent!",
  },
  {
    name: "Mike Chen",
    rating: 5,
    comment: "As a mechanic, I love how I can see customer locations on the map. Very efficient!",
  },
  {
    name: "Emma Davis",
    rating: 5,
    comment: "Professional service, transparent pricing, and the map feature is a game-changer!",
  },
]

// Helper functions for data manipulation
export const getAvailableMechanics = () => mechanics.filter((mechanic) => mechanic.available)

export const getMechanicById = (id) => mechanics.find((mechanic) => mechanic.id === Number.parseInt(id))

export const getCustomerById = (id) => customers.find((customer) => customer.id === Number.parseInt(id))

export const getAppointmentsByCustomer = (customerId) =>
  appointments.filter((appointment) => appointment.customerId === Number.parseInt(customerId))

export const getAppointmentsByMechanic = (mechanicId) =>
  appointments.filter((appointment) => appointment.mechanicId === Number.parseInt(mechanicId))

export const getReviewsByMechanic = (mechanicId) =>
  reviews.filter((review) => review.mechanicId === Number.parseInt(mechanicId))

export const searchMechanics = (query) => {
  const lowercaseQuery = query.toLowerCase()
  return mechanics.filter(
    (mechanic) =>
      mechanic.name.toLowerCase().includes(lowercaseQuery) ||
      mechanic.location.city.toLowerCase().includes(lowercaseQuery) ||
      mechanic.expertise.some((skill) => skill.toLowerCase().includes(lowercaseQuery)),
  )
}

export const filterMechanicsByService = (serviceType) => {
  return mechanics.filter((mechanic) =>
    mechanic.services.some((service) => service.name.toLowerCase().includes(serviceType.toLowerCase())),
  )
}

export const sortMechanicsByDistance = (mechanics) => {
  return [...mechanics].sort((a, b) => a.distance - b.distance)
}

export const sortMechanicsByRating = (mechanics) => {
  return [...mechanics].sort((a, b) => b.rating - a.rating)
}
