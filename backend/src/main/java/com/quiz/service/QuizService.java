package com.quiz.service;

import com.quiz.dto.QuestionDTO;
import com.quiz.model.Question;
import com.quiz.model.QuizSession;
import com.quiz.repository.QuestionRepository;
import com.quiz.repository.QuizSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuizService {
    
    @Autowired
    private QuestionRepository questionRepository;
    
    @Autowired
    private QuizSessionRepository sessionRepository;
    
    public List<QuestionDTO> getRandomQuestions(int count) {
        return questionRepository.findRandomQuestions(count).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public boolean checkAnswer(Long questionId, String answer) {
        Question question = questionRepository.findById(questionId).orElse(null);
        return question != null && question.getCorrectAnswer().equalsIgnoreCase(answer);
    }
    
    public String getCorrectAnswer(Long questionId) {
        Question question = questionRepository.findById(questionId).orElse(null);
        return question != null ? question.getCorrectAnswer() : "";
    }
    
    public QuizSession saveSession(String playerName, int score, int totalQuestions, Long userId) {
        QuizSession session = new QuizSession();
        session.setPlayerName(playerName);
        session.setScore(score);
        session.setTotalQuestions(totalQuestions);
        session.setUserId(userId);
        session.setStartTime(LocalDateTime.now());
        session.setEndTime(LocalDateTime.now());
        return sessionRepository.save(session);
    }
    
    public List<QuizSession> getLeaderboard() {
        return sessionRepository.findTop10ByOrderByScoreDesc();
    }
    
    private QuestionDTO convertToDTO(Question question) {
        QuestionDTO dto = new QuestionDTO();
        dto.setId(question.getId());
        dto.setQuestionText(question.getQuestionText());
        dto.setOptionA(question.getOptionA());
        dto.setOptionB(question.getOptionB());
        dto.setOptionC(question.getOptionC());
        dto.setOptionD(question.getOptionD());
        return dto;
    }
}
