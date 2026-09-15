import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, ShieldCheck, Lock, User, CheckCircle2, AlertCircle, Key } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState('ADM-CH-2026-991');
  const [password, setPassword] = useState('admin123');
  const [facility, setFacility] = useState('Apollo Hospitals, Greams Road, Chennai');
  const [error, setError] = useState('');

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminId.trim() || !password.trim()) {
      setError('Please enter your Admin Login ID and Password.');
      return;
    }
    navigate('/admin/analytics');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between p-4 sm:p-8 font-sans">
      {/* Header */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between bg-white p-4 rounded-3xl border border-slate-200 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-600 flex items-center justify-center text-white font-bold shadow">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-base text-slate-900">Hospital Administration Workspace</h1>
            <p className="text-xs text-slate-500">Saarthi.AI Operations & Governance Console</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/login')}
          className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200"
        >
          All Portals
        </button>
      </header>

      {/* Main Login Box */}
      <main className="max-w-md mx-auto w-full my-auto py-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Badge & Title */}
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Admin Credentials Required
            </span>
            <h2 className="text-2xl font-black text-slate-900">Administrator Sign In</h2>
            <p className="text-xs text-slate-500">Enter your Admin Login ID and Password to manage OPD operations</p>
          </div>

          {/* Demo Hint Banner */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
            <span className="font-extrabold text-teal-800 block">🔑 Pre-filled Demo Credentials:</span>
            <div className="flex justify-between font-mono text-[11px] text-slate-600">
              <span>Admin ID: <strong className="text-slate-900">ADM-CH-2026-991</strong></span>
              <span>Password: <strong className="text-slate-900">admin123</strong></span>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleAdminSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Admin Login ID / License Token:</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  placeholder="e.g. ADM-CH-2026-991 or admin@apollo.in"
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Password:</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Hospital Facility / Branch:</label>
              <select
                value={facility}
                onChange={(e) => setFacility(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="Apollo Hospitals, Greams Road, Chennai">Apollo Hospitals, Greams Road, Chennai</option>
                <option value="Fortis Healthcare, Vasant Kunj, New Delhi">Fortis Healthcare, Vasant Kunj, New Delhi</option>
                <option value="Manipal Hospital, HAL Road, Bengaluru">Manipal Hospital, HAL Road, Bengaluru</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5 text-teal-400" />
              <span>Log In as Administrator →</span>
            </button>
          </form>

          {/* Quick Demo Access */}
          <div className="pt-2 border-t border-slate-100 text-center">
            <button
              onClick={() => navigate('/admin/analytics')}
              className="text-xs font-bold text-teal-700 hover:underline"
            >
              Direct Admin Dashboard Demo Launcher →
            </button>
          </div>
        </div>
      </main>

      <footer className="text-center text-xs text-slate-500 font-medium py-2">
        <span className="flex items-center justify-center gap-1">
          <ShieldCheck className="w-4 h-4 text-teal-600" /> Level 4 Administrative Clearance • ID & Password Enforced
        </span>
      </footer>
    </div>
  );
};
