import React from 'react';
import { useDemoState } from '../context/DemoStateContext';
import { CheckCircle2, Circle, Activity, ShieldCheck } from 'lucide-react';

const translations = {
  ta: {
    title: 'SOCRATES மருத்துவ கண்காணிப்பு',
    subtitle: 'மருத்துவ வரலாறு எடுக்கும் கட்டமைப்பு',
    completeness: 'வரலாறு நிறைவுத்தன்மை',
    historyCaptured: 'மருத்துவ வரலாறு பதிவு செய்யப்பட்டது',
    noDiagnosisNotice: 'நோயறிதல் தயாரிக்கப்படவில்லை. மருத்துவர் பார்வைக்காக.',
    confidence: 'நம்பகத்தன்மை',
    pending: 'பதிவு செய்ய காத்திருக்கிறது...',
    labels: {
      site: 'இடம் (Site)',
      onset: 'ஆரம்பம் (Onset)',
      character: 'தன்மைகள் (Character)',
      radiation: 'பரவல் (Radiation)',
      associated: 'தொடர்புடையவை (Associated)',
      timing: 'நேரம் (Timing)',
      exacerbating: 'அதிகரிக்கும் காரணி (Exacerbating)',
      severity: 'தீவிரம் (Severity)',
    } as Record<string, string>,
  },
  en: {
    title: 'SOCRATES Clinical Interview Tracker',
    subtitle: 'Standardized physician history-taking framework',
    completeness: 'History Completeness',
    historyCaptured: 'Clinical history captured',
    noDiagnosisNotice: 'No diagnosis generated. For physician review.',
    confidence: 'confidence',
    pending: 'Pending capture...',
    labels: {
      site: 'Site',
      onset: 'Onset',
      character: 'Character',
      radiation: 'Radiation',
      associated: 'Associated Symptoms',
      timing: 'Timing',
      exacerbating: 'Exacerbating/Relieving',
      severity: 'Severity',
    } as Record<string, string>,
  },
  hi: {
    title: 'SOCRATES क्लिनिकल ट्रैकर',
    subtitle: 'मानकीकृत चिकित्सा इतिहास संरचना',
    completeness: 'इतिहास पूर्णता',
    historyCaptured: 'क्लिनिकल इतिहास दर्ज किया गया',
    noDiagnosisNotice: 'कोई निदान उत्पन्न नहीं हुआ। केवल डॉक्टर समीक्षा के लिए।',
    confidence: 'विश्वसनीयता',
    pending: 'दर्ज करने की प्रतीक्षा...',
    labels: {
      site: 'स्थान (Site)',
      onset: 'शुरुआत (Onset)',
      character: 'प्रकृति (Character)',
      radiation: 'फैलाव (Radiation)',
      associated: 'संबंधित लक्षण (Associated)',
      timing: 'समय (Timing)',
      exacerbating: 'बढ़ाने वाले कारण (Exacerbating)',
      severity: 'गंभीरता (Severity)',
    } as Record<string, string>,
  },
};

export const SocratesTracker: React.FC = () => {
  const { socrates, interviewProgress, language } = useDemoState();
  const t = translations[language] || translations.en;

  const socratesItems = [
    { key: 'site', label: t.labels.site, letter: 'S', data: socrates.site },
    { key: 'onset', label: t.labels.onset, letter: 'O', data: socrates.onset },
    { key: 'character', label: t.labels.character, letter: 'C', data: socrates.character },
    { key: 'radiation', label: t.labels.radiation, letter: 'R', data: socrates.radiation },
    { key: 'associated', label: t.labels.associated, letter: 'A', data: socrates.associated },
    { key: 'timing', label: t.labels.timing, letter: 'T', data: socrates.timing },
    { key: 'exacerbating', label: t.labels.exacerbating, letter: 'E', data: socrates.exacerbating },
    { key: 'severity', label: t.labels.severity, letter: 'S', data: socrates.severity },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal-600" />
            {t.title}
          </h3>
          <p className="text-xs text-slate-500">{t.subtitle}</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-500 font-medium">{t.completeness}</span>
          <p className="text-lg font-black text-teal-700">{interviewProgress}%</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded-full transition-all duration-500"
          style={{ width: `${interviewProgress}%` }}
        ></div>
      </div>

      {/* SOCRATES Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socratesItems.map((item) => (
          <div
            key={item.key}
            className={`p-3 rounded-2xl border transition-all flex items-start space-x-3 ${
              item.data.status
                ? 'bg-teal-50/60 border-teal-200 text-teal-950'
                : 'bg-slate-50 border-slate-200 text-slate-400 opacity-75'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                item.data.status ? 'bg-teal-600 text-white shadow-sm' : 'bg-slate-200 text-slate-500'
              }`}
            >
              {item.letter}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  {item.label}
                  {item.data.status ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-slate-300 inline" />
                  )}
                </span>
                {item.data.status && (
                  <span className="text-[10px] bg-teal-100 text-teal-800 font-semibold px-1.5 py-0.2 rounded">
                    {item.data.confidence}% {t.confidence}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 truncate mt-0.5 font-medium">
                {item.data.status ? item.data.val : t.pending}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Important Safety Label */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5 text-teal-700 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" /> {t.historyCaptured}
        </span>
        <span className="italic">{t.noDiagnosisNotice}</span>
      </div>
    </div>
  );
};
