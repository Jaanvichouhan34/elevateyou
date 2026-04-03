# 🚀 ElevateU: Your Personalized Self-Improvement Hub

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18-green.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248.svg)

**ElevateU** is a comprehensive, full-stack self-advancement platform designed to help you prepare for professional environments, optimize your communication skills, and bring out your best self. It uses AI to analyze outfits, provide communication feedback, and offer structured quizzes.

---

## ✨ Features

- 📸 **AI Outfit Scanner:** Upload an image or describe your outfit, and get real-time AI feedback on event appropriateness, color coordination, and grooming.
- 💬 **AI Communication Trainer:** Practice common interview questions or casual conversation formats and get actionable feedback.
- 🧠 **Interactive Quizzes:** Test your knowledge in various self-improvement domains.
- 🎨 **Modern Interface:** A sleek, fully responsive, glassmorphism-inspired UI with beautiful dark mode support.
- 🔒 **Secure Authentication:** JWT-based user authentication and data protection.
- 📊 **User Dashboard:** Track your progress, review past outfit scans, and monitor quiz scores all in one place.

---

## 🛠️ Technology Stack

**Frontend:**
- React (built with Vite)
- Tailwind CSS v4
- Framer Motion (Animations)
- Axios & React Router
- Lucide React (Icons)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- OpenAI API (Vision + GPT-4)
- JWT Authentication & Bcryptjs

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
OPENAI_API_KEY=your_openai_api_key
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
