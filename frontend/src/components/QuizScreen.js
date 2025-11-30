import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuizScreen.css';

const API_URL = 'http://localhost:8080/api/quiz';

function QuizScreen(props) {
  const { playerName, questionCount, userId, onEnd } = props;
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]); // Track all answers

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length === 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNext();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, questions]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${API_URL}/questions?count=${questionCount}`);
      setQuestions(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      alert('Failed to load questions. Please check if the backend is running.');
    }
  };

  const handleNext = async () => {
    let newScore = score;
    let isCorrect = false;
    let correctAnswer = '';
    
    if (selectedAnswer) {
      try {
        const response = await axios.post(`${API_URL}/check-answer`, {
          questionId: questions[currentIndex].id,
          answer: selectedAnswer
        });
        isCorrect = response.data.correct;
        correctAnswer = response.data.correctAnswer || '';
        if (isCorrect) {
          newScore = score + 1;
          setScore(newScore);
        }
      } catch (error) {
        console.error('Error checking answer:', error);
      }
    }

    // Store the answer with correct answer info
    const answerData = {
      question: questions[currentIndex],
      userAnswer: selectedAnswer || 'No answer',
      correctAnswer: correctAnswer,
      isCorrect: isCorrect
    };
    console.log('Storing answer:', answerData); // Debug log
    setAnswers([...answers, answerData]);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer('');
      setTimeLeft(60);
    } else {
      finishQuiz(newScore, isCorrect, correctAnswer);
    }
  };

  const finishQuiz = async (finalScore, lastAnswerCorrect, lastCorrectAnswer) => {
    // Include last answer in the answers array
    const allAnswers = [...answers, {
      question: questions[currentIndex],
      userAnswer: selectedAnswer || 'No answer',
      correctAnswer: lastCorrectAnswer || '',
      isCorrect: lastAnswerCorrect
    }];
    
    console.log('Submitting quiz with userId:', userId); // Debug log
    
    try {
      await axios.post(`${API_URL}/submit`, {
        playerName,
        score: finalScore,
        totalQuestions: questions.length,
        userId: userId
      });
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
    onEnd(finalScore, allAnswers);
  };

  if (loading) {
    return <div className="container"><h2>Loading questions...</h2></div>;
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="container quiz-container">
      <div className="quiz-header">
        <div className="progress">
          Question {currentIndex + 1} of {questions.length}
        </div>
        <div className={`timer ${timeLeft <= 10 ? 'warning' : ''}`}>
          ⏱️ {timeLeft}s
        </div>
      </div>
      
      <h2 className="question">{currentQuestion.questionText}</h2>
      
      <div className="options">
        {['A', 'B', 'C', 'D'].map((option) => (
          <button
            key={option}
            className={`option ${selectedAnswer === option ? 'selected' : ''}`}
            onClick={() => setSelectedAnswer(option)}
          >
            <span className="option-label">{option}</span>
            {currentQuestion[`option${option}`]}
          </button>
        ))}
      </div>
      
      <button 
        className="next-btn"
        onClick={handleNext}
        disabled={!selectedAnswer}
      >
        {currentIndex + 1 === questions.length ? 'Finish' : 'Next Question'}
      </button>
    </div>
  );
}

export default QuizScreen;
