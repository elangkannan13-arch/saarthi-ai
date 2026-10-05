import React, { useState } from 'react';
import { useDemoState, type DoctorSummary } from '../context/DemoStateContext';
import { FileCode, CheckCheck, Save, Sparkles, Check, ShieldCheck, Edit3, CheckCircle2 } from 'lucide-react';

interface StructuredCaseSheetProps {
  onOpenFhir?: () => void;
}

export const StructuredCaseSheet: React.FC<StructuredCaseSheetProps> = ({ onOpenFhir }) => {
  const {
    patientInfo,
    doctorSummary,
    socrates,
    updateDoctorField,
    acceptField,
    acceptAllFields,
    isEmrFinalized,
    emrConfirmationId,
    finalizeToEmr,
  } = useDemoState();

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Editable local state for primary intake card
  const [editingPrimary, setEditingPrimary] = useState(false);
  const [primaryVerified, setPrimaryVerified] = useState(false);

  // Derived values strictly from live patient state
  const chiefComplaintText = doctorSummary.chiefComplaint.value.replace(/\s*\([^)]*\)/, '') || (socrates.site.status ? socrates.site.val : 'Awaiting patient input...');
  const durationText = socrates.onset.status ? socrates.onset.val : 'Awaiting patient input...';
  const severityText = socrates.severity.status ? socrates.severity : 'Awaiting patient input...';

  const [chiefComplaintInput, setChiefComplaintInput] = useState(chiefComplaintText);
  const [durationInput, setDurationInput] = useState(durationText);
  const [severityInput, setSeverityInput] = useState(severityText);

  const sectionsConfig: {
    key: keyof DoctorSummary;
    title: string;
    badgeText: string;
    badgeType: 'voice' | 'ocr' | 'history';
  }[] = [
    {
      key: 'chiefComplaint',
      title: 'Chief complaint',
      badgeText: 'High confidence · voice',
      badgeType: 'voice',
    },
    {
      key: 'hpi',
      title: 'History of present illness',
      badgeText: 'High confidence · voice',
      badgeType: 'voice',
    },
    {
      key: 'pastHistory',
      title: 'Past medical history',
      badgeText: 'High confidence · voice',
      badgeType: 'voice',
    },
    {
      key: 'medications',
      title: 'Drug & allergy history',
      badgeText: 'High confidence · voice',
      badgeType: 'voice',
    },
    {
      key: 'priorInvestigations',
      title: 'Prior investigations',
      badgeText: 'OCR · needs review',
      badgeType: 'ocr',
    },
  ];

  const handleFinalize = () => {
    finalizeToEmr();
    setToastMessage(`Saved to EMR successfully! ID: ${emrConfirmationId}`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleVerifyPrimary = () => {
    setPrimaryVerified(true);
    acceptField('chiefComplaint');
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Patient Header Bar matching Screenshot */}
      <div className="bg-[#f7f5f0] sm:bg-stone-100/90 border border-stone-200/80 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tracking-tight">
            {patientInfo.name}, {patientInfo.age} • {patientInfo.gender}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 flex flex-wrap items-center gap-2 font-medium">
            <span>{patientInfo.token || 'Token B-208'}</span>
            <span>•</span>
            <span className="text-teal-700 font-semibold">ABHA-linked</span>
            <span>•</span>
            <span>{patientInfo.opd || 'General Medicine OPD'}</span>
            <span>•</span>
            <span className="text-amber-800">{patientInfo.waited || 'Waited 6 min'}</span>
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          {onOpenFhir && (
            <button
              onClick={onOpenFhir}
              className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs sm:text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm flex items-center gap-1.5"
            >
              <FileCode className="w-4 h-4 text-slate-600" />
              <span>View FHIR bundle</span>
            </button>
          )}

          <button
            onClick={() => {
              acceptAllFields();
              setPrimaryVerified(true);
            }}
            className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs sm:text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm flex items-center gap-1.5"
          >
            <CheckCheck className="w-4 h-4 text-emerald-600" />
            <span>Accept all</span>
          </button>

          <button
            onClick={handleFinalize}
            className={`px-5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 ${
              isEmrFinalized
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-amber-600 hover:bg-amber-700 text-white'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>{isEmrFinalized ? 'Finalized to EMR ✓' : 'Save & finalize to EMR'}</span>
          </button>
        </div>
      </div>

      {/* Toast Banner on EMR Finalization */}
      {toastMessage && (
        <div className="bg-emerald-900 border border-emerald-600 text-emerald-100 p-4 rounded-xl flex items-center justify-between shadow-lg animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <Check className="w-5 h-5 text-emerald-400" />
            <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
          </div>
          <span className="text-[10px] bg-emerald-800 text-emerald-200 px-2.5 py-1 rounded font-mono">
            ABDM Sync Active
          </span>
        </div>
      )}

      {/* Primary Intake Structured Box (Chief Complaint, Duration, Severity, Status) */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <h3 className="font-extrabold text-sm text-slate-100 tracking-tight">
              Primary Intake Summary
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setEditingPrimary(!editingPrimary)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-700"
            >
              <Edit3 className="w-3.5 h-3.5 text-teal-400" />
              <span>{editingPrimary ? 'Done' : 'Edit'}</span>
            </button>
            <button
              onClick={handleVerifyPrimary}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                primaryVerified
                  ? 'bg-emerald-600 text-white'
                  : 'bg-teal-600 hover:bg-teal-500 text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{primaryVerified ? 'Verified ✓' : 'Verify'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-extrabold block mb-1">
              Chief Complaint
            </span>
            {editingPrimary ? (
              <input
                type="text"
                value={chiefComplaintInput}
                onChange={(e) => {
                  setChiefComplaintInput(e.target.value);
                  updateDoctorField('chiefComplaint', e.target.value);
                }}
                className="w-full bg-slate-900 border border-teal-500 text-white text-xs p-2 rounded-xl font-medium focus:outline-none"
              />
            ) : (
              <p className="text-base font-black text-white">{chiefComplaintInput || 'Headache'}</p>
            )}
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-extrabold block mb-1">
              Duration
            </span>
            {editingPrimary ? (
              <input
                type="text"
                value={durationInput}
                onChange={(e) => setDurationInput(e.target.value)}
                className="w-full bg-slate-900 border border-teal-500 text-white text-xs p-2 rounded-xl font-medium focus:outline-none"
              />
            ) : (
              <p className="text-base font-black text-teal-300">{durationInput || '3 days'}</p>
            )}
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-extrabold block mb-1">
              Severity
            </span>
            {editingPrimary ? (
              <input
                type="text"
                value={severityInput}
                onChange={(e) => setSeverityInput(e.target.value)}
                className="w-full bg-slate-900 border border-teal-500 text-white text-xs p-2 rounded-xl font-medium focus:outline-none"
              />
            ) : (
              <p className="text-base font-black text-amber-400">{severityInput || '6/10'}</p>
            )}
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-extrabold block mb-1">
              Status
            </span>
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${
                primaryVerified
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  primaryVerified ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
                }`}
              ></span>
              {primaryVerified ? 'Verified by Doctor ✓' : 'Awaiting Doctor Review'}
            </span>
          </div>
        </div>
      </div>

      {/* Structured Case Sheet Card with Per-Section Edit & Verify */}
      <div className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-7 shadow-sm space-y-6">
        <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
          <h2 className="text-lg font-serif font-extrabold text-slate-900">
            Structured case sheet
          </h2>
          <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            Physician Co-Pilot
          </span>
        </div>

        <div className="space-y-6">
          {sectionsConfig.map((item) => {
            const field = doctorSummary[item.key];
            const fieldValue = field?.value || '';
            const isAccepted = field?.status === 'accepted';

            return (
              <div key={item.key} className="space-y-2 bg-slate-50/50 p-4.5 rounded-2xl border border-slate-200/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">
                      {item.title}
                    </label>
                    {isAccepted && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {item.badgeType === 'ocr' ? (
                      <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/80 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        {item.badgeText}
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {item.badgeText}
                      </span>
                    )}

                    <button
                      onClick={() => acceptField(item.key)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 border shadow-xs ${
                        isAccepted
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white hover:bg-emerald-50 text-emerald-700 border-emerald-300'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{isAccepted ? 'Verified' : 'Verify'}</span>
                    </button>
                  </div>
                </div>

                {/* Editable Textarea with resize handle matching image */}
                <div className="relative">
                  <textarea
                    rows={item.key === 'hpi' ? 3 : 2}
                    value={fieldValue}
                    onChange={(e) => updateDoctorField(item.key, e.target.value)}
                    className="w-full p-3.5 sm:p-4 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm text-slate-800 font-normal leading-relaxed focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-400 transition-all shadow-inner resize-y"
                    placeholder={`Enter ${item.title.toLowerCase()}...`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Physician Sign-off Note */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5 font-medium text-slate-600">
            <ShieldCheck className="w-4 h-4 text-teal-600" /> Restricted to Doctor Dashboard • Physician Decision Active
          </span>
          <span className="font-medium text-slate-500 italic">“AI drafts. Doctor decides.”</span>
        </div>
      </div>
    </div>
  );
};
