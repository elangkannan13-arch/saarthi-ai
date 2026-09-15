import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemoState } from '../context/DemoStateContext';
import { PatientAvatar } from './PatientAvatar';
import { VoiceWaveform } from './VoiceWaveform';
import { SocratesTracker } from './SocratesTracker';
import { LanguageSelector } from './LanguageSelector';
import { Activity, ArrowRight, FileText } from 'lucide-react';

const translations = {
  ta: {
    headerTitle: 'சாரதி AI',
    headerProgress: 'மருத்துவ நேர்காணல் — ',
    headerProgressComplete: '% முடிந்தது',
    nextOcrBtn: 'அடுத்தது: மருந்துச் சீட்டு OCR',
    liveTranscriptTitle: 'நேரடி உரையாடல் பதிவு',
    aiSenderLabel: 'சாரதி AI',
    patientSenderLabel: 'நோயாளி',
    uploadBoxTitle: 'பழைய மருந்துச் சீட்டுகள் அல்லது ஆய்வக அறிக்கைகள் உள்ளதா?',
    uploadBoxDesc: 'மருந்துகள் மற்றும் அளவுகளை தானாக டிஜிட்டல் செய்ய மருந்துச் சீட்டு படத்தை பதிவேற்றவும்.',
    uploadBtn: '📷 மருந்துச் சீட்டைப் பதிவேற்றவும்',
  },
  en: {
    headerTitle: 'Saarthi.AI',
    headerProgress: 'Clinical Interview — ',
    headerProgressComplete: '% Complete',
    nextOcrBtn: 'Next: Prescription OCR',
    liveTranscriptTitle: 'Live Conversation Transcript',
    aiSenderLabel: 'Saarthi AI',
    patientSenderLabel: 'Patient',
    uploadBoxTitle: 'Have old prescriptions or lab tests?',
    uploadBoxDesc: 'Upload handwritten prescriptions or lab reports to digitize dosages automatically via AI OCR.',
    uploadBtn: '📷 Upload Prescription / Lab Report',
  },
  hi: {
    headerTitle: 'सारथी AI',
    headerProgress: 'क्लिनिकल साक्षात्कार — ',
    headerProgressComplete: '% पूर्ण',
    nextOcrBtn: 'अगला: पर्ची OCR',
    liveTranscriptTitle: 'लाइव बातचीत की प्रतिलिपि',
    aiSenderLabel: 'सारथी AI',
    patientSenderLabel: 'मरीज़',
    uploadBoxTitle: 'क्या आपके पास पुराने पर्चे या लैब रिपोर्ट हैं?',
    uploadBoxDesc: 'दवाइयों की खुराक को स्वचालित रूप से डिजिटल करने के लिए पर्चा अपलोड करें।',
    uploadBtn: '📷 पर्ची अपलोड करें',
  },
};

interface PatientInterviewViewProps {
  onNextOcr?: () => void;
}

export const PatientInterviewView: React.FC<PatientInterviewViewProps> = ({ onNextOcr }) => {
  const navigate = useNavigate();
  const { interviewProgress, transcript, sendPatientMessage, language } = useDemoState();

  const t = translations[language] || translations.en;

  const handleNextOcrClick = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (onNextOcr) {
      onNextOcr();
    }
    navigate('/patient/documents');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans animate-fadeIn">
      {/* Kiosk Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 py-3 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-2xl bg-teal-600 flex items-center justify-center text-white font-bold shadow">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-base text-slate-900 tracking-tight">{t.headerTitle}</h1>
              <p className="text-xs text-slate-500 font-semibold">
                {t.headerProgress}{interviewProgress}{t.headerProgressComplete}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <LanguageSelector />
            <button
              onClick={handleNextOcrClick}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow transition-all flex items-center gap-1.5"
            >
              <span>{t.nextOcrBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5 mt-2">
          <div
            className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full transition-all duration-500"
            style={{ width: `${interviewProgress}%` }}
          ></div>
        </div>
      </header>

      {/* Main Kiosk Content */}
      <main className="max-w-6xl mx-auto w-full p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto">
        {/* Left Column: Avatar & Live Speech Controls */}
        <div className="lg:col-span-7 space-y-6">
          <PatientAvatar isListening={true} />

          <VoiceWaveform onSendMessage={sendPatientMessage} />

          {/* Live Transcript Log Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-teal-600" />
              {t.liveTranscriptTitle}
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {transcript.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-[85%] ${
                    msg.sender === 'ai'
                      ? 'bg-teal-50 border border-teal-200 text-slate-800 ml-0 font-medium'
                      : 'bg-slate-900 text-white mr-0 ml-auto font-semibold shadow'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 opacity-75 text-[10px]">
                    <span>{msg.sender === 'ai' ? t.aiSenderLabel : t.patientSenderLabel}</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: SOCRATES Tracker & Navigation */}
        <div className="lg:col-span-5 space-y-6">
          <SocratesTracker />

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-4">
            <h4 className="font-extrabold text-sm text-slate-900">{t.uploadBoxTitle}</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t.uploadBoxDesc}
            </p>
            <button
              onClick={handleNextOcrClick}
              className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-colors flex items-center justify-center gap-2 shadow"
            >
              <FileText className="w-4 h-4 text-teal-400" />
              <span>{t.uploadBtn}</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
