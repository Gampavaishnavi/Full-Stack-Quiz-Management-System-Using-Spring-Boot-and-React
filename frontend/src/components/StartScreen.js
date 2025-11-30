import React, { useState } from 'react';
import './StartScreen.css';

function StartScreen({ onStart, onProfile, onSettings }) {
  const [name, setName] = useState('');
  const [questionCount, setQuestionCount] = useState(10);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name, questionCount);
    }
  };

  return (
    <div className="container start-container">
      <div className="nav-buttons">
        <button className="nav-btn" onClick={onProfile}>
          👤 Profile
        </button>
        <button className="nav-btn" onClick={onSettings}>
          ⚙️ Settings
        </button>
      </div>

      <h1>🎯 Quiz Challenge</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Your Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="input-group">
          <label>Number of Questions:</label>
          <select value={questionCount} onChange={(e) => setQuestionCount(Number(e.target.value))}>
            <option value={10}>10 Questions</option>
            <option value={15}>15 Questions</option>
            <option value={20}>20 Questions</option>
          </select>
        </div>
        <button type="submit">Start Quiz</button>
      </form>
    </div>
  );
}

export default StartScreen;
