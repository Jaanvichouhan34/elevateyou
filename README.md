import { useState, useEffect, useRef } from "react";

const features = [
  {
    icon: "📸",
    title: "AI Outfit Scanner",
    color: "#a78bfa",
    accent: "rgba(167,139,250,0.15)",
    points: [
      "Live camera capture from browser",
      "Gemini 1.5 Flash visual analysis",
      "Text mode fallback for descriptions",
    ],
  },
  {
    icon: "💬",
    title: "AI Communication Trainer",
    color: "#34d399",
    accent: "rgba(52,211,153,0.15)",
    points: [
      "Practice interviews & grammar",
      "Llama 3.3 70B powered chatbot",
      "Real-time professional critique",
    ],
  },
  {
    icon: "🧠",
    title: "AI-Powered Quizzes",
    color: "#60a5fa",
    accent: "rgba(96,165,250,0.15)",
    points: [
      "20+ mastery levels, 6 topics",
      "Dynamically AI-generated scenarios",
      "Robust local fallback system",
    ],
  },
  {
    icon: "📅",
    title: "Event Prep Guides",
    color: "#f472b6",
    accent: "rgba(244,114,182,0.15)",
    points: [
      "30+ life scenario library",
      "Role-specific AI personalization",
      "Rich structured guidance",
    ],
  },
];

const stack = [
  { label: "React 18 + Vite", color: "#61dafb", icon: "⚛️" },
  { label: "Tailwind CSS v4", color: "#38bdf8", icon: "🎨" },
  { label: "Framer Motion", color: "#a78bfa", icon: "✨" },
  { label: "Node.js + Express", color: "#86efac", icon: "🟢" },
  { label: "MongoDB Atlas", color: "#4ade80", icon: "🍃" },
  { label: "Gemini 1.5 Flash", color: "#facc15", icon: "🔮" },
  { label: "Groq Llama 3.3 70B", color: "#fb923c", icon: "⚡" },
  { label: "JWT Auth", color: "#f472b6", icon: "🔒" },
];

const badges = [
  { label: "MIT License", color: "#3b82f6" },
  { label: "React 18", color: "#3b82f6" },
  { label: "Node.js 18", color: "#22c55e" },
  { label: "Tailwind v4", color: "#0ea5e9" },
  { label: "MongoDB Atlas", color: "#22c55e" },
];

function FloatingOrb({ style }) {
  return <div className="orb" style={style} />;
}

function FeatureCard({ feature, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="feature-card"
      style={{
        "--accent": feature.accent,
        "--color": feature.color,
        animationDelay: `${index * 0.1}s`,
        background: hovered ? feature.accent : "rgba(255,255,255,0.03)",
        borderColor: hovered ? feature.color + "55" : "rgba(255,255,255,0.07)",
        transform: hovered ? "translateY(-6px) scale(1.01)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="feature-icon" style={{ background: feature.accent }}>
        <span style={{ fontSize: 28 }}>{feature.icon}</span>
      </div>
      <h3 className="feature-title" style={{ color: feature.color }}>
        {feature.title}
      </h3>
      <ul className="feature-points">
        {feature.points.map((p, i) => (
          <li key={i}>
            <span className="dot" style={{ background: feature.color }} />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ElevateUReadme() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("backend");
  const canvasRef = useRef(null);

  const copyInstall = () => {
    navigator.clipboard.writeText(
      "git clone https://github.com/Jaanvichouhan34/ElevateU.git"
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Animated canvas stars
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      o: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.3 + 0.05,
    }));
    let raf;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,200,255,${s.o})`;
        ctx.fill();
        s.y -= s.speed;
        if (s.y < 0) s.y = canvas.height;
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  const backendEnv = `PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_google_gemini_key
GROQ_API_KEY=your_groq_api_key`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #060810;
          color: #e2e8f0;
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .page { position: relative; overflow: hidden; }

        /* HERO */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 24px 60px;
          text-align: center;
          overflow: hidden;
        }

        .hero-canvas {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          pointer-events: none;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          animation: orbFloat 8s ease-in-out infinite alternate;
        }

        @keyframes orbFloat {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(20px, -30px) scale(1.1); }
        }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(167,139,250,0.12);
          border: 1px solid rgba(167,139,250,0.3);
          border-radius: 100px;
          padding: 6px 18px;
          font-size: 12px;
          color: #a78bfa;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 28px;
          animation: fadeUp 0.6s ease both;
        }

        .hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(52px, 10vw, 110px);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.03em;
          margin-bottom: 12px;
          animation: fadeUp 0.7s 0.1s ease both;
        }

        .gradient-text {
          background: linear-gradient(135deg, #a78bfa 0%, #60a5fa 40%, #34d399 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: clamp(14px, 2vw, 18px);
          color: #94a3b8;
          max-width: 560px;
          line-height: 1.7;
          margin: 16px auto 36px;
          font-weight: 300;
          animation: fadeUp 0.7s 0.2s ease both;
        }

        .badges-row {
          display: flex; flex-wrap: wrap; gap: 8px;
          justify-content: center;
          margin-bottom: 40px;
          animation: fadeUp 0.7s 0.3s ease both;
        }

        .badge {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          padding: 4px 12px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: #94a3b8;
        }

        .cta-row {
          display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;
          animation: fadeUp 0.7s 0.4s ease both;
        }

        .btn-primary {
          background: linear-gradient(135deg, #a78bfa, #60a5fa);
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 13px 28px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(167,139,250,0.35); }

        .btn-ghost {
          background: rgba(255,255,255,0.05);
          color: #e2e8f0;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          padding: 13px 28px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .btn-ghost:hover { background: rgba(255,255,255,0.09); transform: translateY(-2px); }

        .scroll-hint {
          position: absolute; bottom: 32px;
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          color: #475569; font-size: 11px; letter-spacing: 0.1em;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }

        /* SECTIONS */
        section { padding: 80px 24px; max-width: 1100px; margin: 0 auto; }

        .section-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #a78bfa;
          margin-bottom: 12px;
        }

        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(28px, 5vw, 44px);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 48px;
          color: #f1f5f9;
        }

        /* FEATURES */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 16px;
        }

        .feature-card {
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.07);
          padding: 28px 24px;
          transition: all 0.3s ease;
          animation: fadeUp 0.6s ease both;
          cursor: default;
        }

        .feature-icon {
          width: 52px; height: 52px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
        }

        .feature-title {
          font-family: 'Syne', sans-serif;
          font-size: 17px; font-weight: 700;
          margin-bottom: 14px;
          letter-spacing: -0.01em;
        }

        .feature-points {
          list-style: none;
          display: flex; flex-direction: column; gap: 8px;
        }

        .feature-points li {
          display: flex; align-items: flex-start; gap: 8px;
          font-size: 13px; color: #94a3b8; line-height: 1.5;
        }

        .dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 7px;
        }

        /* STACK */
        .stack-grid {
          display: flex; flex-wrap: wrap; gap: 10px;
        }

        .stack-pill {
          display: flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 100px;
          padding: 8px 18px;
          font-size: 13px; font-weight: 500;
          transition: all 0.2s;
          cursor: default;
        }
        .stack-pill:hover {
          background: rgba(255,255,255,0.08);
          transform: translateY(-2px);
        }

        /* CODE */
        .tabs {
          display: flex; gap: 4px; margin-bottom: 0;
        }

        .tab {
          padding: 8px 18px;
          border-radius: 8px 8px 0 0;
          font-size: 12px; font-weight: 600;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.08);
          border-bottom: none;
          transition: all 0.15s;
          font-family: 'DM Sans', sans-serif;
        }

        .tab.active {
          background: rgba(255,255,255,0.06);
          color: #e2e8f0;
        }

        .tab:not(.active) {
          background: transparent; color: #64748b;
        }

        .code-block {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0 12px 12px 12px;
          padding: 24px;
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 13px;
          line-height: 1.8;
          color: #94a3b8;
          overflow-x: auto;
          position: relative;
        }

        .code-comment { color: #475569; }
        .code-cmd { color: #34d399; }
        .code-key { color: #a78bfa; }
        .code-val { color: #fbbf24; }

        .copy-btn {
          position: absolute; top: 14px; right: 14px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          padding: 5px 12px;
          font-size: 11px; font-weight: 600;
          color: #94a3b8;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.15s;
        }
        .copy-btn:hover { background: rgba(255,255,255,0.13); }

        /* DIVIDER */
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(167,139,250,0.2), rgba(96,165,250,0.2), transparent);
          margin: 0 24px;
        }

        /* FOOTER */
        footer {
          text-align: center;
          padding: 48px 24px;
          color: #475569;
          font-size: 13px;
        }

        footer a { color: #a78bfa; text-decoration: none; }
        footer a:hover { color: #c4b5fd; }

        .footer-links {
          display: flex; gap: 24px; justify-content: center;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* LIVE BADGE */
        .live-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #34d399;
          box-shadow: 0 0 8px #34d399;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0%,100% { opacity:1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }

        .api-card {
          background: rgba(52,211,153,0.06);
          border: 1px solid rgba(52,211,153,0.2);
          border-radius: 14px;
          padding: 20px 24px;
          display: flex; align-items: center; gap: 16px;
          margin-top: 32px;
        }

        .api-card-info { flex: 1; }
        .api-label { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
        .api-url { font-family: monospace; font-size: 13px; color: #34d399; word-break: break-all; }
      `}</style>

      <div className="page">
        {/* HERO */}
        <div className="hero">
          <canvas ref={canvasRef} className="hero-canvas" />
          <FloatingOrb style={{ width: 400, height: 400, background: "rgba(167,139,250,0.12)", top: "-100px", left: "-100px", animationDelay: "0s" }} />
          <FloatingOrb style={{ width: 300, height: 300, background: "rgba(96,165,250,0.1)", bottom: "0", right: "-50px", animationDelay: "2s" }} />
          <FloatingOrb style={{ width: 200, height: 200, background: "rgba(52,211,153,0.08)", top: "40%", right: "20%", animationDelay: "4s" }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="hero-badge">
              <span>✦</span> AI-Powered Self-Improvement
            </div>
            <h1 className="hero-title">
              <span className="gradient-text">ElevateU</span>
            </h1>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(14px, 2.5vw, 20px)", color: "#64748b", letterSpacing: "0.25em", marginBottom: 8, fontWeight: 600 }}>
              YOUR PERSONALIZED
            </div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(16px, 2.5vw, 22px)", color: "#94a3b8", letterSpacing: "0.1em", fontWeight: 400 }}>
              Self-Improvement Hub
            </div>

            <p className="hero-sub">
              A comprehensive full-stack platform combining AI vision, language models, and gamification to prepare you for professional environments and optimize your communication skills.
            </p>

            <div className="badges-row">
              {badges.map((b) => (
                <span key={b.label} className="badge">{b.label}</span>
              ))}
            </div>

            <div className="cta-row">
              <a href="https://github.com/Jaanvichouhan34/ElevateU" className="btn-primary" target="_blank" rel="noreferrer">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
                View on GitHub
              </a>
              <a href="https://elevateu-backend-act6.onrender.com" className="btn-ghost" target="_blank" rel="noreferrer">
                <div className="live-dot" />
                Live API
              </a>
            </div>
          </div>

          <div className="scroll-hint">
            <span>SCROLL</span>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
          </div>
        </div>

        <div className="divider" />

        {/* FEATURES */}
        <section>
          <div className="section-label">✦ What It Does</div>
          <h2 className="section-title">Built to impress.<br />Designed to transform.</h2>
          <div className="features-grid">
            {features.map((f, i) => <FeatureCard key={f.title} feature={f} index={i} />)}
          </div>
        </section>

        <div className="divider" />

        {/* STACK */}
        <section>
          <div className="section-label">✦ Technology Stack</div>
          <h2 className="section-title">Modern stack.<br />Production-ready.</h2>
          <div className="stack-grid">
            {stack.map((s) => (
              <div key={s.label} className="stack-pill">
                <span>{s.icon}</span>
                <span style={{ color: s.color, fontWeight: 600 }}>{s.label}</span>
              </div>
            ))}
          </div>

          <div className="api-card">
            <div className="live-dot" />
            <div className="api-card-info">
              <div className="api-label">Backend API — Render Production</div>
              <div className="api-url">https://elevateu-backend-act6.onrender.com</div>
            </div>
            <a href="https://elevateu-backend-act6.onrender.com" className="btn-ghost" target="_blank" rel="noreferrer" style={{ fontSize: 12, padding: "8px 16px" }}>
              Open ↗
            </a>
          </div>
        </section>

        <div className="divider" />

        {/* SETUP */}
        <section>
          <div className="section-label">✦ Quick Start</div>
          <h2 className="section-title">Running locally<br />in minutes.</h2>

          <div className="tabs">
            {["backend", "frontend"].map((t) => (
              <div key={t} className={`tab ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>
                {t === "backend" ? "⚙️ Backend" : "🎨 Frontend"}
              </div>
            ))}
          </div>

          {activeTab === "backend" && (
            <div className="code-block">
              <button className="copy-btn" onClick={copyInstall}>{copied ? "✓ Copied" : "Copy"}</button>
              <div><span className="code-comment"># 1. Clone the repo</span></div>
              <div><span className="code-cmd">git clone</span> https://github.com/Jaanvichouhan34/ElevateU.git</div>
              <div><span className="code-cmd">cd</span> ElevateU/backend</div>
              <br />
              <div><span className="code-comment"># 2. Install & create .env</span></div>
              <div><span className="code-cmd">npm install</span></div>
              <br />
              {backendEnv.split("\n").map((line, i) => {
                const [k, ...v] = line.split("=");
                return (
                  <div key={i}>
                    <span className="code-key">{k}</span>=<span className="code-val">{v.join("=")}</span>
                  </div>
                );
              })}
              <br />
              <div><span className="code-cmd">npm run dev</span></div>
            </div>
          )}

          {activeTab === "frontend" && (
            <div className="code-block">
              <div><span className="code-comment"># From project root</span></div>
              <div><span className="code-cmd">cd</span> frontend</div>
              <div><span className="code-cmd">npm install</span></div>
              <br />
              <div><span className="code-comment"># Sync backend URL in config.js or .env</span></div>
              <div><span className="code-key">VITE_API_URL</span>=<span className="code-val">http://localhost:5000</span></div>
              <br />
              <div><span className="code-cmd">npm run dev</span></div>
            </div>
          )}
        </section>

        <div className="divider" />

        {/* FOOTER */}
        <footer>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 16 }}>
            <span className="gradient-text">ElevateU</span>
          </div>
          <div className="footer-links">
            <a href="https://github.com/Jaanvichouhan34/ElevateU" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://github.com/Jaanvichouhan34" target="_blank" rel="noreferrer">@Jaanvichouhan34</a>
            <a href="https://linkedin.com/in/jaanvi-chouhan" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://elevateu-backend-act6.onrender.com" target="_blank" rel="noreferrer">Live API</a>
          </div>
          <div>Built by <a href="https://linkedin.com/in/jaanvi-chouhan">Jaanvi Chouhan</a> · MIT License · Medi-Caps University, Indore</div>
        </footer>
      </div>
    </>
  );
}
