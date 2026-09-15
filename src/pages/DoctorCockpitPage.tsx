import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDemoState } from '../context/DemoStateContext';
import { DoctorQueue } from '../components/DoctorQueue';
import { CaseSummary } from '../components/CaseSummary';
import { RedFlagAlert } from '../components/RedFlagAlert';
import { PatientTimeline } from '../components/PatientTimeline';
import { FHIRViewer } from '../components/FHIRViewer';
import { Stethoscope, User, Clock, Activity, FileCode, Sparkles, ShieldCheck, CheckCircle, RotateCcw } from 'lucide-react';

export const DoctorCockpitPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { patientInfo, redFlag, getFhirBundleJson } = useDemoState();
  const [isFhirModalOpen, setIsFhirModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'timeline'>('summary');

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 font-bold shadow-md">
              <Stethoscope className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h1 className="font-black text-lg text-white tracking-tight flex items-center gap-2">
                Saarthi.AI — Doctor Cockpit
                <span className="text-[10px] bg-teal-500/20 text-teal-300 font-bold px-2 py-0.5 rounded border border-teal-500/30">
                  Physician Co-Pilot
                </span>
              </h1>
              <p className="text-xs text-slate-400">Apollo Hospitals OPD • Cardiology / General Medicine</p>
            </div>
          </div>

          {/* Cockpit Top Navigation */}
          <div className="flex items-center space-x-1 text-xs">
            {[
              { name: 'Queue', path: '/doctor/queue' },
              { name: 'Timeline', path: '/doctor/timeline' },
              { name: 'AYUSH Mode', path: '/doctor/ayush' },
              { name: 'Analytics', path: '/admin/analytics' },
            ].map((nav) => (
              <button
                key={nav.name}
                onClick={() => navigate(nav.path)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  location.pathname === nav.path
                    ? 'bg-teal-600 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {nav.name}
              </button>
            ))}

            <button
              onClick={() => setIsFhirModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 font-semibold border border-slate-700 transition-colors flex items-center gap-1"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>FHIR</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Cockpit Split Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Sidebar Queue (3 Cols on Desktop) */}
        <div className="lg:col-span-3 border-r border-slate-800 min-h-[500px]">
          <DoctorQueue />
        </div>

        {/* Main Dashboard Panel (9 Cols on Desktop) */}
        <div className="lg:col-span-9 p-4 sm:p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-65px)]">
          {/* Active Patient Card Banner */}
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center font-bold text-xl">
                <User className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center space-x-3">
                  <h2 className="text-xl font-black text-white">{patientInfo.name}</h2>
                  <span className="text-xs bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded border border-slate-700">
                    {patientInfo.token}
                  </span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    Interview: Completed (94% Confidence)
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Age: {patientInfo.age} • Gender: {patientInfo.gender} • Native Lang: Tamil • ABHA: {patientInfo.abhaId}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveTab('summary')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  activeTab === 'summary'
                    ? 'bg-teal-500 text-slate-950 shadow'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Case Sheet Summary
              </button>
              <button
                onClick={() => setActiveTab('timeline')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  activeTab === 'timeline'
                    ? 'bg-teal-500 text-slate-950 shadow'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Ambient Health Timeline
              </button>
            </div>
          </div>

          {/* Red Flag Emergency Banner */}
          <RedFlagAlert />

          {/* Tab Views */}
          {activeTab === 'summary' ? (
            <CaseSummary />
          ) : (
            <PatientTimeline />
          )}
        </div>
      </div>

      <FHIRViewer isOpen={isFhirModalOpen} onClose={() => setIsFhirModalOpen(false)} />
    </div>
  );
};
