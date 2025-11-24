import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowBigLeft, Link } from "lucide-react";
import { NavLink } from "react-router-dom";

const processSteps = [
    {
        title: "Book Your Slot",
        desc: "Schedule a slot online or call to specify time and location",
        emoji: "📅",
    },
    {
        title: "Get Order Confirmation",
        desc: "Receive booking confirmation with technician details and scheduled time slot",
        emoji: "✅",
    },
    {
        title: "Technician Arrival",
        desc: "Technician arrives at your location, equipped with necessary tools",
        emoji: "🔧",
    },
    {
        title: "Professional Installation",
        desc: "Technician installs the Dashcam, ensuring proper placement and connections",
        emoji: "🔌",
    },
    {
        title: "Testing & Verification",
        desc: "Technician tests the dashcam system to verify recordings and connectivity",
        emoji: "🧪",
    },
    {
        title: "Completion & Feedback",
        desc: "Technician provides a report and requests feedback to ensure satisfaction",
        emoji: "📋",
    },
];

const features = [
    {
        title: "Accident Recording",
        desc: "Capture crucial footage in case of accidents or disputes, valuable for insurance claims",
    },
    {
        title: "Theft Prevention",
        desc: "Tailored setup and configuration to ensure optimal performance",
    },
    {
        title: "Monitor Driving Habits",
        desc: "Keep an eye on driving behavior to promote safer practices",
    },
];

const pricing = [
    {
        title: "2000-2010 Models",
        price: "₦100,000",
        items: ["GPS Tracker and Full Installation", "Access to All App Features", "Lifetime Monitoring & 24/7 Support"],
    },
    {
        title: "2011-2015 Models",
        price: "₦120,000",
        items: ["GPS Tracker and Full Installation", "Access to All App Features", "Lifetime Monitoring & 24/7 Support"],
    },
    {
        title: "2016-2025 Models",
        price: "₦150,000",
        items: ["GPS Tracker and Full Installation", "Access to All App Features", "Lifetime Monitoring & 24/7 Support"],
    },
];

// Your business WhatsApp number
const WHATSAPP_NUMBER = "2348141342103"; // <-- Replace with your real number

// 1️⃣ BOOK INSTALLATION
const handleBookInstallation = () => {
    const message = `Hello, I would like to book a dashcam installation. Please help me schedule a slot.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
};

// 2️⃣ BOOK SPECIFIC SERVICE
const handleBookService = (serviceName) => {
    const message = `Hello, I want to book this service: Elisoft smart track *${serviceName}*. Kindly provide the next available time slot.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
};

// 3️⃣ REQUEST INSPECTION
const handleRequestInspection = () => {
    const message = `Hello, I would like to request a 78-point car inspection. Please guide me through the next steps.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
};


export const DashCam = () => {
    const heroVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12 } }),
    };


    return (
        <div className="min-h-screen bg-black text-gray-200">
            {/* NAV */}
            <header className="sticky top-0 z-50 bg-black backdrop-blur-md shadow-sm">
                <div className="pt-4 cursor-pointer">
                    <NavLink to={"/"} className="w-10 mt-2 h-10 ml-[30px] rounded-lg bg-yellow-500 text-white flex items-center justify-center font-bold">
                        <ArrowBigLeft />
                    </NavLink>
                </div>
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-yellow-500 text-white flex items-center justify-center font-bold">EA</div>
                        <div>
                            <h1 className="text-lg font-extrabold">Elisoft Assist</h1>
                            <p className="text-xs text-gray-200 -mt-1">Car Dashcam & Smart Tracking</p>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center gap-6 text-sm">
                        <a href="#about" className="hover:text-gray-600">About</a>
                        <a href="#services" className="hover:text-gray-600">Services</a>
                        <a href="#trackers" className="hover:text-gray-600">Trackers</a>
                        <a href="#process" className="hover:text-gray-600">Process</a>
                        <a href="#pricing" className="hover:text-gray-600">Pricing</a>
                    </nav>

                    <div className="md:hidden">
                        <button onClick={handleBookInstallation} className="text-sm text-white bg-black px-3 py-2 rounded-md">Contact</button>
                    </div>
                </div>
            </header>

            {/* HERO */}
            <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
                <motion.div variants={heroVariants} initial="hidden" animate="show" className="flex-1">
                    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">Professional Car Dashcam & GPS Installation — <span className="text-yellow-500">At Your Doorstep</span></h2>
                    <p className="mt-4 text-gray-500 max-w-xl">Expert technicians, quick service, and full testing — we make installation seamless so you stay protected on every journey.</p>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <button onClick={handleBookInstallation} className="inline-flex items-center gap-3 bg-yellow-500 text-white px-6 py-3 rounded-lg font-medium shadow">Book Installation</button>
                        {/* <a href="#trackers" className="inline-flex items-center gap-3 border border-gray-300 px-6 py-3 rounded-lg">Shop Trackers</a> */}
                    </div>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-xl shadow flex flex-col">
                            <h4 className="font-semibold text-black">Expert Technicians</h4>
                            <p className="text-sm text-gray-500 mt-2">Trained and certified installers.</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow flex flex-col">
                            <h4 className="font-semibold text-black">At Your Doorstep</h4>
                            <p className="text-sm text-gray-500 mt-2">We come to your location for fast service.</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow flex flex-col">
                            <h4 className="font-semibold text-black">Customer Satisfaction</h4>
                            <p className="text-sm text-gray-500 mt-2">Testing and verification included.</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={heroVariants} initial="hidden" animate="show" className="flex-1">
                    <div className="relative w-full max-w-md mx-auto">
                        <div className="rounded-2xl overflow-hidden shadow-2xl">
                            {/* Placeholder phone/dashboard mockup */}
                            <div className="bg-gradient-to-br from-black via-gray-800 to-gray-900 text-white p-8 h-64 flex flex-col justify-between">
                                <div>
                                    <div className="text-sm text-gray-300">Elisoft Smart Tracker</div>
                                    <h3 className="text-2xl font-bold mt-2">Track Your Car Anytime, Anywhere</h3>
                                    <p className="mt-2 text-sm text-gray-300">Real-time tracking, theft alerts, and 24/7 access on our mobile app.</p>
                                </div>

                                <div className="flex gap-3 items-center">
                                    {/* <button className="bg-yellow-400 px-4 py-2 rounded-md font-semibold">Shop Now</button> */}
                                    <button onClick={handleBookInstallation} className="border border-white px-4 py-2 rounded-md">Book Installation</button>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -right-6 -bottom-6 w-40 h-40 rounded-full bg-yellow-200 opacity-60 blur-2xl" />
                    </div>
                </motion.div>
            </section>

            {/* ABOUT */}
            <section id="about" className="max-w-6xl mx-auto px-6 py-12">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h3 className="text-2xl font-bold">About Car Dashcam Installation Services</h3>
                        <p className="mt-4 text-gray-400">Our Car Dashcam Installation Services provide expert, on-spot installation for all types of dashcams, ensuring seamless operation and enhanced security. Our skilled technicians come to your location, offering convenience and peace of mind. Protect your journeys with professional dashcam installation tailored to your needs.</p>

                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {features.map((f, i) => (
                                <div key={i} className="bg-white p-4 rounded-xl shadow">
                                    <h4 className="text-black font-semibold">{f.title}</h4>
                                    <p className="text-sm text-gray-500 mt-2">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-xl overflow-hidden shadow-lg bg-white p-6">
                        <h4 className="font-bold text-black ">Why People choose Our Services?</h4>
                        <p className="text-sm text-gray-600 mt-2">Elisoft Assist offers expert installation of car dashcams, right at your doorstep. Whether you're enhancing security or capturing your drives, our skilled technicians ensure a quick, seamless installation experience tailored to your vehicle.</p>

                        <ul className="mt-4 space-y-2 text-sm text-gray-600">
                            <li>• Expert Technicians</li>
                            <li>• At Your Doorstep</li>
                            <li>• Customized Solutions</li>
                            <li>• Quick and Convenient</li>
                            <li>• Customer Satisfaction</li>
                        </ul>

                        <div className="mt-6">
                            <button onClick={handleBookInstallation} className="bg-black text-white px-4 py-2 rounded-md">Book Installation</button>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* PROCESS */}
            <section id="process" className="max-w-6xl mx-auto px-6 py-12">
                <h3 className="text-2xl  font-bold mb-6">Our Installation Process</h3>

                <div className="grid md:grid-cols-3 gap-6">
                    {processSteps.map((p, i) => (
                        <motion.div key={p.title} custom={i} variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="bg-white p-6 rounded-xl shadow">
                            <div className="text-3xl">{p.emoji}</div>
                            <h4 className="mt-4 text-black font-semibold">{p.title}</h4>
                            <p className="text-sm text-gray-500 mt-2">{p.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* TRACKERS & ADVANCED FEATURES */}
            <section id="trackers" className="max-w-6xl mx-auto px-6 py-12 ">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h3 className="text-2xl font-bold">Elisoft Smart Tracker</h3>
                        <p className="mt-3 text-gray-200">Real-time tracking, instant alerts, and 24/7 access through our mobile app – keep your vehicle secure wherever you are.</p>

                        <ul className="mt-4 space-y-2 text-sm text-gray-400">
                            <li>• Live Location Tracking</li>
                            <li>• Geo Fence Zones</li>
                            <li>• Mobile Tracking App</li>
                            <li>• Detailed Reports & Driver Behaviour Insights</li>
                        </ul>

                        <div className="mt-6 flex gap-4">
                            {/* <button className="bg-yellow-400 text-white px-4 py-2 rounded-md">Shop Now</button> */}
                            <button onClick={handleBookInstallation} className="border px-4 py-2 rounded-md">Book Installation</button>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {pricing.map((p, i) => (
                            <motion.div key={p.title} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white p-6 rounded-xl shadow flex flex-col">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-bold text-black">{p.title}</h4>
                                        <p className="text-sm text-gray-500">{p.price}</p>
                                    </div>
                                    <div className="text-xs text-gray-400">One-Time</div>
                                </div>

                                <ul className="mt-4 text-sm text-gray-600 space-y-2">
                                    {p.items.map((it, idx) => (
                                        <li key={idx}>• {it}</li>
                                    ))}
                                </ul>

                                <div className="mt-4">
                                    <button onClick={() => handleBookService(p.title)} className="bg-yellow-400 px-3 py-2 rounded-md font-semibold">Request This Service</button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SERVICES & INSPECTION */}
            <section id="services" className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h3 className="text-2xl font-bold">Car Inspection Services</h3>
                        <p className="mt-3 text-gray-300">Whether you’re buying a second-hand car or need a thorough check for your current vehicle, our 78-point inspection gives you full peace of mind.</p>

                        <ul className="mt-4 space-y-2 text-sm text-gray-300">
                            <li>• Doorstep Inspections</li>
                            <li>• 78-Point Vehicle Health Check</li>
                            <li>• Fault Detection and Repair Recommendations</li>
                        </ul>

                        <div className="mt-6">
                            <button onClick={handleRequestInspection} className="bg-yellow-500 text-white px-4 py-2 rounded-md">Request Inspection</button>
                        </div>
                    </div>

                    <div className="rounded-xl overflow-hidden shadow-lg bg-white p-6">
                        <h4 className="font-bold text-black">Why opt for a car inspection?</h4>
                        <p className="text-sm text-gray-600 mt-2">Our extensive 78-point check provides a clear picture of the car’s true condition, helping you make informed decisions and avoid unexpected costs.</p>

                        <ul className="mt-4 text-sm text-gray-600">
                            <li>• Effortless Online Slot Booking</li>
                            <li>• Doorstep Inspection Service</li>
                            <li>• Trained & Certified Mechanics</li>
                            <li>• 78-Point Comprehensive Check with 200+ Details</li>
                        </ul>

                        <div className="mt-6">
                            <button onClick={handleBookInstallation} className="bg-yellow-400 px-3 py-2 rounded-md font-semibold">Contact Us</button>
                        </div>
                    </div>
                </div>
            </section>



        </div>
    );
}
