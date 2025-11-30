import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Certificate from './Certificate';
import './ResultScreen.css';

const API_URL = 'http://localhost:8080/api/quiz';

function ResultScreen({ playerName, score, total, onRestart }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const percentage = Math.round((score / total) * 100);
  const qualifiesForCertificate = percentage >= 80;

  useEffect(() => {
    fetchLeaderboard();
    // Load quiz answers from session storage
    const savedAnswers = sessionStorage.getItem('quizAnswers');
    if (savedAnswers) {
      setQuizAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(`${API_URL}/leaderboard`);
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  return (
    <div className="container result-container">
      <h1>🎉 Quiz Complete!</h1>
      
      <div className="score-card">
        <h2>Hey {playerName}!</h2>
        <div className="score-display">
          <div className="score-number">{score}/{total}</div>
          <div className="score-percentage">{percentage}%</div>
        </div>
        <p className="score-message">
          {percentage >= 80 ? '🌟 Excellent!' : 
           percentage >= 60 ? '👍 Good job!' : 
           percentage >= 40 ? '💪 Keep practicing!' : 
           '📚 Study more!'}
        </p>
      </div>

      {leaderboard.length > 0 && (
        <div className="leaderboard">
          <h3>🏆 Top Scores</h3>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((session, index) => (
                <tr key={session.id}>
                  <td>{index + 1}</td>
                  <td>{session.playerName}</td>
                  <td>{session.score}/{session.totalQuestions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {qualifiesForCertificate && (
        <div style={{ textAlign: 'center', marginTop: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '12px' }}>
          <h3 style={{ color: '#667eea', marginBottom: '10px' }}>🎉 Congratulations!</h3>
          <p style={{ color: '#666', marginBottom: '15px' }}>
            You've achieved an excellent score! Download your certificate to celebrate your achievement.
          </p>
          <Certificate 
            playerName={playerName}
            score={score}
            total={total}
            date={new Date().toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          />
        </div>
      )}

      {quizAnswers.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <button 
            onClick={() => setShowReview(!showReview)}
            style={{
              width: '100%',
              padding: '15px',
              background: showReview ? '#667eea' : '#f8f9fa',
              color: showReview ? 'white' : '#667eea',
              border: `2px solid #667eea`,
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            {showReview ? '📖 Hide Review' : '📝 Review Answers'}
          </button>

          {showReview && (
            <div className="answer-review">
              {quizAnswers.map((item, index) => (
                <div 
                  key={index} 
                  className={`review-item ${item.isCorrect ? 'correct' : 'incorrect'}`}
                >
                  <div className="review-header">
                    <span className="question-number">Question {index + 1}</span>
                    <span className={`result-badge ${item.isCorrect ? 'correct' : 'incorrect'}`}>
                      {item.isCorrect ? '✓ Correct' : '✗ Wrong'}
                    </span>
                  </div>
                  <p className="review-question">{item.question.questionText}</p>
                  <div className="review-answers">
                    <div className={`answer-row ${item.userAnswer === 'A' ? (item.isCorrect ? 'user-correct' : 'user-wrong') : ''} ${item.correctAnswer === 'A' ? 'correct-answer' : ''}`}>
                      <span className="answer-label">A</span>
                      <span>{item.question.optionA}</span>
                    </div>
                    <div className={`answer-row ${item.userAnswer === 'B' ? (item.isCorrect ? 'user-correct' : 'user-wrong') : ''} ${item.correctAnswer === 'B' ? 'correct-answer' : ''}`}>
                      <span className="answer-label">B</span>
                      <span>{item.question.optionB}</span>
                    </div>
                    <div className={`answer-row ${item.userAnswer === 'C' ? (item.isCorrect ? 'user-correct' : 'user-wrong') : ''} ${item.correctAnswer === 'C' ? 'correct-answer' : ''}`}>
                      <span className="answer-label">C</span>
                      <span>{item.question.optionC}</span>
                    </div>
                    <div className={`answer-row ${item.userAnswer === 'D' ? (item.isCorrect ? 'user-correct' : 'user-wrong') : ''} ${item.correctAnswer === 'D' ? 'correct-answer' : ''}`}>
                      <span className="answer-label">D</span>
                      <span>{item.question.optionD}</span>
                    </div>
                  </div>
                  {!item.isCorrect && item.correctAnswer && (
                    <div className="explanation">
                      <strong>✓ Correct Answer:</strong> {item.correctAnswer} - {item.question[`option${item.correctAnswer}`]}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="result-buttons">
        <button onClick={onRestart} className="primary-btn">Play Again</button>
        <button onClick={onRestart} className="secondary-btn">Back to Home</button>
      </div>
    </div>
  );
}

export default ResultScreen;
