# 🚀 ElevateU: Your Personalized Self-Improvement Hub

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18-green.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248.svg)

**ElevateU** is a comprehensive, full-stack self-advancement platform designed to help you prepare for professional environments, optimize your communication skills, and bring out your best self. It utilizes **Google Gemini (Vision)** for outfit analysis and **Groq (Llama 3.3)** for real-time communication coaching and personalized event prep.

---

## ✨ Features

- 📸 **AI Outfit Scanner:** 
  - **Live Camera Capture**: Snapshot your outfit directly from the browser.
  - **Visual Analysis**: Powered by Gemini 1.5 Flash for expert feedback on appropriateness and style.
  - **Text Mode**: Describe your outfit if you don't have a photo.
- 💬 **AI Communication Trainer:** 
  - **AI Chatbot**: Practice interviews, grammar, or rephrasing with Llama 3.3 70B.
  - **Dynamic Feedback**: Real-time professional critique of your spoken/written responses.
- 🧠 **AI-Powered Quizzes:** 
  - **Dynamic Level Generation**: AI crafts unique scenarios for 20+ mastery levels across 6 topics.
  - **Local Fallback**: Robust system that works even if the AI service is busy.
- 📅 **Event Prep Guides:** 
  - **Personalization**: Get AI-generated guides tailored to your specific event and role.
  - **Rich Data**: Built-in expertise for 30+ life scenarios.
- 🎨 **Modern Interface:** 
  - **Premium Aesthetics**: Sleek glassmorphism, fluid animations (Framer Motion), and theme-aware SVG illustrations.
  - **Dynamic Design**: Interactive cards and real-time progress tracking.

---

## 🛠️ Technology Stack

**Frontend:**
- React (Vite) + Tailwind CSS v4
- Framer Motion (Animations) & Lucide React (Icons)
- Context API (Auth & Theme Management)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- **AI Engine**: 
  - **Google Gemini 1.5 Flash** (Image Processing)
  - **Groq (Llama 3.3 70B)** (Text Reasoning & Logic)

---

## 🚀 Live Demo

- **Frontend Deployment:** Vercel (Coming Soon)
- **Backend API:** [Render Production URL](https://elevateu-backend-act6.onrender.com)

---

## 💻 Running Locally

### 1. Clone the repository
```bash
git clone https://github.com/Jaanvichouhan34/ElevateU.git
cd ElevateU
```

### 2. Setup Backend
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_google_gemini_key
GROQ_API_KEY=your_groq_api_key
```
Run the backend server:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
```
Since the frontend points to the centralized `config.js` or `.env`, make sure the backend URL is properly synced. To run:
```bash
npm run dev
```

---

## 🏗️ Architecture & Setup Details

For an in-depth view of the system architecture, authentication flow, and database schema, please refer to the architecture breakdown previously established in the repository. The project uses a decoupled frontend-backend model communicating securely via REST APIs.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.