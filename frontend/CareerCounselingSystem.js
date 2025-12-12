import React, { useState, useEffect } from 'react';
import { User, Brain, BookOpen, TrendingUp, Award, ChevronRight, Home, TestTube, Users, BarChart3, Menu, X } from 'lucide-react';

const API_URL = 'http://127.0.0.1:5000';

const CareerCounselingSystem = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [testResults, setTestResults] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // State for data fetched from backend
  const [aptitudeQuestions, setAptitudeQuestions] = useState([]);
  const [careerDatabase, setCareerDatabase] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
      const response = await fetch(`${API_URL}/aptitude-test/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: formattedAnswers, user_id: 1 }) // Hardcoding user_id for now
      });
      const data = await response.json();
      setTestResults(data);
      setShowResults(true);
    } catch (error) {
      console.error("Failed to submit test:", error);
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setTestResults(null);
    setCurrentPage('aptitude');
  };

  // --- COMPONENTS ---
  
  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-900 to-purple-900 text-white transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-between h-16 px-6 border-b border-blue-800">
        <h1 className="text-xl font-bold">CareerAI</h1>
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden"><X className="w-6 h-6" /></button>
      </div>
      <nav className="mt-8 px-4 space-y-2">
        <button onClick={() => { setCurrentPage('dashboard'); setSidebarOpen(false); }} className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${currentPage === 'dashboard' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}><Home className="w-5 h-5 mr-3" /> Dashboard</button>
        <button onClick={() => { setCurrentPage('aptitude'); setSidebarOpen(false); resetTest(); }} className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${currentPage === 'aptitude' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}><TestTube className="w-5 h-5 mr-3" /> Aptitude Test</button>
        <button onClick={() => { setCurrentPage('careers'); setSidebarOpen(false); }} className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${currentPage === 'careers' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}><Users className="w-5 h-5 mr-3" /> Career Explorer</button>
      </nav>
    </div>
  );

  const Dashboard = () => (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to CareerAI</h1>
      <p className="text-gray-600">Your intelligent companion for smart career decisions</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg"><Brain className="w-8 h-8 mb-4" /><h3 className="text-xl font-semibold mb-2">AI-Powered</h3><p className="text-blue-100">Accurate career recommendations</p></div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg"><Award className="w-8 h-8 mb-4" /><h3 className="text-xl font-semibold mb-2">Comprehensive Tests</h3><p className="text-green-100">Detailed aptitude assessments</p></div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg"><BookOpen className="w-8 h-8 mb-4" /><h3 className="text-xl font-semibold mb-2">Career Database</h3><p className="text-purple-100">Extensive career path information</p></div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg"><TrendingUp className="w-8 h-8 mb-4" /><h3 className="text-xl font-semibold mb-2">Market Insights</h3><p className="text-orange-100">Real-time job market trends</p></div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-lg border"><h2 className="text-2xl font-bold text-gray-900 mb-4">Get Started</h2><p className="text-gray-600 mb-6">Take our comprehensive aptitude test to discover your ideal career path.</p><button onClick={() => { setCurrentPage('aptitude'); resetTest(); }} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center">Start Aptitude Test <ChevronRight className="w-5 h-5 ml-2" /></button></div>
        <div className="bg-white p-6 rounded-xl shadow-lg border"><h2 className="text-2xl font-bold text-gray-900 mb-4">Explore Careers</h2><p className="text-gray-600 mb-6">Browse our extensive database of career options.</p><button onClick={() => setCurrentPage('careers')} className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center">Browse Careers <ChevronRight className="w-5 h-5 ml-2" /></button></div>
      </div>
    </div>
  );

  const AptitudeTest = () => {
    if (isLoading) return <div className="p-6 text-center">Loading Test...</div>;
    if (!aptitudeQuestions || aptitudeQuestions.length === 0) return <div className="p-6 text-center text-red-500">Failed to load test questions. Please ensure the backend server is running.</div>;
    
    if (showResults && testResults) {
      return (
        <div className="p-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Career Recommendations</h1>
          <div className="bg-white p-6 rounded-xl shadow-lg border mb-8">
            <h2 className="text-2xl font-semibold mb-4">Aptitude Profile</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(testResults.results.category_scores).map(([category, score]) => (
                <div key={category} className="text-center p-2 bg-gray-100 rounded-lg">
                  <p className="text-sm font-medium capitalize text-gray-700">{category.replace('_', ' ')}</p>
                  <p className="text-2xl font-bold text-blue-600">{Math.round(score.percentage)}%</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {testResults.recommendations.map((career, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{career.career_title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{career.reasoning}</p>
                <div className="text-green-600 font-semibold">Match: {Math.round(career.match_percentage)}%</div>
              </div>
            ))}
          </div>
          <button onClick={resetTest} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">Retake Test</button>
        </div>
      );
    }

    const question = aptitudeQuestions[currentQuestion];
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Aptitude Test</h1>
            <span className="text-lg font-semibold text-blue-600">{currentQuestion + 1}/{aptitudeQuestions.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-blue-600 h-2 rounded-full" style={{ width: `${((currentQuestion + 1) / aptitudeQuestions.length) * 100}%` }}></div></div>
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

  const CareerExplorer = () => (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Career Explorer</h1>
      {isLoading ? <p>Loading careers...</p> : Object.entries(careerDatabase).map(([category, careers]) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 capitalize">{category}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careers.map((career, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{career.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{career.description}</p>
                <div className="space-y-2 text-sm">
                  <div><span className="font-semibold">Salary:</span> {career.salary || 'N/A'}</div>
                  <div><span className="font-semibold">Growth:</span> {career.growth || 'N/A'}</div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {career.skills.slice(0, 4).map((skill, skillIndex) => (
                      <span key={skillIndex} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderPage = () => {
    switch(currentPage) {
        case 'dashboard': return <Dashboard />;
        case 'aptitude': return <AptitudeTest />;
        case 'careers': return <CareerExplorer />;
        default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-64">
        <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-white border-b">
          <button onClick={() => setSidebarOpen(true)}><Menu className="w-6 h-6" /></button>
          <h1 className="text-xl font-bold">CareerAI</h1>
          <div className="w-6"></div>
        </div>
        {renderPage()}
      </div>
    </div>
  );
};

export default CareerCounselingSystem;