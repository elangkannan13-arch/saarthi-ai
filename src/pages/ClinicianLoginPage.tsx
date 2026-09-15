import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Lock, ShieldCheck, User, Key, CheckCircle2, Building2, AlertCircle } from 'lucide-react';

export const ClinicianLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [docId, setDocId] = useState('NMC-MD-88412');
  const [password, setPassword] = useState('password123');
  const [department, setDepartment] = useState('Cardiology / General Medicine');
  const [error, setError] = useState('');

  const handleClinicianSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docId.trim() || !password.trim()) {
      setError('Please enter your Doctor Login ID and Password.');
      return;
    }
    navigate('/doctor/queue');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-4 sm:p-8 font-sans">
      {/* Header */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between bg-slate-900 p-4 rounded-3xl border border-slate-800 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
            <Stethoscope className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <h1 className="font-extrabold text-base text-white tracking-tight flex items-center gap-2">
              Saarthi.AI Doctor Cockpit
              <span className="text-[10px] bg-teal-500/20 text-teal-300 font-bold px-2 py-0.5 rounded border border-teal-500/30">
                Clinician Portal
              </span>
            </h1>
            <p className="text-xs text-slate-400">Apollo Hospitals OPD • Physician Identity Authentication</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/login')}
          className="text-xs font-bold text-slate-400 hover:text-white px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700"
        >
          All Portals
        </button>
      </header>

      {/* Main Login Box */}
      <main className="max-w-md mx-auto w-full my-auto py-8">
        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Badge & Title */}
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-teal-300 bg-teal-950 px-3 py-1 rounded-full border border-teal-500/30 inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> Physician Credentials Required
            </span>
            <h2 className="text-2xl font-black text-white">Doctor Sign In</h2>
            <p className="text-xs text-slate-400">Enter your Doctor Login ID and Password to open the cockpit</p>
          </div>

          {/* Demo Hint Banner */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-teal-500/30 text-xs text-slate-300 space-y-1">
            <span className="font-extrabold text-teal-400 block">🔑 Pre-filled Demo Credentials:</span>
            <div className="flex justify-between font-mono text-[11px] text-slate-400">
              <span>Login ID: <strong className="text-white">NMC-MD-88412</strong></span>
              <span>Password: <strong className="text-white">password123</strong></span>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-950 border border-red-500 text-red-200 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleClinicianSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Doctor Login ID / NMC Reg ID:</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={docId}
                  onChange={(e) => setDocId(e.target.value)}
                  placeholder="e.g. NMC-MD-88412 or doctor@apollo.in"
                  className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono font-bold text-teal-300 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Password:</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono font-bold text-white focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Select Department OPD:</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:border-teal-500"
              >
                <option value="Cardiology / General Medicine">Cardiology / General Medicine</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="AYUSH / Ayurvedic OPD">AYUSH / Ayurvedic OPD</option>
                <option value="Orthopedics">Orthopedics</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 text-slate-950 font-black text-sm shadow-xl shadow-teal-500/20 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5 text-slate-950" />
              <span>Log In as Clinician →</span>
            </button>
          </form>

          {/* Quick Smart Card / SSO Button */}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => navigate('/doctor/queue')}
              className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700 flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4 text-teal-400" />
              <span>Hospital Smart Card / SSO Instant Sign In</span>
            </button>
          </div>
        </div>
      </main>

      <footer className="text-center text-xs text-slate-500 font-medium py-2">
        <span className="flex items-center justify-center gap-1">
          <ShieldCheck className="w-4 h-4 text-teal-500" /> DPDP Act 2023 Compliant • Doctor Login & Password Enforced
        </span>
      </footer>
    </div>
  );
};
