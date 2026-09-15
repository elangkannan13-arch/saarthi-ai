import React from 'react';
import { useDemoState } from '../context/DemoStateContext';
import { Sparkles, Activity } from 'lucide-react';

interface PatientAvatarProps {
  isListening?: boolean;
}

const avatarTextMap = {
  ta: 'வணக்கம். நான் சாரதி, உங்கள் மருத்துவ உதவியாளா். உங்கள் மருத்துவரைச் சந்திப்பதற்கு முன் உங்கள் உடல்நலப் பிரச்சனைகளைப் பதிவு செய்ய உதவுவேன்.',
  en: "Hello. I'm Saarthi, your digital clinical co-pilot. I'll help you structure your medical history before you meet your doctor.",
  hi: 'नमस्ते। मैं सारथी हूँ, आपका डिजिटल मेडिकल सहायक। डॉक्टर से मिलने से पहले आपके लक्षणों को दर्ज करने में मदद करूँगा।',
};

const avatarTitleMap = {
  ta: 'சாரதி மருத்துவ உதவியாளர்',
  en: 'Saarthi Clinical Assistant',
  hi: 'सारथी क्लिनिकल सहायक',
};

const badgeActiveMap = {
  ta: 'AI நேர்காணல் இயங்குகிறது',
  en: 'AI Interview Active',
  hi: 'AI साक्षात्कार सक्रिय',
};

const languageLabelMap = {
  ta: 'தமிழ் (Tamil)',
  en: 'English',
  hi: 'हिन्दी (Hindi)',
};

const confidenceMap = {
  ta: '96% AI நம்பகத்தன்மை',
  en: '96% AI Confidence',
  hi: '96% AI विश्वसनीयता',
};

export const PatientAvatar: React.FC<PatientAvatarProps> = ({ isListening = true }) => {
  const { language } = useDemoState();

  return (
    <div className="flex flex-col items-center text-center p-6 bg-gradient-to-b from-teal-500/10 via-white to-slate-50 rounded-3xl border border-teal-500/20 shadow-xl relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Outer Pulse Ring */}
      <div className="relative mb-4">
        {isListening && (
          <>
            <div className="absolute inset-0 rounded-full bg-teal-500/20 animate-ping"></div>
            <div className="absolute -inset-3 rounded-full border border-teal-400/40 animate-pulse"></div>
          </>
        )}
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-teal-600 via-teal-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-600/30 relative z-10">
          <Activity className="w-12 h-12 text-white animate-pulse" />
          <div className="absolute bottom-0 right-0 w-7 h-7 bg-amber-400 rounded-full border-2 border-white flex items-center justify-center shadow">
            <Sparkles className="w-4 h-4 text-slate-950" />
          </div>
        </div>
      </div>

      {/* Avatar Speech Text */}
      <div className="max-w-md">
        <h3 className="font-extrabold text-lg text-slate-900 mb-1 flex items-center justify-center gap-2">
          {avatarTitleMap[language] || avatarTitleMap.en}
          <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded-full border border-teal-300">
            AI Co-Pilot
          </span>
        </h3>
        <p className="text-slate-700 text-sm font-medium leading-relaxed bg-white/80 p-3 rounded-2xl border border-slate-200 shadow-sm">
          “{avatarTextMap[language] || avatarTextMap.en}”
        </p>
      </div>

      {/* Status Badges */}
      <div className="mt-4 flex items-center justify-center gap-3 text-xs">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-medium">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
          <span>{badgeActiveMap[language] || badgeActiveMap.en}</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-medium">
          <span>{languageLabelMap[language] || languageLabelMap.en}</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
          <span>{confidenceMap[language] || confidenceMap.en}</span>
        </div>
      </div>
    </div>
  );
};
