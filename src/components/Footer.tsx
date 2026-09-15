import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-slate-950 font-bold">
                <Activity className="w-5 h-5 text-slate-950" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Saarthi<span className="text-teal-400">.AI</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              AI Clinical History & Document Intelligence Platform for Indian Hospitals and OPDs. Empowering doctors with structured stories before the consultation begins.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-teal-300">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Safety UX: AI assists. Physicians decide.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/patient/onboarding" className="hover:text-teal-300 transition-colors">Patient Kiosk</Link></li>
              <li><Link to="/doctor/queue" className="hover:text-teal-300 transition-colors">Doctor Cockpit</Link></li>
              <li><Link to="/doctor/ayush" className="hover:text-teal-300 transition-colors">AYUSH Mode</Link></li>
              <li><Link to="/admin/analytics" className="hover:text-teal-300 transition-colors">Admin Dashboard</Link></li>
              <li><Link to="/demo" className="hover:text-teal-300 transition-colors flex items-center gap-1">Judge Split Demo <ArrowUpRight className="w-3 h-3" /></Link></li>
            </ul>
          </div>

          {/* Technology & Standards */}
          <div>
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">Standards</h4>
            <ul className="space-y-2">
              <li className="text-slate-400">ABDM / ABHA Ready</li>
              <li className="text-slate-400">FHIR R4 Compatible</li>
              <li className="text-slate-400">Multilingual NLP (Ta, Hi, En)</li>
              <li className="text-slate-400">SOCRATES Clinical Protocol</li>
              <li className="text-slate-400">Handwritten OCR Engine</li>
            </ul>
          </div>

          {/* Compliance & Legal */}
          <div>
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">Trust & Safety</h4>
            <ul className="space-y-2">
              <li><Link to="/patient/consent" className="hover:text-teal-300 transition-colors">Patient Consent</Link></li>
              <li className="text-slate-400">Physician Oversight Protocol</li>
              <li className="text-slate-400">DPDP Act 2023 Compliant</li>
              <li className="text-slate-400">No Autonomous Diagnosis</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 Saarthi.AI. Built for National Health-Tech Hackathon Demo.</p>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400 font-medium">“We don't replace the doctor. We give the doctor back their time.”</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
