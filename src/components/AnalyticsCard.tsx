import React from 'react';
import { Users, Clock, CheckCircle2, AlertTriangle, Globe, TrendingUp, Activity } from 'lucide-react';

export const AnalyticsCard: React.FC = () => {
  const opdVolumeData = [
    { time: '08:00 AM', patients: 120, heightPct: 23 },
    { time: '09:00 AM', patients: 340, heightPct: 65 },
    { time: '10:00 AM', patients: 520, heightPct: 100 },
    { time: '11:00 AM', patients: 480, heightPct: 92 },
    { time: '12:00 PM', patients: 390, heightPct: 75 },
    { time: '01:00 PM', patients: 210, heightPct: 40 },
    { time: '02:00 PM', patients: 426, heightPct: 82 },
  ];

  const languageData = [
    { name: 'Tamil', value: 48, color: '#0d9488', bg: 'bg-teal-600' },
    { name: 'Hindi', value: 29, color: '#0284c7', bg: 'bg-sky-600' },
    { name: 'English', value: 23, color: '#f59e0b', bg: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Top 5 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-md space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-bold">Patients Today</span>
            <Users className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">2,486</p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold">
            <TrendingUp className="w-3 h-3" /> +18% vs yesterday
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-md space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-bold">Average Intake Time</span>
            <Clock className="w-4 h-4 text-sky-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">03:42</p>
          <span className="text-[11px] text-slate-500">Target: &lt; 05:00 min</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-md space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-bold">Cases Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">1,982</p>
          <span className="text-[11px] text-emerald-600 font-bold">79.7% intake rate</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-md space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-bold">Flagged Cases</span>
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-2xl font-black text-red-600">37</p>
          <span className="text-[11px] text-red-600 font-bold">Immediate Triage</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-md space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-bold">Languages</span>
            <Globe className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-lg font-black text-slate-900">Tamil 48%</p>
          <span className="text-[11px] text-slate-500">Hindi 29% • Eng 23%</span>
        </div>
      </div>

      {/* Main Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pure SVG OPD Volume Bar / Area Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">OPD Patient Intake Volume</h3>
              <p className="text-xs text-slate-500">Hourly patient registrations and triage processing</p>
            </div>
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-teal-600" /> Live Feed
            </span>
          </div>

          {/* Pure SVG Bar Visualizer */}
          <div className="h-60 w-full flex items-end justify-between gap-3 pt-6 px-2 border-b border-slate-200 pb-2">
            {opdVolumeData.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-extrabold text-teal-700 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                  {item.patients}
                </span>
                <div className="w-full bg-teal-50 rounded-t-xl overflow-hidden relative flex items-end h-full">
                  <div
                    className="w-full bg-gradient-to-t from-teal-700 via-teal-500 to-emerald-400 rounded-t-xl transition-all duration-500 group-hover:brightness-110"
                    style={{ height: `${item.heightPct}%` }}
                  ></div>
                </div>
                <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pure SVG Language Distribution Donut Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md flex flex-col justify-between space-y-6">
          <div>
            <h3 className="font-extrabold text-base text-slate-900">Language Distribution</h3>
            <p className="text-xs text-slate-500">Multilingual intake breakdown across hospital kiosks</p>
          </div>

          {/* SVG Donut Chart */}
          <div className="relative flex items-center justify-center my-auto py-2">
            <svg className="w-44 h-44 -rotate-90 transform" viewBox="0 0 36 36">
              {/* Background ring */}
              <path
                className="text-slate-100"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* Tamil segment (48%) */}
              <path
                className="text-teal-600"
                strokeDasharray="48, 100"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* Hindi segment (29%) offset by 48 */}
              <path
                className="text-sky-600"
                strokeDasharray="29, 100"
                strokeDashoffset="-48"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* English segment (23%) offset by 77 */}
              <path
                className="text-amber-500"
                strokeDasharray="23, 100"
                strokeDashoffset="-77"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center text-center">
              <span className="text-2xl font-black text-slate-900 font-mono">100%</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Multilingual</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            {languageData.map((l) => (
              <div key={l.name} className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className={`w-2 h-2 rounded-full ${l.bg}`}></span>
                  <span className="font-bold text-slate-800">{l.name}</span>
                </div>
                <span className="font-black text-slate-900">{l.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
