import React from 'react';
import { PrakritiRadar } from '../components/PrakritiRadar';
import { Stethoscope, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DoctorAyushPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans p-4 sm:p-8">
      <div className="max-w-6xl mx-auto w-full space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <button
            onClick={() => navigate('/doctor/queue')}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-teal-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Doctor Cockpit
          </button>
          <div className="flex items-center space-x-2">
            <Stethoscope className="w-5 h-5 text-amber-400" />
            <h1 className="font-extrabold text-lg text-white">AYUSH Clinical Module</h1>
          </div>
        </div>

        <PrakritiRadar />
      </div>
    </div>
  );
};
