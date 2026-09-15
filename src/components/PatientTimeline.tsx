import React, { useState } from 'react';
import { FileText, Activity, Clock, ChevronRight, FileCheck, Calendar, Sparkles } from 'lucide-react';

export const PatientTimeline: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<number>(3);

  const timelineEvents = [
    {
      id: 1,
      year: '2024',
      date: '14 Nov 2024',
      title: 'Previous Prescription',
      type: 'Historical OPD',
      doctor: 'Dr. S. Raman, MD',
      details: 'Diagnosed with Mild Essential Hypertension. Prescribed Telmisartan 40mg (1-0-0). Recommended low sodium diet.',
      icon: FileText,
      badge: 'Archived Document',
    },
    {
      id: 2,
      year: '2025',
      date: '22 Mar 2025',
      title: 'Lipid Panel & ECG Report',
      type: 'Lab Diagnostic',
      doctor: 'Apollo Diagnostics',
      details: 'Total Cholesterol: 218 mg/dL, HDL: 42 mg/dL, LDL: 138 mg/dL. ECG showed normal sinus rhythm with non-specific ST changes.',
      icon: FileCheck,
      badge: 'Lab OCR Extraction',
    },
    {
      id: 3,
      year: 'Today',
      date: 'Today • 10:14 AM',
      title: 'Saarthi AI Interview',
      type: 'Voice Intake',
      doctor: 'AI Co-Pilot',
      details: 'Captured chief complaint of central chest pain for 2 days. Rated 7/10 severity with exertional dyspnea. Extracted SOCRATES parameters.',
      icon: Activity,
      badge: 'AI Multilingual Voice',
      active: true,
    },
    {
      id: 4,
      year: 'Today',
      date: 'Today • 10:18 AM',
      title: 'Prescription Uploaded',
      type: 'OCR Processing',
      doctor: 'Digitized by Saarthi',
      details: 'Uploaded handwritten prescription. Extracted Paracetamol 500mg (1-0-1) and Telmisartan 40mg. Confidence score: 91%.',
      icon: FileText,
      badge: 'OCR Confidence 91%',
    },
    {
      id: 5,
      year: 'Today',
      date: 'Pending',
      title: 'Doctor Consultation',
      type: 'Physician Review',
      doctor: 'Attending Cardiologist',
      details: 'Physician reviews structured AI case sheet, verifies OCR extractions, performs clinical examination and issues signed prescription.',
      icon: Sparkles,
      badge: 'Final Physician Sign-Off',
    },
  ];

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-6">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950 text-teal-300 text-xs font-bold border border-teal-500/30 mb-2">
          <Clock className="w-3.5 h-3.5" /> Ambient Health Timeline
        </div>
        <h2 className="text-xl font-black text-white">
          “One story across today's conversation and historical documents.”
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Chronological synthesis of patient consultations, uploaded prescriptions, lab metrics, and AI history.
        </p>
      </div>

      {/* Horizontal Timeline Track */}
      <div className="relative py-6">
        {/* Track Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -translate-y-1/2 z-0"></div>

        {/* Nodes Grid */}
        <div className="grid grid-cols-5 gap-2 relative z-10">
          {timelineEvents.map((evt) => {
            const IconComp = evt.icon;
            const isSelected = selectedNode === evt.id;

            return (
              <button
                key={evt.id}
                onClick={() => setSelectedNode(evt.id)}
                className="flex flex-col items-center text-center group focus:outline-none"
              >
                <span className="text-[11px] font-bold text-slate-400 mb-2 group-hover:text-teal-300 transition-colors">
                  {evt.year}
                </span>

                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/40 ring-4 ring-teal-500/20 scale-110'
                      : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-teal-400'
                  }`}
                >
                  <IconComp className="w-5 h-5" />
                </div>

                <span className="text-xs font-extrabold text-slate-200 mt-3 line-clamp-1 group-hover:text-teal-300 transition-colors">
                  {evt.title}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">{evt.date}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Node Detailed Card */}
      {selectedNode && (
        <div className="p-5 rounded-2xl bg-slate-950 border border-teal-500/40 space-y-3 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-teal-400">
                {timelineEvents[selectedNode - 1].date}
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 font-mono">
                {timelineEvents[selectedNode - 1].type}
              </span>
            </div>

            <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
              {timelineEvents[selectedNode - 1].badge}
            </span>
          </div>

          <h3 className="text-base font-extrabold text-white">
            {timelineEvents[selectedNode - 1].title} — <span className="text-slate-400 text-xs">{timelineEvents[selectedNode - 1].doctor}</span>
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            {timelineEvents[selectedNode - 1].details}
          </p>
        </div>
      )}
    </div>
  );
};
