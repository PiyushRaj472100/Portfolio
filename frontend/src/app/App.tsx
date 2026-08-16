import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Send,
  Bot,
  User,
  ChevronDown,
  Menu,
  X,
  Download,
  Code2,
  Brain,
  Globe,
  Database,
  Cloud,
  Award,
  BookOpen,
  Briefcase,
  Zap,
  Terminal,
  Star,
  ArrowRight,
  FileText,
  MapPin,
  Calendar,
  Phone,
  Copy,
  Check,
  Search,
  Sparkles,
  Eye,
  Trash2,
  ArrowUp,
  Cpu,
} from "lucide-react";

// ─── Data ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#research", label: "Research" },
  { href: "#achievements", label: "Achievements" },
  { href: "#resume", label: "Resume" },
  { href: "#ai", label: "AI Assistant" },
  { href: "#contact", label: "Contact" },
];

const ROLES = [
  "Software Developer",
  "AI/ML Engineer",
  "Full-Stack Developer",
  "Python Developer",
  "Data-Driven Systems Builder",
];

const PROJECTS = [
  {
    id: 1,
    title: "TravelOS",
    tagline: "AI-powered travel planning platform",
    description:
      "Autonomous multi-agent travel platform using LangGraph, Google Gemini, and FastAPI, enabling conversational planning and personalized itineraries. Integrated FAISS Vector RAG, multi-currency processing, and React to deliver intelligent recommendations and synchronized travel planning.",
    tags: ["Python", "LangGraph", "AI Agents", "RAG", "FastAPI", "FAISS", "Docker", "React", "Gemini AI"],
    category: "AI Application",
    color: "#06b6d4",
    github: "https://github.com/piyushraj00/TravelOS",
    demo: null,
    highlights: ["Multi-agent LangGraph orchestration", "FAISS Vector RAG", "Conversational itinerary planning"],
    onResume: true,
  },
  {
    id: 2,
    title: "Smart Personal Expense Analyzer",
    tagline: "AI-powered full-stack finance platform",
    description:
      "Full-stack AI finance platform built with React and FastAPI, supporting expense management, JWT authentication, analytics, AI categorization, and personalized financial insights. Engineered an intelligent analysis pipeline for automated categorization, spending pattern analysis, and anomaly detection.",
    tags: ["React", "FastAPI", "Python", "MongoDB", "JWT Auth", "ML", "AI Categorization"],
    category: "Full-Stack + ML",
    color: "#34d399",
    github: "https://github.com/piyushraj00/expense-analyzer",
    demo: null,
    highlights: ["JWT auth + RBAC", "AI-based expense categorization", "Anomaly detection pipeline"],
    onResume: true,
  },
  {
    id: 3,
    title: "AuthAI",
    tagline: "Real-time behavioral biometrics authentication",
    description:
      "Real-time behavioral authentication system using Python, Scikit-learn, TensorFlow, and MongoDB — combining behavioral biometrics with secure user authentication and session management. Benchmarked Random Forest, XGBoost, Isolation Forest, LSTM, and Transformers for real-time bot detection using mouse, keyboard, and click behavior.",
    tags: ["Python", "Scikit-learn", "TensorFlow", "MongoDB", "XGBoost", "LSTM", "Transformers"],
    category: "Security AI",
    color: "#8b5cf6",
    github: "https://github.com/piyushraj00/AuthAI",
    demo: null,
    highlights: ["Behavioral biometrics (mouse, keyboard, click)", "Multi-model benchmarking", "Real-time bot detection"],
    onResume: true,
  },
  {
    id: 4,
    title: "Tejas AI",
    tagline: "Domain-specialized conversational AI",
    description:
      "Conversational AI assistant fine-tuned on domain-specific corpora using Hugging Face transformers. Features RAG-based context retrieval with ChromaDB, LangChain orchestration, and a streaming chat interface.",
    tags: ["Python", "LangChain", "Hugging Face", "ChromaDB", "FastAPI"],
    category: "AI Application",
    color: "#f59e0b",
    github: "https://github.com/piyushraj00/tejas-ai",
    demo: null,
    highlights: ["RAG retrieval", "Fine-tuned LLM", "Streaming responses"],
    onResume: false,
  },
  {
    id: 5,
    title: "Recurring Expenser",
    tagline: "Automated subscription & expense orchestration",
    description:
      "Full-stack system for tracking, managing, and automating recurring subscriptions and expenses. Features intelligent renewal alerts, multi-currency support, and automated payment processing.",
    tags: ["Python", "FastAPI", "React", "PostgreSQL", "Cron"],
    category: "Full-Stack + ML",
    color: "#f43f5e",
    github: "https://github.com/piyushraj00/recurring-expenser",
    demo: null,
    highlights: ["Recurring billing automation", "Multi-currency", "Smart alerts"],
    onResume: false,
  },
  {
    id: 6,
    title: "Used Car Price Prediction",
    tagline: "Ensemble ML for vehicle valuation",
    description:
      "Gradient-boosted ensemble model (XGBoost + Random Forest) for predicting used car market values. Incorporates feature engineering on vehicle records with a Streamlit deployment for real-time predictions.",
    tags: ["Python", "XGBoost", "Random Forest", "Pandas", "Streamlit", "Scikit-learn"],
    category: "ML Model",
    color: "#06b6d4",
    github: "https://github.com/piyushraj00/car-price-prediction",
    demo: null,
    highlights: ["Ensemble ML model", "Feature engineering", "Streamlit deployment"],
    onResume: false,
  },
];

const SKILLS = {
  "AI & Machine Learning": {
    icon: Brain,
    color: "#06b6d4",
    items: [
      { name: "Python", level: 92 },
      { name: "Scikit-learn", level: 88 },
      { name: "TensorFlow / PyTorch", level: 82 },
      { name: "XGBoost / Pandas / NumPy", level: 88 },
      { name: "NLP / Transformers / LLMs", level: 84 },
      { name: "RAG / Vector Databases (FAISS)", level: 82 },
      { name: "LangChain / LangGraph", level: 80 },
      { name: "Prompt Engineering", level: 85 },
    ],
  },
  "Backend & APIs": {
    icon: Terminal,
    color: "#8b5cf6",
    items: [
      { name: "FastAPI", level: 88 },
      { name: "Flask", level: 82 },
      { name: "RESTful APIs / WebSockets", level: 86 },
      { name: "JWT Auth / RBAC", level: 82 },
      { name: "PostgreSQL / MongoDB", level: 80 },
      { name: "Docker / CI-CD", level: 76 },
    ],
  },
  "Frontend & Tools": {
    icon: Globe,
    color: "#34d399",
    items: [
      { name: "React", level: 82 },
      { name: "C++ / DSA", level: 80 },
      { name: "SQL (PostgreSQL, MS SQL)", level: 84 },
      { name: "OpenCV / Computer Vision", level: 72 },
      { name: "Jupyter / VS Code", level: 90 },
    ],
  },
  "Cloud & AI Platforms": {
    icon: Cloud,
    color: "#f59e0b",
    items: [
      { name: "Azure / Databricks", level: 70 },
      { name: "Firebase", level: 74 },
      { name: "Gemini AI / LangChain", level: 82 },
      { name: "Claude AI / ChatGPT APIs", level: 80 },
      { name: "Git / GitHub", level: 88 },
    ],
  },
};

const RESEARCH = [
  {
    title: "AuthAI — Real-Time Behavioral AI for CAPTCHA-Free Security",
    venue: "International Journal of Scientific Research in Engineering and Management (IJSREM)",
    year: "Published",
    abstract:
      "Published research presenting AuthAI — a real-time behavioral biometrics authentication system that eliminates CAPTCHAs. Combines mouse dynamics, keystroke patterns, and click behavior analysis using ML/DL models (Random Forest, XGBoost, Isolation Forest, LSTM, Transformers) for real-time bot detection with secure session management.",
    tags: ["Behavioral Biometrics", "Bot Detection", "ML/DL", "Security AI", "IJSREM"],
    color: "#8b5cf6",
    link: null,
  },
];

const CERTIFICATIONS = [
  {
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle",
    year: "2025",
    icon: Award,
    color: "#f59e0b",
  },
  {
    title: "SQL: A Practical Introduction for Querying Databases",
    issuer: "IBM",
    year: "2024",
    icon: Database,
    color: "#06b6d4",
  },
];

const ACHIEVEMENTS = [
  {
    year: "2025",
    title: "Oracle Cloud Infrastructure AI Foundations Certified",
    description: "Earned Oracle Cloud Infrastructure 2025 AI Foundations Associate certification, validating cloud AI/ML knowledge.",
    icon: Award,
    color: "#f59e0b",
  },
  {
    year: "2024",
    title: "Published Research — IJSREM",
    description: "Published paper 'AuthAI — Real-Time Behavioral AI for CAPTCHA-Free Security' in the International Journal of Scientific Research in Engineering and Management.",
    icon: BookOpen,
    color: "#8b5cf6",
  },
  {
    year: "2024",
    title: "2nd Place — College Project Expo",
    description: "Secured 2nd place out of 40+ teams at the College-Level Project Expo with an AI-based project.",
    icon: Star,
    color: "#34d399",
  },
  {
    year: "2024",
    title: "IBM SQL Certification",
    description: "Completed IBM's SQL certification — A Practical Introduction for Querying Databases.",
    icon: Cpu,
    color: "#06b6d4",
  },
];

// ─── Utility ─────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function useTypingCycle(words: string[], speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[idx];
    if (!deleting && displayed === word) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && displayed === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(() => {
      setDisplayed(deleting ? word.slice(0, displayed.length - 1) : word.slice(0, displayed.length + 1));
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [displayed, deleting, idx, words, speed, pause]);

  return displayed;
}

function SectionHeading({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className="mb-16 text-center">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="inline-block font-mono text-xs tracking-[0.25em] uppercase text-primary mb-3 px-3 py-1 border border-primary/30 rounded-full"
      >
        {label}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl md:text-5xl font-bold text-foreground tracking-tight"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { threshold: 0.4, rootMargin: "-80px 0px 0px 0px" }
    );
    sections.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    const el = document.getElementById(href.slice(1));
    el?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => scrollTo("#about")}
          className="font-mono text-sm font-bold text-primary tracking-widest uppercase flex items-center gap-1.5 group cursor-pointer"
        >
          <span className="text-primary group-hover:scale-110 transition-transform">&lt;</span>
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Piyush Raj</span>
          <span className="text-accent group-hover:scale-110 transition-transform">/&gt;</span>
        </button>

        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer ${
                active === l.href.slice(1)
                  ? "text-primary bg-primary/10 border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <button
          className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-card/95 backdrop-blur-xl border-b border-border px-6 py-4 flex flex-col gap-2 shadow-2xl"
          >
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-white/5 transition-colors cursor-pointer"
              >
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(6,182,212,0.12) 0%, transparent 70%)",
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}

function FloatingOrb({ cx, cy, r, color, delay }: { cx: string; cy: string; r: number; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl opacity-15 pointer-events-none"
      style={{ left: cx, top: cy, width: r * 2, height: r * 2, background: color, transform: "translate(-50%, -50%)" }}
      animate={{ scale: [1, 1.25, 1], opacity: [0.1, 0.18, 0.1] }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function Hero() {
  const role = useTypingCycle(ROLES);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16">
      <GridBackground />
      <FloatingOrb cx="20%" cy="30%" r={300} color="#06b6d4" delay={0} />
      <FloatingOrb cx="80%" cy="60%" r={250} color="#8b5cf6" delay={2} />
      <FloatingOrb cx="50%" cy="80%" r={200} color="#34d399" delay={4} />

      <div className="relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-8 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-xs text-primary tracking-widest uppercase font-semibold">
            Available for opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-6xl md:text-8xl font-black tracking-tight text-foreground leading-none mb-4"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Piyush{" "}
          <span className="bg-gradient-to-r from-primary via-cyan-400 to-accent bg-clip-text text-transparent">
            Raj
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="h-10 flex items-center justify-center mb-6"
        >
          <span className="font-mono text-xl md:text-2xl text-muted-foreground">
            &gt;{" "}
            <span className="text-primary font-semibold">{role}</span>
            <span className="animate-pulse text-primary ml-0.5">_</span>
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Building intelligent systems at the intersection of AI/ML, full-stack engineering, and cloud-native development.
          Turning complex data into products people actually use.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="https://github.com/piyushraj00"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
          >
            <Github size={16} />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/piyushraj00"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-semibold rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all hover:scale-105 active:scale-95"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
          <button
            onClick={() => document.getElementById("ai")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-6 py-3 border border-accent/40 text-accent font-semibold rounded-xl hover:bg-accent/10 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Bot size={16} />
            Ask AI About Me
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex items-center justify-center gap-8 text-sm font-mono text-muted-foreground"
        >
          {[["6", "Projects"], ["1", "Published Paper"], ["8.26", "CGPA"], ["2025", "OCI Certified"]].map(
            ([val, label]) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-foreground">{val}</div>
                <div className="text-xs mt-0.5 text-muted-foreground">{label}</div>
              </div>
            )
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown size={20} className="text-muted-foreground animate-bounce" />
      </motion.div>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────

function About() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="01. About" title="Who I Am" />
        <div ref={ref} className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a <span className="text-foreground font-semibold">passionate Software Developer</span> with full-stack and MERN stack expertise, building scalable web platforms and data-driven systems.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Experienced in RESTful APIs, system design, and AI-powered solutions. I work with FastAPI, Python, LangGraph, and React to build end-to-end applications. My recent work includes autonomous multi-agent AI systems, behavioral biometrics, and financial intelligence platforms.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I'm currently a <span className="text-foreground font-medium">B.E. Computer Science student at Chandigarh University</span> (CGPA: 8.26, graduating June 2026), with hands-on experience using Azure, Databricks, and modern AI development tools.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {["LLM Systems", "RAG Architecture", "Behavioral AI", "Full-Stack ML", "System Design", "Cloud-Native Dev"].map((t) => (
                <span key={t} className="font-mono text-xs px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full font-medium">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: MapPin, label: "Location", value: "India" },
              { icon: Briefcase, label: "Status", value: "Open to Work" },
              { icon: BookOpen, label: "Degree", value: "B.E. CSE" },
              { icon: Calendar, label: "Graduating", value: "June 2026" },
              { icon: Brain, label: "Focus Area", value: "AI / ML / LLMs" },
              { icon: Code2, label: "Languages", value: "Python, C++, SQL" },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex flex-col gap-1.5 p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors shadow-sm"
              >
                <Icon size={16} className="text-primary" />
                <div className="font-mono text-xs text-muted-foreground">{label}</div>
                <div className="text-sm font-semibold text-foreground">{value}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Skills ──────────────────────────────────────────────────────────────────

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="font-mono text-xs text-muted-foreground">{name}</span>
        <span className="font-mono text-xs text-muted-foreground">{level}%</span>
      </div>
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="02. Skills"
          title="Technical Arsenal"
          subtitle="Technologies I use to build reliable, production-grade AI systems and full-stack applications."
        />
        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(SKILLS).map(([category, { icon: Icon, color, items }], catIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg" style={{ background: `${color}15` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <h3 className="font-semibold text-foreground text-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {category}
                </h3>
              </div>
              <div className="space-y-3">
                {items.map((item, i) => (
                  <SkillBar key={item.name} name={item.name} level={item.level} color={color} delay={i * 0.05} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects ────────────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative group p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300 flex flex-col"
      style={{ boxShadow: hovered ? `0 0 30px ${project.color}15` : undefined }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px rounded-t-2xl transition-all duration-300"
        style={{ background: hovered ? `linear-gradient(90deg, transparent, ${project.color}80, transparent)` : "transparent" }}
      />

      {/* Resume badge */}
      {project.onResume && (
        <div className="absolute top-4 right-4">
          <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-primary/40 bg-primary/10 text-primary font-semibold">
            ✦ on resume
          </span>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 pr-2">
          <span
            className="font-mono text-xs px-2 py-0.5 rounded border mb-2 inline-block font-medium"
            style={{ color: project.color, borderColor: `${project.color}30`, background: `${project.color}10` }}
          >
            {project.category}
          </span>
          <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">{project.tagline}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2 mt-6">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-all"
              title="View on GitHub"
            >
              <Github size={15} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-all"
              title="Live Demo"
            >
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
        {project.description}
      </p>

      <div className="space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="font-mono text-xs px-2 py-0.5 bg-secondary text-muted-foreground rounded">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-1">
          {project.highlights.map((h) => (
            <div key={h} className="flex items-center gap-2 text-xs text-muted-foreground">
              <Zap size={10} style={{ color: project.color }} className="shrink-0" />
              {h}
            </div>
          ))}
        </div>

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono mt-1 hover:text-primary text-muted-foreground transition-colors"
          >
            <Github size={11} />
            {project.github.replace("https://github.com/", "github.com/")}
          </a>
        )}
      </div>
    </motion.div>
  );
}

function Projects() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const categories = ["All", "Resume Highlights", "AI Application", "Full-Stack + ML", "Security AI", "ML Model"];

  const filtered = PROJECTS.filter((p) => {
    const matchesFilter =
      filter === "All"
        ? true
        : filter === "Resume Highlights"
        ? p.onResume
        : p.category === filter;

    const matchesSearch =
      search.trim() === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="03. Projects"
          title="What I've Built"
          subtitle="Six projects spanning autonomous AI agents, behavioral security, financial ML, and full-stack platforms. Top 3 are featured on my official resume."
        />

        {/* Filter bar & Search */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`font-mono text-xs px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                  filter === cat
                    ? "bg-primary text-primary-foreground border-primary font-semibold shadow-sm"
                    : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                {cat === "Resume Highlights" ? "✦ Resume Highlights" : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tech, title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-card border border-border rounded-full text-xs font-mono text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        <motion.div layout className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground font-mono text-sm">
            No projects found matching your search.
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Research ────────────────────────────────────────────────────────────────

function Research() {
  return (
    <section id="research" className="py-24 px-6 bg-card/30">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          label="04. Research"
          title="Published Work"
          subtitle="Peer-reviewed research at the intersection of behavioral AI and real-world security systems."
        />
        <div className="space-y-6">
          {RESEARCH.map((paper, i) => (
            <motion.div
              key={paper.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors group shadow-sm"
            >
              <div
                className="absolute left-0 top-6 bottom-6 w-1 rounded-full"
                style={{ background: paper.color }}
              />
              <div className="pl-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground text-lg leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {paper.title}
                    </h3>
                    <p className="font-mono text-xs text-muted-foreground mt-1">{paper.venue}</p>
                  </div>
                  <span className="font-mono text-xs px-2.5 py-0.5 border border-primary/30 text-primary bg-primary/10 rounded-full font-semibold shrink-0">
                    {paper.year}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{paper.abstract}</p>
                <div className="flex flex-wrap gap-2">
                  {paper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-2 py-0.5 rounded border"
                      style={{ color: paper.color, borderColor: `${paper.color}25`, background: `${paper.color}08` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Achievements ─────────────────────────────────────────────────────────────

function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          label="05. Achievements"
          title="Milestones"
          subtitle="Certifications, publications, and recognition across academia and competition."
        />

        {/* Certifications strip */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {CERTIFICATIONS.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors shadow-sm"
              >
                <div className="p-2 rounded-lg shrink-0" style={{ background: `${cert.color}15` }}>
                  <Icon size={16} style={{ color: cert.color }} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground leading-tight">{cert.title}</div>
                  <div className="font-mono text-xs text-muted-foreground mt-1">{cert.issuer} · {cert.year}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-6">
            {ACHIEVEMENTS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative flex gap-6 pl-20"
                >
                  <div
                    className="absolute left-5 top-4 w-7 h-7 rounded-full flex items-center justify-center border-2 border-background shadow-sm"
                    style={{ background: item.color }}
                  >
                    <Icon size={13} className="text-background" />
                  </div>
                  <div className="flex-1 p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors shadow-sm">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {item.title}
                      </h3>
                      <span className="font-mono text-xs text-muted-foreground shrink-0">{item.year}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Resume Modal & Section ───────────────────────────────────────────────────

function ResumeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl h-[85vh] bg-card border border-border rounded-2xl flex flex-col shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-secondary/30">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-primary" />
            <h3 className="font-bold text-foreground">Piyush Raj — Resume Preview</h3>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/Piyush_Raj_Resume.pdf"
              download="Piyush_Raj_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary/90 transition-all"
            >
              <Download size={13} />
              Download
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-neutral-900/50 p-2">
          <iframe
            src="/Piyush_Raj_Resume.pdf"
            title="Resume PDF Viewer"
            className="w-full h-full rounded-lg border border-border"
          />
        </div>
      </motion.div>
    </div>
  );
}

function Resume() {
  const { ref, inView } = useInView();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="resume" className="py-24 px-6 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          label="06. Resume"
          title="Full Credentials"
          subtitle="Education, certifications, and technical competencies from my official resume."
        />
        <div ref={ref} className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-2xl bg-card border border-border space-y-4 shadow-sm"
          >
            <div className="flex items-center gap-2 text-primary mb-4">
              <BookOpen size={16} />
              <h3 className="font-semibold text-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>Education</h3>
            </div>
            <div className="border-l-2 border-primary/30 pl-4 space-y-5">
              <div>
                <div className="font-semibold text-foreground text-sm">B.E. — Computer Science & Engineering</div>
                <div className="font-mono text-xs text-primary mt-0.5 font-semibold">CGPA: 8.26</div>
                <div className="font-mono text-xs text-muted-foreground mt-0.5">Aug 2022 – June 2026</div>
                <div className="text-xs text-muted-foreground mt-1">Chandigarh University (CU), Mohali, Punjab, India</div>
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm">High School — Krishna Public School</div>
                <div className="font-mono text-xs text-muted-foreground mt-0.5">2020 – 2022 · Bilaspur, Chhattisgarh</div>
                <div className="text-xs text-muted-foreground mt-1">12th: 85.83% &nbsp;|&nbsp; 10th: 74.67%</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 rounded-2xl bg-card border border-border space-y-4 shadow-sm"
          >
            <div className="flex items-center gap-2 text-accent mb-4">
              <Award size={16} />
              <h3 className="font-semibold text-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>Certifications</h3>
            </div>
            <div className="border-l-2 border-accent/30 pl-4 space-y-5">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.title}>
                  <div className="font-semibold text-foreground text-sm">{cert.title}</div>
                  <div className="font-mono text-xs text-muted-foreground mt-0.5">{cert.issuer} · {cert.year}</div>
                </div>
              ))}
              <div>
                <div className="font-semibold text-foreground text-sm">Published Research</div>
                <div className="font-mono text-xs text-muted-foreground mt-0.5">IJSREM · 2024</div>
                <div className="text-xs text-muted-foreground mt-1">AuthAI — Real-Time Behavioral AI for CAPTCHA-Free Security</div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="/Piyush_Raj_Resume.pdf"
            download="Piyush_Raj_Resume.pdf"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
          >
            <Download size={16} />
            Download Resume (PDF)
          </a>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-3 border border-border text-foreground font-semibold rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Eye size={16} />
            Preview Resume
          </button>
          <a
            href="https://github.com/piyushraj00"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 border border-border text-muted-foreground hover:text-foreground font-semibold rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all hover:scale-105 active:scale-95"
          >
            <Github size={16} />
            GitHub
          </a>
        </motion.div>
      </div>

      <ResumeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}

// ─── AI Assistant ─────────────────────────────────────────────────────────────

interface Message {
  role: "user" | "assistant";
  content: string;
}

function parseFormattedText(text: string) {
  // Parse markdown links, code blocks, bold text
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
  const parts: (string | React.ReactElement)[] = [];
  let lastIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      parts.push(text.slice(lastIdx, match.index));
    }
    parts.push(
      <a
        key={match.index}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary font-medium underline underline-offset-2 hover:text-primary/80 inline-flex items-center gap-0.5"
      >
        {match[1]}
        <ExternalLink size={11} className="ml-0.5 inline" />
      </a>
    );
    lastIdx = linkRegex.lastIndex;
  }
  if (lastIdx < text.length) {
    parts.push(text.slice(lastIdx));
  }
  return parts;
}

const QUICK_PROMPTS = [
  "What AI/ML projects has Piyush built?",
  "Tell me about TravelOS",
  "Tell me about AuthAI",
  "What are his technical skills?",
  "What certifications does he have?",
  "How to contact Piyush?",
];

const API_URL = (import.meta as any).env?.VITE_API_URL ?? "http://localhost:8000";

function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Piyush's AI Portfolio Assistant 👋 I can answer questions about his projects, skills, certifications, research, and experience. What would you like to know?\n\nTry: \"What AI projects has he built?\" or \"Tell me about TravelOS\"",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;
      setError(null);

      const userMsg: Message = { role: "user", content: text.trim() };
      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch(`${API_URL}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: messages.map((m) => ({ role: m.role, content: m.content })),
            userMessage: text.trim(),
          }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err?.detail ?? `Server error: ${res.status}`);
        }

        const data = await res.json();
        const reply = data?.reply ?? "I couldn't generate a response. Please try again.";
        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      } catch (err: any) {
        const msg = err?.message ?? "Unknown error";
        if (msg.includes("Failed to fetch") || msg.includes("NetworkError")) {
          setError("Cannot reach the backend server. Make sure the FastAPI server is running on port 8000.");
        } else {
          setError(`AI error: ${msg}`);
        }
        setMessages((prev) => prev.slice(0, -1));
      } finally {
        setLoading(false);
      }
    },
    [messages, loading]
  );

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Conversation cleared! Feel free to ask anything about Piyush's engineering portfolio, skills, or projects.",
      },
    ]);
    setError(null);
  };

  const copyMessage = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <section id="ai" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          label="07. AI Assistant"
          title="Ask About Piyush"
          subtitle="Powered by Gemini 3.7 Flash via a secure FastAPI backend. Ask anything about Piyush's projects, skills, research, or experience."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xl"
          style={{ boxShadow: "0 0 60px rgba(6,182,212,0.08)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-secondary/40">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-primary/15">
                <Bot size={16} className="text-primary" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">Piyush's Portfolio Assistant</div>
                <div className="font-mono text-xs text-muted-foreground">Gemini 3.7 Flash · Grounded in Resume Data</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-xs text-primary font-medium">Live</span>
              </div>
              <button
                onClick={clearChat}
                title="Clear Chat"
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-5 space-y-4 scroll-smooth">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 group ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                    msg.role === "assistant" ? "bg-primary/15" : "bg-accent/15"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <Bot size={13} className="text-primary" />
                  ) : (
                    <User size={13} className="text-accent" />
                  )}
                </div>
                <div className="relative max-w-[80%]">
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "assistant"
                        ? "bg-secondary text-foreground rounded-tl-sm"
                        : "bg-accent/15 text-foreground rounded-tr-sm"
                    }`}
                  >
                    {parseFormattedText(msg.content)}
                  </div>
                  {msg.role === "assistant" && (
                    <button
                      onClick={() => copyMessage(msg.content, i)}
                      className="absolute -right-7 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-muted-foreground hover:text-foreground rounded cursor-pointer"
                      title="Copy response"
                    >
                      {copiedIdx === i ? <Check size={12} className="text-primary" /> : <Copy size={12} />}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3 items-center"
              >
                <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                  <Bot size={13} className="text-primary" />
                </div>
                <div className="px-4 py-3 bg-secondary rounded-2xl rounded-tl-sm">
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-primary/60"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {error && (
              <div className="text-center font-mono text-xs text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-2">
                {error}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts */}
          <div className="px-5 pb-3 flex gap-2 overflow-x-auto no-scrollbar">
            {QUICK_PROMPTS.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                disabled={loading}
                className="shrink-0 font-mono text-xs px-3 py-1.5 border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all disabled:opacity-40 cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-5 pb-5">
            <div className="flex gap-3 items-end border border-border rounded-xl bg-secondary/30 px-4 py-3 focus-within:border-primary/50 transition-colors">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
                }}
                onKeyDown={handleKey}
                placeholder="Ask about Piyush's work, skills, or projects..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder-muted-foreground resize-none outline-none font-mono leading-relaxed"
                disabled={loading}
              />
              <button
                onClick={() => send(input)}
                disabled={loading || !input.trim()}
                className="shrink-0 p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <Send size={14} />
              </button>
            </div>
            <p className="font-mono text-[11px] text-muted-foreground mt-2 text-center">
              ↵ Enter to send · Shift+Enter for new line · API key secured on backend
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${form.name}`);
    const body = encodeURIComponent(`From: ${form.name} <${form.email}>\n\n${form.message}`);
    window.location.href = `mailto:piyushraj1917@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          label="08. Contact"
          title="Get In Touch"
          subtitle="Open to AI/ML roles, full-stack opportunities, research collaborations, and interesting projects."
        />
        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <p className="text-muted-foreground leading-relaxed">
              Whether you have a project in mind, a research question, or just want to talk AI — I'm always excited to connect.
            </p>
            <div className="space-y-3">
              {[
                { icon: Mail, label: "piyushraj1917@gmail.com", copyVal: "piyushraj1917@gmail.com", href: "mailto:piyushraj1917@gmail.com", color: "#06b6d4" },
                { icon: Github, label: "github.com/piyushraj00", copyVal: "https://github.com/piyushraj00", href: "https://github.com/piyushraj00", color: "#8b5cf6" },
                { icon: Linkedin, label: "linkedin.com/in/piyushraj00", copyVal: "https://linkedin.com/in/piyushraj00", href: "https://linkedin.com/in/piyushraj00", color: "#34d399" },
                { icon: Phone, label: "+91 9589771201", copyVal: "+919589771201", href: "tel:+919589771201", color: "#f59e0b" },
              ].map(({ icon: Icon, label, copyVal, href, color }) => (
                <div
                  key={label}
                  className="flex items-center justify-between p-3 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all group"
                >
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 flex-1"
                  >
                    <div className="p-2 rounded-lg shrink-0" style={{ background: `${color}15` }}>
                      <Icon size={15} style={{ color }} />
                    </div>
                    <span className="font-mono text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {label}
                    </span>
                  </a>
                  <button
                    onClick={() => copyToClipboard(copyVal, label)}
                    title="Copy to clipboard"
                    className="p-1.5 text-muted-foreground hover:text-primary rounded-md transition-colors cursor-pointer"
                  >
                    {copiedItem === label ? <Check size={14} className="text-primary" /> : <Copy size={14} />}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {[
              { name: "name", label: "Name", type: "text", placeholder: "Your name" },
              { name: "email", label: "Email", type: "email", placeholder: "your@email.com" },
            ].map((f) => (
              <div key={f.name}>
                <label className="font-mono text-xs text-muted-foreground mb-1.5 block">{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.name as "name" | "email"]}
                  onChange={(e) => setForm((prev) => ({ ...prev, [f.name]: e.target.value }))}
                  required
                  className="w-full px-4 py-2.5 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="font-mono text-xs text-muted-foreground mb-1.5 block">Message</label>
              <textarea
                rows={4}
                placeholder="What's on your mind?"
                value={form.message}
                onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                required
                className="w-full px-4 py-2.5 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20 cursor-pointer"
            >
              {sent ? (
                <>Opening email client...</>
              ) : (
                <>
                  <Send size={15} />
                  Send Message
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

// ─── Footer & BackToTop ──────────────────────────────────────────────────────

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 p-3 bg-primary text-primary-foreground rounded-full shadow-xl hover:bg-primary/90 transition-all hover:scale-110 active:scale-95 cursor-pointer"
      title="Scroll to top"
    >
      <ArrowUp size={18} />
    </motion.button>
  );
}

function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-mono text-xs text-muted-foreground">
          © 2025 Piyush Raj · Built with React, FastAPI, Gemini 3.7 Flash · Chandigarh University
        </div>
        <div className="flex items-center gap-4">
          {[
            { icon: Github, href: "https://github.com/piyushraj00" },
            { icon: Linkedin, href: "https://linkedin.com/in/piyushraj00" },
            { icon: Mail, href: "mailto:piyushraj1917@gmail.com" },
          ].map(({ icon: Icon, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div
      className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Research />
        <Achievements />
        <Resume />
        <AIAssistant />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
