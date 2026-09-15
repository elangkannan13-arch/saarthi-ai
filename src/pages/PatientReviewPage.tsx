import React from 'react';
import { useDemoState } from '../context/DemoStateContext';
import { QRCodeSvg } from '../components/QRCodeSvg';
import { CheckCircle2, Clock, ShieldCheck } from 'lucide-react';

const translations = {
  ta: {
    badge: 'மருத்துவத் தகவல் சேகரிப்பு முடிந்தது',
    title: 'உங்கள் விவரங்கள் தயாரிக்கப்பட்டுள்ளன',
    subtitle: 'உங்கள் மருத்துவ வரலாறு மற்றும் மருந்துச் சீட்டுகள் மருத்துவரின் EMR கேஸ் சுருக்கமாக வடிவமைக்கப்பட்டுள்ளன.',
    passLabel: 'அப்பல்லோ மருத்துவமனை OPD பாஸ்',
    deptLabel: 'துறை:',
    deptVal: 'பொது மருத்துவம் / கார்டியாலஜி',
    waitLabel: 'எதிர்பார்க்கப்படும் காத்திருப்பு நேரம்:',
    waitVal: '04 நிமிடங்கள் (அடுத்து உங்கள் முறை)',
    qrNotice: 'உடனடி கேஸ் சீட்டைப் பெற OPD கவுண்டர் #04-இல் ஸ்கேன் செய்யவும்.',
    waitingNotice: 'காத்திருப்புப் பகுதியில் அமரவும். விரைவில் உங்கள் டோக்கன் எண் அழைக்கப்படும்.',
  },
  en: {
    badge: 'Clinical Intake Completed',
    title: 'Your Story Has Been Structured',
    subtitle: 'Your clinical history and prescriptions have been formatted into an EMR case summary for your attending doctor.',
    passLabel: 'Apollo Hospitals OPD Pass',
    deptLabel: 'Department:',
    deptVal: 'General Medicine / Cardiology',
    waitLabel: 'Est. Wait Time:',
    waitVal: '04 Mins (Next in queue)',
    qrNotice: 'Scan at OPD Counter #04 for instant case sheet fetch.',
    waitingNotice: 'Please take a seat in the waiting area. Your token number will be called shortly.',
  },
  hi: {
    badge: 'क्लिनिकल प्रविष्टि पूर्ण',
    title: 'आपकी जानकारी तैयार की गई है',
    subtitle: 'आपके लक्षण और पर्चे डॉक्टर के EMR के लिए तैयार किए गए हैं।',
    passLabel: 'अपोलो अस्पताल ओपीडी पास',
    deptLabel: 'विभाग:',
    deptVal: 'सामान्य चिकित्सा / कार्डियोलॉजी',
    waitLabel: 'अनुमानित प्रतीक्षा समय:',
    waitVal: '04 मिनट (अगला नंबर आपका है)',
    qrNotice: 'केस शीट प्राप्त करने के लिए ओपीडी काउंटर #04 पर स्कैन करें।',
    waitingNotice: 'कृपया प्रतीक्षा क्षेत्र में बैठें। आपका टोकन नंबर जल्द ही बुलाया जाएगा।',
  },
};

export const PatientReviewPage: React.FC = () => {
  const { patientInfo, language } = useDemoState();

  const t = translations[language] || translations.en;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col p-4 sm:p-8">
      <div className="max-w-2xl mx-auto w-full my-auto space-y-6">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl space-y-6 text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {t.badge}
            </span>
            <h1 className="text-3xl font-black text-slate-900">{t.title}</h1>
            <p className="text-slate-600 text-sm max-w-md mx-auto">
              {t.subtitle}
            </p>
          </div>

          {/* Token OPD Ticket */}
          <div className="p-6 rounded-3xl bg-slate-950 text-white space-y-4 text-left shadow-xl border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <p className="text-[10px] font-mono text-teal-400 uppercase tracking-wider">{t.passLabel}</p>
                <h3 className="text-lg font-extrabold text-white">{patientInfo.name}</h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-amber-400 font-mono">{patientInfo.token}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
              <div>
                <span className="text-slate-500 font-bold block">{t.deptLabel}</span>
                <span className="font-semibold text-white">{t.deptVal}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block">{t.waitLabel}</span>
                <span className="font-semibold text-teal-300 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {t.waitVal}
                </span>
              </div>
            </div>

            {/* Real Scannable OPD Pass QR */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-4">
              <QRCodeSvg
                value={typeof window !== 'undefined' ? `${window.location.origin}/login/patient?token=${patientInfo.token}` : undefined}
                size={70}
                showCenterBadge={false}
              />
              <div className="text-xs text-slate-300 font-medium">
                <span className="font-bold text-teal-300 block mb-0.5">Scannable OPD Pass: {patientInfo.token}</span>
                <span>{t.qrNotice}</span>
              </div>
            </div>
          </div>

          {/* Kiosk Waiting Notice Banner */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t.waitingNotice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
