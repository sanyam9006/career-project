import React, { useState, useEffect, useCallback } from "react";
import { NavLink, useNavigate, Routes, Route, useLocation } from "react-router-dom";
import { Brain, TrendingUp, Home, TestTube, Users, Menu, X, Shield, Edit3, MapPin, MessageSquare, Send, Briefcase, Mail, Loader, Scale, Sparkles, Zap, Target, ArrowRight, ExternalLink, Activity, Plus, AlertCircle } from "lucide-react";

const API_URL = process.env.REACT_APP_API_URL ||
  (window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://career-project-ph1x.onrender.com');

const navLinkClass = ({ isActive }) =>
  `w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-300 ${
    isActive 
      ? 'bg-white/10 text-white font-black shadow-lg shadow-black/20' 
      : 'text-slate-400 hover:bg-white/5 hover:text-white font-medium'
  }`;

const Sidebar = ({ sidebarOpen, setSidebarOpen, resetTest, user, handleLogout }) => (
  <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0f172a] transform transition-transform duration-500 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex flex-col shadow-2xl overflow-hidden`}>
    <div className="flex items-center justify-between h-20 px-6 mt-2">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-black tracking-tighter text-white">CareerAI</h1>
      </div>
      <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white"><X className="w-6 h-6" /></button>
    </div>

    {user && (
      <div className="mx-4 mt-6 p-4 bg-slate-900/50 rounded-2xl border border-slate-800/50 flex items-center gap-4 transition-all hover:border-slate-700">
        <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full border-2 border-[#a78bfa] shadow-sm" />
        <div className="overflow-hidden">
          <p className="text-sm font-bold text-white truncate leading-tight">{user.name}</p>
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mt-0.5 truncate">{user.email}</p>
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

    <div className="px-4 pb-8 pt-6 mt-4">
      <NavLink to="/admin" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
        <Shield className="w-5 h-5 mr-3" /> Admin Panel
      </NavLink>
      <button onClick={() => { if (user) handleLogout(); else window.location.href = `${API_URL}/auth/google?redirect_uri=${window.location.origin}`; }}
        className="mt-4 w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl active:scale-[0.98]">
        {user ? (
          <><X className="w-4 h-4" /> Logout</>
        ) : (
          <>
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Login with Google
          </>
        )}
      </button>
    </div>
  </div>
);

// ─── PLEASE REGISTER COMPONENT ───────────────────────────────
const PleaseRegister = ({ onOpenAuth }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center bg-white rounded-3xl shadow-sm border border-slate-100 max-w-2xl mx-auto mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
      <Shield className="w-10 h-10 text-indigo-600" />
    </div>
    <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter">Protected Feature</h2>
    <p className="text-slate-500 text-lg mb-8 leading-relaxed font-medium">
      To access our personalized career tools and AI assessments, please **Log In** first. 
      It lets us save your progress across all your devices.
    </p>
    <div className="flex flex-col sm:flex-row gap-4">
      <button 
        onClick={() => window.location.href = `${API_URL}/auth/google?redirect_uri=${window.location.origin}`}
        className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98]"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        Google Login
      </button>
      <button 
        onClick={onOpenAuth}
        className="flex items-center gap-3 px-8 py-4 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98]"
      >
        <Mail className="w-5 h-5" />
        Email Access
      </button>
    </div>
  </div>
);

const AuthOverlay = ({ isOpen, onClose, mode, setMode, onAuthSuccess }) => {
  const [formData, setFormData] = useState({
    username: '', email: '', password: '', full_name: '', age: '', education_level: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        onAuthSuccess(data.user);
        onClose();
      } else {
        setError(data.error || 'Authentication failed');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100">
        <div className="p-8 pb-4 flex justify-between items-center bg-slate-50 border-b border-slate-100">
           <div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{mode === 'login' ? 'Sign in to your profile' : 'Join the CareerAI community'}</p>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-colors text-slate-400 hover:text-slate-900"><X /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-xs font-bold animate-shake uppercase tracking-wider text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {mode === 'register' && (
              <input type="text" placeholder="Full Name" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none" 
                value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} required={mode === 'register'} />
            )}
            
            <input type="text" placeholder="Username" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none" 
              value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} required />

            {mode === 'register' && (
              <>
                <input type="email" placeholder="Email Address" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none" 
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
                <div className="grid grid-cols-2 gap-4">
                  <input type="number" placeholder="Age" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none" 
                    value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
                  <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none appearance-none"
                    value={formData.education_level} onChange={e => setFormData({...formData, education_level: e.target.value})}>
                    <option value="">Education</option>
                    <option value="School">School</option>
                    <option value="College">College</option>
                    <option value="Graduate">Graduate</option>
                  </select>
                </div>
              </>
            )}

            <input type="password" placeholder="Password" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none" 
              value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50">
            {loading ? 'Processing...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
          </button>

          <div className="pt-4 text-center">
            <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">
              {mode === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── DASHBOARD (Humanised Version — White Background) ─────────────────────────
const Dashboard = ({ resetTest, userLocation, setUserLocation, user, onOpenAuth }) => {
  const navigate = useNavigate();
  const features = [
    {
      icon: <TestTube className="w-8 h-8" />,
      title: 'Not sure where to start?',
      desc: "Take our short adaptive test. It asks 20 questions, gets smarter as you go, and gives you a real picture of what you're good at.",
      color: 'from-blue-500 to-cyan-500',
      link: '/test',
      cta: 'Take the test →'
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'What kind of person are you?',
      desc: "Just write a few sentences about what excites you. Our AI reads it and tells you your personality type, your strengths, and careers you'd actually enjoy.",
      color: 'from-purple-500 to-pink-500',
      link: '/essay',
      cta: 'Try it free →'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Got a career in mind?',
      desc: "Tell us what you want to do and we'll build you a step-by-step 12-month plan — with real skills, courses, and milestones to hit.",
      color: 'from-orange-500 to-rose-500',
      link: '/roadmap',
      cta: 'Build my roadmap →'
    },
  ];
  const steps = [
    { num: '01', title: 'Answer 20 questions', desc: 'No essays, no forms. Just quick honest questions about how you think and what you enjoy.' },
    { num: '02', title: 'See your real strengths', desc: 'Get a plain-English breakdown of your personality type, top skills, and best-fit industries.' },
    { num: '03', title: 'Pick a path, not a guess', desc: 'Explore careers that actually match you, compare them side-by-side, and generate your personalized roadmap.' },
  ];
  const stats = [
    { value: '10 min', label: 'to get your results' },
    { value: 'Free', label: 'no sign-up needed' },
    { value: 'MBTI', label: 'personality mapping' },
    { value: 'AI', label: 'career roadmaps' },
  ];
  return (
    <div className="min-h-screen bg-white">
      {/* Hero — White Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-100/60 rounded-full blur-3xl" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 backdrop-blur rounded-full text-gray-500 text-sm mb-8 border border-gray-200">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            Made for students, freshers &amp; career switchers
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-5">
            Finally figure out<br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">what you actually want to do.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
            Answer a short test, write what you love, and get a real career plan built for you — not a generic list from Google.
          </p>
          {!user && (
            <div className="p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100 mb-10 animate-in fade-in duration-1000">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white rounded-xl shadow-sm">
                  <Shield className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="text-left">
                  <h4 className="font-black text-slate-900 text-sm uppercase tracking-wider mb-1">Registration Required</h4>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    Personalized assessments and roadmaps are protected. Please log in to unlock all features.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
               <button onClick={() => navigate('/test')}
               className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-2xl hover:from-purple-500 hover:to-blue-500 transition-all shadow-xl hover:scale-105">
               <Zap className="w-5 h-5" /> Take the assessment
               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => window.location.href = `${API_URL}/auth/google?redirect_uri=${window.location.origin}`}
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white font-bold text-lg rounded-2xl hover:bg-slate-800 transition-all shadow-xl hover:scale-105">
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  Sign in
                </button>
                <button onClick={onOpenAuth}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all shadow-xl hover:scale-105 active:scale-[0.98]"
                >
                  <Mail className="w-6 h-6" />
                  Email Access
                </button>
              </div>
            )}
            <button onClick={() => navigate('/careers')}
              className="px-8 py-4 bg-gray-100 text-gray-800 font-bold text-lg rounded-2xl border border-gray-200 hover:bg-gray-200 transition-all">
              Browse careers
            </button>
          </div>


          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(s => (
              <div key={s.label} className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                <p className="text-2xl font-black text-gray-900">{s.value}</p>
                <p className="text-sm text-gray-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features — conversational */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-gray-900 mb-4">We&apos;ve got you covered.</h2>
            <p className="text-lg text-gray-400">Wherever you are in your career journey, start here.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map(f => (
              <button key={f.title} onClick={() => navigate(f.link)}
                className="group text-left bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${f.color} text-white mb-5 shadow`}>{f.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                <p className="mt-5 text-blue-600 font-semibold text-sm group-hover:underline">{f.cta}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works — White Background */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-gray-900 mb-4">It&apos;s simpler than you think.</h2>
            <p className="text-lg text-gray-400">Three steps. No account required. No fluff.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div key={s.num} className="bg-gray-50 border border-gray-200 rounded-3xl p-8">
                <div className="text-5xl font-black text-gray-200 mb-4">{s.num}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => { resetTest(); navigate('/test'); }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold text-lg rounded-2xl hover:bg-gray-700 transition-all shadow-xl">
              <Target className="w-5 h-5 text-purple-400" /> OK, let&apos;s find my career
            </button>
          </div>
        </div>
      </section>
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

const AptitudeTest = ({ isLoading, isTestLoading, aptitudeQuestions, showResults, testResults, currentQuestion, handleAnswer, answers, handleNextQuestion, handleFinishTest, resetTest, userAge, setUserAge, userEducation, setUserEducation, userProfileSet, setUserProfileSet }) => {
  const question = aptitudeQuestions[currentQuestion];
  
  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-500 font-bold">Initializing System...</p>
    </div>
  );

  // Step 1: Collect user profile before showing test
  if (!userProfileSet) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 animate-in zoom-in-95 duration-500">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-200 max-w-lg w-full">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Brain className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-2 font-inter tracking-tight">Before We Begin</h1>
            <p className="text-slate-500 font-medium">Tell us a little about yourself so our AI can personalize your career recommendations.</p>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Your Age</label>
              <input
                type="number" placeholder="e.g. 17" min="10" max="70"
                value={userAge} onChange={e => setUserAge(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 focus:border-indigo-500 focus:bg-white focus:outline-none text-slate-900 font-bold transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Current Education Level</label>
              <select value={userEducation} onChange={e => setUserEducation(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 focus:border-indigo-500 focus:bg-white focus:outline-none text-slate-900 font-bold transition-all appearance-none cursor-pointer">
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
            className="mt-10 w-full bg-indigo-600 text-white py-5 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none active:scale-[0.98]">
            Start My Personalized Test →
          </button>
        </div>
      </div>
    );
  }

  if (showResults && testResults) {
    const recs = testResults.aiRecommendations || testResults.recommendations || [];
    return (
      <div className="p-8 lg:p-12 animate-in fade-in duration-700 max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Your Career <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-4">Analysis</span></h1>
          {userAge && <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Personalized for age {userAge} · {userEducation}</p>}
        </div>
        
        {testResults.results?.category_scores && (
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 mb-12 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.03)]">
            <h2 className="text-xs font-black text-slate-400 mb-8 uppercase tracking-[0.2em] flex items-center gap-3">
              <Activity className="w-4 h-4 text-indigo-500" /> Aptitude Category Scores
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Object.entries(testResults.results.category_scores).map(([category, score]) => (
                <div key={category} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all group">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{category.replace('_', ' ')}</p>
                  <p className="text-3xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{Math.round(score.percentage)}%</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <h2 className="text-xl font-black text-slate-900 mb-8 tracking-tight flex items-center gap-3">
          {testResults.aiRecommendations ? <Sparkles className="w-5 h-5 text-indigo-500" /> : <TrendingUp className="w-5 h-5 text-indigo-500" />}
          {testResults.aiRecommendations ? 'AI-Powered Recommendations' : 'Aptitude-Based Recommendations'}
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {recs.map((career, index) => (
            <div key={index} className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.03)] hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group flex flex-col">
              <div className="flex items-start justify-between mb-6 gap-4">
                <h3 className="text-2xl font-black text-slate-900 leading-[1.1] tracking-tight">{career.career_title || career.title}</h3>
                <span className="bg-emerald-50 text-emerald-600 font-black text-[10px] px-4 py-2 rounded-full border border-emerald-100 whitespace-nowrap uppercase tracking-widest">{Math.round(career.match_percentage)}% Match</span>
              </div>
              <p className="text-slate-500 mb-8 text-sm font-medium leading-relaxed flex-1">{career.reasoning}</p>
              {career.next_step && (
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 group-hover:bg-white transition-all">
                  <p className="text-[10px] uppercase font-black text-indigo-600 tracking-widest mb-2 flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Recommended Step</p>
                  <p className="text-sm text-slate-900 font-bold leading-relaxed">{career.next_step}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <button onClick={resetTest} className="px-10 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all active:scale-95 shadow-xl shadow-slate-200 uppercase tracking-widest text-[10px]">Retake Analysis</button>
      </div>
    );
  }

  if (isTestLoading) {
    return (
      <div className="p-8 lg:p-12 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Preparing your next question...</p>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="p-8 lg:p-12 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="bg-red-50 p-6 rounded-3xl mb-6">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900 mb-2">Test Sync Error</h3>
          <p className="text-slate-500 max-w-sm">We couldn't fetch the next set of questions. Please check your internet connection or try restarting the test.</p>
        </div>
        <button onClick={resetTest} className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all">Restart Test</button>
      </div>
    );
  }

  const isInterestQuestion = question?.category === 'interest';
  return (
    <div className="p-8 lg:p-12 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-2">Aptitude <span className="text-indigo-600">Test</span></h1>
            {isInterestQuestion && <p className="text-[10px] text-indigo-500 font-extrabold uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> Interest Question — pick what fits you!
            </p>}
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-indigo-600 tabular-nums">{currentQuestion + 1}</span>
            <span className="text-slate-400 font-bold ml-1">/ 20</span>
          </div>
        </div>
        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 shadow-[0_0_10px_rgba(79,70,229,0.3)] transition-all duration-700 ease-out"
            style={{ width: `${((currentQuestion + 1) / 20) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white p-10 lg:p-14 rounded-[3rem] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600" />
        <h2 className="text-2xl lg:text-3xl font-black text-slate-900 mb-10 leading-snug tracking-tight">
          {question.question}
        </h2>
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group ${
                answers[currentQuestion] === index 
                  ? 'border-indigo-600 bg-indigo-50/50 shadow-lg shadow-indigo-500/5' 
                  : 'border-slate-100 hover:border-indigo-200 hover:bg-slate-50'
              }`}
            >
              <span className={`text-lg font-bold ${answers[currentQuestion] === index ? 'text-indigo-700' : 'text-slate-600 group-hover:text-slate-900'}`}>{option}</span>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                answers[currentQuestion] === index ? 'border-indigo-600 bg-indigo-600' : 'border-slate-200 group-hover:border-indigo-300'
              }`}>
                {answers[currentQuestion] === index && <div className="w-2.5 h-2.5 bg-white rounded-full shadow-sm" />}
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-12 flex justify-end">
          <button 
            disabled={answers[currentQuestion] === undefined || isTestLoading}
            onClick={handleNextQuestion}
            className="group flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-indigo-600 disabled:bg-slate-200 disabled:text-slate-400 transition-all active:scale-95 shadow-xl shadow-slate-200 uppercase tracking-widest text-[11px]"
          >
            {currentQuestion === 19 ? 'Finish Test' : 'Next Question'}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

const CareerExplorer = ({ isLoading, careerDatabase, userLocation, compareList, setCompareList }) => {
  const navigate = useNavigate();
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
    <div className="p-8 lg:p-12 relative animate-in fade-in duration-700 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-none mb-4">Career <span className="text-indigo-600">Explorer</span></h1>
          <p className="text-lg text-slate-500 font-medium">Discover careers that match your skills or explore new industries.</p>
        </div>
        <div className="flex gap-4 flex-wrap items-center">
          <div className="relative">
            <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} 
              placeholder="Search careers..." 
              className="bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 text-sm focus:border-indigo-500 outline-none w-72 text-slate-900 placeholder:text-slate-300 transition-all shadow-sm" />
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-300">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} 
            className="bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 text-sm focus:border-indigo-500 outline-none text-slate-700 transition-all font-black appearance-none pr-12 cursor-pointer shadow-sm">
            {allCategories.map(c => <option key={c}>{c}</option>)}
          </select>
          {compareList.length > 0 && 
            <button onClick={() => navigate('/compare')} className="bg-indigo-600 text-white px-8 py-4 rounded-2xl text-sm font-black shadow-xl shadow-indigo-100 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
              <Scale className="w-4 h-4" /> Compare <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">{compareList.length}</span>
            </button>
          }
        </div>
      </div>

      {isLoading ? <div className="flex flex-col items-center justify-center p-20 py-40">
        <Loader className="animate-spin w-12 h-12 text-indigo-600 mb-4" />
        <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs">Curating Database...</p>
      </div> : Object.entries(filteredDb).map(([category, careers]) => (
        <div key={category} className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-black text-slate-900 capitalize tracking-tight">{category}</h2>
            <div className="h-0.5 bg-slate-50 flex-1 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(careers) && careers.map((career, index) => (
              <div key={index} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-indigo-200 transition-all duration-500 group relative flex flex-col shadow-[0_20px_50px_-15px_rgba(0,0,0,0.02)] hover:shadow-2xl hover:shadow-indigo-500/5">
                <div className="flex items-start justify-between mb-4 gap-4">
                  <h3 className="text-2xl font-black text-slate-900 leading-[1.1] tracking-tight group-hover:text-indigo-600 transition-colors uppercase italic">{career.title}</h3>
                  <span className={`text-[9px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest shrink-0 border transition-all ${ 
                    career.growth === 'High' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                    career.growth === 'Stable' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 
                    'bg-amber-50 text-amber-600 border-amber-100'}`}>{career.growth}</span>
                </div>
                <p className="text-slate-500 mb-8 text-sm font-medium leading-relaxed flex-1">{career.description}</p>
                
                <div className="space-y-4 pt-6 border-t border-slate-50">
                  <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Avg Salary</span>
                    <span className="font-black text-slate-900 text-sm">{career.salary || 'N/A'}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {(career.skills || []).slice(0, 3).map((skill, si) => (
                      <span key={si} className="bg-white text-slate-400 border border-slate-100 px-3 py-1.5 rounded-xl font-bold text-[9px] uppercase tracking-wider">{skill}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <button onClick={() => viewMarketInsights(career.title)} className="bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 text-slate-500 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 border border-slate-100"><TrendingUp className="w-3.5 h-3.5" /> Market</button>
                    <button onClick={() => generateAIRoadmap(career.title)} className="bg-indigo-600 text-white hover:bg-indigo-700 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"><Brain className="w-3.5 h-3.5" /> Roadmap</button>
                    <button onClick={() => viewLiveJobs(career.title)} className="bg-slate-900 text-white hover:bg-indigo-600 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 border border-slate-100"><Briefcase className="w-3.5 h-3.5" /> Jobs</button>
                    <button onClick={() => addToCompare(career)} className="bg-white border-2 border-slate-100 hover:border-indigo-600 hover:text-indigo-600 text-slate-400 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2"><Scale className="w-3.5 h-3.5 text-indigo-500" /> Compare</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Live Jobs Modal */}
      {(isJobsLoading || liveJobs !== null) && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-100">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-3 tracking-tight"><Briefcase className="w-6 h-6 text-indigo-600" /> Live Jobs</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{activeJobsCareer}</p>
              </div>
              <button onClick={() => { setLiveJobs(null); setIsJobsLoading(false); }} className="hover:bg-slate-50 p-2 rounded-xl transition-colors"><X className="w-6 h-6 text-slate-400" /></button>
            </div>
            <div className="p-8 overflow-y-auto">
              {isJobsLoading ? (
                <div className="flex flex-col items-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-6" /><p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Gathering opportunities...</p></div>
              ) : (
                <div className="space-y-4">
                  {(liveJobs || []).length === 0 ? <p className="text-slate-400 text-center py-12 font-medium">No live roles found for this career right now.</p> : (liveJobs || []).map((job, i) => (
                    <div key={i} className="bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] p-6 hover:border-indigo-100 hover:bg-white transition-all group">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="font-black text-slate-900 text-lg tracking-tight group-hover:text-indigo-600 transition-colors">{job.title}</div>
                          <div className="text-sm text-slate-500 font-bold mt-1">{job.company} · {job.location}</div>
                        </div>
                        <span className="text-[10px] bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full font-black uppercase tracking-widest border border-indigo-100">{job.type}</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-medium mb-6">{job.description}</p>
                      <a href={job.apply_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full bg-slate-900 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 shadow-lg shadow-slate-100 transition-all active:scale-[0.98]">
                        Apply Now <ExternalLink className="w-3.5 h-3.5 ml-2" />
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
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-100">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-3 tracking-tight"><TrendingUp className="w-6 h-6 text-indigo-600" /> Market Intelligence</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{marketData?.career}</p>
              </div>
              <button onClick={() => { setMarketData(null); setIsMarketLoading(false); }} className="hover:bg-slate-50 p-2 rounded-xl transition-colors"><X className="w-6 h-6 text-slate-400" /></button>
            </div>
            <div className="p-8 overflow-y-auto">
              {isMarketLoading ? <div className="flex flex-col items-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-6" /><p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Crunching the data...</p></div>
              : marketData && <div>
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center"><div className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-2">Region</div><div className="font-black text-slate-900">{marketData.location}</div></div>
                  <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 text-center"><div className="text-[9px] text-indigo-400 uppercase font-black tracking-widest mb-2">Avg Salary</div><div className="font-black text-indigo-600">{marketData.average_salary_range}</div></div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center"><div className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-2">Demand</div><div className="font-black text-slate-900">{marketData.demand_trend}</div></div>
                </div>
                <h3 className="font-black text-slate-900 text-sm mb-4 tracking-tight">Active Openings: <span className="text-indigo-600">{marketData.active_openings}</span></h3>
                <div className="space-y-3">{(marketData.live_jobs || []).map((job, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-100 p-4 rounded-xl hover:border-indigo-100 transition-all flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 text-sm tracking-tight">{job.title}</div>
                      <div className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">{job.company} · {job.posted}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300" />
                  </div>
                ))}</div>
              </div>}
            </div>
          </div>
        </div>
      )}

      {/* AI Roadmap Modal */}
      {(isRoadmapLoading || roadmapData) && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-100">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-3 tracking-tight"><Brain className="w-6 h-6 text-indigo-600" /> AI Growth Roadmap</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{roadmapData?.career}</p>
              </div>
              <button onClick={() => { setRoadmapData(null); setIsRoadmapLoading(false); }} className="hover:bg-slate-50 p-2 rounded-xl transition-colors"><X className="w-6 h-6 text-slate-400" /></button>
            </div>
            <div className="p-8 overflow-y-auto">
              {isRoadmapLoading ? <div className="flex flex-col items-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-6" /><p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Building your path...</p></div>
              : roadmapData?.content && (
                <div className="text-slate-700 leading-relaxed roadmap-content font-medium">
                  {roadmapData.content.split('\n').map((line, i) => {
                    if (line.startsWith('### ')) return <h4 key={i} className="text-base font-black text-slate-900 mt-6 mb-3 uppercase tracking-wider">{line.replace('### ','')}</h4>;
                    if (line.startsWith('## ')) return <h3 key={i} className="text-xl font-black text-indigo-600 mt-8 mb-4 border-b border-slate-50 pb-2 tracking-tight">{line.replace('## ','')}</h3>;
                    if (line.startsWith('# ')) return <h2 key={i} className="text-2xl font-black text-slate-900 mt-2 mb-4 tracking-tight underline decoration-indigo-200 underline-offset-8">{line.replace('# ','')}</h2>;
                    if (line.startsWith('- **') || line.startsWith('* **')) { const p = line.split('**'); return <li key={i} className="ml-5 mb-3 list-none flex gap-3"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0 mt-2.5" /><span><strong className="text-slate-900 font-black">{p[1]}</strong>{p.slice(2).join('**')}</span></li>; }
                    if (line.startsWith('- ') || line.startsWith('* ')) return <li key={i} className="ml-5 mb-3 list-none flex gap-3"><div className="w-1.5 h-1.5 bg-slate-300 rounded-full shrink-0 mt-2.5" /><span>{line.substring(2)}</span></li>;
                    if (!line.trim()) return <br key={i} />;
                    return <p key={i} className="mb-4">{line.split('**').map((p,pi) => pi%2===1 ? <strong key={pi} className="text-slate-900 font-bold">{p}</strong> : p)}</p>;
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
  const [, setError] = useState(null);

  const submitEssay = async () => {
    if (!essayText.trim()) return;
    setIsAnalyzing(true); setMbtiResult(null); setError(null);
    try {
      const res = await fetch(`${API_URL}/analyze-essay`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ essay: essayText }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setNlpResults(data);
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

  if (isAnalyzing) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-700">
        <div className="relative">
          <div className="w-24 h-24 border-[6px] border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
          <Brain className="w-10 h-10 text-indigo-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">AI counts your neurons...</h2>
          <p className="text-slate-500 font-medium font-inter">Deciphering your unique career fingerprint.</p>
        </div>
      </div>
    );
  }

  if (nlpResults) {
    return (
      <div className="p-8 lg:p-12 animate-in fade-in duration-700 max-w-6xl mx-auto">
        <button onClick={() => setNlpResults(null)} className="mb-8 flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-black uppercase tracking-widest text-[10px] transition-colors">
          <ArrowRight className="w-4 h-4 rotate-180" /> Back to Profiler
        </button>

        {mbtiResult && (
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-10 rounded-[3rem] shadow-2xl flex flex-col md:flex-row items-center gap-10 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="text-8xl md:text-9xl drop-shadow-2xl animate-bounce duration-[3000ms]">{mbtiResult.emoji}</div>
            <div className="relative z-10 flex-1">
              <div className="text-xs font-black text-indigo-200 uppercase tracking-[0.3em] mb-3">Your MBTI Type</div>
              <div className="text-6xl font-black mb-2 tracking-tighter">{mbtiResult.mbti}</div>
              <div className="text-2xl font-bold mb-4 opacity-90">{mbtiResult.name}</div>
              <p className="text-indigo-50 text-lg leading-relaxed font-medium opacity-80">{mbtiResult.description}</p>
            </div>
          </div>
        )}

        <div className="bg-white p-10 lg:p-12 rounded-[3rem] border border-slate-200 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.03)] mb-12">
          <h2 className="text-xl font-black text-slate-900 mb-10 pb-4 border-b border-slate-100 flex items-center gap-3 tracking-tight">
            <Sparkles className="w-5 h-5 text-indigo-600" /> Human Personality Insights
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">Deep Interests</h3>
              <div className="space-y-6">
                {Object.entries(nlpResults.top_interests || {}).map(([interest, score]) => (
                  <div key={interest} className="group">
                    <div className="flex justify-between text-xs mb-3 font-black uppercase tracking-wider">
                      <span className="text-slate-500 group-hover:text-slate-900 transition-colors">{interest}</span>
                      <span className="text-indigo-600">{Math.round(score * 100)}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden shadow-inner">
                      <div className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full transition-all duration-1000 group-hover:shadow-[0_0_10px_rgba(79,70,229,0.2)]" 
                           style={{width: `${Math.round(score * 100)}%`}} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">Core Psychological Traits</h3>
              <div className="flex flex-wrap gap-2 text-slate-900">
                {Object.entries(nlpResults.personality_traits || {}).map(([trait, score]) => (
                  <div key={trait} className="bg-slate-50 border border-slate-100 text-slate-900 px-4 py-2.5 rounded-xl text-xs capitalize font-black hover:border-indigo-200 transition-all cursor-default flex items-center gap-3">
                    {trait.replace('_', ' ')} <span className="text-indigo-600 opacity-40">{Math.round(score * 100)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-black text-slate-900 mb-8 tracking-tight flex items-center gap-3">
          <Briefcase className="w-5 h-5 text-indigo-600" /> Tailored Professional Paths
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nlpResults.career_recommendations?.map((rec, i) => (
            <div key={i} className="bg-white border border-slate-200 px-8 py-6 rounded-[2rem] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.02)] hover:border-indigo-200 transition-all">
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-3 block">Recommendation {i+1}</span>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">{rec}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-none mb-4">Personality <span className="text-indigo-600">Mirror</span></h1>
        <p className="text-lg text-slate-500 font-medium">Write about your interests and how you approach challenges. Our AI will reveal your professional archetype.</p>
      </div>

      <div className="bg-white p-2 rounded-[2.5rem] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden">
        <textarea 
          className="w-full h-80 p-10 bg-transparent outline-none resize-none mb-4 text-slate-900 text-xl font-black placeholder:text-slate-200 font-inter leading-relaxed" 
          placeholder="I've always loved solving complex puzzles and building things that last. I find joy in logic, but also in the creative spark of a new idea..." 
          value={essayText} onChange={e => setEssayText(e.target.value)} 
        />
        <div className="p-8 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${essayText.length > 50 ? 'bg-emerald-500 animate-pulse' : 'bg-slate-200'}`} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              {essayText.length} Characters {essayText.length < 50 && ' (Write a bit more)'}
            </span>
          </div>
          <button onClick={submitEssay} disabled={isAnalyzing || !essayText.trim()} 
            className="w-full sm:w-auto bg-slate-900 text-white px-12 py-5 rounded-2xl hover:bg-indigo-600 transition-all font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 disabled:bg-slate-100 disabled:text-slate-300 shadow-xl shadow-slate-200 active:scale-95 transition-all">
            {isAnalyzing ? <><Loader className="animate-spin w-5 h-5" /> Decoding...</> : <><Sparkles className="w-5 h-5" /> Analyze Personality</>}
          </button>
        </div>
      </div>
    </div>
  );
};

const CareerComparePage = ({ compareList, setCompareList, careerDatabase }) => {
  const navigate = useNavigate();
  const allCareers = Object.values(careerDatabase || {}).flat();
  const [search, setSearch] = useState('');
  const filtered = allCareers.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  const skillsFor = (career) => (career.skills || []).slice(0, 4);
  const growthColor = g => g === 'High' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : g === 'Stable' ? 'text-indigo-600 bg-indigo-50 border-indigo-100' : 'text-amber-600 bg-amber-50 border-amber-100';

  return (
    <div className="p-8 lg:p-12 animate-in fade-in duration-700 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-none mb-4">Comparison <span className="text-indigo-600 underline underline-offset-8 decoration-indigo-100 italic">Deck</span></h1>
        <p className="text-lg text-slate-500 font-medium">Select up to 3 careers to compare side-by-side. Use the Career Explorer to add more.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.03)] border border-slate-100 p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative flex-1">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Add to Deck ({compareList.length}/3)</h3>
            <div className="relative">
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search a career to add..." className="w-full bg-slate-50 border-2 border-slate-100 px-6 py-4 rounded-2xl text-sm focus:border-indigo-500 outline-none text-slate-900 font-bold transition-all" />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-300">
                <Plus className="w-4 h-4" />
              </div>
            </div>
            {search && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-slate-200 rounded-2xl shadow-2xl z-20 overflow-hidden animate-in slide-in-from-top-2 duration-300">
                {filtered.length > 0 ? filtered.slice(0, 10).map((c, i) => (
                  <button key={i} onClick={() => { if (compareList.length < 3 && !compareList.find(x => x.title === c.title)) { setCompareList([...compareList, c]); setSearch(''); } }} className="w-full text-left px-6 py-4 hover:bg-slate-50 flex items-center justify-between group">
                    <span className="font-bold text-slate-700 group-hover:text-indigo-600 transition-colors uppercase italic text-xs tracking-wider">{c.title}</span>
                    <Plus className="w-4 h-4 text-slate-300 group-hover:text-indigo-600" />
                  </button>
                )) : <div className="p-6 text-slate-400 text-xs font-bold uppercase tracking-widest text-center">No careers found</div>}
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-3 pt-6 md:pt-0">
            {compareList.map((c, i) => (
              <span key={i} className="bg-indigo-50 text-indigo-700 pl-5 pr-3 py-3 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-3 border border-indigo-100 shadow-sm">
                {c.title}
                <button onClick={() => setCompareList(compareList.filter(x => x.title !== c.title))} className="bg-indigo-200/50 hover:bg-rose-500 hover:text-white p-1 rounded-lg transition-all"><X className="w-3.5 h-3.5" /></button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {compareList.length === 0 ? (
        <div className="bg-white rounded-[3rem] border border-slate-100 py-32 text-center shadow-[0_30px_70px_-20px_rgba(0,0,0,0.03)]">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <Scale className="w-10 h-10 text-slate-200" />
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">Your deck is empty</p>
          <p className="text-slate-400 mt-2 font-medium">Head back to the Explorer and pick some professions to compare.</p>
          <button onClick={() => navigate('/explorer')} className="mt-10 bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">Go to Explorer</button>
        </div>
      ) : (
        <div className="grid gap-8" style={{gridTemplateColumns: `repeat(${compareList.length}, minmax(0, 1fr))`}}>
          {compareList.map((career, i) => (
            <div key={i} className="bg-white rounded-[3rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-500" style={{animationDelay: `${i * 100}ms`}}>
              <div className="bg-slate-900 p-8 text-white relative">
                <div className="flex justify-between items-start mb-10">
                  <div className="bg-indigo-500/20 text-indigo-400 text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-full border border-indigo-500/20">{career.category}</div>
                  <button onClick={() => setCompareList(compareList.filter(c => c.title !== career.title))} className="text-white/20 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
                </div>
                <h3 className="text-3xl font-black tracking-tighter uppercase italic leading-none">{career.title}</h3>
              </div>
              <div className="p-8 lg:p-10 space-y-10 flex-1">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] mb-4">Compensation</div>
                  <div className="text-2xl font-black text-slate-900 tracking-tight">{career.salary || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] mb-4">Economic Pulse</div>
                  <span className={`text-[10px] font-black px-5 py-2.5 rounded-full border shadow-sm ${growthColor(career.growth)}`}>{career.growth || 'N/A'}</span>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] mb-5">Primary Skillsets</div>
                  <div className="flex flex-wrap gap-2">
                    {skillsFor(career).map((s, si) => <span key={si} className="bg-slate-50 text-slate-600 border border-slate-100 text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-xl">{s}</span>)}
                  </div>
                </div>
                <div className="pt-8 border-t border-slate-50">
                  <div className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] mb-4">The Verdict</div>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{career.description}</p>
                </div>
              </div>
              <div className="p-8 border-t border-slate-50">
                <button onClick={() => navigate('/roadmap')} className="w-full bg-slate-50 hover:bg-indigo-600 hover:text-white text-slate-900 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-[0.98]">Select for Roadmap</button>
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
      if (statsRes.ok) setAdminStats(await statsRes.json());
      if (usersRes.ok) setAdminUsers(await usersRes.json());
      if (logsRes.ok) setAdminLogs(await logsRes.json());
    } catch (e) { 
      console.error("Admin data fetch failed", e); 
    }
  };

  useEffect(() => {
    if (adminToken) fetchAdminData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminToken]);

  if (!adminToken) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[80vh]">
        <form onSubmit={handleLogin} className="bg-white p-12 rounded-[3rem] shadow-[0_30_70px_-20px_rgba(0,0,0,0.05)] border border-slate-100 max-w-md w-full animate-in slide-in-from-bottom-8 duration-700">
          <div className="flex justify-center mb-10">
            <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center">
              <Shield className="w-10 h-10 text-indigo-600" />
            </div>
          </div>
          <h2 className="text-3xl font-black text-center mb-2 text-slate-900 tracking-tight">Secured Entry</h2>
          <p className="text-slate-400 text-center mb-10 font-bold uppercase tracking-[0.2em] text-[10px]">Restricted Admin Terminal</p>
          <div className="space-y-4 mb-10">
            <input className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl outline-none focus:border-indigo-500 text-slate-900 font-bold transition-all" placeholder="Username" value={loginUser} onChange={e => setLoginUser(e.target.value)} />
            <input className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl outline-none focus:border-indigo-500 text-slate-900 font-bold transition-all" type="password" placeholder="Password" value={loginPass} onChange={e => setLoginPass(e.target.value)} />
          </div>
          <button type="submit" className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-indigo-600 shadow-xl shadow-slate-100 transition-all active:scale-95 uppercase tracking-widest text-[11px]">Access System</button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12 animate-in fade-in duration-700 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-none mb-3">System <span className="text-indigo-600 underline underline-offset-8 decoration-indigo-100">Control</span></h1>
          <p className="text-lg text-slate-500 font-medium">Monitoring platform health and user trajectory.</p>
        </div>
        <button onClick={() => { setAdminToken(null); localStorage.removeItem('adminToken'); }} className="text-rose-500 font-black uppercase tracking-widest text-[10px] bg-white border-2 border-slate-100 px-6 py-4 rounded-2xl hover:bg-rose-50 hover:border-rose-100 transition-all shadow-sm">Logout Admin</button>
      </div>

      {adminStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-8 rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.03)] border border-slate-100">
            <div className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-3">Total Users</div>
            <div className="text-4xl font-black text-slate-900 tracking-tighter tabular-nums">{adminStats.total_users}</div>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.03)] border border-slate-100">
            <div className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-3">Tests Done</div>
            <div className="text-4xl font-black text-indigo-600 tracking-tighter tabular-nums">{adminStats.total_tests}</div>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.03)] border border-slate-100">
            <div className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-3">System Load</div>
            <div className="text-4xl font-black text-emerald-500 tracking-tighter tabular-nums">Normal</div>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.03)] border border-slate-100">
            <div className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-3">Avg Aptitude</div>
            <div className="text-4xl font-black text-slate-900 tracking-tighter tabular-nums">{adminStats.avg_scores?.General || 0}%</div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.03)] border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <h2 className="font-black text-slate-900 uppercase tracking-widest text-xs">Recent User Logs</h2>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-400 uppercase text-[9px] font-black tracking-widest">
                <tr><th className="px-8 py-4">Descriptor</th><th className="px-8 py-4">Identity</th><th className="px-8 py-4">Onboarding</th></tr>
              </thead>
              <tbody>
                {adminUsers.map(u => (
                  <tr key={u.user_id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6 font-black text-slate-900 text-xs italic">#{u.user_id}</td>
                    <td className="px-8 py-6">
                      <div className="font-black text-slate-900 text-sm tracking-tight">{u.username}</div>
                      <div className="text-[10px] text-slate-400 font-bold">{u.email}</div>
                    </td>
                    <td className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">{new Date(u.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.03)] border border-slate-100 overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-50"><h2 className="font-black text-slate-900 uppercase tracking-widest text-xs">Activity Pulse</h2></div>
          <div className="p-8 space-y-8 flex-1 overflow-y-auto max-h-[600px]">
            {adminLogs.map(log => (
              <div key={log.log_id} className="flex gap-4 group">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 group-hover:border-indigo-100 group-hover:bg-indigo-50 transition-all">
                  <Activity className="w-4 h-4 text-slate-300 group-hover:text-indigo-600" />
                </div>
                <div>
                  <div className="font-black text-slate-900 text-xs uppercase tracking-tight mb-1">{log.action.replace(/_/g, ' ')}</div>
                  <div className="text-[11px] text-slate-500 font-medium leading-relaxed mb-2">{log.details}</div>
                  <div className="text-[9px] text-slate-300 font-black uppercase tracking-widest">{new Date(log.timestamp).toLocaleTimeString()}</div>
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
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  }); // Google OAuth user profile (set after login)
  
  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
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

  // Adaptive Test State
  const [aptitudeQuestions, setAptitudeQuestions] = useState([]);
  const [testHistory, setTestHistory] = useState([]); // Array of {correct: bool, difficulty: str}
  const [isTestLoading, setIsTestLoading] = useState(false);
  
  // User Profile State for Aptitude Test
  const [userAge, setUserAge] = useState('');
  const [userEducation, setUserEducation] = useState('');
  const [userProfileSet, setUserProfileSet] = useState(false);

  // Admin State
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || null);
  const [adminStats, setAdminStats] = useState(null);
  const [adminUsers, setAdminUsers] = useState([]);
  const [adminLogs, setAdminLogs] = useState([]);

  // State for data fetched from backend
  const [careerDatabase, setCareerDatabase] = useState({});
  const [isLoading, setIsLoading] = useState(true);


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

  // Fetch initial career data on component mount
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await fetch(`${API_URL}/careers`);
        const data = await res.json();
        setCareerDatabase(data);
      } catch (e) {
        console.error("Failed to fetch careers:", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCareers();
  }, []);

  const handleFinishTest = useCallback(async (finalQuestions = aptitudeQuestions) => {
    const formattedAnswers = aptitudeQuestions.map((q, idx) => ({
      question_id: q.question_id,
      user_answer: answers[idx]
    }));

    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/aptitude-test/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          answers: formattedAnswers, 
          user_id: user?.id || 1,
          age: userAge,
          education: userEducation
        })
      });
      const data = await response.json();
      setTestResults(data);
      setShowResults(true);
      setIsLoading(false); // Show the results screen immediately

      // Then get AI-powered personalized recommendations in the background
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
    } finally {
      setIsLoading(false);
    }
  }, [aptitudeQuestions, answers, user, userAge, userEducation, userLocation, setIsLoading, setTestResults, setShowResults]);

  // Function to start or fetch next adaptive question
  const fetchNextQuestion = useCallback(async (updatedHistory = testHistory, currentQuestions = aptitudeQuestions) => {
    try {
      setIsTestLoading(true);
      const res = await fetch(`${API_URL}/aptitude-test/next-question`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answered_ids: currentQuestions.map(q => q.question_id),
          history: updatedHistory,
          education: userEducation || 'School'
        })
      });
      const nextQ = await res.json();
      
      if (nextQ.done) {
        handleFinishTest(currentQuestions, updatedHistory);
      } else {
        setAptitudeQuestions([...currentQuestions, nextQ]);
        if (currentQuestions.length > 0) {
          setCurrentQuestion(currentQuestions.length);
        }
      }
    } catch (e) {
      console.error("Failed to fetch adaptive question:", e);
    } finally {
      setIsTestLoading(false);
    }
  }, [testHistory, aptitudeQuestions, userEducation, handleFinishTest, setIsTestLoading, setAptitudeQuestions, setCurrentQuestion]);

  // Trigger first question when profile is set
  useEffect(() => {
    if (userProfileSet && aptitudeQuestions.length === 0) {
      fetchNextQuestion([], []);
    }
  }, [userProfileSet, aptitudeQuestions.length, fetchNextQuestion]);

  const handleAnswer = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex
    });
  };

  const handleNextQuestion = () => {
    const currentQ = aptitudeQuestions[currentQuestion];
    const isCorrect = answers[currentQuestion] === currentQ.correct_answer;
    
    const newHistoryEntry = {
      correct: isCorrect,
      difficulty: currentQ.difficulty
    };
    
    const updatedHistory = [...testHistory, newHistoryEntry];
    setTestHistory(updatedHistory);
    
    // Fetch next adaptive question
    fetchNextQuestion(updatedHistory, aptitudeQuestions);
  };


  const handleAuthSuccess = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthModalOpen(false);
  }, []);

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setTestResults(null);
    setUserProfileSet(false);
    setUserAge('');
    setUserEducation('');
  };

  // --- GOOGLE OAUTH CALLBACK HANDLER ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authStatus = params.get('auth');
    
    if (authStatus) {
      console.log("Auth callback detected. Status:", authStatus);
      
      if (authStatus === 'success') {
        const newUser = {
          name: params.get('name'),
          email: params.get('email'),
          picture: params.get('picture'),
        };
        console.log("Setting user from Google Auth:", newUser);
        handleAuthSuccess(newUser);
        
        // Clean the URL (remove query params)
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      } else if (authStatus === 'error') {
        console.error("Google Authentication failed reported by backend.");
        alert("Authentication failed. Please try again or use email login.");
      }
    }
  }, [handleAuthSuccess]);

  // --- LOGOUT HANDLER ---
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = `${API_URL}/auth/logout`;
  };


  const locationInstance = useLocation();
  const isHome = locationInstance.pathname === '/';

  return (
    <div className={`flex min-h-screen transition-colors duration-500 overflow-x-hidden ${isHome ? 'bg-white text-slate-900' : 'bg-[#f8fafc] text-slate-900'}`}>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} resetTest={resetTest} user={user} handleLogout={handleLogout} />
      <div className="flex-1 lg:pl-64 w-full">
        {!isHome && (
          <div className="flex items-center justify-between h-20 px-8 bg-white border-b border-slate-200">
            <div className="flex items-center gap-4 lg:hidden">
              <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 text-slate-500"><Menu className="w-6 h-6" /></button>
            </div>
            <div className="hidden lg:block">
              {/* Optional Breadcrumb or Page Title can go here if needed */}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-2xl border border-slate-200 shadow-sm">
                <MapPin className="w-4 h-4 text-indigo-600" />
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Region:</span>
                <select value={userLocation} onChange={(e) => setUserLocation(e.target.value)}
                  className="text-xs font-black text-slate-900 bg-transparent outline-none cursor-pointer">
                  <option value="USA">United States</option>
                  <option value="India">India</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="lg:hidden flex items-center justify-between h-20 px-6 bg-white border-b border-gray-100 shadow-sm" 
             style={{ display: isHome ? 'flex' : 'none' }}>
          <button onClick={() => setSidebarOpen(true)} className="text-gray-500 hover:text-gray-900 transition-colors"><Menu className="w-7 h-7" /></button>
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-indigo-600" />
            <h1 className="text-xl font-black text-gray-900 tracking-tighter">CareerAI</h1>
          </div>
          <div className="w-7"></div>
        </div>

        <Routes>
          <Route path="/" element={<Dashboard resetTest={resetTest} userLocation={userLocation} setUserLocation={setUserLocation} user={user} onOpenAuth={() => { setAuthMode('login'); setIsAuthModalOpen(true); }} />} />
          
          {/* Protected Routes */}
          <Route path="/test" element={user ? (
            <AptitudeTest isLoading={isLoading} isTestLoading={isTestLoading} aptitudeQuestions={aptitudeQuestions} showResults={showResults}
              testResults={testResults} currentQuestion={currentQuestion} handleAnswer={handleAnswer}
              answers={answers} handleNextQuestion={handleNextQuestion} handleFinishTest={handleFinishTest}
              resetTest={resetTest} userAge={userAge} setUserAge={setUserAge} userEducation={userEducation}
              setUserEducation={setUserEducation} userProfileSet={userProfileSet} setUserProfileSet={setUserProfileSet} />
          ) : <PleaseRegister onOpenAuth={() => { setAuthMode('login'); setIsAuthModalOpen(true); }} />} />

          <Route path="/essay" element={user ? (
            <NlpEssayScreen essayText={essayText} setEssayText={setEssayText} isAnalyzing={isAnalyzing}
              setIsAnalyzing={setIsAnalyzing} nlpResults={nlpResults} setNlpResults={setNlpResults} />
          ) : <PleaseRegister onOpenAuth={() => { setAuthMode('login'); setIsAuthModalOpen(true); }} />} />

          <Route path="/careers" element={user ? (
            <CareerExplorer isLoading={isLoading} careerDatabase={careerDatabase} userLocation={userLocation}
              compareList={compareList} setCompareList={setCompareList} />
          ) : <PleaseRegister onOpenAuth={() => { setAuthMode('login'); setIsAuthModalOpen(true); }} />} />

          <Route path="/compare" element={user ? (
            <CareerComparePage compareList={compareList} setCompareList={setCompareList} careerDatabase={careerDatabase} />
          ) : <PleaseRegister onOpenAuth={() => { setAuthMode('login'); setIsAuthModalOpen(true); }} />} />

          <Route path="/roadmap" element={user ? (
            <RoadmapPage userAge={userAge} userLocation={userLocation} userEducation={userEducation} />
          ) : <PleaseRegister onOpenAuth={() => { setAuthMode('login'); setIsAuthModalOpen(true); }} />} />

          <Route path="/admin" element={
            <AdminPanel adminToken={adminToken} setAdminToken={setAdminToken} adminStats={adminStats}
              setAdminStats={setAdminStats} adminUsers={adminUsers} setAdminUsers={setAdminUsers}
              adminLogs={adminLogs} setAdminLogs={setAdminLogs} />
          } />
          
          <Route path="*" element={<Dashboard resetTest={resetTest} userLocation={userLocation} setUserLocation={setUserLocation} user={user} onOpenAuth={() => { setAuthMode('login'); setIsAuthModalOpen(true); }} />} />
        </Routes>
      </div>

      <AuthOverlay 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        mode={authMode} 
        setMode={setAuthMode}
        onAuthSuccess={handleAuthSuccess}
      />


      {/* Floating AI Coach Chat Widget */}
      <div className="fixed bottom-8 right-8 z-[100]">
        {!isChatOpen ? (
          <button 
            onClick={() => setIsChatOpen(true)}
            className="w-16 h-16 bg-gradient-to-br from-[#a78bfa] to-[#6366f1] rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-indigo-500/40 hover:scale-110 active:scale-95 transition-all group"
          >
            <MessageSquare className="w-8 h-8 group-hover:rotate-12 transition-transform" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#2dd4bf] rounded-full border-2 border-[#030617]"></div>
          </button>
        ) : (
          <div className="w-[420px] h-[640px] bg-white border border-slate-200 rounded-[2.5rem] shadow-[0_25px_100px_-20px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
            {/* Header */}
            <div className="p-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-black text-sm uppercase tracking-widest leading-none mb-1">Career Coach</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">AI Thinking</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-slate-500 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-xl">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-slate-50">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`max-w-[85%] rounded-[1.5rem] p-4 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white font-bold rounded-tr-none shadow-xl shadow-indigo-100' 
                      : 'bg-white text-slate-900 border border-slate-100 rounded-tl-none shadow-sm font-medium'
                  }`}>
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
                  <div className="bg-white text-slate-900 border border-slate-100 px-6 py-4 rounded-[1.5rem] rounded-tl-none shadow-sm">
                    <div className="flex gap-1.5">
                      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce delay-100"></div>
                      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            
            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-6 bg-white border-t border-slate-100">
              <div className="relative flex items-center group">
                <input
                  type="text"
                  placeholder="Ask for career advice..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none placeholder:text-slate-400 transition-all group-hover:bg-slate-100/50"
                  value={currentChatInput}
                  onChange={(e) => setCurrentChatInput(e.target.value)}
                  disabled={isChatLoading}
                />
                <button 
                  type="submit" 
                  disabled={!currentChatInput.trim() || isChatLoading}
                  className="absolute right-2 p-2.5 bg-indigo-600 text-white rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-100 disabled:opacity-20"
                >
                  <Send className="w-5 h-5 ml-0.5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerCounselingSystem;