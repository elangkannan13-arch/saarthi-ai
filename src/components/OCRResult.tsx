import React from 'react';
import { useDemoState } from '../context/DemoStateContext';
import { Pill, ShieldAlert, Sparkles, FileSpreadsheet } from 'lucide-react';

const translations = {
  ta: {
    badge: 'கட்டமைக்கப்பட்ட முடிவு',
    title: 'AI தகவல் பிரித்தெடுத்தல் முடிவு',
    docConfidence: 'ஆவணத்தின் நம்பகத்தன்மை',
    freqLabel: 'அளவு',
    durationLabel: 'கால அளவு',
    ocrConfidence: 'OCR நம்பகத்தன்மை',
    warningTitle: 'மருத்துவர் சரிபார்ப்பு அவசியம்: ',
    warningBody: 'OCR ஆவணங்களில் இருந்து வரைவுகளை மட்டுமே பிரித்தெடுக்கிறது. இறுதி மருந்து சரிபார்ப்பு மருத்துவச்சி மூலம் செய்யப்பட வேண்டும்.',
    medFrequencyMap: {
      '1-0-1 (After meals)': '1-0-1 (உணவுக்குப் பின்)',
      '1-0-0 (Morning)': '1-0-0 (காலை)',
      'As needed': 'தேவைப்படும் போது (SOS)',
      '0-0-1 (Night)': '0-0-1 (இரவு)',
      '1-0-1 (BD)': '1-0-1 (இருவேளை)',
      '1-1-1 (TDS)': '1-1-1 (மூன்று வேளை)',
      '1-0-0 (Before meals)': '1-0-0 (உணவுக்கு முன்)',
    } as Record<string, string>,
    medDurationMap: {
      '5 Days': '5 நாட்கள்',
      'Continuous': 'தொடர்ச்சியாக',
      'Emergency': 'அவசர பயன்பாடு',
      '30 Days': '30 நாட்கள்',
      '15 Days': '15 நாட்கள்',
      '3 Days': '3 நாட்கள்',
    } as Record<string, string>,
  },
  en: {
    badge: 'Structured Output',
    title: 'AI EXTRACTION RESULT',
    docConfidence: 'Document Confidence',
    freqLabel: 'Frequency',
    durationLabel: 'Duration',
    ocrConfidence: 'OCR confidence',
    warningTitle: 'Doctor verification required: ',
    warningBody: 'OCR extracts drafts from documents. Final prescription verification and clinical sign-off must be performed by the treating physician.',
    medFrequencyMap: {} as Record<string, string>,
    medDurationMap: {} as Record<string, string>,
  },
  hi: {
    badge: 'संरचित परिणाम',
    title: 'AI निष्कर्षण परिणाम',
    docConfidence: 'दस्तावेज़ विश्वसनीयता',
    freqLabel: 'खुराक/समय',
    durationLabel: 'अवधि',
    ocrConfidence: 'OCR विश्वसनीयता',
    warningTitle: 'डॉक्टर सत्यापन आवश्यक: ',
    warningBody: 'OCR दस्तावेज़ों से केवल ड्राफ्ट निकालता है। अंतिम पर्चे का सत्यापन डॉक्टर द्वारा किया जाना चाहिए।',
    medFrequencyMap: {
      '1-0-1 (After meals)': '1-0-1 (खाने के बाद)',
      '1-0-0 (Morning)': '1-0-0 (सुबह)',
      'As needed': 'आवश्यकतानुसार (SOS)',
      '0-0-1 (Night)': '0-0-1 (रात)',
      '1-0-1 (BD)': '1-0-1 (दो बार)',
      '1-1-1 (TDS)': '1-1-1 (तीन बार)',
      '1-0-0 (Before meals)': '1-0-0 (खाने से पहले)',
    } as Record<string, string>,
    medDurationMap: {
      '5 Days': '5 दिन',
      'Continuous': 'लगातार',
      'Emergency': 'आपातकालीन',
      '30 Days': '30 दिन',
      '15 Days': '15 दिन',
      '3 Days': '3 दिन',
    } as Record<string, string>,
  },
};

export const OCRResult: React.FC = () => {
  const { ocrDocument, language } = useDemoState();
  const t = translations[language] || translations.en;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
            {t.badge}
          </span>
          <h3 className="text-lg font-extrabold text-slate-900 mt-1 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-teal-600" />
            {t.title}
          </h3>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-400">{t.docConfidence}</span>
          <p className="text-base font-black text-emerald-600">{ocrDocument.overallConfidence}%</p>
        </div>
      </div>

      {/* Extracted Medication Table */}
      <div className="space-y-3">
        {ocrDocument.extractedMeds.map((med) => {
          const displayFreq = t.medFrequencyMap[med.frequency] || med.frequency;
          const displayDur = t.medDurationMap[med.duration] || med.duration;

          return (
            <div
              key={med.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all hover:bg-teal-50/30 hover:border-teal-200"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2.5 rounded-xl bg-teal-100 text-teal-700 font-bold shrink-0">
                  <Pill className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    {med.name}
                    <span className="text-xs font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {med.dosage}
                    </span>
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-600 font-medium">
                    <span>{t.freqLabel}: {displayFreq}</span>
                    <span>•</span>
                    <span>{t.durationLabel}: {displayDur}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  {med.confidence}% {t.ocrConfidence}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mandatory Safety UX Disclaimer */}
      <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2.5">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
        <div>
          <span className="font-extrabold">{t.warningTitle} </span>
          <span>{t.warningBody}</span>
        </div>
      </div>
    </div>
  );
};
