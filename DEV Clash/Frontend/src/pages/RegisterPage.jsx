import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import Input from '../components/Input';
import Button from '../components/Button';
import { isValidCUETEmail } from '../utils/validators';
import Header from '../components/Header'; // Import Header
import Footer from '../components/Footer'; // Import Footer

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (role === 'student' && !isValidCUETEmail(email)) {
      setError('Student email must be in CUET format (e.g., your.name@cuet.ac.bd)');
      return;
    }

    setLoading(true);
    try {
      const user = await register(name, email, password, role);
      if (user.role === 'student') {
        navigate('/student/dashboard');
      } else if (user.role === 'vendor') {
        navigate('/vendor/dashboard');
      }
    } catch (err) {
      setError(err || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100"> {/* Full screen, column layout */}
      <Header /> {/* Include Header */}
      <main className="flex-grow flex items-center justify-center p-4"> {/* Main content area, centered */}
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Register</h2>
          <form onSubmit={handleSubmit}>
            <Input
              label="Name"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Full Name"
              required
            />
            <Input
              label="Email"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.name@cuet.ac.bd"
              required
              error={role === 'student' && email && !isValidCUETEmail(email) ? 'Must be a CUET email' : ''}
            />
            <Input
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Register as:
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="student">Student</option>
                <option value="vendor">Vendor</option>
              </select>
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
          </p>
        </div>
      </main>
      <Footer /> {/* Include Footer */}
    </div>
  );
};

export default RegisterPage;
