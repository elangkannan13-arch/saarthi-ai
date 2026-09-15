import React, { useState } from 'react';
import { useDemoState, type DoctorSummary } from '../context/DemoStateContext';
import { FileCode, CheckCheck, Save, Sparkles, Check, AlertCircle, ShieldCheck } from 'lucide-react';

interface StructuredCaseSheetProps {
  onOpenFhir?: () => void;
}

export const StructuredCaseSheet: React.FC<StructuredCaseSheetProps> = ({ onOpenFhir }) => {
  const {
    patientInfo,
    doctorSummary,
    updateDoctorField,
    acceptAllFields,
    isEmrFinalized,
    emrConfirmationId,
    finalizeToEmr,
  } = useDemoState();

  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
            onClick={acceptAllFields}
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

      {/* Structured Case Sheet Card */}
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

        <div className="space-y-5">
          {sectionsConfig.map((item) => {
            const field = doctorSummary[item.key];
            const fieldValue = field?.value || '';

            return (
              <div key={item.key} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight">
                    {item.title}
                  </label>

                  {/* Badges matching the image */}
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
