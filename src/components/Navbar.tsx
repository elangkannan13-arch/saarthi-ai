import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Activity, Menu, X, Key, ShieldCheck, User, LogIn } from 'lucide-react';

interface NavbarProps {
  onOpenFhirModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenFhirModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Product', href: '/' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Sign In / Login', href: '/login' },
  ];

  const isDoctorRoute = location.pathname.startsWith('/doctor');

  return (
    <header className={`${isDoctorRoute ? 'bg-slate-950 text-white border-b border-slate-800' : 'bg-white/90 backdrop-blur-md text-slate-800 border-b border-slate-200'} sticky top-0 z-40 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 via-teal-500 to-emerald-400 flex items-center justify-center shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-teal-700 via-teal-600 to-teal-900 dark:from-teal-300 dark:to-teal-100 bg-clip-text text-transparent">
                Saarthi<span className="text-teal-500 font-black">.AI</span>
              </span>
              <span className="text-[9px] font-semibold text-slate-400 tracking-wider uppercase -mt-1">
                Clinical Story Engine
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  location.pathname === link.href
                    ? isDoctorRoute
                      ? 'bg-slate-800 text-teal-400'
                      : 'bg-teal-50 text-teal-700'
                    : isDoctorRoute
                      ? 'text-slate-300 hover:text-white hover:bg-slate-900'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action CTAs: Protected Login Portal Button */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => navigate('/login')}
              className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-black shadow-md shadow-teal-600/20 transition-all hover:scale-105 flex items-center gap-2"
            >
              <LogIn className="w-4 h-4 text-teal-200" />
              <span>Portal Login (Doctor / Admin / Patient)</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/login');
              }}
              className="w-full py-3 rounded-xl bg-teal-600 text-white text-xs font-black text-center flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" /> Portal Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
