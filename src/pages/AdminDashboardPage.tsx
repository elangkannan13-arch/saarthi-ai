import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemoState } from '../context/DemoStateContext';
import { AnalyticsCard } from '../components/AnalyticsCard';
import { QRCodeSvg } from '../components/QRCodeSvg';
import { QrCode, ArrowRight, ToggleLeft, ToggleRight, X, Copy, Check, Activity, ShieldCheck, RefreshCw, Smartphone } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { enableAyushMode, setEnableAyushMode, selectScenario, patientInfo, setPatientToken } = useDemoState();

  const [activeTab, setActiveTab] = useState<'operations' | 'analytics'>('operations');
  const [showQrModal, setShowQrModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedDept, setSelectedDept] = useState('General Medicine / Cardiology');
  const [sessionToken, setSessionToken] = useState(patientInfo.token || 'SA-2841');

  const departments = ['General Medicine / Cardiology', 'Pediatrics', 'AYUSH / Ayurvedic OPD', 'Orthopedics', 'ENT / General OPD'];

  const queueList = [
    {
      id: 'SA-2841',
      name: 'Demo Patient',
      language: 'Tamil',
      structured: '68%',
      status: 'Ready for review',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      scenario: 'chest_pain' as const,
    },
    {
      id: 'SA-2838',
      name: 'Demo Patient 02',
      language: 'Hindi',
      structured: '100%',
      status: 'Needs review',
      statusColor: 'bg-amber-100 text-amber-900 border-amber-300',
      scenario: 'fever' as const,
    },
    {
      id: 'SA-2837',
      name: 'Demo Patient 03',
      language: 'English',
      structured: '42%',
      status: 'In progress',
      statusColor: 'bg-slate-100 text-slate-700 border-slate-300',
      scenario: 'chest_pain' as const,
    },
    {
      id: 'SA-2835',
      name: 'Demo Patient 04',
      language: 'Tamil',
      structured: '85%',
      status: 'Ready for review',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      scenario: 'ayush' as const,
    },
  ];

  const handleOpenCase = (sc: 'chest_pain' | 'fever' | 'ayush' | 'ocr') => {
    selectScenario(sc);
    navigate('/doctor/queue');
  };

  const handleGenerateNewToken = () => {
    const randomNum = Math.floor(2800 + Math.random() * 200);
    const newToken = `SA-${randomNum}`;
    setSessionToken(newToken);
    setPatientToken(newToken);
  };

  const getPatientQrUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/login/patient?token=${sessionToken}`;
    }
    return `http://localhost:5174/login/patient?token=${sessionToken}`;
  };

  const handleCopyLink = () => {
    try {
      const link = getPatientQrUrl();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(link);
      }
    } catch (err) {
      console.log('Copy link error:', err);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <button onClick={() => navigate('/')} className="flex items-center space-x-2 text-left group">
              <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-sm shadow group-hover:scale-105 transition-transform">
                S
              </div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                Saarthi<span className="text-teal-600 font-black">.AI</span>
              </span>
            </button>

            <nav className="hidden sm:flex items-center space-x-2 text-xs font-semibold text-slate-600">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="hover:text-slate-900 px-3 py-1.5 rounded-lg transition-colors"
              >
                Project overview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('operations')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'operations'
                    ? 'bg-slate-100 font-extrabold text-slate-900 border border-slate-200 shadow-sm'
                    : 'hover:text-slate-900'
                }`}
              >
                Admin Workspace
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('analytics')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'analytics'
                    ? 'bg-slate-100 font-extrabold text-slate-900 border border-slate-200 shadow-sm'
                    : 'hover:text-slate-900'
                }`}
              >
                Analytics & Settings
              </button>
            </nav>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => navigate('/login/doctor')}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-extrabold text-xs border border-slate-300 shadow-sm transition-all"
            >
              Clinician login
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Admin workspace</span>
              <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace Content */}
      <main className="max-w-7xl mx-auto w-full p-4 sm:p-8 space-y-8 flex-1">
        {/* Banner Title & Switch Account Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
              ADMIN WORKSPACE • DEMO
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">
              {activeTab === 'operations' ? 'Hospital operations' : 'Hospital Analytics & System Settings'}
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">
              {activeTab === 'operations'
                ? 'Manage patient entry sessions and monitor the pre-consultation queue.'
                : 'Review OPD throughput metrics, OCR accuracy logs, and global AYUSH settings.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-extrabold text-xs border border-slate-300 shadow-sm transition-all"
          >
            Switch account
          </button>
        </div>

        {/* OPERATIONS VIEW */}
        {activeTab === 'operations' && (
          <div className="space-y-8">
            {/* Top 3 Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Metric 1 */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  ACTIVE PATIENT SESSIONS
                </span>
                <div className="flex items-baseline space-x-3">
                  <span className="text-4xl font-black text-slate-900 font-mono">08</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    +2 today
                  </span>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  READY FOR CLINICIAN REVIEW
                </span>
                <div className="flex items-baseline space-x-3">
                  <span className="text-4xl font-black text-slate-900 font-mono">03</span>
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                    1 flagged for attention
                  </span>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  CONNECTED DEVICES
                </span>
                <div className="flex items-baseline space-x-3">
                  <span className="text-4xl font-black text-slate-900 font-mono">05</span>
                  <span className="text-xs font-semibold text-slate-500">
                    2 QR • 2 tablet • 1 kiosk
                  </span>
                </div>
              </div>
            </div>

            {/* Grid Row: Left Create Entry & Right Clinical Queue */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Card: Create Patient Entry with Live QR Code SVG */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 inline-block">
                    CREATE PATIENT ENTRY
                  </span>
                  <h3 className="text-2xl font-black text-slate-900">New QR patient session</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                    Generate a time-limited QR code for the patient's own phone.
                  </p>

                  {/* Scannable Live QR Code Preview */}
                  <div className="pt-2 text-center">
                    <QRCodeSvg
                      value={getPatientQrUrl()}
                      size={170}
                      onClick={() => setShowQrModal(true)}
                    />
                    <p className="text-[11px] font-mono font-bold text-teal-700 mt-2">
                      Token: {sessionToken} • Click QR to scan & open
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setShowQrModal(true)}
                    className="w-full py-4 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2 group"
                  >
                    <QrCode className="w-4 h-4 text-teal-400" />
                    <span>Generate patient QR</span>
                  </button>
                </div>
              </div>

              {/* Right Card: Clinical Story Queue */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-900">Clinical story queue</h3>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    LIVE DEMO
                  </span>
                </div>

                <div className="space-y-3">
                  {queueList.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:bg-white hover:border-teal-300 hover:shadow-md"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-extrabold text-sm text-slate-900">{item.name}</h4>
                          <span className="text-[10px] font-mono text-slate-400 font-bold">{item.id}</span>
                        </div>
                        <p className="text-xs text-slate-500 font-semibold">{item.language} Mode</p>
                      </div>

                      <div className="flex items-center space-x-4">
                        <span className="text-xs font-bold text-slate-600 font-mono">
                          {item.structured} structured
                        </span>

                        <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full border ${item.statusColor}`}>
                          {item.status}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleOpenCase(item.scenario)}
                          className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-extrabold text-xs border border-slate-300 shadow-sm transition-all shrink-0"
                        >
                          Open case
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ANALYTICS & SETTINGS VIEW */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-md">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-600 flex items-center justify-center text-white font-bold shadow">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">Hospital Throughput & System Metrics</h2>
                  <p className="text-xs text-slate-500 font-medium">Apollo Hospitals Chennai • OPD Operational Performance</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* AYUSH Global Toggle */}
                <button
                  type="button"
                  onClick={() => setEnableAyushMode(!enableAyushMode)}
                  className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-2 border ${
                    enableAyushMode
                      ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md'
                      : 'bg-slate-200 text-slate-700 border-slate-300'
                  }`}
                >
                  {enableAyushMode ? <ToggleRight className="w-5 h-5 text-slate-950" /> : <ToggleLeft className="w-5 h-5 text-slate-500" />}
                  <span>{enableAyushMode ? 'AYUSH Mode: Enabled' : 'AYUSH Mode: Disabled'}</span>
                </button>
              </div>
            </div>

            <AnalyticsCard />
          </div>
        )}
      </main>

      {/* GENERATE PATIENT QR MODAL WITH REAL SCANNABLE SVG */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-6 relative animate-fadeIn">
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                ACTIVE OPD PATIENT QR
              </span>
              <h3 className="text-2xl font-black text-slate-900">Patient QR Session</h3>
              <p className="text-xs text-slate-500 font-medium">Scan this QR code using a smartphone camera to start pre-consultation intake.</p>
            </div>

            {/* Interactive QR Display Box */}
            <div className="p-6 rounded-2xl bg-slate-950 text-white space-y-4 border border-slate-800 text-center">
              <QRCodeSvg
                value={getPatientQrUrl()}
                size={180}
                onClick={() => {
                  setShowQrModal(false);
                  navigate('/login/patient?token=' + sessionToken);
                }}
              />

              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-center space-x-2">
                  <h4 className="text-sm font-black text-white font-mono">Session Token: {sessionToken}</h4>
                  <button
                    type="button"
                    onClick={handleGenerateNewToken}
                    className="p-1 rounded-lg bg-slate-800 text-teal-400 hover:bg-slate-700 transition-colors"
                    title="Generate New Session Token"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-left bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs">
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">OPD Department:</label>
                  <select
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-white font-bold text-xs p-2 rounded-lg focus:outline-none focus:border-teal-500"
                  >
                    {departments.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => {
                  setShowQrModal(false);
                  navigate('/patient');
                }}
                className="w-full py-4 px-6 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-black text-xs shadow-xl shadow-teal-600/30 transition-all flex items-center justify-center gap-2"
              >
                <Smartphone className="w-4 h-4" />
                <span>📱 Scan QR & Launch Patient Phone Intake</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="w-full py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs border border-slate-300 transition-all flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                <span>{copied ? 'Link Copied to Clipboard!' : 'Copy Direct Intake Link'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 px-4 text-center text-xs text-slate-500 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 text-teal-700 font-bold">
            <ShieldCheck className="w-4 h-4" /> Hospital Governance Console • Level 4 Administrative Clearance
          </span>
          <span>Saarthi.AI © 2026</span>
        </div>
      </footer>
    </div>
  );
};
