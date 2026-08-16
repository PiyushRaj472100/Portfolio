# Piyush Raj — AI / ML Software Developer Portfolio

A modern, high-performance portfolio featuring an interactive AI Assistant powered by Google Gemini 3.7 Flash and a FastAPI secure backend.

---

## 🚀 Quick Start

### 1. Start Backend (FastAPI + Gemini)
```powershell
cd backend
python -m uvicorn main:app --reload --port 8000
```

Backend will be live at `http://localhost:8000`. Test endpoint: `http://localhost:8000/health`.

### 2. Start Frontend (React + Vite + Tailwind)
```powershell
cd frontend
npm install
npm run dev
```

Frontend will be live at `http://localhost:5173`.

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Motion (Framer Motion), Lucide Icons
- **Backend**: FastAPI, Python 3.11+, HTTPX, Pydantic, Python-Dotenv
- **AI Engine**: Google Gemini 3.7 Flash (with fallback to 3.6 / 3.5), knowledge-grounded prompt with Piyush Raj's real projects, publications, and skills
- **Resume & Assets**: Embedded PDF preview and instant download (`/Piyush_Raj_Resume.pdf`)

---

## ✨ Features

- **Hero & Role Cycler**: Dynamic animated role typing effect with stats counter
- **Interactive Project Filtering**: Filter projects by categories (*Resume Highlights, AI Application, Full-Stack + ML, Security AI, ML Model*) and instant search
- **AI Portfolio Assistant**: Real-time Q&A assistant powered by Gemini 3.7 Flash, Markdown link parsing, copy response, clear chat, and preset query pills
- **Interactive Resume Modal**: In-browser preview modal with PDF viewer and instant download button
- **One-Click Contact Actions**: Copy email and phone directly with clipboard toast feedback
- **Research & Publications**: Dedicated card for the IJSREM-published paper *AuthAI*
