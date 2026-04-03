# 📊 ElevateU - Setup Flow & Architecture

## 🔄 Complete Setup Workflow

```
┌─────────────────────────────────────────────────────────────┐
│              ELEVATEUP - COMPLETE SETUP FLOW               │
└─────────────────────────────────────────────────────────────┘

STEP 1: PREPARE ACCOUNTS
├─ MongoDB Atlas (FREE)
│  └─ Connection String: mongodb+srv://user:pass@cluster...
├─ OpenAI API (FREE CREDITS)
│  └─ API Key: sk-xxxxx
└─ GitHub Account
   └─ For version control

         │
         ▼

STEP 2: CLONE PROJECT
git clone https://github.com/yourusername/ElevateU.git
cd ElevateU

         │
         ▼

STEP 3: BACKEND SETUP
┌──────────────────────────────────────────┐
│ cd backend                               │
│ npm install                              │
│ cp .env.example .env                     │
│ Edit .env with your credentials          │
│ npm run dev                              │
│                                          │
│ ✅ Server: http://localhost:5000        │
└──────────────────────────────────────────┘

         │
         ▼

STEP 4: FRONTEND SETUP
┌──────────────────────────────────────────┐
│ cd ../frontend                           │
│ npm install                              │
│ cp .env.example .env                     │
│ Edit .env with API URL                   │
│ npm run dev                              │
│                                          │
│ ✅ App: http://localhost:5173           │
└──────────────────────────────────────────┘

         │
         ▼

STEP 5: TEST FEATURES
├─ Sign up account
├─ Try Outfit Scanner
├─ Try AI Trainer
├─ Try Quizzes
└─ View Profile

         │
         ▼

STEP 6: DEPLOY
├─ Backend → Render.com
└─ Frontend → Vercel.com
```

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                    USER BROWSER (Frontend)                       │
│                                                                  │
│  ┌────────────────┐  ┌────────────────┐  ┌─────────────────┐  │
│  │ Outfit Scanner │  │ AI Trainer     │  │ Quiz Module     │  │
│  │                │  │                │  │                 │  │
│  │ - Image Upload │  │ - Chat Window  │  │ - Questions     │  │
│  │ - Text Input   │  │ - Real-time    │  │ - Feedback      │  │
│  │ - Results      │  │   Responses    │  │ - Score         │  │
│  └────────────────┘  └────────────────┘  └─────────────────┘  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ React.js + Vite + Tailwind CSS (http://localhost:5173)     ││
│  └────────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────┘
                              │
                    HTTPS / REST API
                              │
         ┌────────────────────┼────────────────────┐
         │                    │                    │
         ▼                    ▼                    ▼
    ┌─────────┐          ┌─────────┐         ┌──────────┐
    │ Auth    │          │ Outfit  │         │ Chat &   │
    │ Routes  │          │ Routes  │         │ Quiz     │
    │         │          │         │         │ Routes   │
    │ -Reg    │          │-Image   │         │          │
    │ -Login  │          │-Text    │         │ -Message │
    └─────────┘          │-History │         │ -Submit  │
         │               └─────────┘         └──────────┘
         │                    │                    │
         └────────────────────┼────────────────────┘
                              │
  ┌───────────────────────────────────────────────────────────────┐
  │          Express.js + Node.js Backend                        │
  │          (http://localhost:5000)                             │
  │                                                               │
  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
  │  │ Middleware   │  │ Controllers  │  │ Utilities    │      │
  │  │              │  │              │  │              │      │
  │  │ - JWT Auth   │  │ - Logic      │  │ - OpenAI API │      │
  │  │ - CORS       │  │ - Validation │  │ - Errors     │      │
  │  │ - Logger     │  │ - Response   │  │ - Helpers    │      │
  │  └──────────────┘  └──────────────┘  └──────────────┘      │
  └───────────────────────────────────────────────────────────────┘
                              │
                 ┌────────────┼────────────┐
                 │            │            │
                 ▼            ▼            ▼
         ┌──────────────┐ ┌──────────┐ ┌────────────┐
         │   MongoDB    │ │ OpenAI   │ │ File Store │
         │   Database   │ │ Vision   │ │ (Optional) │
         │              │ │ + GPT    │ │            │
         │ - Users      │ │ APIs     │ │ Images     │
         │ - Scans      │ │          │ │            │
         │ - Chats      │ │ Image    │ │            │
         │ - Quizzes    │ │ Analysis │ │            │
         │              │ │ + Text   │ │            │
         │              │ │ Feedback │ │            │
         └──────────────┘ └──────────┘ └────────────┘
```

---

## 📁 Folder Structure

```
ElevateU/
│
├── 📄 README.md                    ← Main documentation
├── 📄 QUICKSTART.md                ← Fast setup guide
├── 📄 SETUP_CHECKLIST.md           ← Step-by-step checklist
├── 📄 .gitignore                   ← Files to not commit
├── 📄 LICENSE                      ← MIT License
│
├── backend/                        ← Node.js + Express
│   ├── models/
│   │   ├── User.js
│   │   ├── OutfitScan.js
│   │   ├── CommunicationChat.js
│   │   └── Quiz.js
│   │
│   ├── routes/
│   │   ├── auth.js                 (register/login)
│   │   ├── outfit.js               (image & text analysis)
│   │   ├── chat.js                 (AI communication)
│   │   ├── quiz.js                 (questions & feedback)
│   │   ├── events.js               (guides)
│   │   └── profile.js              (user data)
│   │
│   ├── middleware/
│   │   └── auth.js                 (JWT verification)
│   │
│   ├── utils/
│   │   └── openai.js               (OpenAI API calls)
│   │
│   ├── 📄 server.js                ← Main entry point
│   ├── 📄 package.json
│   ├── 📄 .env.example
│   └── 📄 .gitignore
│
├── frontend/                       ← React + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── OutfitScanner.jsx
│   │   │   ├── EventGuide.jsx
│   │   │   ├── CommunicationTrainer.jsx
│   │   │   ├── QuizModule.jsx
│   │   │   └── Profile.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── 📄 App.jsx              ← Main app
│   │   ├── 📄 main.jsx             ← Entry point
│   │   └── 📄 index.css
│   │
│   ├── public/
│   │   └── (static assets)
│   │
│   ├── 📄 package.json
│   ├── 📄 vite.config.js
│   ├── 📄 tailwind.config.js
│   ├── 📄 .env.example
│   └── 📄 .gitignore
│
└── docs/                          ← Documentation
    ├── ARCHITECTURE.md
    ├── API_REFERENCE.md
    └── DEPLOYMENT.md
```

---

## 🔄 Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│          USER INTERACTION FLOW (Example: Outfit)            │
└─────────────────────────────────────────────────────────────┘

User Opens App
      │
      ▼
   Login/Register
      │
      ├─ User submits email/password
      │
      ▼ (Backend validates)
   Check in Database
      │
      ├─ User exists? (Login)
      │  └─ Compare password hash with bcryptjs
      │
      └─ New user? (Register)
         └─ Hash password with bcryptjs
         └─ Save to MongoDB
      │
      ▼ (Backend generates)
   Create JWT Token
      │
      ├─ Token includes: userId + 7 day expiration
      │
      ▼ (Sent to frontend)
   Store Token Locally
      │
      ├─ localStorage.setItem('token', jwtToken)
      │
      ▼
User Navigates to Outfit Scanner
      │
      ├─ Selects Event Type: "Interview"
      │
      ├─ Choose Input Method
      │  ├─ Option A: Upload Image
      │  │   ├─ Select image file
      │  │   └─ Preview shown
      │  │
      │  └─ Option B: Type Description
      │      └─ Text input field
      │
      ▼
   Click "Analyze"
      │
      ├─ Frontend collects data:
      │  ├─ Image (base64) OR Description (text)
      │  ├─ Event type
      │  └─ JWT token
      │
      ▼ (HTTPS request)
   Send to Backend API
      │
      POST /api/outfit/analyze-image
      Headers: { Authorization: Bearer <token> }
      Body: { imageBase64, event }
      │
      ▼ (Backend verifies)
   Verify JWT Token
      │
      ├─ Decode token using JWT_SECRET
      ├─ Check expiration
      └─ Extract userId
      │
      ▼ (Backend validates)
   Validate Input
      │
      ├─ Check image size < 5MB
      ├─ Check event is valid
      └─ Check image format
      │
      ▼ (Backend calls AI)
   Extract Base64 & Call OpenAI
      │
      ├─ Remove "data:image/jpeg;base64," prefix
      ├─ Send to Claude Vision API
      ├─ Include event context in prompt
      └─ Wait for response (~3 seconds)
      │
      ▼ (OpenAI responds)
   AI Analysis Complete
      │
      ├─ Parse response as JSON
      ├─ Extract: appropriate[], notSuitable[], improvements[], etc.
      └─ Extract: score (1-10)
      │
      ▼ (Backend saves)
   Save to MongoDB
      │
      ├─ Create new OutfitScan document
      ├─ Include: userId, event, imageURL, aiResponse, createdAt
      └─ Save to database
      │
      ▼ (Backend updates)
   Update User Stats
      │
      ├─ user.stats.totalOutfitScans += 1
      └─ Save to database
      │
      ▼ (Backend responds)
   Send Response to Frontend
      │
      {
        "success": true,
        "data": {
          "scan": { ... },
          "analysis": {
            "appropriate": [...],
            "notSuitable": [...],
            "improvements": [...],
            "groomingTips": [...],
            "score": 8
          }
        }
      }
      │
      ▼ (Frontend displays)
   Render Results
      │
      ├─ Show score card (8/10)
      ├─ Show 4 recommendation cards
      ├─ Color-code: green, red, blue, purple
      └─ Allow user to save or retake
```

---

## 📊 Database Schema Relationships

```
┌─────────────────┐
│     USERS       │
├─────────────────┤
│ _id             │◄───────┐
│ name            │        │
│ email           │        │ (1:N relationship)
│ password        │        │ One user has many
│ level           │        │ scans, chats, quizzes
│ createdAt       │        │
└─────────────────┘        │
                           │
        ├──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌──────────────────┐ ┌──────────────┐ ┌──────────────┐
│ OUTFITSCANS      │ │ CHATS        │ │ QUIZZES      │
├──────────────────┤ ├──────────────┤ ├──────────────┤
│ _id              │ │ _id          │ │ _id          │
│ userId (FK)      │ │ userId (FK)  │ │ userId (FK)  │
│ event            │ │ messages[]   │ │ level        │
│ inputType        │ │ feedback     │ │ category     │
│ imageURL         │ │ createdAt    │ │ questions[]  │
│ aiResponse       │ │              │ │ score        │
│ score            │ │              │ │ percentage   │
│ createdAt        │ │              │ │ createdAt    │
└──────────────────┘ └──────────────┘ └──────────────┘
```

---

## 🌐 API Communication Pattern

```
Frontend (React)              Backend (Express)           External Services
     │                              │                           │
     │  POST /auth/register         │                           │
     ├─────────────────────────────►│                           │
     │  {name, email, password}     │                           │
     │                              │                           │
     │                              │  Hash password            │
     │                              ├─ bcryptjs                │
     │                              │                           │
     │                              │  Save to DB               │
     │                              ├─ MongoDB                 │
     │                              │                           │
     │  201 {token, user}           │                           │
     │◄─────────────────────────────┤                           │
     │                              │                           │
     │  POST /outfit/analyze-image  │                           │
     │  {imageBase64, event}        │                           │
     │  Headers: {Auth: Bearer}     │                           │
     ├─────────────────────────────►│                           │
     │                              │  Verify JWT              │
     │                              ├─ jwt.verify()            │
     │                              │                           │
     │                              │  Call OpenAI              │
     │                              ├──────────────────────────►│
     │                              │  Claude Vision API        │
     │                              │  (analyze image)          │
     │                              │                           │
     │                              │  {appropriate, score}     │
     │                              │◄──────────────────────────┤
     │                              │                           │
     │                              │  Save to DB               │
     │                              ├─ MongoDB                 │
     │                              │                           │
     │  200 {analysis, scan}        │                           │
     │◄─────────────────────────────┤                           │
     │                              │                           │
  Display Results                   │                           │
  in React Components               │                           │
```

---

## ⚙️ Environment Variables Used

```
┌──────────────────────────────────────────────────────────────┐
│                    BACKEND .env                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ NODE_ENV=development           (dev or production)          │
│ PORT=5000                      (Backend port)              │
│ FRONTEND_URL=http://localhost:5173  (CORS origin)          │
│                                                              │
│ MONGO_URI=mongodb+srv://...    (MongoDB connection)         │
│ JWT_SECRET=random_secret       (JWT signing key)            │
│ OPENAI_API_KEY=sk-...          (OpenAI API key)             │
│                                                              │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                    FRONTEND .env                             │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ VITE_API_URL=http://localhost:5000  (Backend API URL)       │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 🚀 Deployment Topology

```
┌───────────────────────────────────────────────────────────────┐
│                   PRODUCTION SETUP                            │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Vercel CDN                                              ││
│  │ ┌──────────────────────────────────────────────────┐   ││
│  │ │ Frontend (React)                                 │   ││
│  │ │ https://elevateU.vercel.app                      │   ││
│  │ │ ├─ Auto-scaled                                   │   ││
│  │ │ ├─ Edge caching                                  │   ││
│  │ │ └─ SSL included                                  │   ││
│  │ └──────────────────────────────────────────────────┘   ││
│  └─────────────────────────────────────────────────────────┘│
│                         │                                    │
│                    REST API                                  │
│                    (HTTPS)                                   │
│                         │                                    │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Render                                                  ││
│  │ ┌──────────────────────────────────────────────────┐   ││
│  │ │ Backend (Node.js)                                │   ││
│  │ │ https://elevateU-backend.onrender.com            │   ││
│  │ │ ├─ Auto-restart on crash                         │   ││
│  │ │ ├─ Environment variables                         │   ││
│  │ │ └─ Free tier with 512MB RAM                      │   ││
│  │ └──────────────────────────────────────────────────┘   ││
│  └─────────────────────────────────────────────────────────┘│
│                         │                                    │
│              Database + External APIs                        │
│                         │                                    │
│         ┌───────────────┼────────────────┐                  │
│         │               │                │                  │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │ MongoDB Atlas│ │ OpenAI API   │ │ File Storage │        │
│  │ (Cloud DB)   │ │ (Vision+GPT) │ │ (Optional)   │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

---

## ✅ Verification Checklist

```
┌─ BACKEND RUNNING?
│  ├─ http://localhost:5000/api/health returns 200
│  ├─ MongoDB connected in logs
│  └─ No error messages
│
├─ FRONTEND RUNNING?
│  ├─ http://localhost:5173 loads
│  ├─ No console errors (F12)
│  └─ Form elements visible
│
├─ CAN AUTHENTICATE?
│  ├─ Sign up works
│  ├─ JWT token stored
│  └─ Login works
│
├─ CAN USE FEATURES?
│  ├─ Outfit analysis works
│  ├─ AI chat responds
│  └─ Quizzes submit
│
└─ READY FOR INTERVIEWS?
   ├─ Code is clean
   ├─ Features work
   ├─ Explanation prepared
   └─ GitHub is public
```

---

**This architecture is production-ready and interview-impressive!** 🎯
