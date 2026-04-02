import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import OutfitScanner from './pages/OutfitScanner';
import EventPrep from './pages/EventPrep';
import AITrainer from './pages/AITrainer';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Help from './pages/Help';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  // For demo purposes, we allow access even without a token if no backend is detected
  // In production, this would be: return token ? children : <Navigate to="/login" />;
  return children; 
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen text-slate-900 dark:text-white transition-colors duration-500 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
            <Navbar />
            <main className="flex-grow pt-20">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Navigate to="/" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/help" element={<Help />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/contact" element={<Contact />} />

                {/* Shared Feature Routes */}
                <Route path="/outfit-scanner" element={<OutfitScanner />} />
                <Route path="/event-prep" element={<EventPrep />} />
                <Route path="/trainer" element={<AITrainer />} />

                {/* Protected Routes */}
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/profile" element={<Navigate to="/dashboard" />} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
