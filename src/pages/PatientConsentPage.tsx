import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageSelector } from '../components/LanguageSelector';
import { ShieldCheck, Volume2, CheckCircle2, ArrowRight, XCircle, Clock } from 'lucide-react';

export const PatientConsentPage: React.FC = () => {
  const navigate = useNavigate();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [consentRecorded, setConsentRecorded] = useState(false);
  const [consentTimestamp, setConsentTimestamp] = useState('');

  const handleConsent = () => {
    const ts = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setConsentTimestamp(ts);
    setConsentRecorded(true);
    setTimeout(() => {
      navigate('/patient/interview');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col p-4 sm:p-8">
      <div className="max-w-2xl mx-auto w-full my-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-teal-600" />
            <h1 className="font-extrabold text-lg text-slate-900">Before We Begin</h1>
          </div>
          <LanguageSelector />
        </div>

        {/* Consent Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-xl font-black text-slate-900">Patient Privacy & Data Agreement</h2>
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                isPlayingAudio ? 'bg-amber-100 text-amber-800 animate-pulse' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Volume2 className="w-4 h-4 text-teal-600" />
              <span>{isPlayingAudio ? 'Playing Audio...' : 'Play Audio Explanation'}</span>
            </button>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            <div className="p-3.5 rounded-2xl bg-teal-50/60 border border-teal-200 text-slate-800 space-y-1">
              <span className="font-extrabold text-teal-900">1. What information is collected:</span>
              <p>Your voice answers about symptoms, past medical history, current medications, and uploaded prescription images.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-extrabold text-slate-900">2. Why & How it will be used:</span>
              <p>To draft a structured case summary for your attending doctor. Saarthi AI does NOT sell data or autonomously diagnose diseases.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-extrabold text-slate-900">3. Physician Review:</span>
              <p>Your doctor reviews, edits, and approves all information before adding it to your clinical record.</p>
            </div>
          </div>

          {/* Consent Status Notification */}
          {consentRecorded && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Consent recorded successfully!
              </span>
              <span className="flex items-center gap-1 text-slate-500 font-mono">
                <Clock className="w-3.5 h-3.5" /> Timestamp: {consentTimestamp}
              </span>
            </div>
          )}

          {/* Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <button
              onClick={handleConsent}
              className="py-4 px-6 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-black text-sm shadow-xl shadow-teal-600/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>I Understand & Consent</span>
            </button>

            <button
              onClick={() => navigate('/')}
              className="py-4 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm border border-slate-300 transition-colors flex items-center justify-center gap-2"
            >
              <XCircle className="w-5 h-5 text-slate-400" />
              <span>I Don't Consent</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
