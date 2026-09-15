import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemoState } from '../context/DemoStateContext';
import { OCRUploader } from '../components/OCRUploader';
import { OCRResult } from '../components/OCRResult';
import { LanguageSelector } from '../components/LanguageSelector';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const translations = {
  ta: {
    headerTitle: 'மருந்துச் சீட்டு & ஆய்வக OCR இயந்திரம்',
    headerSubtitle: 'ஆவண தகவல் பகுப்பாய்வு தொகுதி',
    reviewBtn: 'அடுத்தது: தகவலை சரிபார்க்கவும்',
  },
  en: {
    headerTitle: 'Prescription & Lab OCR Engine',
    headerSubtitle: 'Document Intelligence Module',
    reviewBtn: 'Review Intake Summary',
  },
  hi: {
    headerTitle: 'पर्चे और लैब टेस्ट OCR इंजन',
    headerSubtitle: 'दस्तावेज़ बुद्धिमत्ता मॉड्यूल',
    reviewBtn: 'अगला: सारांश की समीक्षा करें',
  },
};

interface PatientDocumentsPageProps {
  onReviewSummary?: () => void;
}

export const PatientDocumentsPage: React.FC<PatientDocumentsPageProps> = ({ onReviewSummary }) => {
  const navigate = useNavigate();
  const { language } = useDemoState();
  const t = translations[language] || translations.en;

  const handleReviewClick = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (onReviewSummary) {
      onReviewSummary();
    }
    navigate('/patient/review');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 py-3 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/patient/interview')}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-extrabold text-base text-slate-900 tracking-tight">{t.headerTitle}</h1>
              <p className="text-xs text-slate-500 font-semibold">{t.headerSubtitle}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <LanguageSelector />
            <button
              onClick={handleReviewClick}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow transition-all flex items-center gap-1.5"
            >
              <span>{t.reviewBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto w-full p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 my-auto">
        <OCRUploader />
        <OCRResult />
      </main>
    </div>
  );
};
