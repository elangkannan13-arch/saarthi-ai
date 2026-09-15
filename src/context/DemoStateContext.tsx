import React, { createContext, useContext, useState, useEffect } from 'react';

export type ScenarioType = 'chest_pain' | 'fever' | 'ayush' | 'ocr';
export type LanguageType = 'en' | 'ta' | 'hi';

export interface SocratesState {
  site: { val: string; status: boolean; confidence: number };
  onset: { val: string; status: boolean; confidence: number };
  character: { val: string; status: boolean; confidence: number };
  radiation: { val: string; status: boolean; confidence: number };
  associated: { val: string; status: boolean; confidence: number };
  timing: { val: string; status: boolean; confidence: number };
  exacerbating: { val: string; status: boolean; confidence: number };
  severity: { val: string; status: boolean; confidence: number };
}

export interface ExtractedMedication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  confidence: number;
  source: 'OCR' | 'Patient Voice';
}

export interface DoctorField {
  key: string;
  label: string;
  value: string;
  originalValue: string;
  source: 'Patient Voice' | 'OCR' | 'Historical Records';
  confidence: number;
  status: 'ai_draft' | 'accepted' | 'edited' | 'rejected';
}

export interface DoctorSummary {
  chiefComplaint: DoctorField;
  hpi: DoctorField;
  associatedSymptoms: DoctorField;
  pastHistory: DoctorField;
  medications: DoctorField;
  allergies: DoctorField;
  priorInvestigations?: DoctorField;
}

export interface RedFlagAlertInfo {
  triggered: boolean;
  ruleName: string;
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE';
  description: string;
  acknowledged: boolean;
  timestamp: string;
}

export interface TranscriptItem {
  id: string;
  sender: 'ai' | 'patient';
  text: string;
  timestamp: string;
  language?: LanguageType;
}

export interface PatientQueueItem {
  id: string;
  name: string;
  age: number;
  gender: string;
  language: string;
  token: string;
  dept: string;
  interviewStatus: string;
  confidence: number;
  isFlagged: boolean;
  time: string;
  presetKey?: 'lakshmi' | 'karthik' | 'sunita';
}

export interface DemoStateContextType {
  scenario: ScenarioType;
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  patientInfo: {
    id: string;
    name: string;
    age: number;
    gender: string;
    phone: string;
    abhaId: string;
    token: string;
    opd?: string;
    waited?: string;
  };
  patientQueue: PatientQueueItem[];
  updatePatientInfo: (name: string, age: number, gender: string) => void;
  setPatientToken: (token: string) => void;
  loadPatientFromQueue: (patientId: string) => void;
  interviewProgress: number;
  socrates: SocratesState;
  transcript: TranscriptItem[];
  ocrDocument: {
    fileName: string;
    fileUrl: string;
    isScanning: boolean;
    extractedMeds: ExtractedMedication[];
    overallConfidence: number;
  };
  redFlag: RedFlagAlertInfo;
  doctorSummary: DoctorSummary;
  enableAyushMode: boolean;
  setEnableAyushMode: (val: boolean) => void;
  ayushPrakriti: {
    vata: number;
    pitta: number;
    kapha: number;
    primaryDosha: string;
    dashavidha: { title: string; category: string; value: string; note: string }[];
  };
  isAutoDemoRunning: boolean;
  autoDemoPipelineStep: number;
  isEmrFinalized: boolean;
  emrConfirmationId: string;
  // Methods
  startNewPatientInterview: (customName?: string) => void;
  selectScenario: (sc: ScenarioType) => void;
  run30SecondDemo: () => void;
  stopAutoDemo: () => void;
  sendPatientMessage: (msgText: string) => void;
  simulateOcrUpload: (customName?: string, dataUrl?: string, file?: File) => void;
  updateDoctorField: (fieldKey: keyof DoctorSummary, newValue: string) => void;
  acceptField: (fieldKey: keyof DoctorSummary) => void;
  acceptAllFields: () => void;
  acknowledgeRedFlag: () => void;
  resetDemoState: () => void;
  getFhirBundleJson: () => string;
  finalizeToEmr: () => void;
  loadPresetPatient: (presetKey: 'lakshmi' | 'karthik' | 'sunita') => void;
}

const emptySocrates: SocratesState = {
  site: { val: '', status: false, confidence: 0 },
  onset: { val: '', status: false, confidence: 0 },
  character: { val: '', status: false, confidence: 0 },
  radiation: { val: '', status: false, confidence: 0 },
  associated: { val: '', status: false, confidence: 0 },
  timing: { val: '', status: false, confidence: 0 },
  exacerbating: { val: '', status: false, confidence: 0 },
  severity: { val: '', status: false, confidence: 0 },
};

const defaultSocrates: SocratesState = {
  site: { val: 'Generalized body ache & forehead', status: true, confidence: 95 },
  onset: { val: '3 days ago', status: true, confidence: 97 },
  character: { val: 'Fever with chills (evening predominant)', status: true, confidence: 94 },
  radiation: { val: 'None', status: true, confidence: 99 },
  associated: { val: 'Chills, sweating overnight', status: true, confidence: 92 },
  timing: { val: 'Rises each evening', status: true, confidence: 95 },
  exacerbating: { val: 'None reported', status: true, confidence: 90 },
  severity: { val: 'Moderate discomfort', status: true, confidence: 92 },
};

const emptyDoctorSummary: DoctorSummary = {
  chiefComplaint: {
    key: 'chiefComplaint',
    label: 'Chief complaint',
    value: 'Awaiting patient responses...',
    originalValue: 'Awaiting patient responses...',
    source: 'Patient Voice',
    confidence: 0,
    status: 'ai_draft',
  },
  hpi: {
    key: 'hpi',
    label: 'History of present illness',
    value: 'Clinical history taking in progress.',
    originalValue: 'Clinical history taking in progress.',
    source: 'Patient Voice',
    confidence: 0,
    status: 'ai_draft',
  },
  associatedSymptoms: {
    key: 'associatedSymptoms',
    label: 'Associated Symptoms',
    value: 'None recorded yet.',
    originalValue: 'None recorded yet.',
    source: 'Patient Voice',
    confidence: 0,
    status: 'ai_draft',
  },
  pastHistory: {
    key: 'pastHistory',
    label: 'Past medical history',
    value: 'None recorded yet.',
    originalValue: 'None recorded yet.',
    source: 'Patient Voice',
    confidence: 0,
    status: 'ai_draft',
  },
  medications: {
    key: 'medications',
    label: 'Drug & allergy history',
    value: 'None recorded yet.',
    originalValue: 'None recorded yet.',
    source: 'Patient Voice',
    confidence: 0,
    status: 'ai_draft',
  },
  allergies: {
    key: 'allergies',
    label: 'Known Allergies',
    value: 'None reported.',
    originalValue: 'None reported.',
    source: 'Patient Voice',
    confidence: 0,
    status: 'ai_draft',
  },
};

const defaultDoctorSummary: DoctorSummary = {
  chiefComplaint: {
    key: 'chiefComplaint',
    label: 'Chief complaint',
    value: 'Fever for 3 days, evening-predominant, with chills. No rash.',
    originalValue: 'Fever for 3 days, evening-predominant, with chills. No rash.',
    source: 'Patient Voice',
    confidence: 96,
    status: 'ai_draft',
  },
  hpi: {
    key: 'hpi',
    label: 'History of present illness',
    value: 'Fever pattern: rises each evening, breaks with sweating overnight. Associated mild body ache. No cough, no urinary symptoms.',
    originalValue: 'Fever pattern: rises each evening, breaks with sweating overnight. Associated mild body ache. No cough, no urinary symptoms.',
    source: 'Patient Voice',
    confidence: 95,
    status: 'ai_draft',
  },
  associatedSymptoms: {
    key: 'associatedSymptoms',
    label: 'Associated Symptoms',
    value: 'Mild body ache, chills during fever spikes, sweating overnight.',
    originalValue: 'Mild body ache, chills during fever spikes, sweating overnight.',
    source: 'Patient Voice',
    confidence: 92,
    status: 'ai_draft',
  },
  pastHistory: {
    key: 'pastHistory',
    label: 'Past medical history',
    value: 'Type 2 diabetes, 8 years, on metformin 500mg twice daily.',
    originalValue: 'Type 2 diabetes, 8 years, on metformin 500mg twice daily.',
    source: 'Patient Voice',
    confidence: 94,
    status: 'ai_draft',
  },
  medications: {
    key: 'medications',
    label: 'Drug & allergy history',
    value: 'Metformin 500mg BD. No known drug allergies.',
    originalValue: 'Metformin 500mg BD. No known drug allergies.',
    source: 'Patient Voice',
    confidence: 92,
    status: 'ai_draft',
  },
  allergies: {
    key: 'allergies',
    label: 'Known Allergies',
    value: 'No known drug allergies (NKDA) reported.',
    originalValue: 'No known drug allergies (NKDA) reported.',
    source: 'Patient Voice',
    confidence: 100,
    status: 'ai_draft',
  },
  priorInvestigations: {
    key: 'priorInvestigations',
    label: 'Prior investigations',
    value: 'CBC (2 Jun 2026, OCR): WBC 11,200/µL — flagged above reference range.',
    originalValue: 'CBC (2 Jun 2026, OCR): WBC 11,200/µL — flagged above reference range.',
    source: 'OCR',
    confidence: 84,
    status: 'ai_draft',
  },
};

// Clean Pure Language Initial Conversation Dictionaries
const languageInitialTranscripts: Record<LanguageType, TranscriptItem[]> = {
  ta: [
    {
      id: '1',
      sender: 'ai',
      text: 'வணக்கம்! நான் சாரதி AI, உங்கள் டிஜிட்டல் மருத்துவ உதவியாளா். உங்கள் மருத்துவரைச் சந்திப்பதற்கு முன் உங்கள் உடல்நலப் பிரச்சனைகளைப் பதிவு செய்ய உதவுவேன். இன்று உங்களுக்கு என்ன பிரச்சனை அல்லது அறிகுறிகள் உள்ளது?',
      timestamp: 'Just now',
      language: 'ta',
    },
  ],
  en: [
    {
      id: '1',
      sender: 'ai',
      text: 'Hello! I am Saarthi AI, your clinical digital co-pilot. I will help structure your medical history before you meet your doctor. What health problems or symptoms are you experiencing today?',
      timestamp: 'Just now',
      language: 'en',
    },
  ],
  hi: [
    {
      id: '1',
      sender: 'ai',
      text: 'नमस्ते! मैं सारथी AI हूँ, आपका डिजिटल मेडिकल सहायक। डॉक्टर से मिलने से पहले आपके लक्षणों को दर्ज करने में मदद करूँगा। आज आपको क्या स्वास्थ्य समस्या या लक्षण महसूस हो रहे हैं?',
      timestamp: 'Just now',
      language: 'hi',
    },
  ],
};

const defaultPatientQueue: PatientQueueItem[] = [
  {
    id: 'PAT-2026-B208',
    name: 'Lakshmi Narayanan',
    age: 61,
    gender: 'Female',
    language: 'Tamil',
    token: 'Token B-208',
    dept: 'General Medicine OPD',
    interviewStatus: 'Completed',
    confidence: 96,
    isFlagged: false,
    time: '10:08 AM',
    presetKey: 'lakshmi',
  },
  {
    id: 'PAT-2026-8891',
    name: 'Karthik Subramanian',
    age: 42,
    gender: 'Male',
    language: 'Tamil',
    token: 'OPD-A42',
    dept: 'General Medicine / Cardiology OPD',
    interviewStatus: 'Completed',
    confidence: 94,
    isFlagged: true,
    time: '10:15 AM',
    presetKey: 'karthik',
  },
  {
    id: 'PAT-2026-8892',
    name: 'Sunita Sharma',
    age: 58,
    gender: 'Female',
    language: 'Hindi',
    token: 'OPD-A43',
    dept: 'AYUSH / Ayurvedic OPD',
    interviewStatus: 'Completed',
    confidence: 91,
    isFlagged: false,
    time: '10:22 AM',
    presetKey: 'sunita',
  },
  {
    id: 'PAT-2026-8893',
    name: 'Anand Kumar',
    age: 29,
    gender: 'Male',
    language: 'English',
    token: 'OPD-A44',
    dept: 'General Medicine / Cardiology OPD',
    interviewStatus: 'In Progress (60%)',
    confidence: 88,
    isFlagged: false,
    time: '10:30 AM',
    presetKey: 'karthik',
  },
];

const DemoStateContext = createContext<DemoStateContextType | undefined>(undefined);

export const DemoStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scenario, setScenario] = useState<ScenarioType>('chest_pain');
  const [language, setLanguageState] = useState<LanguageType>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('saarthi_language');
      if (saved === 'en' || saved === 'ta' || saved === 'hi') return saved;
    }
    return 'en';
  });
  const [enableAyushMode, setEnableAyushMode] = useState<boolean>(true);

  const [patientQueue, setPatientQueue] = useState<PatientQueueItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('saarthi_patient_queue');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch (e) {}
      }
    }
    return defaultPatientQueue;
  });

  const [patientInfo, setPatientInfo] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('saarthi_patient_info');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return {
      id: 'PAT-2026-8891',
      name: 'Karthik Subramanian',
      age: 42,
      gender: 'Male',
      phone: '+91 98401 23456',
      abhaId: '91-4820-1928-3019',
      token: 'OPD-A42',
    };
  });

  const updatePatientInfo = (name: string, age: number, gender: string) => {
    const cleanName = name.trim() || 'New Patient';
    const cleanAge = age || 30;
    const cleanGender = gender || 'Male';

    const newId = `PAT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newToken = `OPD-A${45 + Math.floor(Math.random() * 50)}`;

    const newPatient = {
      id: newId,
      name: cleanName,
      age: cleanAge,
      gender: cleanGender,
      phone: '+91 98401 ' + Math.floor(10005 + Math.random() * 89999),
      abhaId: `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      token: newToken,
      opd: 'General Medicine OPD',
      waited: 'Just registered',
    };

    setPatientInfo(newPatient);
    if (typeof window !== 'undefined') {
      localStorage.setItem('saarthi_patient_info', JSON.stringify(newPatient));
    }

    const langLabel = language === 'ta' ? 'Tamil' : language === 'hi' ? 'Hindi' : 'English';
    const newQueueItem: PatientQueueItem = {
      id: newId,
      name: cleanName,
      age: cleanAge,
      gender: cleanGender,
      language: langLabel,
      token: newToken,
      dept: 'General Medicine OPD',
      interviewStatus: 'In Progress (Intake)',
      confidence: 95,
      isFlagged: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setPatientQueue((prevQueue) => {
      const updated = [newQueueItem, ...prevQueue];
      if (typeof window !== 'undefined') {
        localStorage.setItem('saarthi_patient_queue', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const setPatientToken = (token: string) => {
    if (token) {
      setPatientInfo((prev: any) => {
        const next = { ...prev, token };
        if (typeof window !== 'undefined') {
          localStorage.setItem('saarthi_patient_info', JSON.stringify(next));
        }
        return next;
      });
    }
  };

  const [interviewProgress, setInterviewProgress] = useState<number>(0);
  const [socrates, setSocrates] = useState<SocratesState>(emptySocrates);

  const [transcript, setTranscript] = useState<TranscriptItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('saarthi_transcript');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch (e) {}
      }
    }
    const initialLang = (typeof window !== 'undefined' && (localStorage.getItem('saarthi_language') as LanguageType)) || 'en';
    return languageInitialTranscripts[initialLang] || languageInitialTranscripts.en;
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && transcript.length > 0) {
      localStorage.setItem('saarthi_transcript', JSON.stringify(transcript));
    }
  }, [transcript]);

  const [ocrDocument, setOcrDocument] = useState({
    fileName: 'Apollo_Prescription_July2026.jpg',
    fileUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80',
    isScanning: false,
    extractedMeds: [
      { id: 'm1', name: 'Paracetamol', dosage: '500 mg', frequency: '1-0-1 (After meals)', duration: '5 Days', confidence: 94, source: 'OCR' as const },
      { id: 'm2', name: 'Telmisartan', dosage: '40 mg', frequency: '1-0-0 (Morning)', duration: 'Continuous', confidence: 91, source: 'OCR' as const },
      { id: 'm3', name: 'Sorbitrate (SOS)', dosage: '5 mg', frequency: 'As needed', duration: 'Emergency', confidence: 87, source: 'OCR' as const },
    ],
    overallConfidence: 91,
  });

  const [redFlag, setRedFlag] = useState<RedFlagAlertInfo>({
    triggered: false,
    ruleName: 'NONE',
    severity: 'MODERATE',
    description: 'Intake in progress',
    acknowledged: true,
    timestamp: '',
  });

  const [doctorSummary, setDoctorSummary] = useState<DoctorSummary>(emptyDoctorSummary);

  const [ayushPrakriti] = useState({
    vata: 62,
    pitta: 78,
    kapha: 41,
    primaryDosha: 'Pitta-Vata (Dominant)',
    dashavidha: [
      { title: 'Dusya (Tissues)', category: 'Rasa & Rakta Dhatu', value: 'Disturbed', note: 'Elevated Pitta causing Raktadhatu agitation' },
      { title: 'Bala (Strength)', category: 'Madhyama Bala', value: 'Moderate', note: 'Normal physical endurance prior to onset' },
      { title: 'Kala (Season/Time)', category: 'Sharad Ritu', value: 'Pitta Agitation', note: 'Seasonal peak for Pitta imbalance' },
      { title: 'Agni (Digestive Fire)', category: 'Tikshnagni', value: 'Hyperactive', note: 'Increased acid propensity & metabolic warmth' },
    ],
  });

  const [isAutoDemoRunning, setIsAutoDemoRunning] = useState<boolean>(false);
  const [autoDemoPipelineStep, setAutoDemoPipelineStep] = useState<number>(0);

  // Switch language and update transcript to pure target language
  const setLanguage = (lang: LanguageType) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('saarthi_language', lang);
    }
    setTranscript((prev) => {
      if (prev.length <= 1) {
        return languageInitialTranscripts[lang] || languageInitialTranscripts.en;
      }
      return prev;
    });
  };

  const startNewPatientInterview = (customName?: string) => {
    const pName = customName || patientInfo.name || 'Patient';
    setInterviewProgress(0);
    setSocrates(emptySocrates);
    setDoctorSummary(emptyDoctorSummary);
    setRedFlag({
      triggered: false,
      ruleName: 'NONE',
      severity: 'MODERATE',
      description: 'Intake in progress',
      acknowledged: true,
      timestamp: '',
    });
    const greetingText =
      language === 'ta'
        ? `வணக்கம் ${pName}! நான் சாரதி AI, உங்கள் டிஜிட்டல் மருத்துவ உதவியாளா். உங்கள் மருத்துவரைச் சந்திப்பதற்கு முன் உங்கள் உடல்நலப் பிரச்சனைகளைப் பதிவு செய்ய உதவுவேன். இன்று உங்களுக்கு என்ன பிரச்சனை அல்லது அறிகுறிகள் உள்ளது?`
        : language === 'hi'
        ? `नमस्ते ${pName}! मैं सारथी AI हूँ, आपका डिजिटल मेडिकल सहायक। डॉक्टर से मिलने से पहले आपके लक्षणों को दर्ज करने में मदद करूँगा। आज आपको क्या स्वास्थ्य समस्या या लक्षण महसूस हो रहे हैं?`
        : `Hello ${pName}! I am Saarthi AI, your clinical digital co-pilot. I will help structure your medical history before you meet your doctor. What health problems or symptoms are you experiencing today?`;

    const newTrans: TranscriptItem[] = [
      {
        id: Date.now().toString(),
        sender: 'ai',
        text: greetingText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language,
      },
    ];
    setTranscript(newTrans);
    if (typeof window !== 'undefined') {
      localStorage.setItem('saarthi_transcript', JSON.stringify(newTrans));
    }
  };

  // Scenario Selector
  const selectScenario = (scKey: ScenarioType) => {
    setScenario(scKey);
    if (scKey === 'chest_pain') {
      setLanguage('ta');
      setSocrates(defaultSocrates);
      setRedFlag({
        triggered: true,
        ruleName: 'CARD-EMERGENCY-01: Acute Coronary Screening',
        severity: 'CRITICAL',
        description: 'Central chest pain + exertional dyspnea detected.',
        acknowledged: false,
        timestamp: 'Just now',
      });
      setInterviewProgress(75);
    } else if (scKey === 'fever') {
      setLanguage('hi');
      setSocrates({
        site: { val: 'Generalized body ache & forehead', status: true, confidence: 95 },
        onset: { val: '3 days ago', status: true, confidence: 97 },
        character: { val: 'High grade fever with chills', status: true, confidence: 92 },
        radiation: { val: 'None', status: true, confidence: 99 },
        associated: { val: 'Mild cough, loss of appetite', status: true, confidence: 90 },
        timing: { val: 'Spikes in evening', status: true, confidence: 88 },
        exacerbating: { val: 'Cold water exposure', status: true, confidence: 85 },
        severity: { val: 'Temperature 101.4°F', status: true, confidence: 98 },
      });
      setRedFlag({
        triggered: false,
        ruleName: 'NONE',
        severity: 'MODERATE',
        description: 'Standard febrile illness history.',
        acknowledged: true,
        timestamp: '',
      });
      setInterviewProgress(85);
      setDoctorSummary({
        ...defaultDoctorSummary,
        chiefComplaint: {
          ...defaultDoctorSummary.chiefComplaint,
          value: 'Fever with chills and body ache for 3 days',
          originalValue: 'Fever with chills and body ache for 3 days',
        },
        hpi: {
          ...defaultDoctorSummary.hpi,
          value: 'Patient presents with high-grade fever spiking up to 101.4°F for 3 days. Accompanied by chills, headache, and anorexia.',
          originalValue: 'Patient presents with high-grade fever spiking up to 101.4°F for 3 days. Accompanied by chills, headache, and anorexia.',
        },
      });
    } else if (scKey === 'ayush') {
      setEnableAyushMode(true);
      setSocrates({
        ...defaultSocrates,
        site: { val: 'Epigastric burn & joint stiffness', status: true, confidence: 94 },
      });
    } else if (scKey === 'ocr') {
      simulateOcrUpload('Sample_Handwritten_Prescription_OPD.png');
    }
  };

  // 30-Second Auto Demo Loop
  const run30SecondDemo = () => {
    setIsAutoDemoRunning(true);
    setAutoDemoPipelineStep(1);

    // Step 1: Voice input (0s)
    setTranscript([
      { id: '10', sender: 'ai', text: 'வணக்கம், சாரதி இயங்குகிறது. உங்கள் உடல்நலப் பிரச்சனைகளை விவரிக்கவும்.', timestamp: 'Now', language: 'ta' },
    ]);

    setTimeout(() => {
      // Step 2: Patient speaks (3s)
      setAutoDemoPipelineStep(2);
      setTranscript((prev) => [
        ...prev,
        { id: '11', sender: 'patient', text: 'எனக்கு இரண்டு நாட்களாக நெஞ்சில் பலமான பாரமும் மூச்சுத்திணறலும் உள்ளது.', timestamp: 'Now', language: 'ta' },
      ]);
    }, 2500);

    setTimeout(() => {
      // Step 3: SOCRATES + OCR extraction (6s)
      setAutoDemoPipelineStep(3);
      setOcrDocument((prev) => ({ ...prev, isScanning: true }));
      setSocrates(defaultSocrates);
      setInterviewProgress(88);
    }, 6000);

    setTimeout(() => {
      // Step 4: OCR finish & Red flag screening (10s)
      setAutoDemoPipelineStep(4);
      setOcrDocument((prev) => ({ ...prev, isScanning: false }));
      setRedFlag({
        triggered: true,
        ruleName: 'CARD-EMERGENCY-01: Acute Coronary Syndrome',
        severity: 'CRITICAL',
        description: 'Automatic screening triggered: Chest tightness + exertional dyspnea.',
        acknowledged: false,
        timestamp: 'Just now',
      });
    }, 10000);

    setTimeout(() => {
      // Step 5: Summary Generated (14s)
      setAutoDemoPipelineStep(5);
      setDoctorSummary(defaultDoctorSummary);
    }, 14000);

    setTimeout(() => {
      // Step 6: Doctor Review Cockpit Sync Complete (18s)
      setAutoDemoPipelineStep(6);
      setIsAutoDemoRunning(false);
    }, 18000);
  };

  const stopAutoDemo = () => {
    setIsAutoDemoRunning(false);
  };

  // Dynamic NLP & Pure Multilingual AI Response Engine
  const sendPatientMessage = (text: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg: TranscriptItem = {
      id: Date.now().toString(),
      sender: 'patient',
      text,
      timestamp: timeStr,
      language,
    };
    const nextTranscript = [...transcript, newMsg];
    setTranscript(nextTranscript);

    const lowerText = text.toLowerCase();

    // Calculate current patient turn index
    const patientMsgCount = transcript.filter((m) => m.sender === 'patient').length + 1;

    // Analyze NLP SOCRATES fields strictly turn-by-turn
    let nextSocrates: SocratesState = { ...socrates };
    if (patientMsgCount === 1) {
      nextSocrates.site = { val: text, status: true, confidence: 96 };
    } else if (patientMsgCount === 2) {
      nextSocrates.site = { val: text, status: true, confidence: 96 };
    } else if (patientMsgCount === 3) {
      nextSocrates.onset = { val: text, status: true, confidence: 94 };
    } else if (patientMsgCount === 4) {
      nextSocrates.character = { val: text, status: true, confidence: 92 };
    } else if (patientMsgCount === 5) {
      nextSocrates.radiation = { val: text, status: true, confidence: 95 };
    } else if (patientMsgCount === 6) {
      nextSocrates.associated = { val: text, status: true, confidence: 96 };
    } else if (patientMsgCount === 7) {
      nextSocrates.timing = { val: text, status: true, confidence: 93 };
    } else if (patientMsgCount === 8) {
      nextSocrates.exacerbating = { val: text, status: true, confidence: 95 };
    } else if (patientMsgCount >= 9) {
      nextSocrates.severity = { val: text, status: true, confidence: 98 };
    }

    const activeCount = Object.values(nextSocrates).filter((s) => s.status).length;
    const progressPercent = Math.min(100, Math.round((activeCount / 8) * 100));
    setSocrates(nextSocrates);
    setInterviewProgress(progressPercent);

    // Update Emergency Red Flag rules dynamically
    let nextRedFlag: RedFlagAlertInfo = { ...redFlag };
    if (
      lowerText.includes('chest') || lowerText.includes('நெஞ்சு') || lowerText.includes('மார்பு') || lowerText.includes('சீने') ||
      lowerText.includes('breath') || lowerText.includes('மூச்சு') || lowerText.includes('சாंस') || lowerText.includes('7') || lowerText.includes('8') || lowerText.includes('9')
    ) {
      nextRedFlag = {
        triggered: true,
        ruleName: 'CARD-EMERGENCY-01: Acute Coronary Screening',
        severity: 'CRITICAL',
        description: `Dynamic NLP Alert: Acute symptoms reported: "${text}"`,
        acknowledged: false,
        timestamp: 'Just now',
      };
      setRedFlag(nextRedFlag);
    }

    // Dynamic Doctor Summary update turn-by-turn with REAL patient responses
    let nextDoctorSummary: DoctorSummary = { ...doctorSummary };
    if (patientMsgCount === 1) {
      nextDoctorSummary.chiefComplaint = {
        key: 'chiefComplaint',
        label: 'Chief complaint',
        value: text,
        originalValue: text,
        confidence: 96,
        source: 'Patient Voice',
        status: 'ai_draft',
      };
      nextDoctorSummary.hpi = {
        key: 'hpi',
        label: 'History of present illness',
        value: `Chief Complaint: "${text}".`,
        originalValue: `Chief Complaint: "${text}".`,
        confidence: 92,
        source: 'Patient Voice',
        status: 'ai_draft',
      };
    } else if (patientMsgCount === 2) {
      const prevVal = nextDoctorSummary.hpi.value.startsWith('Awaiting') ? '' : nextDoctorSummary.hpi.value + ' ';
      nextDoctorSummary.hpi = {
        ...nextDoctorSummary.hpi,
        value: `${prevVal}Anatomical Location: "${text}".`,
        originalValue: `${prevVal}Anatomical Location: "${text}".`,
        confidence: 94,
      };
    } else if (patientMsgCount === 3) {
      const prevVal = nextDoctorSummary.hpi.value + ' ';
      nextDoctorSummary.hpi = {
        ...nextDoctorSummary.hpi,
        value: `${prevVal}Onset & Duration: "${text}".`,
        originalValue: `${prevVal}Onset & Duration: "${text}".`,
        confidence: 95,
      };
    } else if (patientMsgCount === 4) {
      const prevVal = nextDoctorSummary.hpi.value + ' ';
      nextDoctorSummary.hpi = {
        ...nextDoctorSummary.hpi,
        value: `${prevVal}Character: "${text}".`,
        originalValue: `${prevVal}Character: "${text}".`,
        confidence: 95,
      };
    } else if (patientMsgCount === 5) {
      const prevVal = nextDoctorSummary.hpi.value + ' ';
      nextDoctorSummary.hpi = {
        ...nextDoctorSummary.hpi,
        value: `${prevVal}Radiation: "${text}".`,
        originalValue: `${prevVal}Radiation: "${text}".`,
        confidence: 95,
      };
    } else if (patientMsgCount === 6) {
      nextDoctorSummary.associatedSymptoms = {
        key: 'associatedSymptoms',
        label: 'Associated Symptoms',
        value: text,
        originalValue: text,
        confidence: 96,
        source: 'Patient Voice',
        status: 'ai_draft',
      };
      const prevVal = nextDoctorSummary.hpi.value + ' ';
      nextDoctorSummary.hpi = {
        ...nextDoctorSummary.hpi,
        value: `${prevVal}Associated Symptoms: "${text}".`,
        originalValue: `${prevVal}Associated Symptoms: "${text}".`,
        confidence: 95,
      };
    } else if (patientMsgCount === 7) {
      const prevVal = nextDoctorSummary.hpi.value + ' ';
      nextDoctorSummary.hpi = {
        ...nextDoctorSummary.hpi,
        value: `${prevVal}Timing & Pattern: "${text}".`,
        originalValue: `${prevVal}Timing & Pattern: "${text}".`,
        confidence: 93,
      };
    } else if (patientMsgCount === 8) {
      const prevVal = nextDoctorSummary.hpi.value + ' ';
      nextDoctorSummary.hpi = {
        ...nextDoctorSummary.hpi,
        value: `${prevVal}Exacerbating/Relieving: "${text}".`,
        originalValue: `${prevVal}Exacerbating/Relieving: "${text}".`,
        confidence: 95,
      };
    } else if (patientMsgCount >= 9) {
      const prevVal = nextDoctorSummary.hpi.value + ' ';
      nextDoctorSummary.hpi = {
        ...nextDoctorSummary.hpi,
        value: `${prevVal}Severity Scale (1-10): "${text}".`,
        originalValue: `${prevVal}Severity Scale (1-10): "${text}".`,
        confidence: 98,
      };
    }
    setDoctorSummary(nextDoctorSummary);

    // Sync live captured socrates, doctorSummary, and transcript directly to patientQueue
    setPatientQueue((prevQueue) => {
      const updated = prevQueue.map((p) => {
        if (p.id === patientInfo.id || p.token === patientInfo.token || p.name.toLowerCase() === patientInfo.name.toLowerCase()) {
          return {
            ...p,
            socrates: nextSocrates,
            doctorSummary: nextDoctorSummary,
            transcript: nextTranscript,
            redFlag: nextRedFlag,
            interviewStatus: progressPercent >= 100 ? 'Completed' : `In Progress (${progressPercent}%)`,
            confidence: 95,
          };
        }
        return p;
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem('saarthi_patient_queue', JSON.stringify(updated));
      }
      return updated;
    });

    // Adaptive Scripted Multi-Turn AI Clinical Questioning (Systematic 8 SOCRATES Questions)
    setTimeout(() => {
      let aiResponseText = '';
      if (patientMsgCount === 1) {
        // Question 1: Site / Anatomical Location
        if (language === 'ta') {
          aiResponseText = 'புரிந்தது. இந்த பிரச்சனை அல்லது வலி உடலின் எந்தப் பகுதியில் சரியாக உள்ளது (எ.கா. மார்பின் மையம், தலை, அல்லது மேல் வயிறு)?';
        } else if (language === 'hi') {
          aiResponseText = 'समझ गया। यह दर्द या परेशानी शरीर के किस हिस्से में है (जैसे: सीने के बीच में, सिर, या ऊपरी पेट)?';
        } else {
          aiResponseText = 'Understood. Where exactly in your body is this pain or discomfort located (e.g. central chest, forehead, or upper abdomen)?';
        }
      } else if (patientMsgCount === 2) {
        // Question 2: Onset / Duration
        if (language === 'ta') {
          aiResponseText = 'சரி. இது எப்போது தொடங்கியது, அல்லது எத்தனை மணிநேரம் அல்லது நாட்களுக்கு முன்பு இதை முதன்முதலில் கவனித்தீர்கள்?';
        } else if (language === 'hi') {
          aiResponseText = 'ठीक है। यह कब शुरू हुआ, या कितने घंटे या दिन पहले आपने इसे महसूस किया?';
        } else {
          aiResponseText = 'Got it. When did this symptom start, or how many hours or days ago did you first notice it?';
        }
      } else if (patientMsgCount === 3) {
        // Question 3: Character / Feeling
        if (language === 'ta') {
          aiResponseText = 'நன்றி. இந்த வலியை எவ்வாறு விவரிப்பீர்கள் (எ.கா. பாரமாக அமுக்குவது போல், கூர்மையான வலி, அல்லது எரியும் உணர்வு)?';
        } else if (language === 'hi') {
          aiResponseText = 'धन्यवाद। आप इस दर्द को कैसे बयां करेंगे (जैसे भारी दबाव, तेज़ चुभन वाला दर्द, या जलन)?';
        } else {
          aiResponseText = 'Thank you. How would you describe the feeling (e.g. heavy squeezing pressure, sharp pain, or burning)?';
        }
      } else if (patientMsgCount === 4) {
        // Question 4: Radiation
        if (language === 'ta') {
          aiResponseText = 'இந்த வலி உடலின் பிற இடங்களுக்கு பரவுகிறதா (எ.கா. இடது கை, தோள்பட்டை, முதுகு, அல்லது தாடை)?';
        } else if (language === 'hi') {
          aiResponseText = 'क्या यह दर्द शरीर के किसी अन्य हिस्से में फैल रहा है (जैसे बाईं बाँह, कंधा, पीठ, या जबड़ा)?';
        } else {
          aiResponseText = 'Does this pain or discomfort spread anywhere else (such as to your left arm, shoulder, back, or jaw)?';
        }
      } else if (patientMsgCount === 5) {
        // Question 5: Associated Symptoms
        if (language === 'ta') {
          aiResponseText = 'இதனுடன் உங்களுக்கு மூச்சுத்திணறல், அதிக வேர்வை, காய்ச்சல் அல்லது மயக்கம் போன்ற பிற அறிகுறிகள் உள்ளதா?';
        } else if (language === 'hi') {
          aiResponseText = 'क्या इसके साथ आपको सांस फूलना, पसीना आना, बुखार या चक्कर आने जैसे अन्य लक्षण हैं?';
        } else {
          aiResponseText = 'Are you experiencing any associated symptoms along with this, such as breathlessness, sweating, fever, or dizziness?';
        }
      } else if (patientMsgCount === 6) {
        // Question 6: Timing / Pattern
        if (language === 'ta') {
          aiResponseText = 'இந்த அசௌகரியம் எப்போதும் ஒரே மாதிரியாக உள்ளதா, அல்லது அலை அலையாக வந்து போகிறதா?';
        } else if (language === 'hi') {
          aiResponseText = 'क्या यह दर्द लगातार बना रहता है, या रह-रहकर आता और जाता है?';
        } else {
          aiResponseText = 'Is the discomfort constant all the time, or does it come and go in waves or episodes?';
        }
      } else if (patientMsgCount === 7) {
        // Question 7: Exacerbating / Relieving Factors
        if (language === 'ta') {
          aiResponseText = 'ஏதேனும் செய்தால் வலி அதிகமா அல்லது குறைகிறதா (எ.கா. நடப்பது, ஓய்வு எடுப்பது, ஆழமான மூச்சு எடுப்பது)?';
        } else if (language === 'hi') {
          aiResponseText = 'क्या किसी काम से दर्द बढ़ता या कम होता है (जैसे चलने से, आराम करने से, या गहरी सांस लेने से)?';
        } else {
          aiResponseText = 'Does anything make the pain better or worse (such as rest, walking, deep breathing, or lying down)?';
        }
      } else if (patientMsgCount === 8) {
        // Question 8: Severity Scale 1-10
        if (language === 'ta') {
          aiResponseText = '1 முதல் 10 வரையிலான அளவில் (10 என்பது தாங்க முடியாத வலி), தற்போது இதன் தீவிரம் எவ்வளவு?';
        } else if (language === 'hi') {
          aiResponseText = '1 से 10 के पैमाने पर (जहाँ 10 असहनीय दर्द है), अभी इसका दर्द कितना तेज़ है?';
        } else {
          aiResponseText = 'On a scale of 1 to 10 (where 10 is unbearable pain), how severe is the pain right now?';
        }
      } else {
        // Final Completion Summary
        if (language === 'ta') {
          aiResponseText = 'நன்றி! உங்கள் மருத்துவ வரலாறு மற்றும் 8 SOCRATES அம்சங்களும் முழுமையாக EMR கேஸ் சுருக்கமாக பதிவு செய்யப்பட்டுள்ளன.';
        } else if (language === 'hi') {
          aiResponseText = 'धन्यवाद! सभी 8 SOCRATES क्लिनिकल आयाम डॉक्टर के EMR के लिए सफलतापूर्वक दर्ज कर लिए गए हैं।';
        } else {
          aiResponseText = 'Thank you! All 8 SOCRATES clinical dimensions (Site, Onset, Character, Radiation, Associated Symptoms, Timing, Exacerbating factors, Severity) have been fully captured into your EMR case summary.';
        }
      }

      const aiMsg: TranscriptItem = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language,
      };
      setTranscript((prev) => [...prev, aiMsg]);
    }, 900);
  };

  // OCR Processing with Real File Data URLs & Extracted Meds
  const simulateOcrUpload = (customName?: string, dataUrl?: string, file?: File) => {
    const fileName = customName || (file ? file.name : 'Uploaded_Prescription_Scan.png');
    const previewUrl = dataUrl || (file ? URL.createObjectURL(file) : 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80');

    setOcrDocument((prev) => ({
      ...prev,
      fileName,
      fileUrl: previewUrl,
      isScanning: true,
    }));

    setTimeout(() => {
      // Dynamic extractions based on file or name
      const isCardio = fileName.toLowerCase().includes('cardio') || fileName.toLowerCase().includes('ecg');
      const extractedMedsList: ExtractedMedication[] = isCardio
        ? [
            { id: 'm20', name: 'Atorvastatin', dosage: '20 mg', frequency: '0-0-1 (Night)', duration: '30 Days', confidence: 97, source: 'OCR' },
            { id: 'm21', name: 'Clopidogrel (75mg)', dosage: '75 mg', frequency: '1-0-0 (Morning)', duration: '30 Days', confidence: 95, source: 'OCR' },
            { id: 'm22', name: 'Metoprolol', dosage: '25 mg', frequency: '1-0-1 (BD)', duration: '15 Days', confidence: 91, source: 'OCR' },
          ]
        : [
            { id: 'm10', name: 'Paracetamol (Calpol)', dosage: '650 mg', frequency: '1-1-1 (TDS)', duration: '3 Days', confidence: 96, source: 'OCR' },
            { id: 'm11', name: 'Amoxicillin + Clavulanate', dosage: '625 mg', frequency: '1-0-1 (BD)', duration: '5 Days', confidence: 93, source: 'OCR' },
            { id: 'm12', name: 'Pantoprazole', dosage: '40 mg', frequency: '1-0-0 (Before meals)', duration: '5 Days', confidence: 89, source: 'OCR' },
          ];

      setOcrDocument((prev) => ({
        ...prev,
        isScanning: false,
        overallConfidence: 94,
        extractedMeds: extractedMedsList,
      }));

      // Update Doctor Summary Medications field dynamically
      const medsSummary = extractedMedsList.map((m) => `${m.name} ${m.dosage} (${m.frequency})`).join(', ');
      setDoctorSummary((prev) => ({
        ...prev,
        medications: {
          ...prev.medications,
          value: medsSummary,
          originalValue: medsSummary,
          source: 'OCR',
          confidence: 94,
        },
      }));
    }, 2500);
  };

  // Doctor editing field
  const updateDoctorField = (fieldKey: keyof DoctorSummary, newValue: string) => {
    setDoctorSummary((prev) => ({
      ...prev,
      [fieldKey]: {
        ...prev[fieldKey],
        value: newValue,
        status: newValue === prev[fieldKey].originalValue ? 'accepted' : 'edited',
      },
    }));
  };

  const acceptField = (fieldKey: keyof DoctorSummary) => {
    setDoctorSummary((prev) => ({
      ...prev,
      [fieldKey]: {
        ...prev[fieldKey],
        status: 'accepted',
      },
    }));
  };

  const acceptAllFields = () => {
    setDoctorSummary((prev) => {
      const next = { ...prev };
      (Object.keys(next) as Array<keyof DoctorSummary>).forEach((k) => {
        next[k] = { ...next[k], status: 'accepted' };
      });
      return next;
    });
  };

  const acknowledgeRedFlag = () => {
    setRedFlag((prev) => ({ ...prev, acknowledged: true }));
  };

  const resetDemoState = () => {
    setScenario('chest_pain');
    setSocrates(defaultSocrates);
    setDoctorSummary(defaultDoctorSummary);
    setRedFlag({
      triggered: true,
      ruleName: 'CARD-EMERGENCY-01',
      severity: 'CRITICAL',
      description: 'Central chest pain + exertional dyspnea detected.',
      acknowledged: false,
      timestamp: 'Just now',
    });
    setInterviewProgress(75);
    setIsAutoDemoRunning(false);
    setAutoDemoPipelineStep(0);
  };

  // Export FHIR Bundle
  const getFhirBundleJson = () => {
    const fhirObject = {
      resourceType: 'Bundle',
      id: 'saarthi-fhir-bundle-2026',
      meta: {
        lastUpdated: new Date().toISOString(),
        profile: ['https://nrces.in/ndhm/fhir/r4/StructureDefinition/ClinicalDocBundle'],
      },
      type: 'document',
      timestamp: new Date().toISOString(),
      entry: [
        {
          fullUrl: `urn:uuid:${patientInfo.id}`,
          resource: {
            resourceType: 'Patient',
            id: patientInfo.id,
            identifier: [
              {
                system: 'https://healthid.ndhm.gov.in',
                value: patientInfo.abhaId,
              },
            ],
            name: [{ text: patientInfo.name }],
            telecom: [{ system: 'phone', value: patientInfo.phone }],
            gender: 'male',
            birthDate: '1984-05-14',
          },
        },
        {
          fullUrl: 'urn:uuid:observation-chief-complaint',
          resource: {
            resourceType: 'Observation',
            status: 'final',
            code: {
              coding: [
                { system: 'http://snomed.info/sct', code: '29857009', display: 'Chest pain' },
              ],
              text: doctorSummary.chiefComplaint.value,
            },
            subject: { reference: `Patient/${patientInfo.id}` },
            effectiveDateTime: new Date().toISOString(),
            valueString: doctorSummary.chiefComplaint.value,
            component: [
              {
                code: { text: 'AI Confidence Score' },
                valueQuantity: { value: doctorSummary.chiefComplaint.confidence, unit: '%' },
              },
              {
                code: { text: 'Data Origin' },
                valueString: doctorSummary.chiefComplaint.source,
              },
            ],
          },
        },
        {
          fullUrl: 'urn:uuid:condition-red-flag',
          resource: {
            resourceType: 'Condition',
            clinicalStatus: {
              coding: [{ system: 'http://terminology.hl7.org/CodeSystem/condition-clinical', code: 'active' }],
            },
            verificationStatus: {
              coding: [{ system: 'http://terminology.hl7.org/CodeSystem/condition-ver-status', code: 'unconfirmed' }],
              text: 'Doctor Verification Required (AI Safety Rule)',
            },
            category: [
              {
                coding: [{ system: 'http://terminology.hl7.org/CodeSystem/condition-category', code: 'encounter-diagnosis' }],
              },
            ],
            severity: {
              text: redFlag.severity,
            },
            code: { text: redFlag.ruleName },
            subject: { reference: `Patient/${patientInfo.id}` },
          },
        },
      ],
    };
    return JSON.stringify(fhirObject, null, 2);
  };

  const [isEmrFinalized, setIsEmrFinalized] = useState<boolean>(false);
  const [emrConfirmationId, setEmrConfirmationId] = useState<string>('EMR-2026-98214');

  const finalizeToEmr = () => {
    setIsEmrFinalized(true);
    setEmrConfirmationId(`EMR-2026-${Math.floor(10000 + Math.random() * 90000)}`);
    acceptAllFields();
  };

  const loadPresetPatient = (presetKey: 'lakshmi' | 'karthik' | 'sunita') => {
    setIsEmrFinalized(false);
    if (presetKey === 'lakshmi') {
      setPatientInfo({
        id: 'PAT-2026-B208',
        name: 'Lakshmi Narayanan',
        age: 61,
        gender: 'Female',
        phone: '+91 98402 81920',
        abhaId: '91-8204-1029-4821',
        token: 'Token B-208',
        opd: 'General Medicine OPD',
        waited: 'Waited 6 min',
      });
      setDoctorSummary(defaultDoctorSummary);
    } else if (presetKey === 'karthik') {
      setPatientInfo({
        id: 'PAT-2026-8891',
        name: 'Karthik Subramanian',
        age: 42,
        gender: 'Male',
        phone: '+91 98401 23456',
        abhaId: '91-4820-1928-3019',
        token: 'OPD-A42',
        opd: 'Cardiology / General Med',
        waited: 'Waited 12 min',
      });
    } else if (presetKey === 'sunita') {
      setPatientInfo({
        id: 'PAT-2026-8892',
        name: 'Sunita Sharma',
        age: 58,
        gender: 'Female',
        phone: '+91 98100 45678',
        abhaId: '91-3019-2049-8812',
        token: 'OPD-A43',
        opd: 'AYUSH / Ayurvedic OPD',
        waited: 'Waited 4 min',
      });
    }
  };

  const loadPatientFromQueue = (patientId: string) => {
    setIsEmrFinalized(false);
    const found = patientQueue.find((p) => p.id === patientId);
    if (!found) return;

    setPatientInfo({
      id: found.id,
      name: found.name,
      age: found.age,
      gender: found.gender,
      phone: '+91 98401 ' + Math.floor(10005 + Math.random() * 89999),
      abhaId: '91-4820-1928-3019',
      token: found.token,
      opd: found.dept,
      waited: 'Waited 3 min',
    });

    if (found.doctorSummary) {
      setDoctorSummary(found.doctorSummary);
    } else if (found.presetKey === 'lakshmi' || found.presetKey === 'karthik' || found.presetKey === 'sunita') {
      loadPresetPatient(found.presetKey);
      return;
    } else {
      setDoctorSummary(emptyDoctorSummary);
    }

    if (found.socrates) {
      setSocrates(found.socrates);
      const activeCount = Object.values(found.socrates).filter((s) => s.status).length;
      setInterviewProgress(Math.min(100, Math.round((activeCount / 8) * 100)));
    } else if (found.presetKey) {
      setSocrates(defaultSocrates);
      setInterviewProgress(94);
    } else {
      setSocrates(emptySocrates);
      setInterviewProgress(0);
    }

    if (found.transcript) {
      setTranscript(found.transcript);
    }

    if (found.redFlag) {
      setRedFlag(found.redFlag);
    }
  };

  return (
    <DemoStateContext.Provider
      value={{
        scenario,
        language,
        setLanguage,
        patientInfo,
        patientQueue,
        updatePatientInfo,
        setPatientToken,
        loadPatientFromQueue,
        interviewProgress,
        socrates,
        transcript,
        ocrDocument,
        redFlag,
        doctorSummary,
        enableAyushMode,
        setEnableAyushMode,
        ayushPrakriti,
        isAutoDemoRunning,
        autoDemoPipelineStep,
        isEmrFinalized,
        emrConfirmationId,
        startNewPatientInterview,
        selectScenario,
        run30SecondDemo,
        stopAutoDemo,
        sendPatientMessage,
        simulateOcrUpload,
        updateDoctorField,
        acceptField,
        acceptAllFields,
        acknowledgeRedFlag,
        resetDemoState,
        getFhirBundleJson,
        finalizeToEmr,
        loadPresetPatient,
      }}
    >
      {children}
    </DemoStateContext.Provider>
  );
};

export const useDemoState = () => {
  const context = useContext(DemoStateContext);
  if (!context) {
    throw new Error('useDemoState must be used within a DemoStateProvider');
  }
  return context;
};
