import React from 'react';
import { useDemoState } from '../context/DemoStateContext';
import { PatientAvatar } from '../components/PatientAvatar';
import { VoiceWaveform } from '../components/VoiceWaveform';
import { SocratesTracker } from '../components/SocratesTracker';
import { OCRResult } from '../components/OCRResult';
import { CaseSummary } from '../components/CaseSummary';
import { RedFlagAlert } from '../components/RedFlagAlert';
import { PrakritiRadar } from '../components/PrakritiRadar';
import { DemoController } from '../components/DemoController';
import { Navbar } from '../components/Navbar';
import { User, Stethoscope, Sparkles, Activity, Play } from 'lucide-react';

export const HackathonDemoPage: React.FC = () => {
  const { scenario, isAutoDemoRunning, sendPatientMessage, enableAyushMode } = useDemoState();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      <Navbar />

      {/* Split Screen Container */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        
        {/* LEFT PANE: PATIENT KIOSK INTERVIEW (6 Cols) */}
        <div className="lg:col-span-6 p-4 sm:p-6 border-r border-slate-800 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)] bg-slate-900/60">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-teal-400 animate-ping"></span>
              <h2 className="font-extrabold text-base text-teal-300 flex items-center gap-2">
                <User className="w-5 h-5 text-teal-400" />
                PATIENT INTERVIEW & INTAKE (LIVE KIOSK)
              </h2>
            </div>
            <span className="text-xs font-mono bg-teal-950 text-teal-300 px-2.5 py-0.5 rounded border border-teal-500/30">
              Kiosk #04 Active
            </span>
          </div>

          <PatientAvatar />

          <VoiceWaveform onSendMessage={sendPatientMessage} />

          <SocratesTracker />

          <OCRResult />
        </div>

        {/* RIGHT PANE: DOCTOR COCKPIT SUMMARY (6 Cols) */}
        <div className="lg:col-span-6 p-4 sm:p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)] bg-slate-950">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
              <h2 className="font-extrabold text-base text-emerald-300 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-emerald-400" />
                DOCTOR COCKPIT & TRIAGE (LIVE SYNC)
              </h2>
            </div>
            <span className="text-xs font-mono bg-emerald-950 text-emerald-300 px-2.5 py-0.5 rounded border border-emerald-500/30">
              Physician View
            </span>
          </div>

          <RedFlagAlert />

          <CaseSummary />

          {enableAyushMode && <PrakritiRadar />}
        </div>
      </main>

      {/* Bottom Live Pipeline Bar */}
      <DemoController />
    </div>
  );
};
