import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import Header from '../components/Header'; // Import Header
import Footer from '../components/Footer'; // Import Footer

const LandingPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col"> {/* Full screen, column layout */}
      <Header /> {/* Include Header */}
      <main className="flex-grow flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-4 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 animate-fade-in-down">
          Smart Campus Ordering
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-up">
          Your ultimate solution for convenient campus dining.
        </p>

        {user ? (
          <div className="space-y-4">
            <p className="text-lg">You are logged in as {user.name} ({user.role}).</p>
            {user.role === 'student' && (
              <Link to="/student/dashboard">
                <button className="bg-white text-blue-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg">
                  Go to Student Dashboard
                </button>
              </Link>
            )}
            {user.role === 'vendor' && (
              <Link to="/vendor/dashboard">
                <button className="bg-white text-blue-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg">
                  Go to Vendor Dashboard
                </button>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-lg">Login or Register to start ordering!</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/login">
                <button className="bg-white text-blue-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-blue-700 text-white border-2 border-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-800 transition duration-300 shadow-lg">
                  Register
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Basic Tailwind keyframes for animation */}
        <style>{`
          @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-down { animation: fadeInDown 0.8s ease-out forwards; }
          .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; animation-delay: 0.2s; }
        `}</style>
      </main>
      <Footer /> {/* Include Footer */}
    </div>
  );
};

export default LandingPage;
