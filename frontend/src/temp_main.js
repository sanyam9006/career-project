import React, { useState, useEffect } from 'react';
import { User, Brain, BookOpen, TrendingUp, Award, ChevronRight, Home, TestTube, Users, BarChart3, Menu, X, Shield, Activity, ThumbsUp, ThumbsDown, Edit3 } from 'lucide-react';

const API_URL = 'http://127.0.0.1:5000';

const CareerCounselingSystem = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [testResults, setTestResults] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

    );
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard setCurrentPage={setCurrentPage} resetTest={resetTest} />;
      case 'aptitude': return <AptitudeTest isLoading={isLoading} aptitudeQuestions={aptitudeQuestions} showResults={showResults} testResults={testResults} currentQuestion={currentQuestion} handleAnswer={handleAnswer} answers={answers} handleNextQuestion={handleNextQuestion} handleFinishTest={handleFinishTest} resetTest={resetTest} />;
      case 'essay': return <NlpEssayScreen essayText={essayText} setEssayText={setEssayText} isAnalyzing={isAnalyzing} setIsAnalyzing={setIsAnalyzing} nlpResults={nlpResults} setNlpResults={setNlpResults} />;
      case 'careers': return <CareerExplorer isLoading={isLoading} careerDatabase={careerDatabase} />;
      case 'admin': return <AdminPanel adminToken={adminToken} setAdminToken={setAdminToken} currentPage={currentPage} adminStats={adminStats} setAdminStats={setAdminStats} adminUsers={adminUsers} setAdminUsers={setAdminUsers} adminLogs={adminLogs} setAdminLogs={setAdminLogs} />;
      default: return <Dashboard setCurrentPage={setCurrentPage} resetTest={resetTest} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 lg:pl-64 w-full">
        <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-white border-b">
          <button onClick={() => setSidebarOpen(true)}><Menu className="w-6 h-6" /></button>
          <h1 className="text-xl font-bold text-gray-800">CareerAI</h1>
          <div className="w-6"></div>
        </div>
        {renderPage()}
      </div>
    </div>
  );
};

export default CareerCounselingSystem;