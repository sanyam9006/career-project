# AI Career Counselling System

An NLP-powered career counselling web app that analyses user essays using Google Gemini Flash 1.5 and provides an **Adaptive Aptitude Test** to deliver personalised career path recommendations.

🔗 **Live Demo**: [https://career-project-mu.vercel.app](https://career-project-mu.vercel.app)

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

## 📊 Results

- **Adaptive Logic**: Successfully scales through 4 difficulty levels (Easy to Expert).
- **Performance**: <1 second end-to-end response time for AI analysis.
- **Accuracy**: Enhanced recommendation alignment through multi-modal (Aptitude + Essay) data points.

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
