package com.quiz.controller;

import com.quiz.dto.AnswerRequest;
import com.quiz.dto.QuestionDTO;
import com.quiz.model.QuizSession;
import com.quiz.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "http://localhost:3000")
public class QuizController {
    
    @Autowired
    private QuizService quizService;
    
    @GetMapping("/questions")
    public ResponseEntity<List<QuestionDTO>> getQuestions(@RequestParam(defaultValue = "10") int count) {
        return ResponseEntity.ok(quizService.getRandomQuestions(count));
    }
    
    @PostMapping("/check-answer")
    public ResponseEntity<Map<String, Object>> checkAnswer(@RequestBody AnswerRequest request) {
        boolean isCorrect = quizService.checkAnswer(request.getQuestionId(), request.getAnswer());
        String correctAnswer = quizService.getCorrectAnswer(request.getQuestionId());
        return ResponseEntity.ok(Map.of(
            "correct", isCorrect,
            "correctAnswer", correctAnswer
        ));
    }
    
    @PostMapping("/submit")
    public ResponseEntity<QuizSession> submitQuiz(@RequestBody Map<String, Object> payload) {
        System.out.println("Received payload: " + payload);
        String playerName = (String) payload.get("playerName");
        int score = (int) payload.get("score");
        int totalQuestions = (int) payload.get("totalQuestions");
        Long userId = payload.get("userId") != null ? 
            Long.valueOf(payload.get("userId").toString()) : null;
        System.out.println("Extracted userId: " + userId);
        return ResponseEntity.ok(quizService.saveSession(playerName, score, totalQuestions, userId));
    }
    
    @GetMapping("/leaderboard")
    public ResponseEntity<List<QuizSession>> getLeaderboard() {
        return ResponseEntity.ok(quizService.getLeaderboard());
    }
}
