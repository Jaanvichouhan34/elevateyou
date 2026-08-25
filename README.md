<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=ElevateU&fontSize=80&fontColor=fff&animation=twinkling&fontAlignY=35&desc=Your%20Personalized%20Self-Improvement%20Hub&descAlignY=60&descSize=18" />

<br/>

[![Backend API](https://img.shields.io/badge/⚡%20Backend%20API-Live%20on%20Render-34d399?style=for-the-badge)](https://elevateu-backend-act6.onrender.com)
[![License](https://img.shields.io/badge/License-MIT-60a5fa?style=for-the-badge)](LICENSE)

<br/>

![React](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js_18-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=flat-square&logo=framer&logoColor=white)

<br/>

> **ElevateU** is a comprehensive full-stack self-advancement platform that helps you prepare for professional environments, optimize communication skills, and bring out your best self — powered by **Google Gemini Vision**, **Groq AI**, and **Real-Time Pixel Analysis**.

<br/>

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 📸 AI Outfit Scanner & Style Intelligence
- **Live Camera Capture with Countdown Timer** — Snap full-body outfit photos with built-in 3s, 5s, and 10s step-back timers
- **Pixel-Level Color Palette Extraction** — Real RGBA JPEG/PNG color sampling (`jpeg-js`, `pngjs`) with human skin-tone filtering
- **Garment Silhouette & Leg Exposure Detector** — Auto-detects casual shorts, loungewear, or formal suits and enforces realistic event formality rules
- **Dynamic Formality Scoring (3.5 – 9.5)** — Real-time event-specific ratings, hex swatches, tone badges, and tailored AI feedback
- **Text Mode** — Describe your outfit for instant AI fashion critique

</td>
<td width="50%">

### 💬 AI Communication Trainer
- **AI Chatbot** — Practice interviews, grammar & rephrasing with Groq LLMs
- **Dynamic Feedback** — Real-time professional critique of your responses
- **Topic-based Practice** — Tailored coaching per communication goal

</td>
</tr>
<tr>
<td width="50%">

### 🧠 AI-Powered Quizzes
- **20+ Mastery Levels** — Across 6 topics with AI-generated unique scenarios
- **Adaptive Difficulty** — Scales to your current performance
- **Local Fallback** — Works even if the AI service is temporarily busy

</td>
<td width="50%">

### 📅 Event Prep Guides
- **30+ Life Scenarios** — Built-in expertise for real-world events (Interviews, Vivas, Presentations, Dates, Meetings)
- **AI Personalization** — Guides tailored to your specific event and role
- **Rich Structured Data** — Actionable, step-by-step preparation plans

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + Vite, Tailwind CSS v4, Framer Motion, Lucide React |
| **State Management** | Context API (Auth + Theme) |
| **Backend** | Node.js, Express.js |
| **Computer Vision** | `jpeg-js`, `pngjs` (RGBA Pixel Decoding & Color Palette Extraction) |
| **Database** | MongoDB Atlas + Mongoose |
| **AI — Language & Vision** | Groq API (`groq/compound-mini`), Google Gemini Vision API |
| **Auth** | JWT (JSON Web Tokens) |
| **Deployment** | Vercel (Frontend) · Render (Backend) |

---

## 🏗️ Architecture

```
ElevateU/
├── frontend/                  # React + Vite application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Route-level pages (OutfitScanner, EventPrep, AITrainer, etc.)
│   │   ├── context/           # Auth & Theme providers
│   │   └── api/config.js      # API base URL config
│   └── vite.config.js
│
├── backend/                   # Node.js + Express API
│   ├── routes/                # Route controllers (outfit, event, trainer, auth, etc.)
│   ├── utils/                 # Image analyzer (RGBA pixel decoder), AI service, storage
│   ├── models/                # Mongoose schemas
│   ├── middleware/            # JWT auth middleware
│   └── server.js
│
└── README.md
```

> Decoupled frontend-backend model communicating via secured REST APIs with JWT authentication.

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- MongoDB Atlas account
- Groq API key
- Google Gemini API key

### 1. Clone the Repository

```bash
git clone https://github.com/Jaanvichouhan34/ElevateU.git
cd ElevateU
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_google_gemini_key
```

Start the server:

```bash
npm start
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

---

## 🌐 Deployment

| Service | Platform | Status |
|---------|----------|--------|
| Frontend | Vercel | ✅ [Live](https://elevateyou-five.vercel.app/) |
| Backend API | Render | ✅ [Live](https://elevateu-backend-act6.onrender.com) |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer" />

*If you found this useful, don't forget to ⭐ the repo!*

</div>
