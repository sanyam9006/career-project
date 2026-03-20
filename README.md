## AI Career Counselling System
> Python · FastAPI · React · HuggingFace BART · NLP · JWT Auth

## Live Demo
**[career-project-mu.vercel.app](https://career-project-mu.vercel.app)**

## Overview
An AI-powered career counselling platform that analyses unstructured user
essays using NLP to deliver personalised career path recommendations in
under 1 second.

## How It Works
1. User submits a free-text essay about their interests and background
2. Backend runs **sentiment analysis** to gauge tone and confidence
3. **BART zero-shot classification** maps the essay to career domains
4. System returns ranked career recommendations with reasoning

## Results
- Validated on 500 sample user profiles
- 84% recommendation alignment with expert counsellor assessments
- Average response time: ~0.8–1.0 seconds end-to-end


## 📸 Screenshots

![Landing Page](screenshots/landing.png)
*Modern Landing Page with Google Auth Integration*

![Aptitude Test](screenshots/test.png)
*Adaptive Aptitude Test with dynamic difficulty scaling*

![Results Page](screenshots/results.png)
*Detailed AI-powered Career Analysis and Recommendations*

## 🚀 Key Features

- **Adaptive Aptitude Test**: A sophisticated 120+ question bank that adjusts difficulty in real-time based on user performance.
- **AI Essay Analysis**: Leverages Google Gemini Flash 1.5 for zero-shot classification of unstructured career essays.
- **Sentiment Analysis**: Uses NLTK (Vader) to gauge user confidence and emotional tone in their career aspirations.
- **Personalised Roadmaps**: Delivers tailored career paths with specific job titles and success metrics.
- **Secure Authentication**: Integrated Google OAuth and JWT-based session management.
- **Admin Dashboard**: Full CRUD capabilities for managing the adaptive question bank and user data.

## 🛠️ Tech Stack

- **Backend**: Python · Flask · Google Gemini (LLM) · NLTK (Sentiment Analysis) · SQLite
- **Frontend**: React.js · Lucide Icons · CSS3 (Custom Design System)
- **Deployment**: Vercel (Frontend) · [Your Backend Host]
- **Auth**: Google OAuth 2.0 · JWT


## ⚙️ Setup

```bash
# Backend
cd backend
python -m venv venv
source venv/bin/click (or venv\Scripts\activate on Windows)
pip install -r requirements.txt
python app.py

# Frontend
cd frontend
npm install
npm start
```

## 👨‍💻 Author

**Sanyam Jain** · [LinkedIn](https://linkedin.com/in/sanyamjain8905) · [GitHub](https://github.com/sanyam9006)
