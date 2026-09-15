import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useDemoState } from '../context/DemoStateContext';
import { QRCodeSvg } from '../components/QRCodeSvg';
import { Stethoscope, Building2, QrCode, User, Lock, ShieldCheck, CheckCircle2, AlertCircle, Key, Activity, Check } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { patientInfo } = useDemoState();
  const [activeRole, setActiveRole] = useState<'patient' | 'doctor' | 'admin'>('doctor');

  // Doctor Form State
  const [docId, setDocId] = useState('NMC-MD-88412');
  const [docPassword, setDocPassword] = useState('password123');
  const [department, setDepartment] = useState('Cardiology / General Medicine');
  const [docError, setDocError] = useState('');

  // Admin Form State
  const [adminId, setAdminId] = useState('ADM-CH-2026-991');
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [facility, setFacility] = useState('Apollo Hospitals, Greams Road, Chennai');
  const [adminError, setAdminError] = useState('');

  // Patient Form State
  const [patientTab, setPatientTab] = useState<'qr' | 'abha'>('qr');
  const [phoneInput, setPhoneInput] = useState(patientInfo.phone);
  const [abhaInput, setAbhaInput] = useState(patientInfo.abhaId);
  const [otpInput, setOtpInput] = useState('592014');
  const [otpSent, setOtpSent] = useState(false);

  // Submit Handlers
  const handleDoctorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docId.trim() || !docPassword.trim()) {
      setDocError('Please enter your Doctor Login ID and Password.');
      return;
    }
    navigate('/doctor/queue');
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminId.trim() || !adminPassword.trim()) {
      setAdminError('Please enter your Admin Login ID and Password.');
      return;
    }
    navigate('/admin/analytics');
  };

  const handlePatientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/patient/onboarding');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="max-w-4xl mx-auto w-full px-4 py-12 flex-1 flex flex-col justify-center space-y-8">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
            <Activity className="w-4 h-4 text-teal-600" />
            <span>Unified Saarthi.AI Login Gateway</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Sign In to Saarthi.AI
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Select your role below. Doctors and Administrators log in with ID and Password; Patients use passwordless QR/OTP.
          </p>
        </div>

        {/* Single Page Role Selector Bar */}
        <div className="bg-white p-2 rounded-3xl border border-slate-200 shadow-lg grid grid-cols-3 gap-2">
          <button
            onClick={() => setActiveRole('patient')}
            className={`py-3.5 px-4 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
              activeRole === 'patient'
                ? 'bg-amber-500 text-slate-950 shadow-md scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <QrCode className="w-4 h-4 shrink-0" />
            <span>Patient (Passwordless)</span>
          </button>

          <button
            onClick={() => setActiveRole('doctor')}
            className={`py-3.5 px-4 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
              activeRole === 'doctor'
                ? 'bg-slate-900 text-white shadow-md scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Stethoscope className="w-4 h-4 text-teal-400 shrink-0" />
            <span>Doctor / Clinician</span>
          </button>

          <button
            onClick={() => setActiveRole('admin')}
            className={`py-3.5 px-4 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
              activeRole === 'admin'
                ? 'bg-teal-600 text-white shadow-md scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Building2 className="w-4 h-4 shrink-0" />
            <span>Hospital Admin</span>
          </button>
        </div>

        {/* ROLE 1: CLINICIAN / DOCTOR LOGIN FORM */}
        {activeRole === 'doctor' && (
          <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6 max-w-lg mx-auto w-full">
            <div className="text-center space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-teal-300 bg-teal-950 px-3.5 py-1 rounded-full border border-teal-500/30 inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> Doctor Credentials Required
              </span>
              <h2 className="text-2xl font-black text-white">Clinician Cockpit Login</h2>
              <p className="text-xs text-slate-400">Enter Doctor ID & Password to open live patient queue</p>
            </div>

            {/* Demo Hint Banner */}
            <div className="p-3 rounded-2xl bg-slate-950 border border-teal-500/30 text-xs text-slate-300 space-y-1">
              <span className="font-extrabold text-teal-400 block">🔑 Pre-filled Demo Credentials:</span>
              <div className="flex justify-between font-mono text-[11px] text-slate-400">
                <span>Doctor ID: <strong className="text-white">NMC-MD-88412</strong></span>
                <span>Password: <strong className="text-white">password123</strong></span>
              </div>
            </div>

            {docError && (
              <div className="p-3 rounded-xl bg-red-950 border border-red-500 text-red-200 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{docError}</span>
              </div>
            )}

            <form onSubmit={handleDoctorSubmit} className="space-y-4">
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
                    value={docPassword}
                    onChange={(e) => setDocPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono font-bold text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">OPD Department Queue:</label>
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
                <span>Log In & Open Doctor Cockpit →</span>
              </button>
            </form>
          </div>
        )}

        {/* ROLE 2: ADMIN LOGIN FORM */}
        {activeRole === 'admin' && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl space-y-6 max-w-lg mx-auto w-full">
            <div className="text-center space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Admin Credentials Required
              </span>
              <h2 className="text-2xl font-black text-slate-900">Hospital Administrator Sign In</h2>
              <p className="text-xs text-slate-500">Enter Admin ID & Password to manage hospital OPD analytics</p>
            </div>

            {/* Demo Hint Banner */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
              <span className="font-extrabold text-teal-800 block">🔑 Pre-filled Demo Credentials:</span>
              <div className="flex justify-between font-mono text-[11px] text-slate-600">
                <span>Admin ID: <strong className="text-slate-900">ADM-CH-2026-991</strong></span>
                <span>Password: <strong className="text-slate-900">admin123</strong></span>
              </div>
            </div>

            {adminError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{adminError}</span>
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
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Hospital Branch / Facility:</label>
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
                className="w-full py-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5 text-white" />
                <span>Log In & Open Admin Dashboard →</span>
              </button>
            </form>
          </div>
        )}

        {/* ROLE 3: PATIENT ENTRANCE (NO PASSWORD) */}
        {activeRole === 'patient' && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl space-y-6 max-w-lg mx-auto w-full">
            <div className="text-center space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-700" /> Passwordless Access (No Password Required)
              </span>
              <h2 className="text-2xl font-black text-slate-900">Patient Entrance</h2>
              <p className="text-xs text-slate-500">Scan OPD QR code or verify via Mobile / ABHA OTP</p>
            </div>

            {/* Patient Login Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setPatientTab('qr')}
                className={`py-2.5 rounded-xl transition-all ${
                  patientTab === 'qr' ? 'bg-teal-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Scan Session QR Code
              </button>
              <button
                onClick={() => setPatientTab('abha')}
                className={`py-2.5 rounded-xl transition-all ${
                  patientTab === 'abha' ? 'bg-teal-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ABHA / Mobile OTP
              </button>
            </div>

            {patientTab === 'qr' ? (
              <div className="space-y-4 text-center">
                <div className="p-6 rounded-2xl bg-slate-950 text-white space-y-4 border border-slate-800 flex flex-col items-center">
                  <QRCodeSvg
                    value={typeof window !== 'undefined' ? `${window.location.origin}/login/patient?token=${patientInfo.token}` : undefined}
                    size={160}
                    onClick={() => navigate(`/patient/onboarding?token=${patientInfo.token}`)}
                  />
                  <div>
                    <h3 className="text-sm font-black text-white font-mono">Session QR: {patientInfo.token}</h3>
                    <p className="text-xs text-teal-300 font-mono mt-0.5">Apollo OPD Kiosk #04</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/patient/onboarding?token=${patientInfo.token}`)}
                  className="w-full py-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm shadow-xl shadow-teal-600/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span>Start Patient Experience →</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handlePatientSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">ABHA Health ID (NDHM):</label>
                  <input
                    type="text"
                    value={abhaInput}
                    onChange={(e) => setAbhaInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Mobile Number:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                      type="button"
                      onClick={() => setOtpSent(true)}
                      className="px-3 py-3 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-700 shrink-0"
                    >
                      {otpSent ? 'Resend' : 'Send OTP'}
                    </button>
                  </div>
                </div>

                {otpSent && (
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Enter 6-Digit OTP:</label>
                    <input
                      type="text"
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-teal-500 text-center font-mono font-bold text-lg tracking-widest focus:outline-none"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm shadow-xl shadow-teal-600/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Verify OTP & Start Patient Experience →</span>
                </button>
              </form>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
