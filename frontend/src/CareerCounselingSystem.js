import React, { useState, useEffect } from "react";
import { User, Brain, BookOpen, TrendingUp, Award, ChevronRight, Home, TestTube, Users, Menu, X, Shield, Activity, ThumbsUp, ThumbsDown, Edit3, MapPin, MessageSquare, Send } from "lucide-react";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";

const Sidebar = ({ sidebarOpen, setSidebarOpen, currentPage, setCurrentPage, resetTest }) => (
  <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-900 to-purple-900 text-white transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
    <div className="flex items-center justify-between h-16 px-6 border-b border-blue-800">
      <h1 className="text-xl font-bold flex items-center"><Brain className="w-6 h-6 mr-2" /> CareerAI</h1>
      <button onClick={() => setSidebarOpen(false)} className="lg:hidden"><X className="w-6 h-6" /></button>
    </div>
    <nav className="mt-8 px-4 space-y-2">
      <button onClick={() => { setCurrentPage('dashboard'); setSidebarOpen(false); }} className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${currentPage === 'dashboard' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}><Home className="w-5 h-5 mr-3" /> Dashboard</button>
      <button onClick={() => { setCurrentPage('aptitude'); setSidebarOpen(false); resetTest(); }} className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${currentPage === 'aptitude' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}><TestTube className="w-5 h-5 mr-3" /> Aptitude Test</button>
      <button onClick={() => { setCurrentPage('essay'); setSidebarOpen(false); }} className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${currentPage === 'essay' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}><Edit3 className="w-5 h-5 mr-3" /> Personality Essay</button>
      <button onClick={() => { setCurrentPage('careers'); setSidebarOpen(false); }} className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${currentPage === 'careers' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}><Users className="w-5 h-5 mr-3" /> Career Explorer</button>
      <div className="pt-8 mt-8 border-t border-blue-800">
        <button onClick={() => { setCurrentPage('admin'); setSidebarOpen(false); }} className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${currentPage === 'admin' ? 'bg-purple-700' : 'hover:bg-purple-800'}`}><Shield className="w-5 h-5 mr-3" /> Admin Panel</button>
      </div>
    </nav>
  </div>
);

const Dashboard = ({ setCurrentPage, resetTest }) => (
  <div className="p-6">
    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to CareerAI</h1>
    <p className="text-gray-600">Your intelligent companion for smart career decisions</p>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg"><Brain className="w-8 h-8 mb-4" /><h3 className="text-xl font-semibold mb-2">AI-Powered</h3><p className="text-blue-100">Accurate career recommendations</p></div>
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg"><Award className="w-8 h-8 mb-4" /><h3 className="text-xl font-semibold mb-2">Comprehensive Tests</h3><p className="text-green-100">Detailed aptitude assessments</p></div>
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg"><BookOpen className="w-8 h-8 mb-4" /><h3 className="text-xl font-semibold mb-2">Career Database</h3><p className="text-purple-100">Extensive career path information</p></div>
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg"><TrendingUp className="w-8 h-8 mb-4" /><h3 className="text-xl font-semibold mb-2">Market Insights</h3><p className="text-orange-100">Real-time job market trends</p></div>
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition-shadow"><h2 className="text-2xl font-bold text-gray-900 mb-4">Get Started</h2><p className="text-gray-600 mb-6">Take our comprehensive aptitude test to discover your ideal career path.</p><button onClick={() => { setCurrentPage('aptitude'); resetTest(); }} className="bg-blue-600 w-full text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">Start Aptitude Test <ChevronRight className="w-5 h-5 ml-2" /></button></div>
      <div className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition-shadow"><h2 className="text-2xl font-bold text-gray-900 mb-4">Analyze Personality</h2><p className="text-gray-600 mb-6">Write a short statement about what you love doing to get NLP insights.</p><button onClick={() => setCurrentPage('essay')} className="bg-purple-600 w-full text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">Analyze Essay <ChevronRight className="w-5 h-5 ml-2" /></button></div>
      <div className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition-shadow"><h2 className="text-2xl font-bold text-gray-900 mb-4">Explore Careers</h2><p className="text-gray-600 mb-6">Browse our extensive database of career options with detailed paths.</p><button onClick={() => setCurrentPage('careers')} className="bg-green-600 w-full text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">Browse Careers <ChevronRight className="w-5 h-5 ml-2" /></button></div>
    </div>
  </div>
);

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

const CareerExplorer = ({ isLoading, careerDatabase, userLocation }) => {
  const [marketData, setMarketData] = useState(null);
  const [isMarketLoading, setIsMarketLoading] = useState(false);
  const [roadmapData, setRoadmapData] = useState(null);
  const [isRoadmapLoading, setIsRoadmapLoading] = useState(false);

  const viewMarketInsights = async (careerTitle) => {
    setIsMarketLoading(true);
    setMarketData(null);
    try {
      const res = await fetch(`${API_URL}/market-insights?career=${encodeURIComponent(careerTitle)}&location=${encodeURIComponent(userLocation)}`);
      const data = await res.json();
      setMarketData(data);
    } catch (e) {
      console.error(e);
    }
    setIsMarketLoading(false);
  };

  const generateAIRoadmap = async (careerTitle) => {
    setIsRoadmapLoading(true);
    setRoadmapData({ career: careerTitle, content: null });
    try {
      const res = await fetch(`${API_URL}/generate-roadmap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ career: careerTitle, location: userLocation })
      });
      const data = await res.json();
      setRoadmapData({ career: careerTitle, content: data.roadmap });
    } catch (e) {
      console.error(e);
      setRoadmapData({ career: careerTitle, content: "Error generating roadmap. Please try again later." });
    }
    setIsRoadmapLoading(false);
  };

  return (
    <div className="p-6 relative">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Career Explorer</h1>
      {isLoading ? <p>Loading careers...</p> : Object.entries(careerDatabase || {}).map(([category, careers]) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 capitalize">{category}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(careers) && careers.map((career, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition-shadow relative overflow-hidden group flex flex-col">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-gray-400 hover:text-green-500 mx-1 transition-colors" title="Upvote"><ThumbsUp className="w-5 h-5" /></button>
                  <button className="text-gray-400 hover:text-red-500 mx-1 transition-colors" title="Downvote"><ThumbsDown className="w-5 h-5" /></button>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 pr-12">{career.title}</h3>
                <p className="text-gray-600 mb-4 text-sm flex-1">{career.description}</p>
                <div className="space-y-2 text-sm">
                  <div><span className="font-semibold">Salary:</span> {career.salary || 'N/A'}</div>
                  <div><span className="font-semibold">Growth:</span> {career.growth || 'N/A'}</div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {(career.skills || []).slice(0, 4).map((skill, skillIndex) => (
                      <span key={skillIndex} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{skill}</span>
                    ))}
                  </div>
                  {career.regional_education && career.regional_education[userLocation] && (
                    <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-100">
                      <div className="text-xs font-bold text-purple-800 mb-1 flex items-center"><MapPin className="w-3 h-3 mr-1" /> Education Path ({userLocation})</div>
                      <div className="text-sm text-purple-900">{career.regional_education[userLocation]}</div>
                    </div>
                  )}
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => viewMarketInsights(career.title)} className="flex-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 mr-1" /> Market Data
                    </button>
                    <button onClick={() => generateAIRoadmap(career.title)} className="flex-1 bg-purple-50 text-purple-700 hover:bg-purple-100 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center">
                      <Brain className="w-4 h-4 mr-1" /> AI Roadmap
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Market Data Modal */}
      {(isMarketLoading || marketData) && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b flex justify-between items-center bg-indigo-600 text-white">
              <h2 className="text-xl font-bold flex items-center"><TrendingUp className="w-6 h-6 mr-2" /> Market Insights: {marketData ? marketData.career : 'Loading...'}</h2>
              <button onClick={() => { setMarketData(null); setIsMarketLoading(false); }} className="hover:bg-indigo-700 p-1 rounded-lg transition-colors"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-6 overflow-y-auto">
              {isMarketLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600 mb-4"></div>
                  <p className="text-indigo-600 font-medium">Scanning live jobs in {userLocation}...</p>
                </div>
              ) : marketData && (
                <div>
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 text-center">
                      <div className="text-xs text-indigo-500 uppercase font-bold tracking-wider mb-1">Region</div>
                      <div className="font-semibold text-indigo-900 text-lg">{marketData.location}</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center">
                      <div className="text-xs text-green-600 uppercase font-bold tracking-wider mb-1">Avg Salary</div>
                      <div className="font-semibold text-green-700 text-lg">{marketData.average_salary_range}</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
                      <div className="text-xs text-blue-500 uppercase font-bold tracking-wider mb-1">Market Demand</div>
                      <div className="font-semibold text-blue-700 text-lg">{marketData.demand_trend}</div>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center"><Activity className="w-5 h-5 mr-2 text-indigo-500" /> Live Job Openings ({marketData.active_openings} total)</h3>
                  <div className="space-y-3">
                    {(marketData.live_jobs || []).map((job, idx) => (
                      <div key={idx} className="border border-gray-200 p-4 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group">
                        <div className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{job.title}</div>
                        <div className="text-sm text-gray-600 flex justify-between mt-2">
                          <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-gray-400" /> {job.company} • {job.location}</span>
                          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{job.posted}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* AI Roadmap Modal */}
      {(isRoadmapLoading || roadmapData) && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b flex justify-between items-center bg-purple-600 text-white">
              <h2 className="text-xl font-bold flex items-center"><Brain className="w-6 h-6 mr-2" /> AI Roadmap: {roadmapData ? roadmapData.career : 'Loading...'}</h2>
              <button onClick={() => { setRoadmapData(null); setIsRoadmapLoading(false); }} className="hover:bg-purple-700 p-1 rounded-lg transition-colors"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-6 overflow-y-auto w-full">
              {isRoadmapLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-600 mb-4"></div>
                  <p className="text-purple-600 font-medium">Gemini AI is generating your personalized 12-month roadmap...</p>
                </div>
              ) : roadmapData && roadmapData.content && (
                <div className="font-sans text-gray-800 leading-relaxed">
                  {roadmapData.content.split('\n').map((line, i) => {
                    if (line.startsWith('### ')) return <h4 key={i} className="text-lg font-bold text-gray-900 mt-4 mb-2">{line.replace('### ', '')}</h4>;
                    if (line.startsWith('## ')) return <h3 key={i} className="text-xl font-bold text-purple-800 mt-6 mb-3 border-b pb-1">{line.replace('## ', '')}</h3>;
                    if (line.startsWith('# ')) return <h2 key={i} className="text-2xl font-bold text-gray-900 mt-2 mb-4">{line.replace('# ', '')}</h2>;
                    if (line.startsWith('* **') || line.startsWith('- **')) {
                      const parts = line.split('**');
                      return <li key={i} className="ml-5 mb-2 list-disc"><strong>{parts[1]}</strong>{parts.slice(2).join('**')}</li>;
                    }
                    if (line.startsWith('* ') || line.startsWith('- ')) return <li key={i} className="ml-5 mb-1 list-disc">{line.substring(2)}</li>;
                    if (line.trim() === '') return <br key={i} />;
                    return <p key={i} className="mb-2">{line.split('**').map((part, index) => index % 2 === 1 ? <strong key={index}>{part}</strong> : part)}</p>;
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
  const submitEssay = async () => {
    if (!essayText.trim()) return;
    setIsAnalyzing(true);
    try {
      const res = await fetch(`${API_URL}/analyze-essay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ essay: essayText })
      });
      const data = await res.json();
      setNlpResults(data);
    } catch (e) {
      console.error("NLP Analysis failed:", e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Personality Profiler</h1>
      <p className="text-gray-600 mb-8">Write a short paragraph about your interests, hobbies, and how you approach challenges. Our NLP AI will analyze your personality traits to recommend suitable fields.</p>

      {!nlpResults ? (
        <div className="bg-white p-6 rounded-xl shadow border">
          <textarea
            className="w-full h-48 p-4 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none mb-4"
            placeholder="I really enjoy solving complex puzzles and building things from scratch. I work well in teams but also like independent research..."
            value={essayText}
            onChange={(e) => setEssayText(e.target.value)}
          ></textarea>
          <button
            onClick={submitEssay}
            disabled={isAnalyzing}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition w-full md:w-auto font-semibold shadow flex items-center justify-center disable:opacity-75"
          >
            {isAnalyzing ? "Analyzing..." : "Analyze My Personality"} <Brain className="ml-2 w-5 h-5" />
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow border">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Your Personality Insights</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center text-purple-700"><TrendingUp className="mr-2" /> Predicted Interests</h3>
                <ul className="space-y-2">
                  {Object.entries(nlpResults.top_interests || {}).map(([interest, score]) => (
                    <li key={interest} className="flex justify-between items-center bg-purple-50 p-2 rounded">
                      <span>{interest}</span>
                      <span className="font-bold text-purple-700">{Math.round(score * 100)}%</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center text-blue-700"><User className="mr-2" /> Key Traits Detected</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(nlpResults.personality_traits || {}).map(([trait, score]) => (
                    <div key={trait} className="bg-blue-100 border border-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm capitalize font-medium flex items-center shadow-sm">
                      {trait.replace('_', ' ')} <span className="ml-2 text-xs bg-white text-blue-600 rounded px-1">{Math.round(score * 100)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Recommended Career Fields</h2>
            <div className="flex flex-wrap gap-3">
              {nlpResults.career_recommendations?.map((rec, i) => (
                <span key={i} className="bg-white/20 px-4 py-2 rounded-lg font-medium backdrop-blur-sm">{rec}</span>
              ))}
            </div>
          </div>
          <button onClick={() => { setNlpResults(null); setEssayText(''); }} className="text-purple-600 font-semibold hover:underline">Write another essay</button>
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
  const [currentPage, setCurrentPage] = useState('dashboard');
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
    setChatMessages(newContext);
    setCurrentChatInput("");
    setIsChatLoading(true);

    try {
      const res = await fetch(`${API_URL}/chat-coach`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newContext })
      });
      const data = await res.json();
      if (data.reply) {
        setChatMessages([...newContext, { role: 'model', content: data.reply }]);
      } else {
        setChatMessages([...newContext, { role: 'model', content: "I'm having trouble connecting to my brain right now. Please try again later." }]);
      }
    } catch (e) {
      console.error(e);
      setChatMessages([...newContext, { role: 'model', content: "An error occurred while sending your message." }]);
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
    setCurrentPage('aptitude');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard setCurrentPage={setCurrentPage} resetTest={resetTest} />;
      case 'aptitude': return <AptitudeTest isLoading={isLoading} aptitudeQuestions={aptitudeQuestions} showResults={showResults} testResults={testResults} currentQuestion={currentQuestion} handleAnswer={handleAnswer} answers={answers} handleNextQuestion={handleNextQuestion} handleFinishTest={handleFinishTest} resetTest={resetTest} userAge={userAge} setUserAge={setUserAge} userEducation={userEducation} setUserEducation={setUserEducation} userProfileSet={userProfileSet} setUserProfileSet={setUserProfileSet} />;
      case 'essay': return <NlpEssayScreen essayText={essayText} setEssayText={setEssayText} isAnalyzing={isAnalyzing} setIsAnalyzing={setIsAnalyzing} nlpResults={nlpResults} setNlpResults={setNlpResults} />;
      case 'careers': return <CareerExplorer isLoading={isLoading} careerDatabase={careerDatabase} userLocation={userLocation} />;
      case 'admin': return <AdminPanel adminToken={adminToken} setAdminToken={setAdminToken} currentPage={currentPage} adminStats={adminStats} setAdminStats={setAdminStats} adminUsers={adminUsers} setAdminUsers={setAdminUsers} adminLogs={adminLogs} setAdminLogs={setAdminLogs} />;
      default: return <Dashboard setCurrentPage={setCurrentPage} resetTest={resetTest} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} currentPage={currentPage} setCurrentPage={setCurrentPage} resetTest={resetTest} />
      <div className="flex-1 lg:pl-64 w-full">
        <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-white border-b">
          <button onClick={() => setSidebarOpen(true)}><Menu className="w-6 h-6" /></button>
          <h1 className="text-xl font-bold text-gray-800">CareerAI</h1>
          <div className="w-6"></div>
        </div>
        <div className="bg-white border-b px-6 py-3 flex justify-end items-center shadow-sm sticky top-0 z-40">
          <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
            <MapPin className="w-4 h-4 text-indigo-500" />
            <span className="text-sm text-gray-600 font-medium">Region:</span>
            <select
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
              className="text-sm font-semibold text-indigo-700 bg-transparent outline-none cursor-pointer"
            >
              <option value="USA">United States</option>
              <option value="India">India</option>
              <option value="UK">United Kingdom</option>
            </select>
          </div>
        </div>
        {renderPage()}
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