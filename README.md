# 🩺 Saarthi.AI — Multimodal Clinical Story Engine
> **Review 1 — 35% Project Completion Report & Implementation Repository**

[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![ABDM Compliant](https://img.shields.io/badge/ABDM-FHIR_R4_Ready-008080?style=flat-square)](#)

---

## 📌 Project Overview

**Saarthi.AI** is a multimodal AI-assisted **Clinical Story Engine** designed to bridge the communication gap between patients and clinicians in Indian hospitals and Out-Patient Departments (OPDs).

The name *Saarthi* (सारथी) means **"guide" or "charioteer"** in Sanskrit. The platform acts as an AI clinical co-pilot that guides patients through structuring their medical story before meeting their treating physician.

### 📱 3 Flexible Deployment Modes
Instead of restricting usage to expensive hospital hardware, Saarthi.AI supports:
1. **Hospital Touchscreen Kiosk** — Self-service OPD check-in station.
2. **Patient's Own Smartphone** — Instant Web access via OPD QR code scan without app installation.
3. **Waiting-Room Tablet** — Handheld intake device passed to queued patients.

---

## 🎯 Problem Addressed

In fast-paced OPDs, patients often express symptoms in an unstructured manner due to stress, lack of medical vocabulary, or language barriers. Key clinical details—such as onset, exact location, severity, relieving factors, or prior prescriptions—are frequently lost or consume valuable consultation time.

**Saarthi.AI** solves this by:
- Listening to patients in **pure unmixed Tamil, Hindi, or English**.
- Conducting a structured **SOCRATES** symptom assessment flow.
- Extracting handwritten prescriptions & lab test results via local **AI OCR**.
- Generating a real-time **Doctor Review Cockpit & FHIR R4 Bundle**.

---

┌───────────────────┐
│ Patient Interface │
└─────────┬─────────┘
          ↓
┌────────────────────┐
│ Voice / Text Input │
└─────────┬──────────┘
          ↓
┌────────────────────┐
│    AI Vaidya       │
└─────────┬──────────┘
          ↓
┌─────────────────────────┐
│ Clinical Story Engine   │
└─────────┬───────────────┘
          ↓
┌─────────────────────────┐
│ Structured Case Summary │
└─────────┬───────────────┘
          ↓
┌────────────────────┐
│ Doctor Dashboard   │
└────────────────────┘

## API Design

POST /api/patient/session
Creates a patient interaction session.

POST /api/patient/message
Receives patient input and returns the next AI question.

POST /api/documents/upload
Uploads a prescription or medical document.

POST /api/clinical-story/generate
Converts collected information into a structured case.

GET /api/clinical-story/:id
Retrieves the generated clinical story.

GET /api/doctor/patient/:id
Retrieves the doctor-facing patient summary.

## 🚀 How to Run locally

### Step 1: Open Terminal in Project Directory
```bash
cd "c:\Users\user\OneDrive\Documents\saarthi ai"
```

### Step 2: Launch Development Server
```bash
npm run dev
# Or on Windows PowerShell:
cmd /c npm run dev
```

### Step 3: Open in Browser
👉 **[http://localhost:5173/](http://localhost:5173/)** (or active port `5174` - `5178`)

---

## 🎮 Key Routes & Testing Map

| Feature / Interface | Route | Primary Capabilities |
| :--- | :--- | :--- |
| **Landing Page** | `/` | System overview, live OPD problem comparison, deployment modes |
| **Unified Portal Login** | `/login` | Role-based login (Doctor ID+Pass, Admin ID+Pass, Patient Passwordless) |
| **Patient 3-Step Intake** | `/patient` | Step 1: Language selection $\rightarrow$ Step 2: Details $\rightarrow$ Step 3: Interview launcher |
| **AI Interview Voice Kiosk** | `/patient/interview` | Live Web Speech mic recording, SOCRATES tracker, Tamil/Hindi/English NLP |
| **Prescription OCR Engine** | `/patient/documents` | FileReader local file upload, OCR scanning visualizer, medication extraction |
| **OPD Token Pass & Review** | `/patient/review` | OPD Token ticket generation, estimated wait time, case sheet summary |
| **Doctor Review Cockpit** | `/doctor` | Pre-consultation EMR case sheet, red-flag alerts, editable AI fields, FHIR R4 JSON export |
| **AYUSH / Nadi Cockpit** | `/doctor/ayush` | Prakriti Dosha radar chart (Vata/Pitta/Kapha), Dashavidha Pareeksha breakdown |
| **Admin Analytics Dashboard** | `/admin` | OPD throughput metrics, OCR accuracy logs, queue management |
| **Hackathon Split-Screen** | `/demo` | Live side-by-side judge demo (Patient Voice Kiosk $\leftrightarrow$ Doctor Cockpit) |


## User Roles

### Patient
- Select language
- Describe symptoms
- Answer follow-up questions
- Upload documents
- Review collected information

### Doctor
- View patient story
- Review structured information
- Edit generated summary
- Verify clinical information

### Administrator (Planned)
- Manage users
- Manage devices
- View system activity
- Configure hospital settings
---
## Key Features

- Multilingual patient interaction
- AI-guided symptom questioning
- Clinical Story Engine
- Doctor-facing case dashboard
- Medical document upload
- Red-flag highlighting
- AYUSH assessment prototype
- Editable clinical summaries
- QR-based phone access
- Kiosk deployment concept
- Waiting-room tablet support

## Module Architecture

### Patient Module
Input:
- Language
- Symptom text/voice
- Uploaded documents

Processing:
- Input validation
- Conversation flow
- Symptom collection

Output:
- Structured patient responses

## Input / Output Specification

### Patient Input

- Language: string
- Message: string
- Session ID: string
- Document: file (optional)

### Clinical Story Output

- Chief complaint
- Duration
- Site
- Character
- Severity
- Associated symptoms
- Aggravating factors
- Relieving factors
- Medication information
- Red-flag indicators

### AI Vaidya Module
Input:
- Patient response

Processing:
- Question selection
- Conversation state
- Follow-up prompts

Output:
- Next question
- Structured symptom data

Patient Input
     ↓
Input Validation
     ↓
Conversation Engine
     ↓
Question/Response Processing
     ↓
Clinical Data Extraction
     ↓
Clinical Story Object
     ↓
Red-Flag Screening
     ↓
Doctor Dashboard

### Clinical Story Module
Input:
- Conversation data
- Document information

Processing:
- Information extraction
- Field organization

Output:
- Structured clinical story

## Database Schema

### Patient
- patient_id
- age
- sex
- preferred_language
- created_at

### Session
- session_id
- patient_id
- status
- started_at
- ended_at

### Conversation
- message_id
- session_id
- role
- message
- timestamp

### ClinicalStory
- story_id
- session_id
- chief_complaint
- onset
- site
- character
- severity
- associated_symptoms
- aggravating_factors
- relieving_factors
- doctor_verified

### Document
- document_id
- session_id
- file_name
- file_type
- extraction_status

## Error Handling

### Patient Input
- Empty message → prompt user to enter information
- Unsupported language → display supported languages
- Unexpected response → request clarification

### Document Upload
- Invalid file type → reject upload
- File too large → show validation message
- Upload failure → allow retry
- Unreadable image → request clearer image

### AI Processing
- Missing response → retry question
- Unclear information → ask follow-up question
- Processing failure → show fallback message

### Doctor Dashboard
- Missing patient data → show incomplete-data state
- Failed data retrieval → show retry option

### Doctor Module
Input:
- Clinical story

Processing:
- Review
- Editing
- Verification

Output:
- Doctor-reviewed case information

## 🛠️ Review 1 Completion Summary (35% Milestone)

| Area | Review-1 Status | Notes |
| :--- | :--- | :--- |
| **Product Concept & Architecture** | ✅ Completed | 3-Tier deployment model & clinical pipeline established |
| **Patient Onboarding Wizard** | ✅ Completed | 3-step sequential intake (Language $\rightarrow$ Info $\rightarrow$ AI Interview) |
| **Multilingual AI Interface** | ✅ Completed | Pure unmixed Tamil (தமிழ்), Hindi (हिन्दी), and English modes |
| **SOCRATES History Engine** | ✅ Completed | Real-time 8-parameter clinical tracker (Site, Onset, Severity, etc.) |
| **Prescription OCR Module** | ✅ Completed | Drag-and-drop file upload, laser scanning visualizer, structured extraction |
| **Red-Flag Alert Interface** | ✅ Completed | Dynamic ACS / Acute Emergency safety triggers |
| **Doctor Review Cockpit** | ✅ Completed | Instant EMR case draft, clinician edit capability, FHIR R4 exporter |
| **AYUSH Assessment Prototype** | ✅ Completed | Dosha radar chart & Ayurvedic intake parameters |
| **Unified Authentication Portal** | ✅ Completed | Integrated `/login` for Doctors, Admins, and Passwordless Patients |
| **Backend & Production AI** | 🔄 Pending | Real production LLM, server API, and database integration planned for Phase 2 |

## Testing Strategy

### Unit Testing
Test:
- Input validation
- Symptom field extraction
- Severity validation
- Session creation
- Document validation
- Clinical story formatting

### Integration Testing
Test:
- Patient → AI Vaidya
- AI Vaidya → Clinical Story Engine
- Clinical Story → Doctor Dashboard
- Document → Story generation

### UI Testing
Test:
- Mobile responsiveness
- Language selection
- Form validation
- Document upload
- Dashboard interaction

### Error Testing
Test:
- Empty input
- Invalid files
- Network failure
- Missing data
- AI processing failure

## Security Considerations

Planned security measures include:

- Authentication
- Role-based access
- Session-based patient access
- Secure API communication
- Input validation
- File validation
- Access control for doctor data
- Minimal collection of patient information
- Audit logging

saarthi-ai/
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── modules/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── data/
│   └── main.tsx
│
├── screenshots/
├── docs/
│
├── README.md
├── package.json
├── tsconfig.json
└── vite.config.ts

## Privacy

Saarthi.AI is designed with privacy considerations including:

- Minimal data collection
- Patient-session isolation
- Controlled doctor access
- Explicit separation of demo and real data
- Future secure storage mechanisms

## Implementation Status

| Feature | Status |
|---|---|
| Patient UI | ✅ Implemented |
| AI Vaidya UI | ✅ Implemented |
| Clinical Story UI | ✅ Implemented |
| Doctor Dashboard UI | ✅ Implemented |
| Document Upload UI | ✅ Implemented |
| AYUSH UI | ✅ Prototype |
| Red-Flag UI | ✅ Prototype |
| Backend API | 🟡 Planned |
| Database | 🟡 Planned |
| Real OCR | 🟡 Planned |
| Real ASR/TTS | 🟡 Planned |
| EHR Integration | 🔵 Future |

---

## Roadmap

### Phase 1 — Review 1
Core UI and workflow prototype

### Phase 2
Backend + database

### Phase 3
Real AI + multilingual speech

### Phase 4
OCR/document intelligence

### Phase 5
Security + authentication

### Phase 6
Clinical usability testing

### Phase 7
EHR/hospital integration

## 🔒 Safety & Regulatory Notice

Saarthi.AI is designed solely as a **clinical documentation co-pilot** to assist healthcare professionals in structuring patient history. It **does NOT replace a physician**, provide autonomous medical diagnoses, or prescribe treatments. All AI-generated case drafts require clinician sign-off.
