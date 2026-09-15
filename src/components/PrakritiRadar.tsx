import React from 'react';
import { useDemoState } from '../context/DemoStateContext';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { Flame, Wind, Droplets, Activity, ShieldCheck, Sparkles } from 'lucide-react';

export const PrakritiRadar: React.FC = () => {
  const { ayushPrakriti, enableAyushMode, setEnableAyushMode } = useDemoState();

  const chartData = [
    { dosha: 'Vata (Wind & Ether)', score: ayushPrakriti.vata, fullMark: 100 },
    { dosha: 'Pitta (Fire & Water)', score: ayushPrakriti.pitta, fullMark: 100 },
    { dosha: 'Kapha (Earth & Water)', score: ayushPrakriti.kapha, fullMark: 100 },
  ];

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 border border-amber-500/30 shadow-2xl space-y-6 relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950 text-amber-300 text-xs font-bold border border-amber-500/40 mb-1">
            <Sparkles className="w-3.5 h-3.5" /> AYUSH / Ayurvedic Clinical Module
          </div>
          <h2 className="text-xl font-black text-white">
            AYUSH Clinical History & Prakriti Analysis
          </h2>
          <p className="text-xs text-slate-400">
            Tridosha assessment & Dashavidha Pariksha history taking for holistic healthcare integration.
          </p>
        </div>

        {/* Toggle Mode */}
        <div className="flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800 shrink-0">
          <button
            onClick={() => setEnableAyushMode(false)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              !enableAyushMode
                ? 'bg-slate-800 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Allopathic Mode
          </button>
          <button
            onClick={() => setEnableAyushMode(true)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              enableAyushMode
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            AYUSH Mode
          </button>
        </div>
      </div>

      {/* Main Content: Radar Chart + Dosha Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {/* Radar Chart */}
        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
          <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-2">
            Prakriti / Dosha Radar Visualization
          </h3>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="dosha" stroke="#cbd5e1" tick={{ fill: '#cbd5e1', fontSize: 11, fontWeight: 700 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                <Radar name="Prakriti Score" dataKey="score" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-bold">
            Primary Constitution: {ayushPrakriti.primaryDosha}
          </div>
        </div>

        {/* Dosha Scores Grid & Info */}
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-slate-950 border border-sky-500/30 text-center space-y-1">
              <Wind className="w-6 h-6 text-sky-400 mx-auto" />
              <span className="text-xs font-bold text-slate-300">Vata</span>
              <p className="text-xl font-black text-sky-400">{ayushPrakriti.vata}%</p>
              <span className="text-[10px] text-slate-400">Wind & Ether</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/40 text-center space-y-1">
              <Flame className="w-6 h-6 text-amber-400 mx-auto" />
              <span className="text-xs font-bold text-slate-300">Pitta</span>
              <p className="text-xl font-black text-amber-400">{ayushPrakriti.pitta}%</p>
              <span className="text-[10px] text-slate-400">Fire & Water</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 text-center space-y-1">
              <Droplets className="w-6 h-6 text-emerald-400 mx-auto" />
              <span className="text-xs font-bold text-slate-300">Kapha</span>
              <p className="text-xl font-black text-emerald-400">{ayushPrakriti.kapha}%</p>
              <span className="text-[10px] text-slate-400">Earth & Water</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="text-xs font-extrabold text-amber-300">Ayurvedic Clinical Observations</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Patient exhibits elevated Pitta (78%) with aggravated Agni (Tikshnagni). High Pitta propensity correlates with inflammatory heat and acid reflux symptoms.
            </p>
          </div>
        </div>
      </div>

      {/* Dashavidha Pariksha Cards */}
      <div>
        <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider mb-3">
          Dashavidha Pariksha (10-fold Examination History)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ayushPrakriti.dashavidha.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                {item.category}
              </span>
              <h4 className="font-extrabold text-sm text-white">{item.title}</h4>
              <p className="text-xs font-bold text-emerald-400">{item.value}</p>
              <p className="text-[11px] text-slate-400 line-clamp-2">{item.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mandatory Safety UX Disclaimer */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-amber-200">
        <span className="flex items-center gap-1.5 font-semibold text-amber-400">
          <ShieldCheck className="w-3.5 h-3.5" /> AYUSH Clinical Decision Support
        </span>
        <span className="italic">
          Prakriti and Dosha visualizations serve as assessment & history-taking support, not autonomous medical diagnosis.
        </span>
      </div>
    </div>
  );
};
