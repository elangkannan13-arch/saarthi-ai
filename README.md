# 🩺 Saarthi.AI — Multimodal Clinical Story Engine

> **Your story. Clearly heard. Before the doctor asks.**

Saarthi.AI is a multimodal AI-assisted **Clinical Story Engine** designed to help patients structure their health story before meeting a clinician.

The platform acts as an AI-assisted bridge between patient and doctor by combining guided symptom collection, multilingual interaction, document input, clinical information structuring, and a doctor-facing review interface.

> **Important:** Saarthi.AI is a project prototype for clinical documentation and patient-story assistance. It does not replace a qualified healthcare professional, provide autonomous diagnosis, or prescribe treatment.

---

## 📌 Project Status

| Area | Status |
|---|---|
| Product Concept | ✅ Completed |
| System Architecture | ✅ Completed |
| Patient Workflow | ✅ Implemented / Prototype |
| AI Vaidya Interface | ✅ Prototype |
| Clinical Story Engine | ✅ Prototype |
| Doctor Review Cockpit | ✅ Prototype |
| Document Upload Workflow | ✅ Implemented |
| AYUSH Visualization | ✅ Prototype |
| Red-Flag Interface | ✅ Prototype |
| Backend API | 🟡 Planned |
| Persistent Database | 🟡 Planned |
| Production AI Integration | 🟡 Planned |
| Real OCR Processing | 🟡 Planned |
| Real ASR/TTS | 🟡 Planned |
| EHR Integration | 🔵 Future |

### Review-1 Progress

**Approximately 35% of the planned project has been completed/prototyped.**

```text
PATIENT
   ↓
AI VAIDYA
   ↓
CLINICAL STORY ENGINE
   ↓
STRUCTURED CASE
   ↓
DOCTOR REVIEW COCKPIT
```

---

# 📖 Table of Contents

- [Project Overview](#-project-overview)
- [Meaning of Saarthi](#-meaning-of-saarthi)
- [Problem Statement](#-problem-statement)
- [Proposed Solution](#-proposed-solution)
- [Core Innovation](#-core-innovation)
- [Deployment Modes](#-deployment-modes)
- [Key Features](#-key-features)
- [User Roles](#-user-roles)
- [System Architecture](#-system-architecture)
- [Application Workflow](#-application-workflow)
- [Module Architecture](#-module-architecture)
- [Input and Output Specification](#-input-and-output-specification)
- [Clinical Story Structure](#-clinical-story-structure)
- [AI Vaidya Conversation Flow](#-ai-vaidya-conversation-flow)
- [Multilingual Interaction](#-multilingual-interaction)
- [Medical Document Workflow](#-medical-document-workflow)
- [Red-Flag Screening](#-red-flag-screening)
- [AYUSH Mode](#-ayush-mode)
- [Doctor Review Cockpit](#-doctor-review-cockpit)
- [Application Routes](#-application-routes)
- [API Design](#-api-design)
- [Database Design](#-database-design)
- [Data Flow](#-data-flow)
- [Validation Rules](#-validation-rules)
- [Error Handling](#-error-handling)
- [Testing Strategy](#-testing-strategy)
- [Security Considerations](#-security-considerations)
- [Privacy](#-privacy)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Implementation Status](#-implementation-status)
- [Actual vs Planned](#-actual-vs-planned)
- [Review-1 Completion](#-review-1-completion)
- [Development Milestones](#-development-milestones)
- [How to Run](#-how-to-run)
- [Demo Flow](#-demo-flow)
- [Known Limitations](#-known-limitations)
- [Roadmap](#-roadmap)
- [Future Scope](#-future-scope)
- [Safety and Regulatory Notice](#-safety-and-regulatory-notice)

---

# 📌 Project Overview

**Saarthi.AI** is a multimodal AI-assisted Clinical Story Engine designed to support patient-story capture before a doctor consultation.

In a typical consultation, patients may provide information in an unstructured manner. Important details can be distributed across verbal explanations, prescriptions, reports, and previous medication information.

Saarthi.AI aims to structure this information before the clinician begins the consultation.

The product is designed around the following principle:

> **Let the patient tell their story. Let AI structure it. Let the doctor make the decision.**

The current project focuses on a web-based prototype that demonstrates the patient-to-doctor workflow.

---

# 🪷 Meaning of Saarthi

**Saarthi (सारथी)** means **guide / charioteer** in Sanskrit.

The concept is inspired by the idea of a guide who helps another person navigate a difficult journey.

In Saarthi.AI:

- The **patient** tells their story.
- **AI Vaidya** guides the conversation.
- The **Clinical Story Engine** structures the information.
- The **doctor** reviews and makes the clinical decision.

---

# 🎯 Problem Statement

In busy hospital OPDs, patients may explain symptoms in an unstructured way due to:

- Stress or anxiety
- Lack of medical vocabulary
- Language barriers
- Forgetting important symptom details
- Fragmented medical records
- Time pressure during consultations

Examples of information that may need clarification include:

- When the symptom began
- Where it is located
- Severity
- Character of the symptom
- Associated symptoms
- Aggravating factors
- Relieving factors
- Previous medication
- Existing prescriptions or reports

Saarthi.AI is designed to guide patients through these details before the doctor consultation.

---

# 💡 Proposed Solution

Saarthi.AI provides a guided workflow:

```text
Patient
   ↓
Language Selection
   ↓
Symptom Input
   ↓
AI Vaidya
   ↓
Structured Follow-up Questions
   ↓
Clinical Story Engine
   ↓
Document Information
   ↓
Red-Flag Screening
   ↓
Structured Case Summary
   ↓
Doctor Review Cockpit
```

The doctor receives a structured case that can be reviewed and edited before or during the consultation.

---

# 🚀 Core Innovation

The main concept is not just a medical kiosk.

Saarthi.AI is designed as a **Clinical Story Engine** that can operate across multiple patient-access surfaces.

The same underlying workflow can support:

```text
Kiosk
   +
Patient Smartphone
   +
Waiting-Room Tablet
        ↓
Clinical Story Engine
        ↓
Doctor Dashboard
```

This provides a flexible deployment model without requiring every patient interaction to happen on a dedicated kiosk.

---

# 🖥️ Deployment Modes

## 1. Hospital Touchscreen Kiosk

A self-service interface where patients can begin their guided intake before consultation.

### Intended use

- OPD reception
- Pre-consultation area
- Hospital waiting area

### Current status

✅ Prototype

---

## 2. Patient's Own Smartphone

The patient scans a QR code and opens Saarthi.AI through the browser.

### Advantages

- No app installation
- Patient uses their own device
- QR-based entry
- Flexible deployment

### Current status

✅ Prototype / Planned integration

---

## 3. Waiting-Room Tablet

A hospital can provide tablets to patients waiting for consultation.

### Intended use

- Waiting-room intake
- Guided symptom collection
- Shared tablet workflow

### Current status

✅ Concept / Prototype

---

# ✨ Key Features

- Multilingual patient interaction
- AI-guided symptom questioning
- Clinical Story Engine
- Structured symptom collection
- Doctor-facing case dashboard
- Editable clinical summaries
- Medical document upload
- Red-flag information display
- AYUSH assessment prototype
- QR-based access concept
- Kiosk deployment
- Waiting-room tablet support
- Demo patient workflow
- Clinical information visualization

---

# 👥 User Roles

## Patient

The patient can:

- Select a language
- Describe symptoms
- Answer follow-up questions
- Upload medical documents
- Review collected information

---

## Doctor

The doctor can:

- View patient information
- View structured clinical story
- Review symptom details
- View uploaded document information
- Edit generated fields
- Verify information
- Continue the consultation

---

## Administrator

The administrator role is planned for future expansion.

Potential capabilities:

- Manage users
- Manage hospital devices
- Monitor system activity
- Configure hospital settings
- View operational analytics

### Status

🔵 Planned

---

# 🏗️ System Architecture

```text
┌─────────────────────────────┐
│      Patient Interface      │
│ Kiosk / Phone / Tablet      │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│    Voice / Text / Document  │
│           Input             │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│          AI Vaidya          │
│   Guided Conversation Layer │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│   Clinical Question Flow    │
│   SOCRATES-style Structure  │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│    Clinical Story Engine    │
│ Information Structuring     │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│    Red-Flag Screening       │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│   Structured Case Summary   │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│    Doctor Review Cockpit    │
└─────────────────────────────┘
```

---

# 🔄 Application Workflow

## Step 1 — Patient Opens Saarthi.AI

The patient enters through:

- Kiosk
- QR link
- Waiting-room tablet

## Step 2 — Language Selection

Supported prototype languages:

- Tamil
- Hindi
- English

The patient selects their preferred language.

## Step 3 — Patient Information

The patient provides basic information required by the prototype workflow.

## Step 4 — AI Vaidya Interview

AI Vaidya guides the patient through structured questions.

Example:

```text
Patient:
"I have chest discomfort."

AI Vaidya:
"Where exactly do you feel the discomfort?"

Patient:
"In the center of my chest."

AI Vaidya:
"When did it begin?"
```

## Step 5 — Clinical Information Collection

The system organizes the responses into structured clinical fields.

## Step 6 — Document Upload

The patient can upload a:

- Prescription
- Medical document
- Lab report
- Medication record

The current implementation provides the document upload workflow.

Real production OCR processing is planned for a later phase.

## Step 7 — Clinical Story Generation

The collected information is represented as a structured clinical story.

## Step 8 — Red-Flag Screening

Potentially important symptom information can be highlighted for clinician review.

## Step 9 — Doctor Review

The doctor opens the Review Cockpit and verifies the information.

---

# 🧩 Module Architecture

## Patient Module

### Inputs

- Language
- Symptom text
- Voice interaction concept
- Uploaded document

### Processing

- Input validation
- Conversation flow
- Symptom collection

### Output

- Structured patient responses

---

## AI Vaidya Module

### Input

Patient response

### Processing

- Conversation state
- Question selection
- Follow-up prompting
- Structured information collection

### Output

- Next question
- Structured symptom information

### Current status

✅ Prototype

---

## Clinical Story Module

### Input

- Conversation data
- Document information

### Processing

- Information extraction
- Field organization
- Clinical story formatting

### Output

Structured clinical story.

### Current status

✅ Prototype

---

## Doctor Module

### Input

Structured clinical story.

### Processing

- Review
- Editing
- Verification

### Output

Doctor-reviewed case information.

### Current status

✅ Prototype

---

# 🧾 Input and Output Specification

## Patient Input

```text
language: string
message: string
session_id: string
document: file | optional
```

## Clinical Story Output

```text
chief_complaint
duration
site
onset
character
severity
radiation
associated_symptoms
aggravating_factors
relieving_factors
medication_information
red_flag_indicators
```

## AI Vaidya Output

```text
next_question
conversation_state
structured_symptom_data
```

---

# 🩺 Clinical Story Structure

The Clinical Story Engine organizes patient information into sections such as:

### Chief Complaint

The main reason for consultation.

### Onset

When the problem began.

### Site

Where the symptom is located.

### Character

How the patient describes the symptom.

### Radiation

Whether the symptom moves to another location.

### Severity

Patient-reported severity.

### Associated Symptoms

Other symptoms reported with the main complaint.

### Aggravating Factors

Factors that make the symptom worse.

### Relieving Factors

Factors that reduce the symptom.

### Medication Information

Information supplied by the patient or uploaded document.

---

# 🧠 AI Vaidya Conversation Flow

The prototype uses a structured symptom-questioning approach inspired by the SOCRATES framework.

```text
S — Site
O — Onset
C — Character
R — Radiation
A — Associated Symptoms
T — Timing
E — Exacerbating / Relieving Factors
S — Severity
```

The purpose is to help patients provide more structured information.

> This framework is used for information collection and documentation support. It is not a substitute for professional clinical assessment.

---

# 🌐 Multilingual Interaction

Saarthi.AI is designed to support:

```text
Tamil
Hindi
English
```

The intended interaction flow is:

```text
Patient Language
      ↓
AI Interaction
      ↓
Clinical Information
      ↓
Structured Doctor-Facing Summary
```

Example:

```text
Patient Interaction:
Tamil

AI Vaidya:
Tamil

Doctor-facing information:
Structured clinical format
```

### Current status

✅ Multilingual UI prototype

### Future work

- Production multilingual ASR
- Production TTS
- Language-specific NLP processing
- Better speech recognition accuracy

---

# 📷 Medical Document Workflow

The application provides a document upload workflow for:

- Prescriptions
- Medical records
- Lab reports
- Medication lists

### Current prototype workflow

```text
Select File
   ↓
File Validation
   ↓
Upload Interface
   ↓
Document Preview
   ↓
Extraction Workflow
```

### Planned production workflow

```text
Document
   ↓
OCR
   ↓
Text Extraction
   ↓
Medical Information Extraction
   ↓
Clinical Story
```

### Current status

✅ Upload interface implemented

🟡 Production OCR planned

---

# 🚨 Red-Flag Screening

The prototype includes a visual mechanism for highlighting potentially important symptom information.

Example:

```text
⚠ Potential Red Flag

Information requires clinician review.
```

The purpose is to ensure important information is visible to the clinician.

### Safety principle

Saarthi.AI should not independently declare a definitive diagnosis or emergency diagnosis.

### Current status

✅ Prototype interface

### Future work

- Rule-based screening layer
- Better clinical validation
- Clinician-reviewed safety rules
- Evaluation using simulated scenarios

---

# 🧘 AYUSH Mode

Saarthi.AI includes an AYUSH-oriented prototype interface.

## Prakriti / Dosha Visualization

The prototype can display:

- Vata
- Pitta
- Kapha

using a radar-chart style visualization.

## Dashavidha Pareeksha

The future structure may include:

- Prakriti
- Vikriti
- Sara
- Samhanana
- Pramana
- Satmya
- Satva
- Ahara Shakti
- Vyayama Shakti
- Vaya

### Current status

✅ UI prototype

### Important

The AYUSH module is an assessment/support prototype.

It must not be presented as an autonomous medical diagnosis system.

---

# 👨‍⚕️ Doctor Review Cockpit

The Doctor Review Cockpit is designed to provide a structured view of the patient story.

## Main sections

- Patient information
- Chief complaint
- Symptom history
- Associated symptoms
- Medication information
- Uploaded documents
- Red-flag indicators
- Original conversation
- Editable structured fields

## Doctor Actions

Potential actions include:

```text
Review
Edit
Verify
Copy
Print
Continue Consultation
```

The core principle is:

> **AI prepares the information. The clinician verifies it.**

---

# 🗺️ Application Routes

| Route | Purpose | Status |
|---|---|---|
| `/` | Landing page and system overview | ✅ Implemented |
| `/login` | Unified portal/login interface | ✅ Prototype |
| `/patient` | Patient onboarding workflow | ✅ Implemented |
| `/patient/interview` | AI interview interface | ✅ Prototype |
| `/patient/documents` | Document upload workflow | ✅ Implemented |
| `/patient/review` | Patient review / case summary | ✅ Prototype |
| `/doctor` | Doctor Review Cockpit | ✅ Prototype |
| `/doctor/ayush` | AYUSH / Dosha interface | ✅ Prototype |
| `/admin` | Administrative analytics interface | ✅ Prototype |
| `/demo` | Split-screen demonstration | ✅ Prototype |

> Route capabilities that require backend services, real AI services, OCR, database persistence, or production authentication are treated as prototype/planned functionality unless explicitly implemented.

---

# 🔌 API Design

The following API structure defines the planned backend contract.

## API Status

The Review-1 implementation is primarily a frontend/prototype milestone. These endpoints define the planned backend architecture.

## POST `/api/patient/session`

Creates a patient interaction session.

### Request

```json
{
  "language": "ta"
}
```

### Response

```json
{
  "session_id": "demo-session-001",
  "status": "active"
}
```

### Status

🟡 Planned

## POST `/api/patient/message`

Receives patient input.

### Request

```json
{
  "session_id": "demo-session-001",
  "message": "எனக்கு தலைவலி இருக்கிறது"
}
```

### Response

```json
{
  "next_question": "வலி எப்போது தொடங்கியது?",
  "conversation_state": "onset"
}
```

### Status

🟡 Planned

## POST `/api/documents/upload`

Uploads a medical document.

### Request

```text
multipart/form-data
```

Example fields:

```text
session_id
document
document_type
```

### Response

```json
{
  "document_id": "doc-001",
  "status": "received"
}
```

### Status

🟡 Planned

## POST `/api/clinical-story/generate`

Generates a structured clinical story from collected information.

### Request

```json
{
  "session_id": "demo-session-001"
}
```

### Response

```json
{
  "story_id": "story-001",
  "status": "generated"
}
```

### Status

🟡 Planned

## GET `/api/clinical-story/:id`

Retrieves a structured clinical story.

### Response

```json
{
  "story_id": "story-001",
  "chief_complaint": "Headache",
  "duration": "3 days",
  "severity": 6,
  "doctor_verified": false
}
```

### Status

🟡 Planned

## GET `/api/doctor/patient/:id`

Retrieves doctor-facing patient information.

### Status

🟡 Planned

---

# 🗄️ Database Design

The following schema is planned for backend implementation.

## Patient

```text
patient_id
age
sex
preferred_language
created_at
```

## Session

```text
session_id
patient_id
status
started_at
ended_at
```

## Conversation

```text
message_id
session_id
role
message
timestamp
```

## ClinicalStory

```text
story_id
session_id
chief_complaint
onset
site
character
severity
associated_symptoms
aggravating_factors
relieving_factors
doctor_verified
```

## Document

```text
document_id
session_id
file_name
file_type
extraction_status
```

---

# 🔗 Database Relationships

```text
Patient
   │
   └── 1 : N ── Session
                    │
                    ├── 1 : N ── Conversation
                    │
                    ├── 1 : N ── Document
                    │
                    └── 1 : 1 ── ClinicalStory
```

### Relationships

```text
Patient 1 → N Session
Session 1 → N Conversation
Session 1 → N Document
Session 1 → 1 ClinicalStory
```

The Clinical Story is linked to the patient session that generated it.

### Database status

🟡 Planned for backend phase.

The current prototype uses demo/static data.

---

# 🔄 Data Flow

```text
Patient Input
      ↓
Input Validation
      ↓
Conversation State
      ↓
Question / Response Processing
      ↓
Clinical Data Extraction
      ↓
Clinical Story Object
      ↓
Red-Flag Screening
      ↓
Doctor Dashboard
      ↓
Doctor Verification
```

---

# ✅ Validation Rules

## Patient Input

- Empty message → request information
- Unsupported language → display supported languages
- Missing required field → show validation message
- Invalid value → prevent invalid submission

## Severity

Severity should remain within the supported scale used by the interface.

Invalid values should be rejected or corrected before creating the clinical story.

## Document Validation

- Validate file type
- Validate file size
- Reject unsupported files
- Handle failed uploads
- Handle unreadable documents

## Doctor Review

- Missing patient data → incomplete-state warning
- Missing clinical field → mark as incomplete
- AI-generated information → editable before verification

---

# ⚠️ Error Handling

## Patient Input Errors

### Empty Input

```text
User submits empty message
        ↓
Validation
        ↓
"Please enter or speak your symptom."
```

### Unexpected Response

```text
Response does not contain useful information
        ↓
Ask clarification question
```

## Document Errors

### Invalid File Type

```text
Unsupported file
        ↓
Reject upload
        ↓
Show supported file formats
```

### File Too Large

```text
Oversized file
        ↓
Validation failure
        ↓
Display size requirement
```

### Upload Failure

```text
Upload error
        ↓
Display failure message
        ↓
Allow retry
```

### Unreadable Image

```text
Poor-quality document
        ↓
Extraction failure
        ↓
Request clearer document
```

## AI Processing Errors

### Missing Response

Retry or request additional patient information.

### Unclear Information

Ask a follow-up question instead of inventing information.

### Processing Failure

```text
AI processing failure
        ↓
Fallback state
        ↓
Preserve previous conversation
        ↓
Allow retry
```

## Doctor Dashboard Errors

### Missing Patient Data

Show:

```text
Patient information incomplete.
Please verify available data.
```

### Failed Data Retrieval

Provide:

```text
Unable to retrieve data.
Retry
```

---

# 🧪 Testing Strategy

Testing is divided into:

1. Unit testing
2. Integration testing
3. UI testing
4. Error testing
5. Future end-to-end testing

## Unit Testing

Planned unit tests include:

- Input validation
- Symptom field validation
- Severity validation
- Session object creation
- Document metadata validation
- Clinical Story formatting
- Red-flag rule evaluation
- Summary formatting

### Current status

🟡 Testing strategy documented.

Automated unit-test coverage is planned for a subsequent development phase.

## Integration Testing

Integration tests will cover:

```text
Patient
   ↓
AI Vaidya
```

```text
AI Vaidya
   ↓
Clinical Story Engine
```

```text
Clinical Story
   ↓
Doctor Dashboard
```

```text
Document
   ↓
Clinical Story
```

### Current status

🟡 Planned

## UI Testing

Manual UI validation includes:

- Language selection
- Patient workflow
- Form validation
- Document upload interface
- Doctor dashboard
- Responsive layout
- Demo workflow

### Future automation

- Browser-based end-to-end tests
- Accessibility checks
- Mobile viewport testing

## Error Testing

Future test cases include:

```text
Empty input
Invalid file
Oversized file
Unsupported file format
Missing patient data
Network failure
AI processing failure
Session timeout
Invalid session
```

---

# 🔐 Security Considerations

Saarthi.AI is designed with healthcare-data security considerations.

Planned measures include:

- Authentication
- Role-based access control
- Patient session isolation
- Secure API communication
- Input validation
- File validation
- Access control
- Minimal patient-data collection
- Audit logging
- Secure storage

### Current status

🟡 Security architecture planned.

The current prototype is not a production healthcare deployment.

---

# 🔒 Privacy

Privacy considerations include:

- Minimal data collection
- Separation of patient sessions
- Controlled doctor access
- Separation of demo and real data
- Future secure storage
- Future audit logging

The Review-1 prototype uses fictional/demo information.

---

# 🧰 Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend application |
| TypeScript | Type-safe application development |
| Tailwind CSS | UI styling |
| Vite | Development/build tooling |
| Git | Version control |
| GitHub | Source code and documentation |

> FHIR/ABDM interoperability is considered a future integration area. The prototype should not be interpreted as independently establishing regulatory compliance.

---

# 📁 Project Structure

```text
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
```

> The exact folder structure may evolve as backend and AI services are introduced.

---

# 📊 Implementation Status

| Feature | Status |
|---|---|
| Product architecture | ✅ Completed |
| Patient UI | ✅ Implemented |
| Patient onboarding | ✅ Implemented |
| AI Vaidya UI | ✅ Prototype |
| SOCRATES tracker | ✅ Prototype |
| Clinical Story Engine UI | ✅ Prototype |
| Doctor Dashboard | ✅ Prototype |
| Document upload UI | ✅ Implemented |
| OCR processing | 🟡 Planned |
| Red-Flag UI | ✅ Prototype |
| Production clinical rules | 🟡 Planned |
| AYUSH visualization | ✅ Prototype |
| Backend API | 🟡 Planned |
| Database | 🟡 Planned |
| Real ASR | 🟡 Planned |
| Real TTS | 🟡 Planned |
| Production LLM | 🟡 Planned |
| Authentication backend | 🟡 Planned |
| EHR integration | 🔵 Future |
| Clinical validation | 🔵 Future |

---

# 🎯 Actual vs Planned

## Currently Implemented

- React-based web interface
- Patient workflow
- Patient onboarding
- Language-selection interface
- AI Vaidya interaction UI
- Structured clinical-story interface
- Doctor Review Cockpit
- Document upload UI
- AYUSH visualization prototype
- Red-flag visualization prototype
- Demo patient workflow
- Responsive interface

## Prototype / Simulated

- AI conversation behavior
- Structured clinical extraction
- Document-processing workflow
- Red-flag demonstration
- FHIR representation
- Multilingual interaction behavior

## Planned

- Production LLM integration
- Real multilingual ASR
- Real TTS
- Production OCR
- Backend API
- Persistent database
- Authentication backend
- Secure data storage
- Advanced clinical rules
- EHR integration
- Clinical validation
- Hospital deployment testing

---

# 🏆 Review-1 Completion Summary

## Target

**Approximately 35% of the full project scope**

### Completed / Prototyped

| Area | Status |
|---|---|
| Product Concept | ✅ |
| Clinical Story Architecture | ✅ |
| Deployment Model | ✅ |
| Patient Workflow | ✅ |
| AI Vaidya UI | ✅ |
| SOCRATES-style Flow | ✅ |
| Clinical Story Engine | ✅ |
| Doctor Review Cockpit | ✅ |
| Document Upload | ✅ |
| Red-Flag Interface | ✅ |
| AYUSH Prototype | ✅ |
| Multilingual UI | ✅ |

### Pending

| Area | Status |
|---|---|
| Production AI | 🔄 |
| Backend | 🔄 |
| Database | 🔄 |
| OCR | 🔄 |
| ASR/TTS | 🔄 |
| Authentication | 🔄 |
| Security Hardening | 🔄 |
| Clinical Validation | 🔄 |
| EHR Integration | 🔄 |

---

# 📝 Review-1 Achievement

The main achievement of Review 1 is the establishment of the end-to-end product workflow:

```text
PATIENT
   ↓
LANGUAGE
   ↓
AI VAIDYA
   ↓
STRUCTURED QUESTIONS
   ↓
CLINICAL STORY ENGINE
   ↓
RED-FLAG INFORMATION
   ↓
DOCTOR REVIEW COCKPIT
```

The project has established its core user experience, major modules, architecture, and technical direction.

The next milestone focuses on converting the prototype into a functional multimodal backend-connected system.

---

# 📈 Development Milestones

## Milestone 1 — Review 1

### Focus

Core user experience and workflow.

### Achievements

- Initial application setup
- Patient onboarding
- AI Vaidya interface
- Clinical Story Engine
- Doctor dashboard
- Document workflow
- AYUSH visualization
- Red-flag interface
- Technical documentation

## Milestone 2 — Backend

Planned:

- REST API
- Session management
- Database
- Patient/doctor data flow

## Milestone 3 — Real AI

Planned:

- LLM integration
- Multilingual speech recognition
- TTS
- Structured extraction

## Milestone 4 — Document Intelligence

Planned:

- OCR
- Prescription extraction
- Lab report extraction
- Medication normalization

## Milestone 5 — Security

Planned:

- Authentication
- Authorization
- Secure session management
- Audit logging
- Secure storage

## Milestone 6 — Clinical Validation

Planned:

- Simulated patient testing
- User feedback
- Clinician usability testing
- Error analysis
- Safety review

## Milestone 7 — Interoperability

Future:

- FHIR-based exchange
- EHR connectivity
- Hospital workflow integration
- Interoperability testing

---

# 🛠️ How to Run

## Prerequisites

Install:

- Node.js
- npm
- Git

## Step 1 — Clone Repository

```bash
git clone https://github.com/YOUR-USERNAME/saarthi-ai.git
cd saarthi-ai
```

## Step 2 — Install Dependencies

```bash
npm install
```

## Step 3 — Start Development Server

```bash
npm run dev
```

## Step 4 — Open Browser

Open the local URL displayed by Vite, typically:

```text
http://localhost:5173/
```

The actual port may differ depending on the development environment.

---

# 🎮 Demo Flow

## 1. Open Landing Page

Show:

- Problem
- Solution
- Clinical Story Engine
- Deployment modes

## 2. Open Patient Mode

Navigate to:

```text
/patient
```

## 3. Select Language

Choose:

```text
Tamil
Hindi
English
```

## 4. Start AI Vaidya

Navigate to the interview interface.

Example:

```text
"I have had a headache for three days."
```

## 5. Demonstrate Structured Questions

Show:

```text
Site
Onset
Character
Severity
Associated Symptoms
Aggravating Factors
Relieving Factors
```

## 6. Upload Document

Open:

```text
/patient/documents
```

Demonstrate the document upload workflow.

## 7. View Clinical Story

Show the structured patient information.

## 8. Open Doctor Cockpit

Navigate to:

```text
/doctor
```

Show:

- Patient story
- Important information
- Editable fields
- Document information
- Review workflow

## 9. Demonstrate AYUSH Mode

Navigate to:

```text
/doctor/ayush
```

Show:

- Vata
- Pitta
- Kapha
- Prakriti visualization

---

# 🧪 Demo Data

The prototype should use fictional data.

Example:

```text
Patient:
Demo Patient

Age:
28

Language:
Tamil

Chief Complaint:
Headache for 3 days

Severity:
6/10
```

A second demo scenario can be used to demonstrate the red-flag interface:

```text
Chief Complaint:
Chest discomfort

Associated Symptom:
Breathlessness
```

> All project demonstration data should be fictional and must not contain real patient information.

---

# ⚠️ Known Limitations

The current Review-1 prototype has the following limitations:

- Production backend is not yet connected.
- Persistent database storage is not yet implemented.
- Production LLM integration is pending.
- Real multilingual ASR/TTS is pending.
- Real OCR processing is pending.
- Clinical rules require further validation.
- Authentication backend is not complete.
- Hospital deployment has not been performed.
- EHR interoperability is not yet implemented.
- Clinical validation has not yet been completed.
- The prototype is not intended for real-world autonomous clinical decision-making.

---

# 🔮 Future Scope

Future versions of Saarthi.AI may include:

## Multimodal Intelligence

- Voice
- Text
- Image
- Documents

## Advanced Clinical Structuring

- Better history extraction
- Medication normalization
- Timeline generation
- Previous-visit comparison

## Multilingual Healthcare

- More Indian languages
- Better ASR
- Better pronunciation handling
- Patient-to-doctor language conversion

## Hospital Integration

- OPD systems
- Appointment systems
- EHR systems
- Patient token systems
- Hospital analytics

## AI Safety

- Clinician verification
- Transparent AI-generated fields
- Confidence indicators
- Human-in-the-loop review
- Safe fallback behavior

---

# 📚 Documentation Strategy

Future technical documentation will include:

- Module specifications
- API contracts
- Request/response examples
- Database schema
- Error boundaries
- Unit-testing documentation
- Integration-testing documentation
- Security architecture
- Deployment documentation
- Change logs
- Development milestones

---

# 🔍 Evidence and Evaluation

The GitHub repository is intended to provide evidence of:

- Source code
- Project structure
- UI implementation
- Technical documentation
- Architecture
- Development history
- Review-1 progress
- Future roadmap

For future review stages, implementation evidence should be added through:

- Meaningful Git commits
- Test files
- API implementation
- Database implementation
- Screenshots
- Demo videos
- Technical documentation

---

# 📌 Implementation Principles

### 1. Patient First

The interface should be understandable without technical knowledge.

### 2. Clinician in Control

AI-generated information must remain reviewable and editable.

### 3. Multilingual by Design

Patients should be able to communicate in a familiar language.

### 4. Modular Architecture

Patient, conversation, document, clinical-story, and doctor modules should be independently extensible.

### 5. Honest AI

The system should not invent missing clinical information.

### 6. Human-in-the-Loop

Clinical decisions remain with qualified healthcare professionals.

### 7. Privacy by Design

Patient information should be minimized and protected.

---

# 🔒 Safety & Regulatory Notice

Saarthi.AI is designed as a **clinical documentation and patient-story assistance prototype**.

It:

- Does not replace a physician.
- Does not provide autonomous medical diagnosis.
- Does not prescribe treatment.
- Does not make final clinical decisions.
- Requires clinician review of generated information.

All AI-generated information should be treated as an assistive draft until verified by a qualified healthcare professional.

The current project is an educational/prototype implementation and is not presented as a certified medical device or production clinical system.

---

# 🤝 Contribution

The project can be extended by adding:

- Backend services
- AI integrations
- Speech services
- OCR
- Database
- Testing
- Security
- Clinical validation
- Interoperability

Contributions should preserve the project's safety and human-in-the-loop principles.

---

# 📄 License

Add the actual license used by the repository.

Example:

```text
MIT License
```

---

# 👨‍💻 Project Summary

## Saarthi.AI

### Core Idea

```text
Patient Story
     ↓
AI Guidance
     ↓
Clinical Structure
     ↓
Doctor Review
```

### Current Achievement

**Review 1 — Approximately 35% project completion**

### Current Focus

**Core UI + Clinical Story Engine + Doctor Workflow**

### Next Focus

**Backend + AI + OCR + Database + Security + Validation**

---

# ❤️ Final Vision

> **Saarthi.AI does not replace the doctor.**
>
> **It helps the doctor start with the patient's story already heard.**
