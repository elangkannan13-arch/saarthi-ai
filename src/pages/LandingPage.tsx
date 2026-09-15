import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemoState } from '../context/DemoStateContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ThreeEntrancesSection } from '../components/ThreeEntrancesSection';
import { FHIRViewer } from '../components/FHIRViewer';
import { Play, Sparkles, ArrowRight, Activity, Clock, ShieldAlert, CheckCircle2, Mic, FileText, Stethoscope, ChevronRight, Zap } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { run30SecondDemo } = useDemoState();
  const [isFhirModalOpen, setIsFhirModalOpen] = useState(false);

  // Timer simulation state for 02:00 problem section
  const [timerSeconds, setTimerSeconds] = useState(120);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 120));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Mini live simulation animation state
  const [simStep, setSimStep] = useState(0);
  const [simRunning, setSimRunning] = useState(false);

  const startMiniSim = () => {
    setSimRunning(true);
    setSimStep(1);
    setTimeout(() => setSimStep(2), 1200);
    setTimeout(() => setSimStep(3), 2400);
    setTimeout(() => setSimStep(4), 3600);
    setTimeout(() => setSimStep(5), 4800);
    setTimeout(() => setSimRunning(false), 6000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      <Navbar onOpenFhirModal={() => setIsFhirModalOpen(true)} />

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white border-b border-slate-800">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-extrabold tracking-wider uppercase">
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>AI Clinical Co-Pilot for Indian Hospitals & OPDs</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
                Give the doctor their <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent">two minutes back.</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
                Saarthi.AI turns a patient's voice, symptoms, prescriptions and medical history into a structured, physician-editable clinical story — <strong className="text-white">before the consultation begins.</strong>
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigate('/patient/onboarding')}
                  className="px-6 py-4 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm shadow-xl shadow-teal-500/25 transition-all hover:scale-105 flex items-center gap-2"
                >
                  <Mic className="w-5 h-5" />
                  <span>Start Patient Demo</span>
                </button>

                <button
                  onClick={() => navigate('/doctor/queue')}
                  className="px-6 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-all hover:scale-105 flex items-center gap-2"
                >
                  <Stethoscope className="w-5 h-5 text-teal-400" />
                  <span>Open Doctor Dashboard</span>
                </button>

                <button
                  onClick={() => navigate('/demo')}
                  className="px-5 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-teal-300 font-extrabold text-sm border border-teal-500/40 transition-all flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current text-amber-400" />
                  <span>Watch How It Works</span>
                </button>
              </div>

              {/* Tagline Footer */}
              <p className="text-xs text-slate-400 pt-2 italic">
                “We don't replace the doctor. We give the doctor back their time.”
              </p>
            </div>

            {/* Hero Right Interactive Engine Mockup */}
            <div className="lg:col-span-6">
              <div className="bg-slate-900/90 border border-teal-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl space-y-5">
                {/* Floating Status Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-teal-400 animate-ping"></span>
                    <span className="text-xs font-black text-teal-300 uppercase tracking-wider">AI Interview Active</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs font-semibold text-slate-300">
                    <span className="bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">Language: Tamil (தமிழ்)</span>
                    <span className="bg-emerald-950 text-emerald-300 px-2.5 py-1 rounded-lg border border-emerald-500/40">Confidence: 96%</span>
                  </div>
                </div>

                {/* Patient Speech Input Box */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <Mic className="w-4 h-4 text-teal-400 animate-pulse" /> Patient Voice Input (Speech-to-Text)
                  </div>
                  <p className="text-sm font-semibold text-teal-200">
                    “எனக்கு இரண்டு நாட்களாக மார்பு வலி இருக்கிறது. நடக்கும்போது மூச்சுத்திணறலும் உள்ளது…”
                  </p>
                </div>

                {/* Live AI Transcript Output */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-teal-500/40 space-y-1">
                  <span className="text-[10px] font-extrabold text-teal-400 uppercase tracking-wider">
                    Animated AI Transcript
                  </span>
                  <p className="text-base font-extrabold text-white">
                    “Chest pain for 2 days with exertional breathlessness”
                  </p>
                </div>

                {/* Extracted Clinical Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { label: 'Chief Complaint', val: 'Chest pain' },
                    { label: 'Onset', val: '2 days ago' },
                    { label: 'Character', val: 'Tightness, 7/10' },
                    { label: 'Severity', val: 'Severe Exertion' },
                    { label: 'Associated', val: 'Dyspnea' },
                    { label: 'Medications', val: 'Paracetamol 500mg' },
                  ].map((card, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-left space-y-0.5">
                      <span className="text-[10px] font-bold text-slate-400 block">{card.label}</span>
                      <span className="text-xs font-bold text-teal-300 block truncate">{card.val}</span>
                    </div>
                  ))}
                </div>

                {/* AI Audio Waveform Bar */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-teal-400 font-mono">
                    <Activity className="w-4 h-4 animate-pulse" /> Audio Stream Active
                  </span>
                  <span>SOCRATES Protocol Parsing...</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* THREE TAILORED ENTRANCES (PATIENT ENTRY, CLINICIAN ACCESS, ADMIN ACCESS) */}
      <ThreeEntrancesSection />

      {/* PROBLEM SECTION */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-teal-600 bg-teal-50 px-3.5 py-1 rounded-full border border-teal-200">
              The Consultation Problem
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              “The consultation clock is already running.”
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              In high-volume OPDs, doctors spend up to 70% of consultation time asking basic history questions and typing notes manually.
            </p>

            {/* Visual Timer Badge */}
            <div className="pt-2 inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-950 text-white shadow-xl">
              <Clock className="w-6 h-6 text-amber-400 animate-pulse" />
              <span className="font-mono text-3xl font-black text-amber-400">{formatTimer(timerSeconds)}</span>
              <span className="text-xs text-slate-300 font-extrabold uppercase tracking-wider border-l border-slate-800 pl-3">
                “Every second matters.”
              </span>
            </div>
          </div>

          {/* Side-by-Side Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LEFT: Traditional OPD */}
            <div className="bg-red-50/50 border border-red-200 rounded-3xl p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-extrabold text-red-950">Traditional OPD</h3>
                <span className="text-xs font-bold text-red-700 bg-red-100 px-3 py-1 rounded-full border border-red-300">
                  Manual Bottleneck
                </span>
              </div>

              <div className="space-y-4 text-xs font-bold text-slate-700">
                {[
                  '1. Patient enters consultation room cold',
                  '2. Doctor spends 2 minutes asking initial questions',
                  '3. Doctor struggles to read handwritten prescriptions',
                  '4. Patient repeats symptoms multiple times',
                  '5. Doctor types history manually into EMR',
                  '6. Limited time remaining for clinical exam & care',
                ].map((step, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white border border-red-200 shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: With Saarthi.AI */}
            <div className="bg-teal-50/60 border border-teal-300 rounded-3xl p-8 space-y-6 shadow-lg shadow-teal-500/5">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-extrabold text-teal-950">With Saarthi.AI</h3>
                <span className="text-xs font-extrabold text-teal-900 bg-teal-200 px-3 py-1 rounded-full border border-teal-400">
                  AI Streamlined
                </span>
              </div>

              <div className="space-y-4 text-xs font-bold text-slate-800">
                {[
                  '1. Patient starts multilingual voice interview before OPD',
                  '2. AI structures history using SOCRATES protocol',
                  '3. OCR digitizes handwritten prescriptions & labs',
                  '4. Automated rule engine checks emergency red flags',
                  '5. Doctor receives physician-editable case sheet',
                  '6. Doctor focuses 100% on examining the patient',
                ].map((step, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white border border-teal-200 shadow-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW SAARTHI.AI WORKS - 5 STEP TIMELINE */}
      <section id="how-it-works" className="py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-teal-400 bg-teal-950 px-3 py-1 rounded-full border border-teal-500/40">
              End-to-End Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              How Saarthi.AI Powers the Intake
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              A 5-step clinical story pipeline designed specifically for high-throughput Indian hospital workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { num: '01', title: 'Patient Starts', desc: 'QR code scan / Kiosk / Mobile PWA tablet in OPD waiting area', icon: Mic },
              { num: '02', title: 'AI Listens', desc: 'Voice + Touch + Multilingual interaction in Tamil, Hindi, or English', icon: Activity },
              { num: '03', title: 'AI Understands', desc: 'SOCRATES clinical history + OCR document extraction', icon: FileText },
              { num: '04', title: 'AI Checks', desc: 'Red flags + confidence score + historical timeline synthesis', icon: ShieldAlert },
              { num: '05', title: 'Doctor Reviews', desc: 'Editable case sheet + diff tracking + AYUSH insights', icon: Stethoscope },
            ].map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-3xl bg-slate-950 border border-slate-800 hover:border-teal-500/40 transition-all space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-teal-400 font-mono">{step.num}</span>
                    <div className="p-2 rounded-xl bg-slate-900 text-teal-300 border border-slate-800">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-extrabold text-base text-white group-hover:text-teal-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LANDING PAGE WOW MOMENT: MINI LIVE SIMULATION */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-950/80 px-3.5 py-1 rounded-full border border-amber-500/40">
              Interactive Mini Simulation
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              “The doctor sees the story before the patient enters.”
            </h2>
            <p className="text-slate-400 text-sm">
              Click below to witness the real-time clinical intake pipeline in action:
            </p>
          </div>

          {/* Simulation Box */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-teal-500/40 text-left space-y-4 shadow-2xl">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">PATIENT VOICE:</span>
              <span className="text-sm font-semibold text-teal-300">🎤 “I have chest pain and difficulty breathing.”</span>
            </div>

            {/* Animated Pipeline Stage Outputs */}
            <div className="space-y-2 text-xs font-bold font-mono">
              {simStep >= 1 && (
                <div className="p-3 rounded-xl bg-teal-950/80 text-teal-300 border border-teal-500/30 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> VOICE CAPTURED ✓
                </div>
              )}
              {simStep >= 2 && (
                <div className="p-3 rounded-xl bg-teal-950/80 text-teal-300 border border-teal-500/30 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> CLINICAL HISTORY EXTRACTED ✓ (SOCRATES: Central chest, 2 days, 7/10)
                </div>
              )}
              {simStep >= 3 && (
                <div className="p-3 rounded-xl bg-amber-950/80 text-amber-300 border border-amber-500/30 flex items-center gap-2 animate-pulse">
                  <Activity className="w-4 h-4 text-amber-400" /> RED-FLAG CHECK RUNNING...
                </div>
              )}
              {simStep >= 4 && (
                <div className="p-3.5 rounded-xl bg-red-950 text-red-200 border-2 border-red-500 flex items-center gap-2 font-sans font-extrabold shadow-lg">
                  <ShieldAlert className="w-5 h-5 text-red-400" /> 🚨 POTENTIAL RED FLAG DETECTED — Acute Coronary Screening Triggered
                </div>
              )}
              {simStep >= 5 && (
                <div className="p-3 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-500/40 flex items-center justify-between">
                  <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> DOCTOR DASHBOARD UPDATED ✓</span>
                  <button
                    onClick={() => navigate('/doctor/queue')}
                    className="px-3 py-1 rounded bg-emerald-500 text-slate-950 text-[11px] font-black"
                  >
                    View Cockpit
                  </button>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={startMiniSim}
                disabled={simRunning}
                className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs transition-all shadow flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                <span>{simRunning ? 'Simulating Pipeline...' : '▶ Run Mini Simulation'}</span>
              </button>

              <button
                onClick={run30SecondDemo}
                className="text-xs text-teal-400 hover:underline font-bold flex items-center gap-1"
              >
                Launch Full Judge Demo →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL LANDING PAGE STATEMENT & CTA */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 text-white text-center border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            “We didn't just digitize the intake form.”
          </h2>
          <p className="text-xl sm:text-2xl font-bold text-teal-300">
            “We gave the two minutes back to the doctor.”
          </p>

          <div className="pt-6">
            <button
              onClick={() => navigate('/demo')}
              className="px-8 py-5 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 text-slate-950 font-black text-base shadow-2xl shadow-teal-500/30 transition-all hover:scale-105 inline-flex items-center gap-3"
            >
              <span>Experience Saarthi.AI →</span>
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <FHIRViewer isOpen={isFhirModalOpen} onClose={() => setIsFhirModalOpen(false)} />
    </div>
  );
};
