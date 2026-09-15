import React, { useState } from 'react';
import { useDemoState, type DoctorSummary } from '../context/DemoStateContext';
import { PrakritiRadar } from './PrakritiRadar';
import { StructuredCaseSheet } from './StructuredCaseSheet';
import { Stethoscope, Edit3, Check, Sparkles, ShieldCheck, CheckCheck, AlertTriangle, Diff, LayoutGrid, FileText } from 'lucide-react';

interface DrugInteraction {
  pair: string;
  note: string;
  severity: 'HIGH' | 'MODERATE';
}

const interactionRules = [
  {
    a: 'Telmisartan',
    b: 'Ibuprofen',
    severity: 'HIGH' as const,
    note: 'NSAIDs (ibuprofen) can reduce the antihypertensive effect of telmisartan and stress kidney function together — advise caution and monitor blood pressure.',
  },
  {
    a: 'Metformin',
    b: 'Contrast',
    severity: 'HIGH' as const,
    note: 'Concurrent iodinated contrast can raise lactic-acidosis risk with metformin — hold metformin around imaging with contrast.',
  },
  {
    a: 'Telmisartan',
    b: 'Potassium',
    severity: 'MODERATE' as const,
    note: 'Combination raises risk of hyperkalemia — check serum potassium levels.',
  },
];

interface CaseSummaryProps {
  onOpenFhir?: () => void;
}

export const CaseSummary: React.FC<CaseSummaryProps> = ({ onOpenFhir }) => {
  const { doctorSummary, updateDoctorField, acceptField, acceptAllFields, enableAyushMode } = useDemoState();
  const [viewMode, setViewMode] = useState<'structured' | 'cockpit'>('structured');
  const [editingKey, setEditingKey] = useState<keyof DoctorSummary | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [showDiffView, setShowDiffView] = useState<boolean>(false);

  const fieldsList: (keyof DoctorSummary)[] = [
    'chiefComplaint',
    'hpi',
    'associatedSymptoms',
    'pastHistory',
    'medications',
    'allergies',
    'priorInvestigations',
  ];

  const handleStartEdit = (key: keyof DoctorSummary) => {
    setEditingKey(key);
    setEditValue(doctorSummary[key]?.value || '');
  };

  const handleSaveEdit = (key: keyof DoctorSummary) => {
    updateDoctorField(key, editValue);
    setEditingKey(null);
  };

  // Perform dynamic drug-drug interaction screening
  const combinedText = (Object.keys(doctorSummary) as (keyof DoctorSummary)[])
    .map((k) => doctorSummary[k]?.value || '')
    .join(' ')
    .toLowerCase();

  const detectedInteractions: DrugInteraction[] = [];
  interactionRules.forEach((rule) => {
    if (combinedText.includes(rule.a.toLowerCase()) && combinedText.includes(rule.b.toLowerCase())) {
      detectedInteractions.push({
        pair: `${rule.a} + ${rule.b}`,
        note: rule.note,
        severity: rule.severity,
      });
    }
  });

  return (
    <div className="space-y-6">
      {/* Top View Mode Selector Switcher */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-2 rounded-2xl">
        <span className="text-xs text-slate-400 font-semibold px-2 flex items-center gap-1.5">
          <Stethoscope className="w-4 h-4 text-teal-400" /> Physician View Mode
        </span>
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => setViewMode('structured')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'structured'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Structured Case Sheet (Light View)</span>
          </button>
          <button
            onClick={() => setViewMode('cockpit')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'cockpit'
                ? 'bg-teal-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Cockpit Analytics (Dark View)</span>
          </button>
        </div>
      </div>

      {/* Render Selected View */}
      {viewMode === 'structured' ? (
        <StructuredCaseSheet onOpenFhir={onOpenFhir} />
      ) : (
        <div className="space-y-6">
          {/* AYUSH Prakriti Radar Card when enabled */}
          {enableAyushMode && <PrakritiRadar />}

          {/* Drug Interaction Warning Banner if detected */}
          {detectedInteractions.length > 0 && (
            <div className="bg-amber-950/80 border-2 border-amber-500 rounded-3xl p-5 text-amber-200 shadow-2xl space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2 font-black text-amber-300 text-sm">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span>Drug Interaction Alert Flagged</span>
              </div>
              {detectedInteractions.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-950/90 border border-amber-500/40 text-xs space-y-1">
                  <span className="font-extrabold text-amber-300">
                    ⚠️ Potential Conflict: {item.pair}
                  </span>
                  <p className="text-slate-300 leading-relaxed">{item.note}</p>
                </div>
              ))}
            </div>
          )}

          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-teal-400 bg-teal-950/80 px-2.5 py-0.5 rounded border border-teal-500/30">
                    AI Drafted • Physician Verified
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">ID: SAARTHI-SUMMARY-2026</span>
                </div>
                <h2 className="text-xl font-extrabold text-white mt-1 flex items-center gap-2">
                  <Stethoscope className="w-6 h-6 text-teal-400" />
                  AI-GENERATED CLINICAL CASE SUMMARY
                </h2>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowDiffView(!showDiffView)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                    showDiffView
                      ? 'bg-teal-500/20 text-teal-300 border-teal-500'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  <Diff className="w-3.5 h-3.5" />
                  <span>{showDiffView ? 'Hide Diff' : 'View Physician Diffs'}</span>
                </button>

                <button
                  onClick={acceptAllFields}
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs transition-all shadow-md flex items-center gap-1.5"
                >
                  <CheckCheck className="w-4 h-4" />
                  <span>Accept All Drafts</span>
                </button>
              </div>
            </div>

            {/* Case Summary Sections */}
            <div className="space-y-4">
              {fieldsList.map((key) => {
                const field = doctorSummary[key];
                if (!field) return null;
                const isEditing = editingKey === key;

                return (
                  <div
                    key={key}
                    className={`p-4 rounded-2xl border transition-all ${
                      field.status === 'accepted'
                        ? 'bg-slate-950/60 border-teal-500/30'
                        : field.status === 'edited'
                          ? 'bg-amber-950/20 border-amber-500/40'
                          : 'bg-slate-800/60 border-slate-700/80 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-extrabold text-teal-300 flex items-center gap-1">
                          <span>{field.label}</span>
                          {field.status === 'accepted' && <span className="text-teal-400 font-bold">✓</span>}
                        </h3>
                        <span className="text-[10px] bg-slate-800 text-slate-300 font-semibold px-2 py-0.5 rounded border border-slate-700">
                          Source: {field.source}
                        </span>
                        <span className="text-[10px] bg-emerald-950/80 text-emerald-300 font-semibold px-2 py-0.5 rounded border border-emerald-500/40 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-emerald-400" />
                          {field.confidence}% Confidence
                        </span>
                      </div>

                      <div className="flex items-center space-x-1.5">
                        {field.status === 'accepted' && (
                          <button
                            onClick={() => acceptField(key)}
                            className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/40 flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" /> Signed Off
                          </button>
                        )}
                        {field.status === 'edited' && (
                          <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-500/40">
                            Edited by Doctor
                          </span>
                        )}

                        {!isEditing ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => acceptField(key)}
                              className="px-2.5 py-1 rounded-lg bg-teal-950 hover:bg-teal-900 text-teal-300 font-bold text-xs border border-teal-500/40 transition-colors flex items-center gap-1"
                              title="Accept field"
                            >
                              <Check className="w-3.5 h-3.5" /> Accept
                            </button>
                            <button
                              onClick={() => handleStartEdit(key)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                              title="Edit section"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleSaveEdit(key)}
                            className="px-2.5 py-1 rounded-lg bg-teal-500 text-slate-950 font-bold text-xs hover:bg-teal-400 transition-colors flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" /> Save
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Field Value OR Edit Textarea */}
                    {!isEditing ? (
                      <div>
                        <p className="text-xs text-slate-200 leading-relaxed font-medium">
                          {field.value}
                        </p>

                        {/* Diff View Animation Banner if toggled */}
                        {showDiffView && field.value !== field.originalValue && (
                          <div className="mt-2 p-2 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-1">
                            <p className="text-red-400 line-through">- AI Draft: {field.originalValue}</p>
                            <p className="text-emerald-400">+ Doctor Final: {field.value}</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <textarea
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        rows={2}
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-teal-500 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-400"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Physician Trust Tagline Footer */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-teal-400 font-bold">
                <ShieldCheck className="w-4 h-4" /> AI Transparency & Audit Trail Active
              </span>
              <span className="font-semibold text-slate-300">“AI drafts. Doctor decides.”</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
