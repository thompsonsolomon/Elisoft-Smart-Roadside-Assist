import React, { useState } from 'react';
import axios from 'axios';
import { Loader2, CheckCircle, AlertCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { forgotPin } from '../utils/api';
import { toast } from 'react-toastify';

const ForgotPin = () => {
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleForgotPin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const credentials = {
                "phone": phone
            }
            const response = await forgotPin(credentials);
            setMessage({
                type: 'success',
                text: response.data.message || 'Pin reset email sent successfully. Please check your inbox.'
            });
        } catch (error) {
            console.error('Forgot Pin error:', error)
            toast.error('An error occurred while sending the Pin reset code. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black-800 p-4 sm:p-6">
            <div className="bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md transition-all duration-300 transform hover:scale-105">
                <div className="flex flex-col items-center mb-6">
                    <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mb-4">
                        <Phone size={32} />
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-100">Forgot Pin</h1>
                    <p className="text-center text-sm text-gray-400 mt-2">
                        Enter your Phone Number and we'll send you a Pin reset link.
                    </p>
                </div>

                <form onSubmit={handleForgotPin} className="space-y-4">
                    <div className="space-y-1">
                        <label htmlFor="number" className="block text-sm font-medium text-gray-400">
                            Phone Number
                        </label>
                        <input
                            id="number"
                            type="number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            placeholder="+234 123 456 7890"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-gray-50 text-gray-800 transition-colors duration-200"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:bg-yellow-400 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        {isLoading && <Loader2 className="animate-spin" size={20} />}
                        <span>{isLoading ? 'Sending...' : 'Send Reset Pin'}</span>
                    </button>
                </form>

                {/* Display success or error messages */}
                {message.text && (
                    <div
                        className={`mt-6 p-4 rounded-lg flex items-center space-x-3 ${message.type === 'success'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                    >
                        {message.type === 'success' ? (
                            <CheckCircle size={20} />
                        ) : (
                            <AlertCircle size={20} />
                        )}
                        <p className="text-sm font-medium">{message.text}</p>
                    </div>
                )}
            </div>

            <div className="text-center" style={{ marginTop: "20px" }}>
                <Link
                to="/"
                    style={{ color: "#888", background: "none", border: "none", cursor: "pointer", fontSize: "1rem" }}
                >
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
};

export default ForgotPin;
