import React, { useState, useEffect, useRef } from 'react';
import { useDemoState } from '../context/DemoStateContext';
import { Mic, MicOff, Keyboard, Send, Volume2 } from 'lucide-react';

interface VoiceWaveformProps {
  onSendMessage: (msgText: string) => void;
}

const translations = {
  ta: {
    speakBtnActive: 'கேட்கிறது (நிறுத்த கிளிக் செய்க)',
    speakBtnInactive: '🎤 பேசுங்கள் (மைக் இயங்குகிறது)',
    typeBtn: '⌨️ தட்டச்சு செய்க',
    micActiveBanner: 'மைக்ரோஃபோன் இயங்குகிறது — இப்போது பேசுங்கள்',
    micInactiveBanner: 'பேச பொத்தானை கிளிக் செய்யவும் அல்லது மாதிரி வாக்கியத்தை அழுத்தவும்',
    typePlaceholder: 'உங்கள் அறிகுறிகளை இங்கே தட்டச்சு செய்க (எ.கா. 2 நாட்களாக மார்பு வலி மற்றும் மூச்சுத்திணறல்)...',
    sendBtn: 'அனுப்பு',
    micReady: 'பேசத் தயார்',
    listening: 'உங்கள் மைக்ரோஃபோனைக் கேட்கிறது...',
    micStopped: 'மைக்ரோஃபோன் நிறுத்தப்பட்டது. மீண்டும் தொடங்க 🎤 பேசுங்கள் கிளிக் செய்யவும்.',
    sampleNotice: 'அல்லது மாதிரி குரல் வாக்கியத்தை அழுத்தவும்:',
    samples: [
      'எனக்கு இரண்டு நாட்களாக மார்பில் கடுமையான பாரமும் வலியும் இருக்கிறது.',
      'நடக்கும்போது மூச்சுத்திணறலும் அதிக வேர்வையும் ஏற்படுகிறது.',
      'ஏற்கனவே இரத்த அழுத்தத்திற்காக Telmisartan மாத்திரை சாப்பிடுகிறேன்.',
    ],
  },
  en: {
    speakBtnActive: 'Listening (Click Stop)',
    speakBtnInactive: '🎤 Speak (Mic Active)',
    typeBtn: '⌨️ Type Symptoms',
    micActiveBanner: 'MICROPHONE ACTIVE — SPEAK NOW',
    micInactiveBanner: 'CLICK SPEAK BUTTON OR SAMPLES BELOW',
    typePlaceholder: 'Type your symptoms here (e.g. Chest pain for 2 days with breathlessness)...',
    sendBtn: 'Send',
    micReady: 'Ready to listen',
    listening: 'Listening to your microphone...',
    micStopped: 'Microphone stopped. Click 🎤 Speak to start again.',
    sampleNotice: 'Or click a speech sample to test instant NLP parsing:',
    samples: [
      'I have severe central chest pain and tightness for two days.',
      'I feel short of breath and sweat heavily when climbing stairs.',
      'I am currently taking Telmisartan 40mg daily for hypertension.',
    ],
  },
  hi: {
    speakBtnActive: 'सुन रहा है (रोकने के लिए क्लिक करें)',
    speakBtnInactive: '🎤 बोलें (माइक सक्रिय)',
    typeBtn: '⌨️ लक्षण टाइप करें',
    micActiveBanner: 'माइक सक्रिय — अब बोलें',
    micInactiveBanner: 'बोलने के लिए बटन या नीचे के नमूने पर क्लिक करें',
    typePlaceholder: 'अपने लक्षण यहाँ टाइप करें (जैसे 2 दिनों से सीने में दर्द और सांस फूलना)...',
    sendBtn: 'भेजें',
    micReady: 'सुनने के लिए तैयार',
    listening: 'आपके माइक्रोफ़ोन को सुन रहा है...',
    micStopped: 'माइक्रोफ़ोन बंद हो गया। फिर से शुरू करने के लिए 🎤 बोलें क्लिक करें।',
    sampleNotice: 'या त्वरित NLP परीक्षण के लिए नमूना वाक्यों पर क्लिक करें:',
    samples: [
      'मुझे पिछले दो दिनों से सीने में तेज दर्द और भारीपन महसूस हो रहा है।',
      'सीढ़ियाँ चढ़ने पर सांस फूलती है और पसीना आता है।',
      'मैं बीपी के लिए नियमित रूप से दवा ले रहा हूँ।',
    ],
  },
};

export const VoiceWaveform: React.FC<VoiceWaveformProps> = ({ onSendMessage }) => {
  const { language } = useDemoState();
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [inputType, setInputType] = useState<'voice' | 'text'>('voice');
  const [inputText, setInputText] = useState<string>('');
  const [speechSupported, setSpeechSupported] = useState<boolean>(false);
  const [liveSpeechTranscript, setLiveSpeechTranscript] = useState<string>('');
  const [micStatus, setMicStatus] = useState<string>('');

  const t = translations[language] || translations.en;
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Reset live speech transcript whenever language changes to prevent language bleeds!
    setLiveSpeechTranscript('');
    setMicStatus(t.micReady);

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => {
        setIsRecording(true);
        setMicStatus(t.listening);
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        if (final) {
          setLiveSpeechTranscript(final);
          onSendMessage(final);
          setTimeout(() => setLiveSpeechTranscript(''), 2500);
        } else if (interim) {
          setLiveSpeechTranscript(interim);
        }
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
        setMicStatus(t.micStopped);
      };

      recognitionRef.current = recognition;
    } else {
      setSpeechSupported(false);
      setMicStatus(t.micReady);
    }
  }, [language, t.micReady, t.listening, t.micStopped]);

  const toggleMicRecording = () => {
    if (!speechSupported || !recognitionRef.current) {
      setIsRecording(!isRecording);
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.lang = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        setIsRecording(true);
      }
    }
  };

  const handleSpeakSample = (phrase: string) => {
    setLiveSpeechTranscript(phrase);
    onSendMessage(phrase);
    setTimeout(() => {
      setLiveSpeechTranscript('');
    }, 2500);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-6">
      {/* Mode Selection Big Touch Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => {
            setInputType('voice');
            toggleMicRecording();
          }}
          className={`py-4 px-6 rounded-2xl font-black text-base transition-all flex items-center justify-center gap-3 border-2 ${
            inputType === 'voice' && isRecording
              ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-600/30 scale-[1.02] animate-pulse'
              : inputType === 'voice'
                ? 'bg-teal-600 text-white border-teal-600 shadow-lg shadow-teal-600/30'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          {isRecording ? <MicOff className="w-6 h-6 animate-bounce" /> : <Mic className="w-6 h-6" />}
          <span>{isRecording ? t.speakBtnActive : t.speakBtnInactive}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setInputType('text');
            if (isRecording && recognitionRef.current) recognitionRef.current.stop();
            setIsRecording(false);
          }}
          className={`py-4 px-6 rounded-2xl font-black text-base transition-all flex items-center justify-center gap-3 border-2 ${
            inputType === 'text'
              ? 'bg-teal-600 text-white border-teal-600 shadow-lg shadow-teal-600/30 scale-[1.02]'
              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <Keyboard className="w-6 h-6" />
          <span>{t.typeBtn}</span>
        </button>
      </div>

      {/* Voice Mode Visualizer */}
      {inputType === 'voice' ? (
        <div className="bg-slate-950 rounded-2xl p-6 text-white flex flex-col items-center justify-center space-y-4 relative overflow-hidden border border-slate-800">
          <div className="flex items-center space-x-2 text-xs font-semibold text-teal-400">
            <span className={`w-2.5 h-2.5 rounded-full ${isRecording ? 'bg-red-500 animate-ping' : 'bg-teal-400'}`}></span>
            <span className="uppercase tracking-wider">
              {isRecording ? t.micActiveBanner : t.micInactiveBanner}
            </span>
          </div>

          {/* Live Transcript Preview Banner */}
          {liveSpeechTranscript && (
            <div className="w-full p-3 rounded-xl bg-teal-950/90 border border-teal-400/50 text-teal-200 text-sm font-semibold text-center animate-pulse">
              “{liveSpeechTranscript}”
            </div>
          )}

          {/* Animated Waveform Bars */}
          <div className="flex items-center justify-center space-x-1.5 h-16 w-full py-2">
            {[40, 75, 30, 90, 100, 45, 80, 60, 95, 50, 70, 85, 35, 90, 60, 80, 45].map((height, i) => (
              <div
                key={i}
                className="w-1.5 bg-gradient-to-t from-teal-500 to-emerald-400 rounded-full transition-all duration-300 animate-pulse"
                style={{
                  height: isRecording ? `${Math.max(20, (height * (i % 3 + 1)) % 100)}%` : '15%',
                  animationDelay: `${i * 0.06}s`,
                }}
              ></div>
            ))}
          </div>

          <div className="w-full pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Volume2 className="w-4 h-4 text-teal-400" /> {micStatus}
            </span>
            <span className="text-teal-300 font-mono">
              Locale: {language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-IN'}
            </span>
          </div>

          {/* Quick Voice Simulation Buttons */}
          <div className="w-full pt-2">
            <p className="text-[11px] text-slate-400 mb-2 font-medium">{t.sampleNotice}</p>
            <div className="flex flex-col gap-2">
              {t.samples.map((phrase, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSpeakSample(phrase)}
                  className="text-left text-xs bg-slate-900 hover:bg-teal-900/60 hover:border-teal-400 border border-slate-800 p-3 rounded-xl text-slate-200 transition-all flex items-center justify-between group"
                >
                  <span className="line-clamp-1">"{phrase}"</span>
                  <Mic className="w-3.5 h-3.5 text-teal-400 group-hover:scale-110 transition-transform shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Text Mode Form */
        <form onSubmit={handleTextSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t.typePlaceholder}
            className="flex-1 px-4 py-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-medium"
          />
          <button
            type="submit"
            className="px-5 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow transition-colors flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" />
            <span>{t.sendBtn}</span>
          </button>
        </form>
      )}
    </div>
  );
};
