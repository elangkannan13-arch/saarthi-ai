import React, { useState } from 'react';
import { useDemoState } from '../context/DemoStateContext';
import { Search, AlertTriangle, Clock, User } from 'lucide-react';

export const DoctorQueue: React.FC = () => {
  const { patientInfo, patientQueue, loadPatientFromQueue } = useDemoState();
  const [filter, setFilter] = useState<'all' | 'flagged' | 'new' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('all');

  const filteredPatients = patientQueue.filter((p) => {
    if (filter === 'flagged' && !p.isFlagged) return false;
    if (filter === 'new' && p.interviewStatus !== 'Completed') return false;
    if (selectedDept !== 'all' && !p.dept.toLowerCase().includes(selectedDept.toLowerCase())) return false;
    if (
      searchTerm &&
      !p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !p.token.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="bg-slate-900 border-r border-slate-800 text-white w-full h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
            <User className="w-4 h-4 text-teal-400" />
            LIVE OPD QUEUE
          </h3>
          <span className="text-[10px] bg-teal-500/20 text-teal-300 font-bold px-2 py-0.5 rounded border border-teal-500/30">
            {filteredPatients.length} Waiting
          </span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search patient name or token..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500"
          />
        </div>

        {/* OPD Department Filter Dropdown */}
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="w-full mt-2.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold text-teal-300 focus:outline-none focus:border-teal-500"
        >
          <option value="all">🏥 All OPD Categories</option>
          <option value="General">🩺 General Medicine OPD</option>
          <option value="Cardiology">🫀 Cardiology OPD</option>
          <option value="AYUSH">🌿 AYUSH / Ayurvedic OPD</option>
        </select>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-1 mt-3 text-[11px] overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All' },
            { id: 'flagged', label: '🚨 Flagged' },
            { id: 'new', label: 'New' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors whitespace-nowrap ${
                filter === tab.id
                  ? 'bg-teal-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Patient List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
        {filteredPatients.map((p) => {
          const isActive = patientInfo.id === p.id || patientInfo.token === p.token || patientInfo.name.toLowerCase() === p.name.toLowerCase();

          return (
            <div
              key={p.id}
              onClick={() => loadPatientFromQueue(p.id)}
              className={`p-3.5 transition-all cursor-pointer hover:bg-slate-800/80 ${
                isActive ? 'bg-slate-800 border-l-4 border-teal-500' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-sm text-white">{p.name}</span>
                    <span className="text-[10px] bg-slate-700 text-slate-300 font-mono px-1.5 py-0.2 rounded">
                      {p.token}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mt-0.5">
                    {p.age} yrs • {p.gender} • {p.language}
                  </p>
                  <span className="text-[10px] font-bold text-teal-300 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-500/30 inline-block mt-1">
                    {p.dept}
                  </span>
                </div>

                {p.isFlagged && (
                  <span className="p-1 rounded bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse">
                    <AlertTriangle className="w-4 h-4" />
                  </span>
                )}
              </div>

              <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800/40">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" /> {p.time}
                </span>
                <span className="text-teal-400 font-semibold">{p.confidence}% AI Confidence</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
