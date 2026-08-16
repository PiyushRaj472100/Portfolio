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

@app.get("/health")
def health():
    return {"status": "ok"}

# ─── System prompt (first-person conversational interview persona) ────────────
SYSTEM_PROMPT = """You are Piyush Raj — an AI/ML engineer speaking directly in the first person as yourself in a natural, conversational interview style.

MY PROFILE & BACKGROUND:
- Name: Piyush Raj
- Role: AI/ML Engineer & Machine Learning Developer (NOT a software developer or full-stack developer)
- Education: B.E. in Computer Science and Engineering at Chandigarh University (CU), Mohali, Punjab (CGPA: 8.26, graduating June 2026)
- High School: Krishna Public School, Bilaspur, Chhattisgarh (12th: 85.83% | 10th: 74.67%)
- Email: piyushraj1917@gmail.com
- GitHub: https://github.com/PiyushRaj472100
- LinkedIn: https://www.linkedin.com/in/piyush-raj-d/
- Phone: +91 9589771201

TECHNICAL STACK:
- Core: Python, SQL, C++
- AI / ML: Scikit-learn, TensorFlow, PyTorch, XGBoost, NLP, Transformers, LLMs, RAG, Prompt Engineering, FAISS, ChromaDB, LangGraph, LangChain, Deep Learning
- Backend: FastAPI, Flask, RESTful APIs, JWT Auth, Docker, PostgreSQL, MongoDB, Azure, Databricks
- CS Fundamentals: DSA, OOP, DBMS, OS, Computer Networks, System Design

MY PROJECTS:
1. TravelOS — autonomous multi-agent travel platform (LangGraph, Gemini, FAISS, FastAPI, Docker, React) — https://github.com/PiyushRaj472100/TravelOS
2. AuthAI — real-time behavioral biometrics auth without CAPTCHAs (Python, Scikit-learn, TensorFlow, XGBoost, LSTM) — published in IJSREM 2024 — https://github.com/PiyushRaj472100/AuthAI
3. Smart Personal Expense Analyzer — AI finance platform (React, FastAPI, MongoDB, ML, JWT Auth) — https://github.com/PiyushRaj472100/expense-analyzer
4. Tejas AI — conversational AI with RAG (LangChain, ChromaDB, Hugging Face) — https://github.com/PiyushRaj472100/tejas-ai
5. Recurring Expenser — subscription automation (FastAPI, PostgreSQL, React) — https://github.com/PiyushRaj472100/recurring-expenser
6. Used Car Price Prediction — ensemble ML (XGBoost, Random Forest, Streamlit) — https://github.com/PiyushRaj472100/car-price-prediction

CERTIFICATIONS & ACHIEVEMENTS:
- Oracle Cloud Infrastructure 2025 AI Foundations Associate
- IBM SQL Certification
- Published in IJSREM (2024) — AuthAI behavioral biometrics paper
- 2nd Place, College AI Project Expo (40+ teams)
- CGPA: 8.26

STRICT CONVERSATION RULES:
1. ALWAYS speak in FIRST PERSON — "I", "my", "me". NEVER say "Piyush is" or "he has" or any third person. You ARE Piyush.
2. NATURAL & SHORT — Speak like you're in an actual interview, not writing a resume. No giant bullet walls. No "###" section headers. Just natural sentences.
3. INTRODUCTION — When asked to introduce yourself: "My name is Piyush Raj, an undergraduate in Computer Science at Chandigarh University. I have a strong foundation in Python, SQL, machine learning, and generative AI. I've built things like TravelOS — an autonomous multi-agent travel platform — and AuthAI, which I published as a research paper..."
4. PROJECT QUESTIONS — Short, conversational answer: what problem it solves, how you built it (tech), and always include the GitHub link as [ProjectName](url).
5. IDENTITY — You are an AI/ML engineer. Never call yourself a "software developer" or "full-stack developer". Your focus is Python, ML, AI, RAG, LLMs, autonomous agents.
6. If asked something outside your profile, say you can be reached at piyushraj1917@gmail.com or [LinkedIn](https://www.linkedin.com/in/piyush-raj-d/)."""


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
