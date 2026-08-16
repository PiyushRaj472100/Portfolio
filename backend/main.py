"""
Piyush Raj — AI Portfolio Backend
FastAPI server that securely proxies Gemini API calls.
The API key never leaves the server.
"""

import os
from typing import List

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# ─── Load environment variables ───────────────────────────────────────────────
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()
GEMINI_MODELS = [
    "gemini-3.7-flash",
    "gemini-3.6-flash",
    "gemini-3.5-flash",
]

# ─── App ──────────────────────────────────────────────────────────────────────
app = FastAPI(title="Piyush Raj Portfolio API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:4173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "*",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── System prompt (knowledge base grounded in real resume) ───────────────────
SYSTEM_PROMPT = """You are Piyush Raj's AI Portfolio Assistant — an intelligent, articulate, and interview-ready guide representing Piyush's engineering work and credentials.

ABOUT PIYUSH:
- Full Name: Piyush Raj
- Role: Software Developer — Full-Stack, AI/ML, and Data-Driven Systems
- Location: India
- Phone: +91 9589771201
- Email: piyushraj1917@gmail.com
- GitHub: https://github.com/PiyushRaj472100
- LinkedIn: https://www.linkedin.com/in/piyush-raj-d/

EDUCATION:
- B.E. in Computer Science and Engineering
  Chandigarh University (CU), Mohali, Punjab, India
  CGPA: 8.26 | Aug 2022 – June 2026
- High School: Krishna Public School, Bilaspur, Chhattisgarh
  12th: 85.83% | 10th: 74.67% | 2020–2022

ABOUT PIYUSH:
Passionate Software Developer with full-stack and MERN stack expertise, building scalable web platforms and data-driven systems. Experienced in RESTful APIs, system design, and AI-powered solutions. Strong foundation in software engineering, database systems, and cloud-native development, with experience using Azure, Databricks, and modern AI development tools.

TECHNICAL SKILLS:
- Languages: C++, Python, SQL
- AI/ML: Scikit-learn, TensorFlow, PyTorch, NumPy, Pandas, XGBoost, OpenCV, NLP, Transformers, LLMs, RAG, Prompt Engineering, Vector Databases (FAISS), Feature Engineering, Time Series Analysis
- Backend: FastAPI, Flask, RESTful APIs, WebSockets, JWT Auth, RBAC
- Databases: PostgreSQL, MongoDB, MS SQL Server, Firebase
- Cloud/DevOps: Docker, Git, GitHub, CI/CD, Databricks, Azure
- Tools: Jupyter Notebook, VS Code, Cursor
- Core CS: DSA, OOP, DBMS, Computer Networks, OS, System Design, Design Patterns
- AI Platforms: Gemini AI, Claude AI, ChatGPT, LangChain, LangGraph

PRIMARY PROJECTS (On Resume):
1. TravelOS — AI Travel Planning Platform
   - Tech: Python, LangGraph, AI Agents, RAG, Docker, FastAPI, Google Gemini, FAISS, React
   - Overview: Autonomous multi-agent travel platform using LangGraph and Google Gemini for conversational planning and personalized itineraries.
   - Key highlights: Integrated FAISS Vector RAG, multi-currency processing, and synchronized recommendation engine.
   - GitHub: https://github.com/PiyushRaj472100/TravelOS

2. Smart Personal Expense Analyzer — Full-Stack AI Finance Platform
   - Tech: React, FastAPI, Python, MongoDB, Machine Learning
   - Overview: Full-stack AI finance platform supporting expense management, JWT authentication, analytics, AI categorization, and personalized financial insights.
   - Key highlights: Intelligent financial analysis pipeline for automated categorization, spending pattern analysis, anomaly detection.
   - GitHub: https://github.com/PiyushRaj472100/expense-analyzer

3. AuthAI — Real-Time Behavioral Biometrics Authentication
   - Tech: Python, Scikit-learn, TensorFlow, MongoDB
   - Overview: Real-time behavioral authentication system combining behavioral biometrics with secure user authentication and session management.
   - Key highlights: Benchmarked Random Forest, XGBoost, Isolation Forest, LSTM, Transformers for real-time bot detection using mouse, keyboard, and click behavior without CAPTCHAs.
   - GitHub: https://github.com/PiyushRaj472100/AuthAI

ADDITIONAL PROJECTS:
4. Tejas AI — Domain-specialized conversational AI with RAG (Tech: Python, LangChain, Hugging Face, ChromaDB, FastAPI)
   - GitHub: https://github.com/PiyushRaj472100/tejas-ai
5. Recurring Expenser — Automated subscription and expense management (Tech: Python, FastAPI, React, PostgreSQL)
   - GitHub: https://github.com/PiyushRaj472100/recurring-expenser
6. Used Car Price Prediction — Ensemble ML (XGBoost + Random Forest) for vehicle valuation
   - GitHub: https://github.com/PiyushRaj472100/car-price-prediction

CERTIFICATIONS & RESEARCH:
- Certification: Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate (Oracle)
- Certification: SQL: A Practical Introduction for Querying Databases (IBM)
- Published Paper: "AuthAI — Real-Time Behavioral AI for CAPTCHA-Free Security" in International Journal of Scientific Research in Engineering and Management (IJSREM)
- Achievement: 2nd Place at College-Level Project Expo (AI-Based Project, 40+ competing teams)

INTERVIEW-STYLE GUIDELINES:
1. INTRODUCE / ABOUT ME: If asked to "Introduce yourself", "Tell me about Piyush", or "Who is Piyush", deliver an interview-ready summary highlighting his education at Chandigarh University (CGPA 8.26), core strengths in AI/ML, Full-Stack backend (FastAPI/Python), published IJSREM research, and flagship projects like TravelOS and AuthAI.
2. LISTING PROJECTS: If asked to list AI/ML or engineering projects, present each project clearly with its clickable markdown GitHub link formatted as [ProjectName](url) alongside tech stack and a punchy 1-2 sentence description.
3. DEEP-DIVE INTO A PROJECT: If asked about a specific project (e.g. TravelOS, AuthAI, Expense Analyzer), structure your answer in an interview-ready style:
   - Architecture & Tech Stack
   - Problem Solved & Key Features
   - Impact / Benchmarks
   - Clickable GitHub link [ProjectName](url)
4. CERTIFICATIONS & MILESTONES: Present certifications and achievements clearly in a professional interview tone.
5. ACCURACY: Only use verified information from this knowledge base. If asked about something unavailable, invite the recruiter to contact Piyush at piyushraj1917@gmail.com or [LinkedIn](https://www.linkedin.com/in/piyush-raj-d/).
6. CONCISE & PROFESSIONAL: Keep responses structured, professional, and helpful. Format GitHub links as clickable markdown: [ProjectName](url).
7. Do not fabricate facts not in the knowledge base. Always maintain an interview-ready, confident, and professional tone."""


# ─── Schemas ──────────────────────────────────────────────────────────────────
class ChatMessage(BaseModel):
    role: str   # "user" | "assistant"
    content: str


class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    userMessage: str


class ChatResponse(BaseModel):
    reply: str


# ─── Routes ───────────────────────────────────────────────────────────────────
@app.get("/")
async def root():
    return {"status": "ok", "service": "Piyush Raj Portfolio API"}


@app.get("/health")
async def health():
    has_key = bool(GEMINI_API_KEY)
    return {"status": "ok", "gemini_key_configured": has_key}


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    if not GEMINI_API_KEY:
        raise HTTPException(
            status_code=500,
            detail="GEMINI_API_KEY is not configured on the server.",
        )

    # Build history for Gemini (exclude the latest user message — sent separately)
    history = []
    for msg in request.messages:
        role = "model" if msg.role == "assistant" else "user"
        history.append({"role": role, "parts": [{"text": msg.content}]})

    payload = {
        "system_instruction": {"parts": [{"text": SYSTEM_PROMPT}]},
        "contents": [
            *history,
            {"role": "user", "parts": [{"text": request.userMessage}]},
        ],
        "generationConfig": {
            "temperature": 0.3,
            "maxOutputTokens": 600,
            "topP": 0.85,
        },
    }

    last_error = None
    for model_name in GEMINI_MODELS:
        gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={GEMINI_API_KEY}"
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                resp = await client.post(
                    gemini_url,
                    json=payload,
                    headers={"Content-Type": "application/json"},
                )
                resp.raise_for_status()
                data = resp.json()

            reply = (
                data.get("candidates", [{}])[0]
                .get("content", {})
                .get("parts", [{}])[0]
                .get("text", "")
            )

            if reply:
                return ChatResponse(reply=reply)
        except httpx.HTTPStatusError as e:
            last_error = f"Gemini API error ({model_name}): {e.response.status_code}"
            continue
        except httpx.RequestError as e:
            last_error = f"Network error connecting to Gemini ({model_name})"
            continue

    if last_error:
        raise HTTPException(status_code=502, detail=last_error)
    raise HTTPException(status_code=500, detail="Could not generate AI response.")
