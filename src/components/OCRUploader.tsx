import React, { useState, useRef } from 'react';
import { useDemoState } from '../context/DemoStateContext';
import { UploadCloud, FileText, Scan, CheckCircle, RefreshCw, FilePlus } from 'lucide-react';

const translations = {
  ta: {
    badge: 'ஆப்டிகல் கேரக்டர் அங்கீகாரம் (OCR) இயந்திரம்',
    title: '“உங்கள் மருந்துச் சீட்டை கணினி படிக்க வேண்டிய அவசியமில்லை.”',
    subtitle: 'மருந்துகள் மற்றும் அளவுகளை டிஜிட்டல் செய்ய ஏதேனும் மருந்துச் சீட்டு அல்லது அறிக்கையைப் பதிவேற்றவும்.',
    dragTitle: 'ஆவணத்தைப் பதிவேற்ற இங்கே கிளிக் செய்யவும் அல்லது இழுத்து விடவும்',
    dragSubtitle: 'JPG, PNG, PDF வடிவங்களை ஆதரிக்கிறது (உங்கள் சாதனத்திலிருந்து தேர்ந்தெடுக்கவும்)',
    browseBtn: '📁 கோப்பைத் தேர்ந்தெடுக்கவும்',
    sampleTitle: 'அல்லது மாதிரி மருத்துவமனை ஆவணத்தை சோதிக்கவும்:',
    scanning: 'ஸ்கேனிங் லேசர் இயங்குகிறது...',
    digitized: 'டிஜிட்டல் செய்யப்பட்டது',
    confidence: 'நம்பகத்தன்மை',
    sampleCardio: 'கார்டியாலஜி OPD மருந்துச்சீட்டு',
    sampleEcg: 'ECG & லிபிட் ஆய்வக அறிக்கை',
    sampleAyush: 'ஆயுர்வேத சிகிச்சை குறிப்பு',
  },
  en: {
    badge: 'Optical Character Recognition (OCR) Engine',
    title: '“Your prescription doesn\'t need to be readable to a computer.”',
    subtitle: 'Upload any real prescription photo or document to digitize medications & dosages.',
    dragTitle: 'Click to Browse or Drag & Drop Real Document / Photo',
    dragSubtitle: 'Supports JPG, PNG, PDF (Select any file from your device)',
    browseBtn: 'Browse Local File',
    sampleTitle: 'Or test with a sample hospital document:',
    scanning: 'Scanning Laser Active...',
    digitized: 'Digitized',
    confidence: 'Confidence',
    sampleCardio: 'Cardiology OPD Prescription',
    sampleEcg: 'ECG & Lipid Diagnostic Report',
    sampleAyush: 'Ayurvedic Clinical Note',
  },
  hi: {
    badge: 'ऑप्टिकल कैरेक्टर रिकग्निशन (OCR) इंजन',
    title: '“आपके नुस्खे को कंप्यूटर द्वारा पढ़े जाने की आवश्यकता नहीं है।”',
    subtitle: 'दवाइयों को डिजिटल बनाने के लिए कोई भी पर्ची या दस्तावेज़ अपलोड करें।',
    dragTitle: 'स्थानीय फ़ाइल ब्राउज़ करें या दस्तावेज़ यहाँ खींचें और छोड़ें',
    dragSubtitle: 'JPG, PNG, PDF समर्थित (अपने डिवाइस से फ़ाइल चुनें)',
    browseBtn: '📁 फ़ाइल चुनें',
    sampleTitle: 'या नमूना अस्पताल दस्तावेज़ के साथ परीक्षण करें:',
    scanning: 'स्कैनिंग लेजर सक्रिय...',
    digitized: 'डिजिटल किया गया',
    confidence: 'विश्वसनीयता',
    sampleCardio: 'कार्डियोलॉजी ओपीडी पर्ची',
    sampleEcg: 'ईसीजी और लिपिड रिपोर्ट',
    sampleAyush: 'आयुर्वेदिक क्लिनिकल नोट',
  },
};

export const OCRUploader: React.FC = () => {
  const { ocrDocument, simulateOcrUpload, language } = useDemoState();
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = translations[language] || translations.en;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const processSelectedFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      simulateOcrUpload(file.name, dataUrl, file);
    };
    reader.readAsDataURL(file);
  };

  const samplePrescriptions = [
    { name: 'Apollo_Prescription_Cardiology.jpg', label: t.sampleCardio },
    { name: 'Fortis_Lab_ECG_Panel.pdf', label: t.sampleEcg },
    { name: 'Ayurvedic_Nadi_Clinical_Note.png', label: t.sampleAyush },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-6">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold mb-2">
          <Scan className="w-3.5 h-3.5" /> {t.badge}
        </div>
        <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
          {t.title}
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          {t.subtitle}
        </p>
      </div>

      {/* Hidden Real File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*,.pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload Drag & Drop Area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files?.[0];
          if (file) {
            processSelectedFile(file);
          }
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
          dragOver
            ? 'border-teal-500 bg-teal-50/80 scale-[1.02]'
            : 'border-slate-300 bg-slate-50 hover:bg-teal-50/40 hover:border-teal-500'
        }`}
      >
        <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-700 mx-auto flex items-center justify-center mb-3 shadow-inner">
          <UploadCloud className="w-7 h-7" />
        </div>
        <p className="text-sm font-black text-slate-900">
          {t.dragTitle}
        </p>
        <p className="text-xs text-slate-500 mt-1 font-medium">{t.dragSubtitle}</p>
        <button
          type="button"
          className="mt-3 px-4 py-1.5 rounded-xl bg-teal-600 text-white text-xs font-extrabold shadow hover:bg-teal-700 transition-colors inline-flex items-center gap-1.5"
        >
          <FilePlus className="w-4 h-4" /> {t.browseBtn}
        </button>
      </div>

      {/* Preset Demo Document Selectors */}
      <div>
        <p className="text-xs font-bold text-slate-600 mb-2">{t.sampleTitle}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {samplePrescriptions.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => simulateOcrUpload(sample.name)}
              className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-teal-50 hover:border-teal-300 border border-slate-200 text-left transition-all"
            >
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-teal-600 shrink-0" />
                <div className="truncate">
                  <p className="text-xs font-bold text-slate-800 truncate">{sample.label}</p>
                  <p className="text-[10px] text-slate-400 truncate">{sample.name}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Scanner Visualizer Box */}
      <div className="relative bg-slate-950 rounded-2xl p-4 overflow-hidden border border-slate-800">
        <div className="flex items-center justify-between text-xs text-slate-300 mb-3 border-b border-slate-800 pb-2">
          <span className="flex items-center gap-2 font-mono truncate max-w-[200px]">
            <FileText className="w-4 h-4 text-teal-400 shrink-0" />
            {ocrDocument.fileName}
          </span>
          <span className="text-teal-400 font-semibold flex items-center gap-1 shrink-0">
            {ocrDocument.isScanning ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> {t.scanning}
              </>
            ) : (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> {t.digitized} ({ocrDocument.overallConfidence}% {t.confidence})
              </>
            )}
          </span>
        </div>

        {/* Prescription Image Container with Scanner Beam */}
        <div className="relative rounded-xl overflow-hidden min-h-[160px] max-h-64 bg-slate-900 border border-slate-800 flex items-center justify-center">
          <img
            src={ocrDocument.fileUrl}
            alt="Prescription Document Preview"
            className={`w-full h-full object-contain transition-all duration-500 ${
              ocrDocument.isScanning ? 'brightness-75 contrast-125 filter blur-[1px]' : 'brightness-95'
            }`}
          />

          {/* Animated Laser Scanning Line */}
          {ocrDocument.isScanning && (
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-teal-400 via-emerald-300 to-amber-300 shadow-[0_0_20px_#2dd4bf] animate-laser-scan"></div>
          )}
        </div>
      </div>
    </div>
  );
};
