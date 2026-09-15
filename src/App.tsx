import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DemoStateProvider } from './context/DemoStateContext';

// Pages
import { LandingPage } from './pages/LandingPage';
import { PatientOnboardingPage } from './pages/PatientOnboardingPage';
import { PatientConsentPage } from './pages/PatientConsentPage';
import { PatientInterviewPage } from './pages/PatientInterviewPage';
import { PatientDocumentsPage } from './pages/PatientDocumentsPage';
import { PatientReviewPage } from './pages/PatientReviewPage';
import { DoctorCockpitPage } from './pages/DoctorCockpitPage';
import { DoctorAyushPage } from './pages/DoctorAyushPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { HackathonDemoPage } from './pages/HackathonDemoPage';
import { LoginPage } from './pages/LoginPage';
import { PatientLoginPage } from './pages/PatientLoginPage';
import { ClinicianLoginPage } from './pages/ClinicianLoginPage';
import { AdminLoginPage } from './pages/AdminLoginPage';

export default function App() {
  return (
    <DemoStateProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-teal-500 selection:text-white">
          
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Authentication Portals */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login/patient" element={<PatientLoginPage />} />
            <Route path="/login/doctor" element={<ClinicianLoginPage />} />
            <Route path="/login/clinician" element={<ClinicianLoginPage />} />
            <Route path="/login/admin" element={<AdminLoginPage />} />

            {/* Patient Kiosk Flow */}
            <Route path="/patient" element={<PatientOnboardingPage />} />
            <Route path="/patient/onboarding" element={<PatientOnboardingPage />} />
            <Route path="/patient/consent" element={<PatientConsentPage />} />
            <Route path="/patient/interview" element={<PatientInterviewPage />} />
            <Route path="/patient/documents" element={<PatientDocumentsPage />} />
            <Route path="/patient/review" element={<PatientReviewPage />} />
            <Route path="/patient/complete" element={<PatientReviewPage />} />

            {/* Doctor Cockpit Flow */}
            <Route path="/doctor" element={<DoctorCockpitPage />} />
            <Route path="/doctor/queue" element={<DoctorCockpitPage />} />
            <Route path="/doctor/patient/:id" element={<DoctorCockpitPage />} />
            <Route path="/doctor/timeline" element={<DoctorCockpitPage />} />
            <Route path="/doctor/ayush" element={<DoctorAyushPage />} />

            {/* Admin Dashboard */}
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/analytics" element={<AdminDashboardPage />} />
            <Route path="/admin/settings" element={<AdminDashboardPage />} />

            {/* Hackathon Judge Split-Screen Demo */}
            <Route path="/demo" element={<HackathonDemoPage />} />

            {/* Fallback */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </div>
      </Router>
    </DemoStateProvider>
  );
}
