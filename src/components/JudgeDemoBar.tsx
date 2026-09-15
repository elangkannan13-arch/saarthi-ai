import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDemoState, type ScenarioType } from '../context/DemoStateContext';
import { Play, RotateCcw, Monitor, User, Stethoscope, Sparkles, ShieldCheck, Activity } from 'lucide-react';

export const JudgeDemoBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scenario, selectScenario, run30SecondDemo, isAutoDemoRunning, resetDemoState } = useDemoState();

  const scenarios: { key: ScenarioType; label: string; tag: string }[] = [
    { key: 'chest_pain', label: '1. Chest Pain', tag: 'Red Flag Emergency' },
    { key: 'fever', label: '2. Febrile OPD', tag: 'General Medicine' },
    { key: 'ayush', label: '3. AYUSH Mode', tag: 'Prakriti / Dosha' },
    { key: 'ocr', label: '4. Prescription OCR', tag: 'Doc Intelligence' },
  ];

  return (
    <div className="bg-slate-900 border-b border-teal-500/30 text-white px-3 py-2 text-xs flex flex-wrap items-center justify-between gap-2 shadow-lg sticky top-0 z-50">
      {/* Brand & Judge Badge */}
      <div className="flex items-center space-x-2">
        <span className="bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-bold px-2 py-0.5 rounded text-[11px] uppercase tracking-wider flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Judge Mode
        </span>
        <span className="text-slate-300 font-medium hidden sm:inline">
          Saarthi.AI Interactive Sandbox
        </span>
      </div>

      {/* Scenario Selector */}
      <div className="flex items-center space-x-1 overflow-x-auto py-0.5">
        <span className="text-slate-400 text-[11px] font-mono mr-1 hidden md:inline">Scenarios:</span>
        {scenarios.map((sc) => (
          <button
            key={sc.key}
            onClick={() => selectScenario(sc.key)}
            className={`px-2.5 py-1 rounded-full font-medium transition-all flex items-center gap-1 text-[11px] whitespace-nowrap ${
              scenario === sc.key
                ? 'bg-teal-500 text-slate-950 font-semibold shadow-md shadow-teal-500/20 ring-1 ring-teal-300'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
            }`}
          >
            {sc.label}
          </button>
        ))}
      </div>

      {/* Quick Route Switcher Buttons & Auto Demo Runner */}
      <div className="flex items-center space-x-1.5">
        <button
          onClick={run30SecondDemo}
          disabled={isAutoDemoRunning}
          className={`px-3 py-1 rounded-md font-semibold text-[11px] transition-all flex items-center gap-1.5 ${
            isAutoDemoRunning
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 animate-pulse'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:brightness-110 shadow'
          }`}
        >
          <Play className="w-3 h-3 fill-current" />
          {isAutoDemoRunning ? 'Running Demo...' : '▶ 30-Sec Auto Demo'}
        </button>

        <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block"></div>

        <button
          onClick={() => navigate('/')}
          className={`px-2 py-1 rounded text-[11px] font-medium transition-colors flex items-center gap-1 ${
            location.pathname === '/' ? 'bg-slate-700 text-teal-300' : 'text-slate-300 hover:text-white'
          }`}
        >
          Landing
        </button>

        <button
          onClick={() => navigate('/patient/interview')}
          className={`px-2 py-1 rounded text-[11px] font-medium transition-colors flex items-center gap-1 ${
            location.pathname.startsWith('/patient') ? 'bg-slate-700 text-teal-300' : 'text-slate-300 hover:text-white'
          }`}
        >
          <User className="w-3 h-3" /> Patient
        </button>

        <button
          onClick={() => navigate('/doctor/queue')}
          className={`px-2 py-1 rounded text-[11px] font-medium transition-colors flex items-center gap-1 ${
            location.pathname.startsWith('/doctor') ? 'bg-slate-700 text-teal-300' : 'text-slate-300 hover:text-white'
          }`}
        >
          <Stethoscope className="w-3 h-3" /> Doctor
        </button>

        <button
          onClick={() => navigate('/doctor/ayush')}
          className={`px-2 py-1 rounded text-[11px] font-medium transition-colors flex items-center gap-1 ${
            location.pathname === '/doctor/ayush' ? 'bg-slate-700 text-amber-300' : 'text-slate-300 hover:text-white'
          }`}
        >
          <Activity className="w-3 h-3" /> AYUSH
        </button>

        <button
          onClick={() => navigate('/demo')}
          className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all flex items-center gap-1 border ${
            location.pathname === '/demo'
              ? 'bg-teal-600 text-white border-teal-400 shadow'
              : 'bg-teal-950/60 text-teal-300 border-teal-500/40 hover:bg-teal-900/80'
          }`}
        >
          <Monitor className="w-3 h-3" /> /demo Split
        </button>

        <button
          onClick={resetDemoState}
          title="Reset Demo State"
          className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
