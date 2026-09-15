import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDemoState, type LanguageType } from '../context/DemoStateContext';
import { LanguageSelector } from '../components/LanguageSelector';
import { QRCodeSvg } from '../components/QRCodeSvg';
import { PatientInterviewView } from '../components/PatientInterviewView';
import { PatientDocumentsPage } from './PatientDocumentsPage';
import { PatientReviewPage } from './PatientReviewPage';
import { Mic, ShieldCheck, Activity, Sparkles, User, Calendar, Globe, ArrowRight, ArrowLeft, CheckCircle2, Lock, FileText } from 'lucide-react';

const translations = {
  ta: {
    step1Title: '1. உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
    step1Subtitle: 'AI மருத்துவ உதவியாளருடன் பேசுவதற்கான மொழியைத் தேர்வுசெய்யவும்',
    step2Title: '2. தனியுரிமை மற்றும் சம்மதம்',
    step2Subtitle: 'தொடர்வதற்கு முன் உங்கள் மருத்துவத் தரவு சம்மதத்தை உறுதிப்படுத்தவும்',
    step3Title: '3. நோயாளி விவரங்களை உள்ளிடவும்',
    step3Subtitle: 'உங்கள் பெயர், வயது மற்றும் பாலினத்தை பதிவு செய்யவும்',
    step4Title: '4. AI நேர்காணல் தயார்',
    step4Subtitle: 'உங்கள் அறிகுறிகளை பதிவு செய்ய AI நேர்காணலைத் தொடங்கவும்',
    nameLabel: 'நோயாளி பெயர் (Full Name)',
    namePlaceholder: 'எ.கா. கார்த்திக் சுப்ரமணியன்',
    ageLabel: 'வயது (Age)',
    agePlaceholder: 'எ.கா. 42',
    genderLabel: 'பாலினம் (Gender)',
    male: 'ஆண் (Male)',
    female: 'பெண் (Female)',
    other: 'இதர (Other)',
    nextBtn: 'அடுத்து தொடரவும்',
    backBtn: 'பின்செல்லவும்',
    consentBtn: 'நான் புரிந்து கொண்டு ஒப்புக்கொள்கிறேன்',
    startInterviewBtn: '🎤 AI நேர்காணலைத் தொடங்கவும்',
    consentNotice: 'உங்கள் குரல் பதில்கள் Encrypted முறையில் மருத்துவர் பார்வைக்கு மட்டும் அனுப்பப்படும்.',
    consentDetails: 'சாரதி AI உங்கள் குரல் மற்றும் தட்டச்சு பதில்களை மருத்துவ வரலாறாக உருவாக்கி உங்கள் மருத்துவருக்கு மட்டுமே அனுப்பும். உங்கள் ABHA சுகாதார கணக்குடன் இது பாதுகாப்பாக இணைக்கப்படும்.',
    opdTokenLabel: 'OPD டோக்கன்',
    abhaLabel: 'ABHA எண்',
  },
  en: {
    step1Title: '1. Select Your Language',
    step1Subtitle: 'Choose your preferred language for the AI clinical interview',
    step2Title: '2. Privacy & Data Consent',
    step2Subtitle: 'Understand and agree to data sharing before starting intake',
    step3Title: '3. Enter Patient Details',
    step3Subtitle: 'Provide your name, age, and gender to create your intake profile',
    step4Title: '4. Ready for AI Interview',
    step4Subtitle: 'Saarthi AI will now ask about your symptoms before meeting your doctor',
    nameLabel: 'Full Name',
    namePlaceholder: 'e.g. Karthik Subramanian',
    ageLabel: 'Age',
    agePlaceholder: 'e.g. 42',
    genderLabel: 'Gender',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    nextBtn: 'Continue to Next Step',
    backBtn: 'Back',
    consentBtn: 'I Understand & Agree to Consent',
    startInterviewBtn: '🎤 Start AI Interview',
    consentNotice: 'Your responses are end-to-end encrypted and shared securely with your doctor.',
    consentDetails: 'Saarthi AI records your spoken and typed answers to construct your clinical history. This information is sent exclusively to your attending physician and linked with your ABHA ID.',
    opdTokenLabel: 'OPD Token',
    abhaLabel: 'ABHA ID',
  },
  hi: {
    step1Title: '1. अपनी भाषा चुनें',
    step1Subtitle: 'AI क्लिनिकल साक्षात्कार के लिए अपनी पसंदीदा भाषा चुनें',
    step2Title: '2. गोपनीयता और डेटा सहमति',
    step2Subtitle: 'शुरू करने से पहले अपनी चिकित्सा सहमति की पुष्टि करें',
    step3Title: '3. मरीज़ का विवरण दर्ज करें',
    step3Subtitle: 'अपनी केस फाइल के लिए अपना नाम, आयु और लिंग दर्ज करें',
    step4Title: '4. AI साक्षात्कार के लिए तैयार',
    step4Subtitle: 'सारथी AI डॉक्टर से मिलने से पहले आपके लक्षणों को दर्ज करेगा',
    nameLabel: 'पूरा नाम',
    namePlaceholder: 'जैसे कार्तिक सुब्रमण्यन',
    ageLabel: 'आयु',
    agePlaceholder: 'जैसे 42',
    genderLabel: 'लिंग',
    male: 'पुरुष (Male)',
    female: 'महिला (Female)',
    other: 'अन्य (Other)',
    nextBtn: 'आगे बढ़ें',
    backBtn: 'पीछे जाएँ',
    consentBtn: 'मैं समझता हूँ और सहमति देता हूँ',
    startInterviewBtn: '🎤 AI साक्षात्कार शुरू करें',
    consentNotice: 'आपकी आवाज प्रविष्टियां एनक्रिप्टेड हैं और केवल आपके डॉक्टर को दिखाई देंगी।',
    consentDetails: 'सारथी AI आपकी आवाज और टाइप किए गए उत्तरों को केस हिस्ट्री बनाने के लिए दर्ज करता है। यह जानकारी केवल आपके डॉक्टर को भेजी जाती है और ABHA से जुड़ी होती है।',
    opdTokenLabel: 'ओपीडी टोकन',
    abhaLabel: 'ABHA आईडी',
  },
};

export const PatientOnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { language, setLanguage, patientInfo, updatePatientInfo, setPatientToken, startNewPatientInterview } = useDemoState();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setPatientToken(token);
    }
  }, [searchParams, setPatientToken]);

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);
  const [consentChecked, setConsentChecked] = useState<boolean>(true);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');

  const t = translations[language];

  const handleLanguageSelect = (lang: LanguageType) => {
    setLanguage(lang);
    setStep(2);
  };

  const handleConsentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (consentChecked) {
      setStep(3);
    }
  };

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAge = parseInt(age, 10) || 30;
    const finalName = name.trim() || 'New Patient';
    updatePatientInfo(finalName, parsedAge, gender);
    setStep(4);
  };

  const handleStartInterview = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    startNewPatientInterview(name.trim() || patientInfo.name || 'New Patient');
    setStep(5);
    navigate('/patient/interview');
  };

  if (step === 5) {
    return <PatientInterviewView onNextOcr={() => setStep(6)} />;
  }

  if (step === 6) {
    return <PatientDocumentsPage onReviewSummary={() => setStep(7)} />;
  }

  if (step === 7) {
    return <PatientReviewPage />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between p-4 sm:p-8">
      {/* Top Header */}
      <header className="flex items-center justify-between bg-white p-4 rounded-3xl border border-slate-200 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-600 flex items-center justify-center text-white shadow-md">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-black text-xl text-slate-900 tracking-tight">Saarthi.AI</h1>
            <p className="text-xs text-slate-500 font-medium">Apollo Hospitals OPD Kiosk #04</p>
          </div>
        </div>

        <LanguageSelector />
      </header>

      {/* Progress Steps Header */}
      <div className="max-w-2xl mx-auto w-full mt-6">
        <div className="flex items-center justify-between bg-white px-6 py-3 rounded-2xl border border-slate-200 shadow-sm text-xs font-bold">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-teal-700' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${step >= 1 ? 'bg-teal-600' : 'bg-slate-300'}`}>1</span>
            <span>{language === 'ta' ? 'மொழி' : language === 'hi' ? 'भाषा' : 'Language'}</span>
          </div>

          <div className={`h-0.5 w-8 sm:w-12 ${step >= 2 ? 'bg-teal-500' : 'bg-slate-200'}`} />

          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-teal-700' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${step >= 2 ? 'bg-teal-600' : 'bg-slate-300'}`}>2</span>
            <span>{language === 'ta' ? 'சம்மதம்' : language === 'hi' ? 'सहमति' : 'Consent'}</span>
          </div>

          <div className={`h-0.5 w-8 sm:w-12 ${step >= 3 ? 'bg-teal-500' : 'bg-slate-200'}`} />

          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-teal-700' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${step >= 3 ? 'bg-teal-600' : 'bg-slate-300'}`}>3</span>
            <span>{language === 'ta' ? 'விவரங்கள்' : language === 'hi' ? 'विवरण' : 'Details'}</span>
          </div>

          <div className={`h-0.5 w-8 sm:w-12 ${step >= 4 ? 'bg-teal-500' : 'bg-slate-200'}`} />

          <div className={`flex items-center gap-2 ${step === 4 ? 'text-teal-700' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${step === 4 ? 'bg-teal-600' : 'bg-slate-300'}`}>4</span>
            <span>{language === 'ta' ? 'நேர்காணல்' : language === 'hi' ? 'साक्षात्कार' : 'Interview'}</span>
          </div>
        </div>
      </div>

      {/* Main Touchscreen Content */}
      <main className="max-w-2xl mx-auto w-full my-auto py-6">
        {/* STEP 1: LANGUAGE SELECTION */}
        {step === 1 && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl space-y-6 text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-teal-100 text-teal-700 mx-auto flex items-center justify-center shadow-inner">
              <Globe className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{t.step1Title}</h2>
              <p className="text-slate-500 text-sm">{t.step1Subtitle}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <button
                type="button"
                onClick={() => handleLanguageSelect('ta')}
                className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center space-y-3 group ${
                  language === 'ta'
                    ? 'border-teal-600 bg-teal-50 shadow-lg ring-2 ring-teal-500/20'
                    : 'border-slate-200 hover:border-teal-400 bg-slate-50 hover:bg-white'
                }`}
              >
                <span className="text-3xl font-black text-teal-700 group-hover:scale-110 transition-transform">தமிழ்</span>
                <span className="text-xs font-bold text-slate-600">Tamil</span>
                <span className="text-[10px] bg-teal-100 text-teal-800 font-extrabold px-2 py-0.5 rounded-full">தமிழி் பேசுங்கள்</span>
              </button>

              <button
                type="button"
                onClick={() => handleLanguageSelect('en')}
                className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center space-y-3 group ${
                  language === 'en'
                    ? 'border-teal-600 bg-teal-50 shadow-lg ring-2 ring-teal-500/20'
                    : 'border-slate-200 hover:border-teal-400 bg-slate-50 hover:bg-white'
                }`}
              >
                <span className="text-3xl font-black text-slate-800 group-hover:scale-110 transition-transform">English</span>
                <span className="text-xs font-bold text-slate-600">English</span>
                <span className="text-[10px] bg-slate-200 text-slate-800 font-extrabold px-2 py-0.5 rounded-full">Speak in English</span>
              </button>

              <button
                type="button"
                onClick={() => handleLanguageSelect('hi')}
                className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center space-y-3 group ${
                  language === 'hi'
                    ? 'border-teal-600 bg-teal-50 shadow-lg ring-2 ring-teal-500/20'
                    : 'border-slate-200 hover:border-teal-400 bg-slate-50 hover:bg-white'
                }`}
              >
                <span className="text-3xl font-black text-amber-700 group-hover:scale-110 transition-transform">हिन्दी</span>
                <span className="text-xs font-bold text-slate-600">Hindi</span>
                <span className="text-[10px] bg-amber-100 text-amber-900 font-extrabold px-2 py-0.5 rounded-full">हिंदी में बोलें</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CONSENT & PRIVACY AGREEMENT */}
        {step === 2 && (
          <form onSubmit={handleConsentSubmit} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900">{t.step2Title}</h2>
                <p className="text-slate-500 text-xs mt-1">{t.step2Subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-slate-500 hover:text-teal-700 font-bold flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200"
              >
                <ArrowLeft className="w-4 h-4" /> {t.backBtn}
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-2 text-left">
                <div className="flex items-center gap-2 font-black text-teal-900 text-sm">
                  <ShieldCheck className="w-5 h-5 text-teal-600" />
                  <span>ABDM / ABHA Digital Consent & Privacy</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {t.consentDetails}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2 text-left">
                <p className="flex items-center gap-2 font-bold text-slate-900">
                  <Lock className="w-4 h-4 text-emerald-600" /> End-to-End Encryption Protocol
                </p>
                <p>Your responses are encrypted and processed locally for clinical triage. You can withdraw consent at any time before meeting your physician.</p>
              </div>

              <label className="flex items-start gap-3 p-4 rounded-2xl border-2 border-teal-500/30 bg-teal-50/30 cursor-pointer hover:bg-teal-50/60 transition-colors">
                <input
                  type="checkbox"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  className="w-5 h-5 mt-0.5 accent-teal-600 rounded"
                />
                <span className="text-xs font-bold text-slate-800 leading-normal">
                  I understand and agree to share my health history for this visit. (ABDM ABD-CONSENT-2026)
                </span>
              </label>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={!consentChecked}
                className="w-full py-4 px-6 rounded-2xl bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-black text-base shadow-xl shadow-teal-600/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>{t.consentBtn}</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: PATIENT DETAILS (NAME & AGE & GENDER) */}
        {step === 3 && (
          <form onSubmit={handleStep3Submit} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900">{t.step3Title}</h2>
                <p className="text-slate-500 text-xs mt-1">{t.step3Subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs text-slate-500 hover:text-teal-700 font-bold flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200"
              >
                <ArrowLeft className="w-4 h-4" /> {t.backBtn}
              </button>
            </div>

            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-teal-600" />
                  <span>{t.nameLabel}</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className="w-full px-4 py-3.5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-900 text-base font-bold bg-slate-50 focus:bg-white transition-all"
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-teal-600" />
                  <span>{t.ageLabel}</span>
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder={t.agePlaceholder}
                  className="w-full px-4 py-3.5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-900 text-base font-bold bg-slate-50 focus:bg-white transition-all"
                />
              </div>

              {/* Gender Selection */}
              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1.5">
                  {t.genderLabel}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['Male', 'Female', 'Other'].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`py-3 px-4 rounded-xl font-bold text-sm border transition-all ${
                        gender === g
                          ? 'bg-teal-600 text-white border-teal-600 shadow-md'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {g === 'Male' ? t.male : g === 'Female' ? t.female : t.other}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-black text-base shadow-xl shadow-teal-600/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <span>{t.nextBtn}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: CONSENT & AI INTERVIEW LAUNCHER */}
        {step === 4 && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl space-y-6 text-center animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-teal-100 text-teal-700 mx-auto flex items-center justify-center shadow-inner">
              <Sparkles className="w-10 h-10 animate-pulse" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-teal-700 bg-teal-50 px-3.5 py-1 rounded-full border border-teal-200">
                {t.step4Title}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {language === 'ta' ? `வணக்கம், ${patientInfo.name}` : language === 'hi' ? `नमस्ते, ${patientInfo.name}` : `Welcome, ${patientInfo.name}`}
              </h2>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                {t.step4Subtitle}
              </p>
            </div>

            {/* OPD Patient Token Summary Card with Scannable QR */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-left max-w-md mx-auto">
              <div className="flex items-center gap-3">
                <QRCodeSvg
                  value={typeof window !== 'undefined' ? `${window.location.origin}/login/patient?token=${patientInfo.token}` : undefined}
                  size={75}
                  showCenterBadge={false}
                />
                <div>
                  <span className="text-[10px] font-black uppercase text-teal-700 bg-teal-100 px-2 py-0.5 rounded font-mono">Token: {patientInfo.token}</span>
                  <p className="text-xs text-slate-500 font-bold mt-1">{t.abhaLabel}: {patientInfo.abhaId}</p>
                  <p className="text-xs text-slate-900 font-bold">
                    {patientInfo.name} ({patientInfo.age} Y / {patientInfo.gender})
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-teal-700 bg-teal-100 px-2.5 py-1 rounded-lg shrink-0">
                {language === 'ta' ? 'தமிழ்' : language === 'hi' ? 'हिन्दी' : 'English'}
              </span>
            </div>

            {/* Consent Notice */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium max-w-md mx-auto flex items-center gap-2 text-left">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{t.consentNotice}</span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2 max-w-md mx-auto">
              <button
                type="button"
                onClick={handleStartInterview}
                className="w-full py-5 px-6 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-black text-lg shadow-xl shadow-teal-600/30 transition-all hover:scale-105 flex items-center justify-center gap-3"
              >
                <Mic className="w-6 h-6" />
                <span>{t.startInterviewBtn}</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-full py-3 px-4 rounded-xl text-slate-500 hover:text-slate-800 font-bold text-xs hover:bg-slate-100 transition-colors"
              >
                {t.backBtn}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Kiosk Footer */}
      <footer className="text-center text-xs text-slate-500 font-medium py-2">
        <span className="flex items-center justify-center gap-1">
          <ShieldCheck className="w-4 h-4 text-teal-600" /> Touchscreen Kiosk Protocol • ABDM Compliant
        </span>
      </footer>
    </div>
  );
};
