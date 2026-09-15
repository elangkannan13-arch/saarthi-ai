import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemoState } from '../context/DemoStateContext';
import { AlertTriangle, ShieldAlert, CheckCircle, ArrowRight, BellRing } from 'lucide-react';

export const RedFlagAlert: React.FC = () => {
  const { redFlag, acknowledgeRedFlag, patientInfo } = useDemoState();
  const navigate = useNavigate();

  if (!redFlag.triggered || redFlag.acknowledged) return null;

  return (
    <div className="bg-gradient-to-r from-red-950 via-rose-900 to-red-900 text-white rounded-3xl p-6 border-2 border-red-500 shadow-2xl animate-red-flag-pulse relative overflow-hidden space-y-4">
      {/* Background Warning Stripe effect */}
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <AlertTriangle className="w-48 h-48 text-red-300" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start space-x-3">
          <div className="p-3 rounded-2xl bg-red-600 text-white animate-bounce shrink-0 shadow-lg">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-red-500/30 text-red-200 border border-red-400/40 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                🚨 POTENTIAL RED FLAG
              </span>
              <span className="text-xs text-red-200 font-mono">
                {redFlag.ruleName}
              </span>
            </div>

            <h3 className="text-lg font-black text-white mt-1">
              Immediate Clinical Attention Recommended
            </h3>

            <p className="text-xs text-red-100 mt-1 max-w-2xl leading-relaxed">
              {redFlag.description}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={acknowledgeRedFlag}
            className="px-3.5 py-2 rounded-xl bg-red-900/80 hover:bg-red-800 text-red-100 border border-red-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Acknowledge</span>
          </button>

          <button
            onClick={() => navigate(`/doctor/patient/${patientInfo.id}`)}
            className="px-4 py-2 rounded-xl bg-white text-red-950 font-extrabold text-xs hover:bg-red-50 shadow transition-transform hover:scale-105 flex items-center gap-1.5"
          >
            <span>View Patient</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Safety Layer Disclaimer Footer */}
      <div className="pt-3 border-t border-red-800/80 flex flex-wrap items-center justify-between text-[11px] text-red-200/90 relative z-10">
        <span className="flex items-center gap-1.5 font-semibold text-red-300">
          <ShieldAlert className="w-3.5 h-3.5" /> Rules + AI Safety Layer
        </span>
        <span className="italic">
          Saarthi.AI screens for emergency guidelines but does NOT replace emergency physician triage.
        </span>
      </div>
    </div>
  );
};
