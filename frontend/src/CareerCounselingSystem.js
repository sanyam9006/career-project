import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, Routes, Route, useLocation } from "react-router-dom";
import { User, Brain, TrendingUp, Home, TestTube, Users, Menu, X, Shield, Edit3, MapPin, MessageSquare, Send, Briefcase, Loader, Scale, Sparkles, Zap, Target, ArrowRight, ExternalLink, Activity } from "lucide-react";

const API_URL = process.env.REACT_APP_API_URL ||
  (window.location.hostname === 'localhost'
    ? 'http://127.0.0.1:5000'
    : 'https://career-project-ph1x.onrender.com');

const navLinkClass = ({ isActive }) =>
  `w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${isActive ? 'bg-white/20 text-white font-semibold shadow-inner' : 'text-white/80 hover:bg-white/10 hover:text-white'}`;

const Sidebar = ({ sidebarOpen, setSidebarOpen, resetTest, user }) => (
  <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-900 to-purple-900 text-white transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex flex-col shadow-2xl`}>
    <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
      <h1 className="text-xl font-bold flex items-center tracking-tight">
        <Brain className="w-6 h-6 mr-2 text-purple-400" />
        <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">CareerAI</span>
      </h1>
      <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/70 hover:text-white"><X className="w-6 h-6" /></button>
    </div>

    {user && (
      <div className="mx-4 mt-4 p-3 bg-white/10 rounded-xl flex items-center gap-3">
        <img src={user.picture} alt={user.name} className="w-9 h-9 rounded-full border-2 border-purple-400" />
        <div className="overflow-hidden">
          <p className="text-sm font-semibold text-white truncate">{user.name}</p>
          <p className="text-xs text-white/60 truncate">{user.email}</p>
        </div>
      </div>
    )}

    <nav className="mt-6 px-4 space-y-1 flex-1">
      <NavLink to="/" end className={navLinkClass} onClick={() => setSidebarOpen(false)}>
        <Home className="w-5 h-5 mr-3" /> Home
      </NavLink>
      <NavLink to="/test" className={navLinkClass} onClick={() => { setSidebarOpen(false); resetTest(); }}>
        <TestTube className="w-5 h-5 mr-3" /> Aptitude Test
      </NavLink>
      <NavLink to="/essay" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
        <Edit3 className="w-5 h-5 mr-3" /> Personality Essay
      </NavLink>
      <NavLink to="/careers" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
        <Users className="w-5 h-5 mr-3" /> Career Explorer
      </NavLink>
      <NavLink to="/compare" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
        <Scale className="w-5 h-5 mr-3" /> Compare Careers
      </NavLink>
      <NavLink to="/roadmap" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
        <TrendingUp className="w-5 h-5 mr-3" /> Career Roadmap
      </NavLink>
    </nav>

    <div className="px-4 pb-6 border-t border-white/10 pt-4 mt-2">
      <NavLink to="/admin" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
        <Shield className="w-5 h-5 mr-3" /> Admin Panel
      </NavLink>
      {user ? (
        <button onClick={() => { window.location.href = `${API_URL}/auth/logout`; }}
          className="mt-2 w-full flex items-center px-4 py-3 text-left rounded-lg text-red-300 hover:bg-red-900/30 transition-all">
          <X className="w-5 h-5 mr-3" /> Logout
        </button>
      ) : (
        <button onClick={() => { window.location.href = `${API_URL}/auth/google`; }}
          className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-gray-800 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-all shadow">
          <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Login with Google
        </button>
      )}
    </div>
  </div>
);

// ─── DASHBOARD (Original Theme + Humanized Content) ───────────────────────────
const Dashboard = ({ resetTest, userLocation, setUserLocation }) => {
  const navigate = useNavigate();
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Finally figure out what you actually want to do.</h1>
          <p className="text-lg text-gray-500">Answer a short test, write what you love, and get a real career plan built for you.</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
          <MapPin className="w-4 h-4 text-indigo-500" />
          <span className="text-sm text-gray-600 font-medium">Region:</span>
          <select value={userLocation} onChange={(e) => setUserLocation(e.target.value)}
            className="text-sm font-semibold text-indigo-700 bg-transparent outline-none cursor-pointer">
            <option value="USA">United States</option>
            <option value="India">India</option>
            <option value="UK">United Kingdom</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
          <TestTube className="w-8 h-8 mb-4 text-blue-200" />
          <h3 className="text-xl font-bold mb-1">10 min</h3>
          <p className="text-blue-100 text-sm">to get your results</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-emerald-600 text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
          <Sparkles className="w-8 h-8 mb-4 text-green-200" />
          <h3 className="text-xl font-bold mb-1">Free</h3>
          <p className="text-green-100 text-sm">no sign-up needed</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
          <Brain className="w-8 h-8 mb-4 text-purple-200" />
          <h3 className="text-xl font-bold mb-1">MBTI</h3>
          <p className="text-purple-100 text-sm">personality mapping</p>
        </div>
        <div className="bg-gradient-to-br from-orange-600 to-rose-600 text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
          <TrendingUp className="w-8 h-8 mb-4 text-orange-200" />
          <h3 className="text-xl font-bold mb-1">AI</h3>
          <p className="text-orange-100 text-sm">career roadmaps</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
            <TestTube className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Not sure where to start?</h2>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">Take our short adaptive test. It asks 20 questions, gets smarter as you go, and gives you a real picture of what you\'re good at.</p>
          <button onClick={() => { resetTest(); navigate('/test'); }}
            className="flex items-center justify-center gap-2 w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 group">
            Take the free test <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 text-purple-600">
            <Brain className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What kind of person are you?</h2>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">Just write a few sentences about what excites you. Our AI reads it and tells you your personality type and ideal careers.</p>
          <button onClick={() => navigate('/essay')}
            className="flex items-center justify-center gap-2 w-full py-4 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-700 shadow-lg shadow-purple-200 transition-all active:scale-95 group">
            Analyze Personality <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Got a career in mind?</h2>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">Tell us what you want to do and we\'ll build you a step-by-step 12-month plan with real skills and milestones.</p>
          <button onClick={() => navigate('/roadmap')}
            className="flex items-center justify-center gap-2 w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all active:scale-95 group">
            Build my roadmap <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── ROADMAP PAGE (dedicated) ──────────────────────────────────────────────────
const RoadmapPage = ({ userAge, userLocation, userEducation }) => {
  const [career, setCareer] = useState('');
  const [roadmap, setRoadmap] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateRoadmap = async () => {
    if (!career.trim()) return;
    setIsLoading(true); setError(null); setRoadmap(null);
    try {
      const res = await fetch(`${API_URL}/generate-roadmap`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ career, age: userAge, location: userLocation, education: userEducation })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setRoadmap(data.roadmap);
    } catch (e) { setError(e.message); }
    setIsLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Career Roadmap</h1>
      <p className="text-gray-500 mb-6">Enter any career title and get a personalized 12-month step-by-step roadmap tailored to your profile.</p>
      <div className="bg-white rounded-2xl p-6 shadow border">
        <div className="flex gap-3">
          <input value={career} onChange={e => setCareer(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && generateRoadmap()}
            placeholder="e.g. Machine Learning Engineer, UI/UX Designer..."
            className="flex-1 border-2 border-gray-200 rounded-xl p-3 focus:border-purple-500 focus:outline-none text-gray-800" />
          <button onClick={generateRoadmap} disabled={isLoading || !career.trim()}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:opacity-90 disabled:opacity-50 transition-all">
            {isLoading ? <Loader className="animate-spin w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </div>
        {error && <p className="mt-3 text-red-600 text-sm">❌ {error}</p>}
      </div>
      {roadmap && (
        <div className="mt-6 bg-white rounded-2xl p-8 shadow border prose max-w-none">
          {roadmap.split('\n').map((line, i) => {
            if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-black text-gray-900 mb-4">{line.slice(2)}</h1>;
            if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-purple-700 mt-6 mb-3">{line.slice(3)}</h2>;
            if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-semibold text-blue-700 mt-4 mb-2">{line.slice(4)}</h3>;
            if (line.startsWith('- ') || line.startsWith('* ')) return <li key={i} className="ml-4 text-gray-700 mb-1">{line.slice(2)}</li>;
            if (line.trim() === '') return <div key={i} className="h-2" />;
            return <p key={i} className="text-gray-700 mb-2">{line.split('**').map((p, pi) => pi % 2 === 1 ? <strong key={pi}>{p}</strong> : p)}</p>;
          })}
        </div>
      )}
    </div>
  );
};

const AptitudeTest = ({ isLoading, aptitudeQuestions, showResults, testResults, currentQuestion, handleAnswer, answers, handleNextQuestion, handleFinishTest, resetTest, userAge, setUserAge, userEducation, setUserEducation, userProfileSet, setUserProfileSet }) => {
  if (isLoading) return <div className="p-6 text-center">Loading Test...</div>;
  if (!aptitudeQuestions || aptitudeQuestions.length === 0) return <div className="p-6 text-center text-red-500">Failed to load test questions. Please ensure the backend server is running.</div>;

  // Step 1: Collect user profile before showing test
  if (!userProfileSet) {
    return (
      <div className="p-6 max-w-xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-xl border">
          <div className="mb-6">
            <Brain className="w-12 h-12 text-purple-600 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Before We Begin</h1>
            <p className="text-gray-500">Tell us a little about yourself so our AI can personalize your career recommendations.</p>
          </div>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Age</label>
              <input
                type="number" placeholder="e.g. 17" min="10" max="70"
                value={userAge} onChange={e => setUserAge(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-purple-500 focus:outline-none text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Current Education Level</label>
              <select value={userEducation} onChange={e => setUserEducation(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-purple-500 focus:outline-none text-gray-800 bg-white">
                <option value="">-- Select Education Level --</option>
                <option>Elementary / Middle School</option>
                <option>High School (10th Grade)</option>
                <option>High School (12th Grade)</option>
                <option>Undergraduate (BTech / BA / BSc)</option>
                <option>Postgraduate (MTech / MBA / MSc)</option>
                <option>PhD / Research</option>
                <option>Working Professional</option>
              </select>
            </div>
          </div>
          <button onClick={() => setUserProfileSet(true)} disabled={!userAge || !userEducation}
            className="mt-8 w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors text-lg disabled:bg-gray-300 disabled:cursor-not-allowed">
            Start My Personalized Test →
          </button>
        </div>
      </div>
    );
  }

  if (showResults && testResults) {
    const recs = testResults.aiRecommendations || testResults.recommendations || [];
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Your Career Recommendations</h1>
        {userAge && <p className="text-gray-500 mb-6">Personalized for age {userAge} · {userEducation}</p>}
        {testResults.results?.category_scores && (
          <div className="bg-white p-6 rounded-xl shadow-lg border mb-8">
            <h2 className="text-xl font-semibold mb-4">Aptitude Category Scores</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(testResults.results.category_scores).map(([category, score]) => (
                <div key={category} className="text-center bg-gray-50 p-4 rounded-xl border">
                  <p className="text-sm font-medium capitalize text-gray-700">{category.replace('_', ' ')}</p>
                  <p className="text-2xl font-bold text-blue-600">{Math.round(score.percentage)}%</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <h2 className="text-xl font-bold text-gray-800 mb-4">{testResults.aiRecommendations ? '🤖 AI-Powered Recommendations' : '📊 Aptitude-Based Recommendations'}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {recs.map((career, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition-shadow flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-900 pr-2">{career.career_title}</h3>
                <span className="bg-green-100 text-green-800 font-bold text-sm px-3 py-1 rounded-full whitespace-nowrap">{Math.round(career.match_percentage)}%</span>
              </div>
              <p className="text-gray-600 mb-4 text-sm flex-1">{career.reasoning}</p>
              {career.next_step && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                  <p className="text-xs font-bold text-blue-700 mb-1">💡 Your Next Step</p>
                  <p className="text-sm text-blue-800">{career.next_step}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <button onClick={resetTest} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">Retake Test</button>
      </div>
    );
  }

  const question = aptitudeQuestions[currentQuestion];
  const isInterestQuestion = question?.category === 'interest';
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Aptitude Test</h1>
          <span className="text-lg font-semibold text-blue-600">{currentQuestion + 1}/{aptitudeQuestions.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${((currentQuestion + 1) / aptitudeQuestions.length) * 100}%` }}></div></div>
        {isInterestQuestion && <p className="text-xs text-purple-600 mt-2 font-medium">💡 Interest Question — all answers are valid, pick what fits you!</p>}
      </div>
      <div className="bg-white p-8 rounded-xl shadow-lg border">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">{question.question}</h2>
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(index)} className={`w-full p-4 text-left border-2 rounded-lg transition-all ${answers[currentQuestion] === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'}`}>{option}</button>
          ))}
        </div>
        <div className="mt-8 text-right">
          {currentQuestion < aptitudeQuestions.length - 1 ? (
            <button onClick={handleNextQuestion} disabled={answers[currentQuestion] === undefined} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400">Next</button>
          ) : (
            <button onClick={handleFinishTest} disabled={answers[currentQuestion] === undefined} className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400">Finish & See Results</button>
          )}
        </div>
      </div>
    </div>
  );
};

const CareerExplorer = ({ isLoading, careerDatabase, userLocation, compareList, setCompareList }) => {
  const [marketData, setMarketData] = useState(null);
  const [isMarketLoading, setIsMarketLoading] = useState(false);
  const [roadmapData, setRoadmapData] = useState(null);
  const [isRoadmapLoading, setIsRoadmapLoading] = useState(false);
  const [liveJobs, setLiveJobs] = useState(null);
  const [isJobsLoading, setIsJobsLoading] = useState(false);
  const [activeJobsCareer, setActiveJobsCareer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const viewMarketInsights = async (careerTitle) => {
    setIsMarketLoading(true); setMarketData(null);
    try {
      const res = await fetch(`${API_URL}/market-insights?career=${encodeURIComponent(careerTitle)}&location=${encodeURIComponent(userLocation)}`);
      setMarketData(await res.json());
    } catch (e) { console.error(e); }
    setIsMarketLoading(false);
  };

  const generateAIRoadmap = async (careerTitle) => {
    setIsRoadmapLoading(true); setRoadmapData({ career: careerTitle, content: null });
    try {
      const res = await fetch(`${API_URL}/generate-roadmap`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ career: careerTitle, location: userLocation })
      });
      const data = await res.json();
      setRoadmapData({ career: careerTitle, content: data.roadmap });
    } catch (e) {
      setRoadmapData({ career: careerTitle, content: 'Error generating roadmap.' });
    }
    setIsRoadmapLoading(false);
  };

  const viewLiveJobs = async (careerTitle) => {
    setIsJobsLoading(true); setLiveJobs(null); setActiveJobsCareer(careerTitle);
    try {
      const res = await fetch(`${API_URL}/live-jobs?career=${encodeURIComponent(careerTitle)}&location=${encodeURIComponent(userLocation)}`);
      const data = await res.json();
      setLiveJobs(data.jobs || []);
    } catch (e) { setLiveJobs([]); }
    setIsJobsLoading(false);
  };

  const addToCompare = (career) => {
    if (compareList.length >= 3) { alert('Maximum 3 careers to compare. Remove one first.'); return; }
    if (compareList.find(c => c.title === career.title)) { alert('Already in comparison list.'); return; }
    setCompareList([...compareList, career]);
  };

  const allCategories = ['All', ...Object.keys(careerDatabase || {})];
  const filteredByCategory = filterCategory === 'All' ? careerDatabase : { [filterCategory]: (careerDatabase || {})[filterCategory] };
  const filteredDb = Object.fromEntries(
    Object.entries(filteredByCategory || {}).map(([cat, careers]) => [
      cat, (careers || []).filter(c => !searchTerm || c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.description.toLowerCase().includes(searchTerm.toLowerCase()))
    ]).filter(([, careers]) => careers.length > 0)
  );

  return (
    <div className="p-6 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Career Explorer</h1>
        <div className="flex gap-3 flex-wrap">
          <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search careers..." className="border px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-48" />
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="border px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none">
            {allCategories.map(c => <option key={c}>{c}</option>)}
          </select>
          {compareList.length > 0 && <span className="bg-teal-600 text-white px-3 py-2 rounded-lg text-sm font-semibold">{compareList.length} in compare</span>}
        </div>
      </div>
      {isLoading ? <p>Loading careers...</p> : Object.entries(filteredDb).map(([category, careers]) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 capitalize">{category}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(careers) && careers.map((career, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition-shadow relative flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900 pr-2 flex-1">{career.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-bold shrink-0 ${ career.growth === 'High' ? 'bg-green-100 text-green-700' : career.growth === 'Stable' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{career.growth}</span>
                </div>
                <p className="text-gray-600 mb-4 text-sm flex-1">{career.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Salary</span><span className="font-semibold text-gray-800">{career.salary || 'N/A'}</span></div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {(career.skills || []).slice(0, 4).map((skill, si) => (
                      <span key={si} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{skill}</span>
                    ))}
                  </div>
                  {career.regional_education && career.regional_education[userLocation] && (
                    <div className="mt-2 p-2 bg-purple-50 rounded-lg border border-purple-100">
                      <div className="text-xs font-bold text-purple-800 mb-1 flex items-center"><MapPin className="w-3 h-3 mr-1" /> Path ({userLocation})</div>
                      <div className="text-xs text-purple-900">{career.regional_education[userLocation]}</div>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <button onClick={() => viewMarketInsights(career.title)} className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center"><TrendingUp className="w-4 h-4 mr-1" /> Market</button>
                    <button onClick={() => generateAIRoadmap(career.title)} className="bg-purple-50 text-purple-700 hover:bg-purple-100 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center"><Brain className="w-4 h-4 mr-1" /> Roadmap</button>
                    <button onClick={() => viewLiveJobs(career.title)} className="bg-green-50 text-green-700 hover:bg-green-100 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center"><Briefcase className="w-4 h-4 mr-1" /> Live Jobs</button>
                    <button onClick={() => addToCompare(career)} className="bg-teal-50 text-teal-700 hover:bg-teal-100 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center"><Scale className="w-4 h-4 mr-1" /> Compare</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Live Jobs Modal */}
      {(isJobsLoading || liveJobs !== null) && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center bg-green-600 text-white">
              <h2 className="text-xl font-bold flex items-center"><Briefcase className="w-6 h-6 mr-2" /> Live Jobs: {activeJobsCareer}</h2>
              <button onClick={() => { setLiveJobs(null); setIsJobsLoading(false); }} className="hover:bg-green-700 p-1 rounded-lg"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-6 overflow-y-auto">
              {isJobsLoading ? (
                <div className="flex flex-col items-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-4 border-green-600 mb-4" /><p className="text-green-600">Fetching latest job listings...</p></div>
              ) : (
                <div className="space-y-4">
                  {(liveJobs || []).length === 0 ? <p className="text-gray-500 text-center py-8">No jobs found right now.</p> : (liveJobs || []).map((job, i) => (
                    <div key={i} className="border rounded-xl p-4 hover:border-green-400 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-gray-900">{job.title}</div>
                          <div className="text-sm text-gray-600">{job.company} • {job.location}</div>
                          <p className="text-xs text-gray-500 mt-2">{job.description}</p>
                        </div>
                        <div className="text-right ml-4 shrink-0">
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">{job.type}</span>
                          <div className="text-xs text-gray-400 mt-1">{job.posted}</div>
                        </div>
                      </div>
                      <a href={job.apply_url} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center justify-center w-full bg-green-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors">
                        Apply Now <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Market Data Modal */}
      {(isMarketLoading || marketData) && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center bg-indigo-600 text-white">
              <h2 className="text-xl font-bold flex items-center"><TrendingUp className="w-6 h-6 mr-2" /> Market Insights: {marketData ? marketData.career : 'Loading...'}</h2>
              <button onClick={() => { setMarketData(null); setIsMarketLoading(false); }} className="hover:bg-indigo-700 p-1 rounded-lg"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-6 overflow-y-auto">
              {isMarketLoading ? <div className="flex flex-col items-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600 mb-4" /><p className="text-indigo-600">Fetching market data...</p></div>
              : marketData && <div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-indigo-50 p-4 rounded-xl text-center"><div className="text-xs text-indigo-500 uppercase font-bold mb-1">Region</div><div className="font-bold text-lg">{marketData.location}</div></div>
                  <div className="bg-green-50 p-4 rounded-xl text-center"><div className="text-xs text-green-600 uppercase font-bold mb-1">Avg Salary</div><div className="font-bold text-lg text-green-700">{marketData.average_salary_range}</div></div>
                  <div className="bg-blue-50 p-4 rounded-xl text-center"><div className="text-xs text-blue-500 uppercase font-bold mb-1">Demand</div><div className="font-bold text-lg text-blue-700">{marketData.demand_trend}</div></div>
                </div>
                <h3 className="font-bold mb-3">Sample Job Listings ({marketData.active_openings} total openings)</h3>
                <div className="space-y-2">{(marketData.live_jobs || []).map((job, idx) => (
                  <div key={idx} className="border p-3 rounded-lg hover:border-indigo-300 transition-all">
                    <div className="font-semibold text-gray-900">{job.title}</div>
                    <div className="text-sm text-gray-500">{job.company} • {job.location} • {job.posted}</div>
                  </div>
                ))}</div>
              </div>}
            </div>
          </div>
        </div>
      )}

      {/* AI Roadmap Modal */}
      {(isRoadmapLoading || roadmapData) && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center bg-purple-600 text-white">
              <h2 className="text-xl font-bold flex items-center"><Brain className="w-6 h-6 mr-2" /> AI Roadmap: {roadmapData ? roadmapData.career : ''}</h2>
              <button onClick={() => { setRoadmapData(null); setIsRoadmapLoading(false); }} className="hover:bg-purple-700 p-1 rounded-lg"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-6 overflow-y-auto">
              {isRoadmapLoading ? <div className="flex flex-col items-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-600 mb-4" /><p className="text-purple-600">Generating AI roadmap...</p></div>
              : roadmapData?.content && (
                <div className="text-gray-800 leading-relaxed">
                  {roadmapData.content.split('\n').map((line, i) => {
                    if (line.startsWith('### ')) return <h4 key={i} className="text-lg font-bold mt-4 mb-2">{line.replace('### ','')}</h4>;
                    if (line.startsWith('## ')) return <h3 key={i} className="text-xl font-bold text-purple-800 mt-5 mb-2 border-b pb-1">{line.replace('## ','')}</h3>;
                    if (line.startsWith('# ')) return <h2 key={i} className="text-2xl font-bold mt-2 mb-3">{line.replace('# ','')}</h2>;
                    if (line.startsWith('- **') || line.startsWith('* **')) { const p = line.split('**'); return <li key={i} className="ml-5 mb-1 list-disc"><strong>{p[1]}</strong>{p.slice(2).join('**')}</li>; }
                    if (line.startsWith('- ') || line.startsWith('* ')) return <li key={i} className="ml-5 mb-1 list-disc">{line.substring(2)}</li>;
                    if (!line.trim()) return <br key={i} />;
                    return <p key={i} className="mb-2">{line.split('**').map((p,pi) => pi%2===1 ? <strong key={pi}>{p}</strong> : p)}</p>;
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const NlpEssayScreen = ({ essayText, setEssayText, isAnalyzing, setIsAnalyzing, nlpResults, setNlpResults }) => {
  const [mbtiResult, setMbtiResult] = useState(null);
  const [error, setError] = useState(null);

  const submitEssay = async () => {
    if (!essayText.trim()) return;
    setIsAnalyzing(true); setMbtiResult(null); setError(null);
    try {
      const res = await fetch(`${API_URL}/analyze-essay`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ essay: essayText }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setNlpResults(data);
      // Also get MBTI type
      if (data.personality_traits) {
        const mbtiRes = await fetch(`${API_URL}/personality/mbti`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ traits: data.personality_traits }) });
        const mbtiData = await mbtiRes.json();
        setMbtiResult(mbtiData);
      }
    } catch (e) { 
      console.error(e); 
      setError(e.message);
    }
    setIsAnalyzing(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Personality Profiler</h1>
      <p className="text-gray-600 mb-6">Write about your interests and how you approach challenges. AI will detect your personality traits, MBTI type, and best-fit careers.</p>
      {!nlpResults ? (
        <div className="bg-white p-6 rounded-xl shadow border">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start">
              <span className="mr-2">❌</span>
              <div>
                <p className="font-bold">Analysis Failed</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}
          <textarea className="w-full h-48 p-4 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none mb-4" placeholder="I enjoy solving complex problems and building things from scratch. I love research and independent work but also collaborate well in teams..." value={essayText} onChange={e => setEssayText(e.target.value)} />
          <button onClick={submitEssay} disabled={isAnalyzing} className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold flex items-center">
            {isAnalyzing ? <><Loader className="animate-spin mr-2 w-5 h-5" /> Analyzing...</> : <><Brain className="mr-2 w-5 h-5" /> Analyze My Personality</>}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* MBTI Card */}
          {mbtiResult && (
            <div className="bg-gradient-to-r from-violet-600 to-purple-700 text-white p-6 rounded-2xl shadow-xl flex items-center gap-6">
              <div className="text-6xl">{mbtiResult.emoji}</div>
              <div>
                <div className="text-sm font-semibold text-purple-200 uppercase tracking-widest mb-1">Your MBTI Type</div>
                <div className="text-4xl font-black mb-1">{mbtiResult.mbti}</div>
                <div className="text-xl font-bold text-purple-100">{mbtiResult.name}</div>
                <p className="text-purple-200 text-sm mt-1">{mbtiResult.description}</p>
              </div>
            </div>
          )}
          <div className="bg-white p-6 rounded-xl shadow border">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Detailed Analysis</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center text-purple-700"><TrendingUp className="mr-2 w-4 h-4" /> Predicted Interests</h3>
                <div className="space-y-2">
                  {Object.entries(nlpResults.top_interests || {}).map(([interest, score]) => (
                    <div key={interest}>
                      <div className="flex justify-between text-sm mb-1"><span className="capitalize">{interest}</span><span className="font-bold text-purple-700">{Math.round(score * 100)}%</span></div>
                      <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-purple-500 h-2 rounded-full" style={{width: `${Math.round(score * 100)}%`}} /></div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3 flex items-center text-blue-700"><User className="mr-2 w-4 h-4" /> Key Traits</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(nlpResults.personality_traits || {}).map(([trait, score]) => (
                    <div key={trait} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm capitalize font-medium">
                      {trait.replace('_', ' ')} <span className="text-xs text-blue-500">{Math.round(score * 100)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-indigo-800 to-purple-900 text-white p-6 rounded-xl">
            <h2 className="text-lg font-bold mb-3">Best Career Fields For You</h2>
            <div className="flex flex-wrap gap-2">
              {nlpResults.career_recommendations?.map((rec, i) => <span key={i} className="bg-white/15 px-4 py-2 rounded-lg font-medium">{rec}</span>)}
            </div>
          </div>
          <button onClick={() => { setNlpResults(null); setEssayText(''); setMbtiResult(null); }} className="text-purple-600 font-semibold hover:underline">Write another essay ↩</button>
        </div>
      )}
    </div>
  );
};

const CareerComparePage = ({ compareList, setCompareList, careerDatabase }) => {
  const allCareers = Object.values(careerDatabase || {}).flat();
  const [search, setSearch] = useState('');
  const filtered = allCareers.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  const skillsFor = (career) => (career.skills || []).slice(0, 4);
  const growthColor = g => g === 'High' ? 'text-green-600 bg-green-50' : g === 'Stable' ? 'text-blue-600 bg-blue-50' : 'text-yellow-600 bg-yellow-50';

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Compare Careers</h1>
      <p className="text-gray-600 mb-6">Select up to 3 careers to compare side-by-side. Use the Career Explorer to add them, or search here.</p>

      {/* Search to add */}
      <div className="bg-white rounded-xl shadow border p-4 mb-8">
        <h3 className="font-semibold mb-3 text-gray-800">Add careers to compare ({compareList.length}/3)</h3>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search a career to add..." className="border px-3 py-2 rounded-lg text-sm w-full max-w-sm focus:ring-2 focus:ring-teal-500 outline-none mb-3" />
        {search && (
          <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto">
            {filtered.slice(0, 10).map((c, i) => (
              <button key={i} onClick={() => { if (compareList.length < 3 && !compareList.find(x => x.title === c.title)) { setCompareList([...compareList, c]); setSearch(''); } }} className="text-sm bg-teal-50 text-teal-700 hover:bg-teal-100 px-3 py-1 rounded-full border border-teal-200 transition">
                {c.title} <span className="text-teal-400">+</span>
              </button>
            ))}
          </div>
        )}
        {compareList.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {compareList.map((c, i) => (
              <span key={i} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                {c.title}
                <button onClick={() => setCompareList(compareList.filter(x => x.title !== c.title))} className="text-teal-500 hover:text-red-500 font-bold">×</button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Comparison Table */}
      {compareList.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Scale className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p className="text-xl">No careers selected yet</p>
          <p className="text-sm mt-2">Go to Career Explorer and click "Compare" on any career card</p>
        </div>
      ) : (
        <div className={`grid gap-6`} style={{gridTemplateColumns: `repeat(${compareList.length}, minmax(0, 1fr))`}}>
          {compareList.map((career, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg border-2 border-teal-100 flex flex-col overflow-hidden">
              <div className="bg-gradient-to-br from-teal-500 to-teal-700 p-5 text-white">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">{career.title}</h3>
                  <button onClick={() => setCompareList(compareList.filter(c => c.title !== career.title))} className="text-white/60 hover:text-white"><X className="w-4 h-4" /></button>
                </div>
                <p className="text-teal-100 text-xs mt-1">{career.category}</p>
              </div>
              <div className="p-5 space-y-4 flex-1">
                <div>
                  <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Salary Range</div>
                  <div className="text-lg font-bold text-gray-900">{career.salary || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Growth</div>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${growthColor(career.growth)}`}>{career.growth || 'N/A'}</span>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">Top Skills</div>
                  <div className="flex flex-wrap gap-1">
                    {skillsFor(career).map((s, si) => <span key={si} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{s}</span>)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">About</div>
                  <p className="text-sm text-gray-600">{career.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AdminPanel = ({ adminToken, setAdminToken, currentPage, adminStats, setAdminStats, adminUsers, setAdminUsers, adminLogs, setAdminLogs }) => {
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUser, password: loginPass })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setAdminToken(data.token);
        localStorage.setItem('adminToken', data.token);
        fetchAdminData();
      } else {
        alert("Invalid Admin Credentials");
      }
    } catch (e) {
      console.error("Login failed", e);
    }
  };

  const fetchAdminData = async () => {
    try {
      const [statsRes, usersRes, logsRes] = await Promise.all([
        fetch(`${API_URL}/admin/dashboard-stats`),
        fetch(`${API_URL}/admin/users`),
        fetch(`${API_URL}/admin/logs?limit=10`)
      ]);
      setAdminStats(await statsRes.json());
      setAdminUsers(await usersRes.json());
      setAdminLogs(await logsRes.json());
    } catch (e) { console.error("Admin data fetch failed", e); }
  };

  useEffect(() => {
    if (adminToken && currentPage === 'admin') fetchAdminData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminToken, currentPage]);

  if (!adminToken) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[80vh]">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-xl border max-w-md w-full">
          <div className="flex justify-center mb-6 text-purple-600"><Shield className="w-16 h-16" /></div>
          <h2 className="text-2xl font-bold text-center mb-6">Admin Secured Login</h2>
          <input className="w-full border p-3 rounded mb-4 outline-none focus:border-purple-500" placeholder="Username" value={loginUser} onChange={e => setLoginUser(e.target.value)} />
          <input className="w-full border p-3 rounded mb-6 outline-none focus:border-purple-500" type="password" placeholder="Password" value={loginPass} onChange={e => setLoginPass(e.target.value)} />
          <button type="submit" className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 shadow">Access System</button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center"><Activity className="mr-3 text-purple-600" /> Dashboard Overview</h1>
        <button onClick={() => { setAdminToken(null); localStorage.removeItem('adminToken'); }} className="text-red-500 font-semibold border border-red-200 bg-white px-4 py-2 rounded shadow-sm hover:bg-red-50">Logout Admin</button>
      </div>

      {adminStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl shadow border-l-4 border-blue-500"><div className="text-gray-500 text-sm font-semibold mb-1">Total Users</div><div className="text-3xl font-bold">{adminStats.total_users}</div></div>
          <div className="bg-white p-5 rounded-xl shadow border-l-4 border-green-500"><div className="text-gray-500 text-sm font-semibold mb-1">Tests Completed</div><div className="text-3xl font-bold">{adminStats.total_tests}</div></div>
          <div className="bg-white p-5 rounded-xl shadow border-l-4 border-red-500"><div className="text-gray-500 text-sm font-semibold mb-1">System Errors</div><div className="text-3xl font-bold">{adminStats.total_errors}</div></div>
          <div className="bg-white p-5 rounded-xl shadow border-l-4 border-purple-500"><div className="text-gray-500 text-sm font-semibold mb-1">Avg Score</div><div className="text-3xl font-bold">{adminStats.avg_scores?.General || 0}%</div></div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow border overflow-hidden">
          <div className="p-4 border-b bg-gray-50"><h2 className="font-bold text-gray-800">Recent Users</h2></div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr><th className="px-4 py-3">ID</th><th className="px-4 py-3">Username</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Joined</th></tr>
              </thead>
              <tbody>
                {adminUsers.map(u => (
                  <tr key={u.user_id} className="border-b"><td className="px-4 py-3">{u.user_id}</td><td className="px-4 py-3 font-medium text-gray-900">{u.username}</td><td className="px-4 py-3">{u.email}</td><td className="px-4 py-3">{new Date(u.created_at).toLocaleDateString()}</td></tr>
                ))}
                {adminUsers.length === 0 && <tr><td colSpan="4" className="text-center p-4">No users found.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow border overflow-hidden">
          <div className="p-4 border-b bg-gray-50"><h2 className="font-bold text-gray-800">Live Activity Feed</h2></div>
          <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
            {adminLogs.map(log => (
              <div key={log.log_id} className="flex border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <div className="min-w-10 pt-1 text-gray-400"><Activity className="w-5 h-5" /></div>
                <div>
                  <div className="font-semibold text-sm text-gray-800">{log.action.replace(/_/g, ' ')}</div>
                  <div className="text-xs text-gray-500">{log.details}</div>
                  <div className="text-[10px] text-gray-400 mt-1">{new Date(log.timestamp).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CareerCounselingSystem = () => {
  const [user] = useState(null); // Google OAuth user profile (set after login)
  const location = useLocation();
  const [testResults, setTestResults] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userLocation, setUserLocation] = useState('USA');

  // NLP State
  const [essayText, setEssayText] = useState('');
  const [nlpResults, setNlpResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Admin State
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || null);
  const [adminStats, setAdminStats] = useState(null);
  const [adminUsers, setAdminUsers] = useState([]);
  const [adminLogs, setAdminLogs] = useState([]);

  // State for data fetched from backend
  const [aptitudeQuestions, setAptitudeQuestions] = useState([]);
  const [careerDatabase, setCareerDatabase] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // User Profile State for Aptitude Test
  const [userAge, setUserAge] = useState('');
  const [userEducation, setUserEducation] = useState('');
  const [userProfileSet, setUserProfileSet] = useState(false);

  // Compare Careers State
  const [compareList, setCompareList] = useState([]);

  // AI Coach State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'model', content: "Hi there! I'm CareerAI, your personal counselor. What kind of career advice are you looking for today?" }
  ]);
  const [currentChatInput, setCurrentChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = React.useRef(null);

  useEffect(() => {
    if (isChatOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!currentChatInput.trim() || isChatLoading) return;

    const userMessage = { role: 'user', content: currentChatInput };
    const newContext = [...chatMessages, userMessage];
    setCurrentChatInput('');
    setIsChatLoading(true);

    // Show user message + empty AI bubble immediately
    setChatMessages([...newContext, { role: 'model', content: '...' }]);

    const callFallback = async () => {
      const res = await fetch(`${API_URL}/chat-coach`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newContext })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      return data.reply || "I'm having trouble connecting right now. Please try again.";
    };

    try {
      // Attempt SSE streaming first
      const response = await fetch(`${API_URL}/chat-coach-stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newContext })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Stream HTTP ${response.status}`);
      }
      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        for (const line of text.split('\n')) {
          if (!line.startsWith('data: ')) continue;
          const payload = line.slice(6).trim();
          if (payload === '[DONE]') break;
          try {
            const parsed = JSON.parse(payload);
            if (parsed.token) {
              streamedContent += parsed.token.replace(/\\n/g, '\n');
              const snapshot = streamedContent;
              setChatMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: 'model', content: snapshot };
                return updated;
              });
            }
          } catch { /* ignore malformed SSE line */ }
        }
      }

      // If stream gave us nothing (Render buffering / gunicorn issue), fall back to normal endpoint
      if (!streamedContent) {
        const reply = await callFallback();
        setChatMessages([...newContext, { role: 'model', content: reply }]);
      }

    } catch (err) {
      console.warn('Streaming failed, using fallback:', err.message);
      try {
        const reply = await callFallback();
        setChatMessages([...newContext, { role: 'model', content: reply }]);
      } catch (fallbackErr) {
        setChatMessages([...newContext, { role: 'model', content: `❌ Error: ${fallbackErr.message}. (Please check your GEMINI_API_KEY and Render logs)` }]);
      }
    }
    setIsChatLoading(false);
  };

  // Fetch aptitude questions and career data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [questionsRes, careersRes] = await Promise.all([
          fetch(`${API_URL}/aptitude-test/questions`),
          fetch(`${API_URL}/careers`)
        ]);
        const questionsData = await questionsRes.json();
        const careersData = await careersRes.json();

        if (Array.isArray(questionsData)) {
          setAptitudeQuestions(questionsData);
        } else {
          console.error("Fetched questions is not an array:", questionsData);
          setAptitudeQuestions([]);
        }

        setCareerDatabase(careersData);

      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAnswer = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < aptitudeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleFinishTest = async () => {
    const formattedAnswers = Object.keys(answers).map(qIndex => {
      const questionId = aptitudeQuestions[qIndex].question_id;
      return {
        question_id: questionId,
        user_answer: answers[qIndex]
      };
    });

    try {
      // First submit the test to get aptitude scores
      const response = await fetch(`${API_URL}/aptitude-test/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          answers: formattedAnswers, 
          user_id: 1,
          age: userAge,
          education: userEducation
        })
      });
      const data = await response.json();
      setTestResults(data);
      setShowResults(true);

      // Then get AI-powered personalized recommendations
      try {
        const aiRes = await fetch(`${API_URL}/smart-recommendations`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            age: userAge,
            education: userEducation,
            location: userLocation,
            category_scores: data.results?.category_scores || {},
            interest_answers: []
          })
        });
        const aiData = await aiRes.json();
        if (aiData.recommendations) {
          setTestResults(prev => ({
            ...prev,
            aiRecommendations: aiData.recommendations
          }));
        }
      } catch (aiError) {
        console.log("AI recommendations fallback:", aiError);
      }
    } catch (error) {
      console.error("Failed to submit test:", error);
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setTestResults(null);
    setUserProfileSet(false);
    setUserAge('');
    setUserEducation('');
  };


  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} resetTest={resetTest} user={user} />
      <div className="flex-1 lg:pl-64 w-full">
        <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-white border-b">
          <button onClick={() => setSidebarOpen(true)}><Menu className="w-6 h-6" /></button>
          <h1 className="text-xl font-bold text-gray-800">CareerAI</h1>
          <div className="w-6"></div>
        </div>
        {/* Redundant top-level region bar removed (moved inside Dashboard) */}

        <Routes>
          <Route path="/" element={<Dashboard resetTest={resetTest} userLocation={userLocation} setUserLocation={setUserLocation} />} />
          <Route path="/test" element={
            <AptitudeTest isLoading={isLoading} aptitudeQuestions={aptitudeQuestions} showResults={showResults}
              testResults={testResults} currentQuestion={currentQuestion} handleAnswer={handleAnswer}
              answers={answers} handleNextQuestion={handleNextQuestion} handleFinishTest={handleFinishTest}
              resetTest={resetTest} userAge={userAge} setUserAge={setUserAge} userEducation={userEducation}
              setUserEducation={setUserEducation} userProfileSet={userProfileSet} setUserProfileSet={setUserProfileSet} />
          } />
          <Route path="/essay" element={
            <NlpEssayScreen essayText={essayText} setEssayText={setEssayText} isAnalyzing={isAnalyzing}
              setIsAnalyzing={setIsAnalyzing} nlpResults={nlpResults} setNlpResults={setNlpResults} />
          } />
          <Route path="/careers" element={
            <CareerExplorer isLoading={isLoading} careerDatabase={careerDatabase} userLocation={userLocation}
              compareList={compareList} setCompareList={setCompareList} />
          } />
          <Route path="/compare" element={
            <CareerComparePage compareList={compareList} setCompareList={setCompareList} careerDatabase={careerDatabase} />
          } />
          <Route path="/roadmap" element={
            <RoadmapPage userAge={userAge} userLocation={userLocation} userEducation={userEducation} />
          } />
          <Route path="/admin" element={
            <AdminPanel adminToken={adminToken} setAdminToken={setAdminToken} adminStats={adminStats}
              setAdminStats={setAdminStats} adminUsers={adminUsers} setAdminUsers={setAdminUsers}
              adminLogs={adminLogs} setAdminLogs={setAdminLogs} />
          } />
          <Route path="*" element={<Dashboard resetTest={resetTest} userLocation={userLocation} setUserLocation={setUserLocation} />} />
        </Routes>
      </div>

      {/* Floating AI Coach Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen && (
          <button 
            onClick={() => setIsChatOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-xl transition-transform hover:scale-105 flex items-center justify-center animate-bounce"
          >
            <MessageSquare className="w-8 h-8" />
          </button>
        )}
        
        {isChatOpen && (
          <div className="bg-white rounded-2xl shadow-2xl border border-purple-100 flex flex-col w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] animate-in fade-in slide-in-from-bottom-5">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-t-2xl flex justify-between items-center shadow-md z-10">
              <div className="flex items-center">
                <Brain className="w-6 h-6 mr-2" />
                <h3 className="font-bold">CareerAI Coach</h3>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/20 p-1 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm ${msg.role === 'user' ? 'bg-purple-600 text-white rounded-tr-sm' : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm'}`}>
                     {/* Basic markdown parsing for chat */}
                     {msg.content.split('\n').map((line, i) => {
                        if (line.startsWith('* **') || line.startsWith('- **')) {
                           const parts = line.split('**');
                           return <li key={i} className="ml-4 list-disc pt-1"><strong>{parts[1]}</strong>{parts.slice(2).join('**')}</li>;
                        }
                        if (line.trim() === '') return <div key={i} className="h-1"></div>;
                        return <p key={i} className="pt-1">{line.split('**').map((part, idx) => idx % 2 === 1 ? <strong key={idx}>{part}</strong> : part)}</p>;
                     })}
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border text-gray-800 rounded-2xl rounded-tl-sm p-4 shadow-sm flex space-x-2 items-center">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            
            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t rounded-b-2xl flex items-center shadow-inner">
              <input
                type="text"
                placeholder="Ask for career advice..."
                className="flex-1 bg-gray-100 rounded-full py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border-transparent"
                value={currentChatInput}
                onChange={(e) => setCurrentChatInput(e.target.value)}
                disabled={isChatLoading}
              />
              <button 
                type="submit" 
                disabled={!currentChatInput.trim() || isChatLoading}
                className="ml-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2.5 flex-shrink-0 transition-colors disabled:opacity-50 disabled:bg-gray-400"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerCounselingSystem;