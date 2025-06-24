import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center justify-center p-4"
    >
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-6 text-center">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <svg
              className="w-20 h-20 mx-auto text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </motion.div>
        </div>

        <div className="p-8 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              Return to Homepage
            </Link>
          </motion.div>
        </div>

        <div className="bg-gray-50 px-6 py-4 text-center">
          <p className="text-gray-500 text-sm">
            Need help?{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Contact support
            </a>
          </p>
        </div>
      </div>

      <motion.div 
        className="mt-8 text-gray-500 text-sm"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <svg
          className="w-6 h-6 inline-block mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        You've been lost for 0 seconds
      </motion.div>
    </motion.div>
  );
};

export default NotFound;