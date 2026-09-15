import React from 'react';
import { useDemoState } from '../context/DemoStateContext';
import { Play, Mic, Sparkles, Scan, AlertTriangle, FileSpreadsheet, Stethoscope, CheckCircle2 } from 'lucide-react';

export const DemoController: React.FC = () => {
  const { isAutoDemoRunning, autoDemoPipelineStep, run30SecondDemo } = useDemoState();

  const pipelineStages = [
    { step: 1, label: 'VOICE', desc: 'Tamil Speech Capture', icon: Mic },
    { step: 2, label: 'AI', desc: 'SOCRATES Parser', icon: Sparkles },
    { step: 3, label: 'OCR', desc: 'Doc Digitization', icon: Scan },
    { step: 4, label: 'TRIAGE', desc: 'Red Flag Rules', icon: AlertTriangle },
    { step: 5, label: 'SUMMARY', desc: 'Case Structuring', icon: FileSpreadsheet },
    { step: 6, label: 'DOCTOR', desc: 'Physician Review', icon: Stethoscope },
  ];

  return (
    <div className="bg-slate-950 border-t border-teal-500/30 p-4 text-white shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Run Demo CTA */}
        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={run30SecondDemo}
            disabled={isAutoDemoRunning}
            className={`px-5 py-2.5 rounded-2xl font-black text-sm transition-all flex items-center gap-2 shadow-lg ${
              isAutoDemoRunning
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 animate-pulse'
                : 'bg-gradient-to-r from-teal-500 via-emerald-500 to-amber-500 text-slate-950 hover:brightness-110 shadow-teal-500/20 scale-105'
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isAutoDemoRunning ? 'Executing 30s Pipeline...' : '▶ Run 30-Second Live Demo'}</span>
          </button>
        </div>

        {/* Pipeline Stage Steps Track */}
        <div className="flex-1 w-full flex items-center justify-between gap-1 overflow-x-auto py-1">
          {pipelineStages.map((stage, idx) => {
            const IconComp = stage.icon;
            const isActive = autoDemoPipelineStep === stage.step;
            const isCompleted = autoDemoPipelineStep > stage.step;

            return (
              <React.Fragment key={stage.step}>
                <div
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all border ${
                    isActive
                      ? 'bg-teal-600/30 border-teal-400 text-white shadow-lg ring-1 ring-teal-400'
                      : isCompleted
                        ? 'bg-slate-900 border-teal-500/30 text-teal-300'
                        : 'bg-slate-900/60 border-slate-800 text-slate-500'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isActive
                        ? 'bg-teal-500 text-slate-950 animate-bounce'
                        : isCompleted
                          ? 'bg-teal-900 text-teal-300'
                          : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <IconComp className="w-4 h-4" />}
                  </div>

                  <div className="hidden lg:block text-left">
                    <p className="text-xs font-black tracking-wider">{stage.label}</p>
                    <p className="text-[10px] text-slate-400 truncate max-w-[90px]">{stage.desc}</p>
                  </div>
                </div>

                {idx < pipelineStages.length - 1 && (
                  <div className={`h-0.5 w-4 hidden sm:block ${isCompleted ? 'bg-teal-500' : 'bg-slate-800'}`}></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
