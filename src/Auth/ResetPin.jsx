import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { KeyRound, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { resetPin } from '../utils/api';

const  ResetPin = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  console.log(token);
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (!token) {
      setMessage({
        type: 'error',
        text: 'Invalid or expired password reset link. Please try again from the "Forgot Password" page.'
      });
    }
  }, [ token]);


  const handleResetPin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' }); 


    if (newPin !== confirmPin) {
      setIsLoading(false);
      return setMessage({ type: 'error', text: 'New PINs do not match.' });
    }
    if (newPin.length < 4) {
      setIsLoading(false);
      return setMessage({ type: 'error', text: 'PIN must be at least 4 characters long.' });
    }

    try { 
      // The API call payload includes the email, token, and the new pin.
      const payload = {
        "pin": newPin
      }

      const response = await resetPin(token, payload);

      // Assuming the API returns a success message on a 2xx status code.
      setMessage({
        type: 'success',
        text: response.data.message || 'Your PIN has been successfully reset. You can now log in.'
      });

      navigate('/login');

    } catch (error) {
      console.error('Reset PIN error:', error);
      let errorMessage = 'An unexpected error occurred. Please try again.';

      if (error.response) {
        errorMessage = error.response.data.message || `Error: ${error.response.status} ${error.response.statusText}`;
      } else if (error.request) {
        errorMessage = 'Network error. Please check your internet connection.';
      }

      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-10 w-full max-w-lg transition-all duration-300 transform hover:scale-[1.01]">
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 rounded-full bg-yellow-50 text-yellow-600 mb-4 shadow-md">
            <KeyRound size={40} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Reset Pin</h1>
          <p className="text-center text-sm text-gray-500 mt-2 max-w-sm">
            Enter your new PIN below. Your new pin must be at least 4 digits long.
          </p>
        </div>

        {/* Display an error message if the URL parameters are invalid */}
        {message.text && message.type === 'error' && (
          <div
            className="mt-6 p-4 rounded-lg flex items-center space-x-3 transition-opacity duration-300 ease-in-out bg-red-50 text-red-700 border-l-4 border-red-400"
          >
            <AlertCircle size={20} />
            <p className="text-sm font-medium">{message.text}</p>
          </div>
        )}

        {/* Only show the form if the URL parameters are valid */}
        { token && message.type !== 'error' && (
          <form onSubmit={handleResetPin} className="space-y-6">
            <div className="space-y-1">
              <label htmlFor="newPin" className="block text-sm font-semibold text-gray-700">
                New PIN
              </label>
              <input
                id="newPin"
                type="password"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                required
                placeholder="••••"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-gray-50 text-gray-800 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="confirmPin" className="block text-sm font-semibold text-gray-700">
                Confirm New PIN
              </label>
              <input
                id="confirmPin"
                type="password"
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value)}
                required
                placeholder="••••"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-gray-50 text-gray-800 transition-colors duration-200 ease-in-out"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !token}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-yellow-600 text-white font-bold rounded-lg shadow-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:bg-yellow-400 disabled:cursor-not-allowed transition-all duration-200 ease-in-out"
            >
              {isLoading && <Loader2 className="animate-spin" size={20} />}
              <span>{isLoading ? 'Resetting...' : 'Reset Pin'}</span>
            </button>
          </form>
        )}

        {/* Display success messages */}
        {message.text && message.type === 'success' && (
          <div
            className="mt-6 p-4 rounded-lg flex items-center space-x-3 transition-opacity duration-300 ease-in-out bg-green-50 text-green-700 border-l-4 border-green-400"
          >
            <CheckCircle size={20} />
            <p className="text-sm font-medium">{message.text}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPin;
