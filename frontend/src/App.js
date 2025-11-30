import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import StartScreen from './components/StartScreen';
import ProfilePage from './components/ProfilePage';
import SettingsPage from './components/SettingsPage';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import './App.css';

function App() {
  const [screen, setScreen] = useState('login');
  const [user, setUser] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(10);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setScreen('start');
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setScreen('start');
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  const handleRegister = (userData) => {
    setUser(userData);
    setScreen('start');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setScreen('login');
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const startQuiz = (name, questionCount) => {
    setPlayerName(name);
    setTotalQuestions(questionCount);
    setScreen('quiz');
    
    // Show notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('🧠 BrainBurst Quiz', {
        body: `Starting new quiz with ${questionCount} questions. Good luck!`,
        icon: '🎯'
      });
    }
  };

  const endQuiz = (finalScore, quizAnswers) => {
    setScore(finalScore);
    setScreen('result');
    // Store answers for review
    sessionStorage.setItem('quizAnswers', JSON.stringify(quizAnswers || []));
  };

  const restartQuiz = () => {
    setScore(0);
    setScreen('start');
  };

  return (
    <div className="app">
      {screen === 'login' && (
        <LoginPage 
          onLogin={handleLogin}
          onSwitchToRegister={() => setScreen('register')}
        />
      )}
      {screen === 'register' && (
        <RegisterPage 
          onRegister={handleRegister}
          onSwitchToLogin={() => setScreen('login')}
        />
      )}
      {screen === 'start' && user && (
        <div>
          <div className="user-header">
            <span>{user.username}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
          <StartScreen 
            onStart={startQuiz}
            onProfile={() => setScreen('profile')}
            onSettings={() => setScreen('settings')}
          />
        </div>
      )}
      {screen === 'profile' && user && (
        <div>
          <div className="user-header">
            <span>{user.username}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
          <ProfilePage 
            user={user}
            onBack={() => setScreen('start')}
          />
        </div>
      )}
      {screen === 'settings' && user && (
        <div>
          <div className="user-header">
            <span>{user.username}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
          <SettingsPage 
            user={user}
            onBack={() => setScreen('start')}
            onUpdateUser={handleUpdateUser}
          />
        </div>
      )}
      {screen === 'quiz' && user && (
        <>
          {console.log('User object:', user)}
          {console.log('Passing userId:', user.userId)}
          <QuizScreen 
            playerName={playerName}
            userId={user.userId}
            questionCount={totalQuestions}
            onEnd={endQuiz} 
          />
        </>
      )}
      {screen === 'result' && (
        <ResultScreen 
          playerName={playerName}
          score={score} 
          total={totalQuestions}
          onRestart={restartQuiz} 
        />
      )}
    </div>
  );
}

export default App;
