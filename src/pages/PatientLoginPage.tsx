import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LanguageSelector } from '../components/LanguageSelector';
import { useDemoState } from '../context/DemoStateContext';
import { QRCodeSvg } from '../components/QRCodeSvg';
import { QrCode, ShieldCheck, CheckCircle2, Activity, Check, Smartphone, ArrowRight } from 'lucide-react';

export const PatientLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { patientInfo, setPatientToken } = useDemoState();
  const [tab, setTab] = useState<'qr' | 'abha'>('qr');
  const [phoneInput, setPhoneInput] = useState(patientInfo.phone);
  const [abhaInput, setAbhaInput] = useState(patientInfo.abhaId);
  const [otpInput, setOtpInput] = useState('592014');
  const [otpSent, setOtpSent] = useState(false);
  const [scannedSession, setScannedSession] = useState<string | null>(searchParams.get('token'));

  const activeToken = searchParams.get('token') || patientInfo.token || 'SA-2841';

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setScannedSession(token);
      setPatientToken(token);
    }
  }, [searchParams, setPatientToken]);

  const handlePatientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/patient/onboarding?token=${activeToken}`);
  };

  const handleStartIntake = () => {
    navigate(`/patient/onboarding?token=${activeToken}`);
  };

  const currentQrUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/login/patient?token=${activeToken}`
    : `http://localhost:5174/login/patient?token=${activeToken}`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between p-4 sm:p-8 font-sans selection:bg-teal-500 selection:text-white">
      {/* Header */}
      <header className="flex items-center justify-between max-w-4xl mx-auto w-full bg-white p-4 rounded-3xl border border-slate-200 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-600 flex items-center justify-center text-white font-bold shadow">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-base text-slate-900">Saarthi.AI Patient Entrance</h1>
            <p className="text-xs text-slate-500">OPD Guided Pre-Consultation Portal</p>
          </div>
        </div>

        <LanguageSelector />
      </header>

      {/* Main Login Card */}
      <main className="max-w-md mx-auto w-full my-auto py-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl space-y-6 relative overflow-hidden">
          
          {/* Mobile QR Verification Alert Banner */}
          {scannedSession ? (
            <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 text-center space-y-2 animate-fadeIn">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> QR Code Scanned & Authenticated
              </span>
              <h2 className="text-lg font-black text-slate-900">Active Mobile Session: {scannedSession}</h2>
              <p className="text-xs text-slate-600">Your session token has been loaded from your hospital check-in.</p>
              <button
                type="button"
                onClick={handleStartIntake}
                className="w-full mt-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Start Medical Interview →</span>
              </button>
            </div>
          ) : (
            <div className="text-center space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-700" /> Passwordless Access (No Password Required)
              </span>
              <h2 className="text-2xl font-black text-slate-900">Patient Entrance</h2>
              <p className="text-xs text-slate-500">Patients do not need a password. Simply scan session QR or use Mobile OTP</p>
            </div>
          )}

          {/* Login Mode Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setTab('qr')}
              className={`py-2.5 rounded-xl transition-all ${
                tab === 'qr' ? 'bg-teal-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Scan Session QR Code
            </button>
            <button
              onClick={() => setTab('abha')}
              className={`py-2.5 rounded-xl transition-all ${
                tab === 'abha' ? 'bg-teal-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ABHA / Mobile OTP
            </button>
          </div>

          {/* Tab 1: Real Scannable QR Code */}
          {tab === 'qr' ? (
            <div className="space-y-4 text-center">
              <div className="p-6 rounded-2xl bg-slate-950 text-white space-y-4 border border-slate-800 relative overflow-hidden flex flex-col items-center">
                <QRCodeSvg
                  value={currentQrUrl}
                  size={160}
                  onClick={handleStartIntake}
                />
                <div>
                  <h3 className="text-sm font-black text-white font-mono">Session QR: {activeToken}</h3>
                  <p className="text-xs text-teal-300 font-mono mt-0.5">Apollo OPD Kiosk #04</p>
                </div>
              </div>

              <button
                onClick={handleStartIntake}
                className="w-full py-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm shadow-xl shadow-teal-600/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>Start Patient Experience →</span>
              </button>
            </div>
          ) : (
            /* Tab 2: ABHA / Mobile Form */
            <form onSubmit={handlePatientSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">ABHA Health ID (NDHM):</label>
                <input
                  type="text"
                  value={abhaInput}
                  onChange={(e) => setAbhaInput(e.target.value)}
                  placeholder="91-4820-1928-3019"
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
                    placeholder="+91 98401 23456"
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
                <span>Verify OTP & Start Patient Experience</span>
              </button>
            </form>
          )}

          {/* Quick Demo Access Link */}
          <div className="pt-2 border-t border-slate-100 text-center">
            <button
              onClick={() => navigate('/patient/onboarding')}
              className="text-xs font-bold text-teal-700 hover:underline"
            >
              Direct Kiosk Demo Launcher (Skip Login) →
            </button>
          </div>
        </div>
      </main>

      <footer className="text-center text-xs text-slate-500 font-medium py-2">
        <span className="flex items-center justify-center gap-1">
          <ShieldCheck className="w-4 h-4 text-teal-600" /> Passwordless Patient Intake • ABDM / ABHA Compliant
        </span>
      </footer>
    </div>
  );
};
