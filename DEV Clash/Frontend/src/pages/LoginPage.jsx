import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import Input from '../components/Input';
import Button from '../components/Button';
import Header from '../components/Header'; // Import Header
import Footer from '../components/Footer'; // Import Footer

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      if (user.role === 'student') {
        navigate('/student/dashboard');
      } else if (user.role === 'vendor') {
        navigate('/vendor/dashboard');
      } else {
        navigate('/login');
      }
    } catch (err) {
      setError(err || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100"> {/* Full screen, column layout */}
      <Header /> {/* Include Header */}
      <main className="flex-grow flex items-center justify-center p-4"> {/* Main content area, centered */}
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <Input
              label="Email"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.name@example.com"
              required
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
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging In...' : 'Login'}
            </Button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register here</Link>
          </p>
          <p className="mt-4 text-center text-gray-500 text-sm">
            Try: student@cuet.ac.bd / password123 <br/>
            Try: vendor@cuet.ac.bd / password123
          </p>
        </div>
      </main>
      <Footer /> {/* Include Footer */}
    </div>
  );
};

export default LoginPage;
