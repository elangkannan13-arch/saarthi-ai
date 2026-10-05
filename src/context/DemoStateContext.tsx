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

export interface ExtractedClinicalData {
  chiefComplaint?: string;
  duration?: string;
  location?: string;
  character?: string;
  radiation?: string;
  associated?: string;
  timing?: string;
  exacerbating?: string;
  severity?: string;
}

export const parsePatientClinicalData = (text: string, turn: number): ExtractedClinicalData => {
  const lower = text.toLowerCase().trim();
  const res: ExtractedClinicalData = {};

  // 1. Duration / Onset extraction
  const durationMatch = text.match(/\b(for\s+)?(\d+\s*(days?|hours?|weeks?|months?|years?|day|hour|week|month|year))\b/i)
                     || text.match(/\b(since\s+)?(yesterday|today|last\s+night|\d+\s*days?\s*ago|\d+\s*hours?\s*ago)\b/i);
  if (durationMatch) {
    res.duration = durationMatch[2] || durationMatch[0];
  }

  // 2. Severity extraction (e.g. "6", "6/10", "severity 6", "7 out of 10")
  const severityMatch = text.match(/\b([1-9]|10)(\s*\/\s*10|\s*out\s*of\s*10)?\b/i);
  if (severityMatch && (text.length <= 15 || turn >= 3 || /severity|scale|rate|pain|score|level/i.test(text) || /^\d+$/.test(lower))) {
    res.severity = `${severityMatch[1]}/10`;
  } else if (/unbearable|very severe|extreme/i.test(lower)) {
    res.severity = '9/10 (Severe)';
  } else if (/severe|terrible|bad/i.test(lower)) {
    res.severity = '8/10 (Severe)';
  } else if (/moderate|medium/i.test(lower)) {
    res.severity = '5/10 (Moderate)';
  } else if (/mild|slight|low/i.test(lower)) {
    res.severity = '3/10 (Mild)';
  }

  // 3. Location / Site extraction
  if (/front|back|top|left|right|side|forehead|head|chest|stomach|abdomen|temple|neck|throat|lower|upper|arm|leg|knee|shoulder|jaw/i.test(text)) {
    res.location = text;
  }

  // 4. Character extraction
  if (/squeezing|sharp|dull|throbbing|burning|tight|heavy|aching|stabbing|cramping/i.test(text)) {
    const charMatch = text.match(/squeezing|sharp|dull|throbbing|burning|tight|heavy|aching|stabbing|cramping/i);
    if (charMatch) {
      res.character = charMatch[0].charAt(0).toUpperCase() + charMatch[0].slice(1);
    }
  }

  // 5. Chief Complaint extraction
  const complaintMatch = text.match(/\b(headache|head ache|fever|chest pain|stomach pain|stomach ache|cough|cold|body ache|back pain|nausea|vomiting|dizziness|breathlessness|joint pain|sore throat|pain)\b/i);
  if (complaintMatch) {
    const raw = complaintMatch[0];
    res.chiefComplaint = raw.charAt(0).toUpperCase() + raw.slice(1);
  } else if (turn === 1) {
    const cleanText = text.replace(/\b(for|since)\s+\d+\s*(days?|hours?|weeks?|months?)\b/gi, '').replace(/\bI have\b|\bI am having\b|\bthere is\b/gi, '').trim();
    if (cleanText) {
      res.chiefComplaint = cleanText.charAt(0).toUpperCase() + cleanText.slice(1);
    } else {
      res.chiefComplaint = text;
    }
  }

  return res;
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
    const patientMsgCount = transcript.filter((m) => m.sender === 'patient').length + 1;

    // Detect context of the previous AI question asked
    const lastAiMsgObj = transcript.slice().reverse().find((m) => m.sender === 'ai');
    const lastAiMsgText = lastAiMsgObj ? lastAiMsgObj.text : '';

    const askedLocation = /where exactly|located|பகுதியில்|हिस्से में|எந்தப் பகுதியில்/i.test(lastAiMsgText);
    const askedOnset = /when did this|how many|எப்போது|कब शुरू|கவனித்தீர்கள்/i.test(lastAiMsgText);
    const askedSeverity = /1 to 10|10 is unbearable|severity|10 வரை|10 के पैमाने|தீவிரம்|दर्द कितना/i.test(lastAiMsgText);
    const askedCharacter = /describe the feeling|feeling|விவரிப்பீர்கள்|बयां करेंगे|பாரமாக/i.test(lastAiMsgText);
    const askedAssociated = /associated symptoms|nausea|fever|breathlessness|பிற அறிகுறிகள்|अन्य लक्षण/i.test(lastAiMsgText);

    // Smart clinical entity extraction
    const extracted = parsePatientClinicalData(text, patientMsgCount);

    let nextSocrates: SocratesState = { ...socrates };

    // Apply extracted entities into SOCRATES with question context matching
    if (extracted.chiefComplaint && !nextSocrates.site.status) {
      nextSocrates.site = { val: extracted.chiefComplaint, status: true, confidence: 96 };
    }
    if (extracted.location) {
      nextSocrates.site = { val: extracted.location, status: true, confidence: 96 };
    } else if (askedLocation && text) {
      nextSocrates.site = { val: text, status: true, confidence: 92 };
    }

    if (extracted.duration) {
      nextSocrates.onset = { val: extracted.duration, status: true, confidence: 94 };
    } else if (askedOnset && text) {
      nextSocrates.onset = { val: text, status: true, confidence: 92 };
    }

    if (extracted.severity) {
      nextSocrates.severity = { val: extracted.severity, status: true, confidence: 98 };
    } else if (askedSeverity && text) {
      const numMatch = text.match(/\b([1-9]|10)\b/);
      let sevVal = numMatch ? `${numMatch[1]}/10` : text;
      nextSocrates.severity = { val: sevVal, status: true, confidence: 90 };
    }

    if (extracted.character) {
      nextSocrates.character = { val: extracted.character, status: true, confidence: 92 };
    } else if (askedCharacter && text) {
      nextSocrates.character = { val: text, status: true, confidence: 92 };
    }

    if (extracted.associated) {
      nextSocrates.associated = { val: extracted.associated, status: true, confidence: 95 };
    } else if (askedAssociated && text) {
      nextSocrates.associated = { val: text, status: true, confidence: 92 };
    }

    // Default negative screening for secondary SOCRATES items so progress moves seamlessly
    if (nextSocrates.site.status && !nextSocrates.radiation.status) {
      nextSocrates.radiation = { val: 'No radiation reported', status: true, confidence: 90 };
    }
    if (nextSocrates.onset.status && !nextSocrates.timing.status) {
      nextSocrates.timing = { val: 'Continuous / Intermittent', status: true, confidence: 90 };
    }
    if (nextSocrates.character.status && !nextSocrates.exacerbating.status) {
      nextSocrates.exacerbating = { val: 'None reported', status: true, confidence: 90 };
    }

    // Dynamic Turn Fallbacks (guarantees advancement even if input was unparsed)
    if (patientMsgCount === 1 && !nextSocrates.site.status) {
      nextSocrates.site = { val: text, status: true, confidence: 96 };
    }
    if (patientMsgCount >= 2 && !nextSocrates.site.status) {
      nextSocrates.site = { val: text, status: true, confidence: 90 };
    }
    if (patientMsgCount >= 3 && !nextSocrates.onset.status) {
      nextSocrates.onset = { val: text, status: true, confidence: 90 };
    }
    if (patientMsgCount >= 4 && !nextSocrates.severity.status) {
      nextSocrates.severity = { val: text, status: true, confidence: 90 };
    }
    if (patientMsgCount >= 5 && !nextSocrates.character.status) {
      nextSocrates.character = { val: text, status: true, confidence: 90 };
    }
    if (patientMsgCount >= 6 && !nextSocrates.associated.status) {
      nextSocrates.associated = { val: text, status: true, confidence: 90 };
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

    // Carry information forward into Doctor Summary & HPI Narrative
    let nextDoctorSummary: DoctorSummary = { ...doctorSummary };

    const currentComplaint = extracted.chiefComplaint || (patientMsgCount === 1 ? text : nextDoctorSummary.chiefComplaint.value);
    const currentDuration = extracted.duration || (nextSocrates.onset.status ? nextSocrates.onset.val : '');

    if (currentComplaint && !currentComplaint.startsWith('Awaiting')) {
      const complaintStr = currentDuration && !currentComplaint.includes(currentDuration) ? `${currentComplaint} (${currentDuration})` : currentComplaint;
      nextDoctorSummary.chiefComplaint = {
        key: 'chiefComplaint',
        label: 'Chief complaint',
        value: complaintStr,
        originalValue: complaintStr,
        confidence: 96,
        source: 'Patient Voice',
        status: 'ai_draft',
      };
    }

    // Construct Clinical Narrative HPI Story strictly from real patient input
    const sanitizeVal = (str?: string) => {
      if (!str) return '';
      const clean = str.trim();
      if (clean.length <= 2 && clean.toLowerCase() !== 'no') return '';
      if (/^(h|hh|mm|mmm|ok|okay|yes)$/i.test(clean)) return '';
      return clean;
    };

    const mainSymptom = sanitizeVal(extracted.chiefComplaint) || sanitizeVal(nextSocrates.site.val);
    const cleanDuration = sanitizeVal(extracted.duration) || sanitizeVal(nextSocrates.onset.val);
    const currentLoc = sanitizeVal(extracted.location);
    const currentChar = sanitizeVal(extracted.character) || (nextSocrates.character.status ? sanitizeVal(nextSocrates.character.val) : '');
    const currentAssoc = sanitizeVal(extracted.associated) || (nextSocrates.associated.status ? sanitizeVal(nextSocrates.associated.val) : '');
    const currentSev = sanitizeVal(extracted.severity) || (nextSocrates.severity.status ? sanitizeVal(nextSocrates.severity.val) : '');

    const narrativeParts: string[] = [];
    if (mainSymptom) {
      narrativeParts.push(`Patient presents with ${mainSymptom}${cleanDuration ? ` for ${cleanDuration}` : ''}.`);
    } else if (cleanDuration) {
      narrativeParts.push(`Symptoms reported for ${cleanDuration}.`);
    }

    if (currentLoc && mainSymptom && currentLoc.toLowerCase() !== mainSymptom.toLowerCase()) {
      narrativeParts.push(`Location specified: ${currentLoc}.`);
    }
    if (currentChar && currentChar !== 'Not specified') {
      narrativeParts.push(`Character: ${currentChar}.`);
    }
    if (currentSev && currentSev !== 'Not specified') {
      narrativeParts.push(`Severity scale: ${currentSev}.`);
    }
    if (currentAssoc && currentAssoc !== 'None reported') {
      narrativeParts.push(`Associated symptoms: ${currentAssoc}.`);
    }

    const clinicalStory = narrativeParts.length > 0 ? narrativeParts.join(' ') : `Patient reported intake details via voice: "${text}".`;
    nextDoctorSummary.hpi = {
      key: 'hpi',
      label: 'History of present illness',
      value: clinicalStory,
      originalValue: clinicalStory,
      confidence: 95,
      source: 'Patient Voice',
      status: 'ai_draft',
    };

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

    // Adaptive Scripted Multi-Turn AI Clinical Questioning (Systematic AI Vaidya Questions)
    setTimeout(() => {
      const candidateQuestions: { key: string; textEn: string; textTa: string; textHi: string }[] = [];

      if (!nextSocrates.site.status || !nextSocrates.site.val) {
        candidateQuestions.push({
          key: 'site',
          textEn: 'Understood. Where exactly is this pain located (e.g. front side of head, forehead, or temples)?',
          textTa: 'புரிந்தது. இந்த வலி அல்லது பிரச்சனை உடலின் எந்தப் பகுதியில் சரியாக உள்ளது (எ.கா. தலை முன்பகுதி, நெற்றி, அல்லது பக்கவாட்டில்)?',
          textHi: 'समझ गया। यह दर्द या परेशानी सिर या शरीर के किस हिस्से में है (जैसे सिर का अगला हिस्सा, माथा, या साइड में)?',
        });
      }
      if (!nextSocrates.onset.status) {
        candidateQuestions.push({
          key: 'onset',
          textEn: 'Got it. When did this symptom start, or how many hours or days ago did you first notice it?',
          textTa: 'சரி. இது எப்போது தொடங்கியது, அல்லது எத்தனை நாட்களுக்கு முன்பு இதை கவனித்தீர்கள்?',
          textHi: 'ठीक है। यह कब शुरू हुआ, या कितने दिन पहले आपने इसे महसूस किया?',
        });
      }
      if (!nextSocrates.severity.status) {
        candidateQuestions.push({
          key: 'severity',
          textEn: 'On a scale of 1 to 10 (where 10 is unbearable pain), how severe is the pain right now?',
          textTa: '1 முதல் 10 வரையிலான அளவில் (10 என்பது தாங்க முடியாத வலி), தற்போது இதன் தீவிரம் எவ்வளவு?',
          textHi: '1 से 10 के पैमाने पर (जहाँ 10 असहनीय दर्द है), अभी इसका दर्द कितना तेज़ है?',
        });
      }
      if (!nextSocrates.character.status) {
        candidateQuestions.push({
          key: 'character',
          textEn: 'Thank you. How would you describe the feeling (e.g. heavy squeezing pressure, sharp pain, or throbbing)?',
          textTa: 'நன்றி. இந்த வலியை எவ்வாறு விவரிப்பீர்கள் (எ.கா. பாரமாக அமுக்குவது போல், கூர்மையான வலி, அல்லது எரியும் உணர்வு)?',
          textHi: 'धन्यवाद। आप इस दर्द को कैसे बयां करेंगे (जैसे भारी दबाव, तेज़ चुभन वाला दर्द, या जलन)?',
        });
      }
      if (!nextSocrates.associated.status) {
        candidateQuestions.push({
          key: 'associated',
          textEn: 'Are you experiencing any associated symptoms along with this, such as nausea, dizziness, fever, or breathlessness?',
          textTa: 'இதனுடன் உங்களுக்கு மூச்சுத்திணறல், அதிக வேர்வை, காய்ச்சல் அல்லது மயக்கம் போன்ற பிற அறிகுறிகள் உள்ளதா?',
          textHi: 'क्या इसके साथ आपको सांस फूलना, पसीना आना, बुखार या चक्कर आने जैसे अन्य लक्षण हैं?',
        });
      }

      // Pick question that has NOT been asked yet in the transcript
      let chosen = candidateQuestions.find((q) => {
        const questionText = language === 'ta' ? q.textTa : language === 'hi' ? q.textHi : q.textEn;
        return !nextTranscript.some((m) => m.sender === 'ai' && m.text === questionText);
      });

      let aiResponseText = '';
      if (chosen) {
        aiResponseText = language === 'ta' ? chosen.textTa : language === 'hi' ? chosen.textHi : chosen.textEn;
      } else {
        // Ensure all 8 SOCRATES items marked status: true on completion using real input or 'Not specified'
        nextSocrates.site = nextSocrates.site.status ? nextSocrates.site : { val: text, status: true, confidence: 96 };
        nextSocrates.onset = nextSocrates.onset.status ? nextSocrates.onset : { val: 'Not specified', status: true, confidence: 90 };
        nextSocrates.severity = nextSocrates.severity.status ? nextSocrates.severity : { val: 'Not specified', status: true, confidence: 90 };
        nextSocrates.character = nextSocrates.character.status ? nextSocrates.character : { val: 'Not specified', status: true, confidence: 90 };
        nextSocrates.associated = nextSocrates.associated.status ? nextSocrates.associated : { val: 'None reported', status: true, confidence: 90 };
        nextSocrates.radiation = nextSocrates.radiation.status ? nextSocrates.radiation : { val: 'No radiation reported', status: true, confidence: 90 };
        nextSocrates.timing = nextSocrates.timing.status ? nextSocrates.timing : { val: 'Continuous / Intermittent', status: true, confidence: 90 };
        nextSocrates.exacerbating = nextSocrates.exacerbating.status ? nextSocrates.exacerbating : { val: 'None reported', status: true, confidence: 90 };

        setSocrates(nextSocrates);
        setInterviewProgress(100);

        if (language === 'ta') {
          aiResponseText = 'நன்றி! உங்கள் மருத்துவ வரலாறு மற்றும் அனைத்து SOCRATES அம்சங்களும் மருத்துவர் பார்வையிடுவதற்காக பதிவு செய்யப்பட்டுள்ளன.';
        } else if (language === 'hi') {
          aiResponseText = 'धन्यवाद! आपकी पूरी केस हिस्ट्री डॉक्टर के रिव्यू के लिए सुरक्षित रूप से दर्ज कर ली गई है।';
        } else {
          aiResponseText = 'Thank you! Your complete clinical story and SOCRATES history have been captured for your doctor to review.';
        }
      }

      const aiMsg: TranscriptItem = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language,
      };
      const updatedTrans = [...nextTranscript, aiMsg];
      setTranscript(updatedTrans);

      // Keep patientQueue in sync with latest transcript
      setPatientQueue((prevQueue) => {
        const updated = prevQueue.map((p) => {
          if (p.id === patientInfo.id || p.token === patientInfo.token || p.name.toLowerCase() === patientInfo.name.toLowerCase()) {
            return { ...p, transcript: updatedTrans };
          }
          return p;
        });
        if (typeof window !== 'undefined') {
          localStorage.setItem('saarthi_patient_queue', JSON.stringify(updated));
        }
        return updated;
      });
    }, 800);
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
