import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSvg } from './QRCodeSvg';
import { QrCode, Stethoscope, ShieldCheck, Check, ArrowRight } from 'lucide-react';

export const ThreeEntrancesSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Three tailored entrances.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Saarthi gives every person the right interface: a simple QR journey for patients, a review workspace for clinicians, and an operations view for administrators.
          </p>
        </div>

        {/* Three Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: PATIENT ENTRY */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl flex flex-col justify-between space-y-6 hover:shadow-2xl hover:border-teal-300 transition-all">
            <div className="space-y-5">
              {/* Icon & Badge Header */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100 shadow-sm">
                  <QrCode className="w-6 h-6 text-teal-600" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-200">
                  PATIENT ENTRY
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900">Start with a QR code</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Patients do not need a password or an app. Scan the session QR code to open guided story capture on their phone.
                </p>
              </div>

              {/* Inner Real QR Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center space-x-4">
                <QRCodeSvg
                  value={typeof window !== 'undefined' ? `${window.location.origin}/login/patient?token=SA-2841` : undefined}
                  size={70}
                  showCenterBadge={false}
                  onClick={() => navigate('/login/patient')}
                />
                <div>
                  <h4 className="text-xs font-black text-slate-900">Demo Patient Session</h4>
                  <p className="text-[11px] text-teal-700 font-mono font-bold mt-0.5">
                    SA-2841 • Click to open QR portal
                  </p>
                </div>
              </div>
            </div>

            {/* Button CTA */}
            <button
              onClick={() => navigate('/login/patient')}
              className="w-full py-4 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2 group"
            >
              <span>Open patient experience</span>
              <ArrowRight className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 2: CLINICIAN ACCESS */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl flex flex-col justify-between space-y-6 hover:shadow-2xl hover:border-teal-300 transition-all">
            <div className="space-y-5">
              {/* Icon & Badge Header */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100 shadow-sm">
                  <Stethoscope className="w-6 h-6 text-teal-600" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-sky-800 bg-sky-100/80 px-3 py-1 rounded-full border border-sky-200">
                  CLINICIAN ACCESS
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900">Review the story</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Doctors sign in to see an editable summary, documents, clinical signals, and the original conversation.
                </p>
              </div>

              {/* Checklist */}
              <ul className="space-y-2.5 text-xs font-bold text-slate-700 pt-2">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Review & verify summary</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Edit clinical documentation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Start with context</span>
                </li>
              </ul>
            </div>

            {/* Button CTA */}
            <button
              onClick={() => navigate('/login/doctor')}
              className="w-full py-4 px-6 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 font-extrabold text-xs border border-slate-300 shadow-sm transition-all flex items-center justify-center gap-2 group"
            >
              <span>Clinician login</span>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 3: ADMIN ACCESS */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl flex flex-col justify-between space-y-6 hover:shadow-2xl hover:border-teal-300 transition-all">
            <div className="space-y-5">
              {/* Icon & Badge Header */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100 shadow-sm">
                  <ShieldCheck className="w-6 h-6 text-teal-600" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-200">
                  ADMIN ACCESS
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900">Manage the service</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Hospital administrators create sessions, monitor queues, and manage connected devices.
                </p>
              </div>

              {/* Checklist */}
              <ul className="space-y-2.5 text-xs font-bold text-slate-700 pt-2">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Create patient QR sessions</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Monitor active cases</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Manage kiosks & tablets</span>
                </li>
              </ul>
            </div>

            {/* Button CTA */}
            <button
              onClick={() => navigate('/login/admin')}
              className="w-full py-4 px-6 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 font-extrabold text-xs border border-slate-300 shadow-sm transition-all flex items-center justify-center gap-2 group"
            >
              <span>Open admin workspace</span>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

        {/* Bottom Security Note */}
        <div className="text-center text-xs text-slate-500 font-medium flex items-center justify-center gap-2 pt-4">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Prototype access flow — authentication and hospital identity integration are planned.</span>
        </div>
      </div>
    </section>
  );
};
