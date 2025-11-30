package com.quiz.service;

import com.quiz.model.QuizSession;
import com.quiz.model.User;
import com.quiz.repository.QuizSessionRepository;
import com.quiz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.security.MessageDigest;
import java.util.*;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private QuizSessionRepository sessionRepository;
    
    public Map<String, Object> getUserStats(Long userId) {
        List<QuizSession> sessions = sessionRepository.findByUserIdOrderByEndTimeDesc(userId);
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalGames", sessions.size());
        
        if (!sessions.isEmpty()) {
            int totalScore = 0;
            int totalQuestions = 0;
            int bestScore = 0;
            
            for (QuizSession session : sessions) {
                totalScore += session.getScore();
                totalQuestions += session.getTotalQuestions();
                if (session.getScore() > bestScore) {
                    bestScore = session.getScore();
                }
            }
            
            int averageScore = totalQuestions > 0 ? 
                (int) Math.round((double) totalScore / totalQuestions * 100) : 0;
            
            stats.put("averageScore", averageScore);
            stats.put("bestScore", bestScore);
            stats.put("totalQuestions", totalQuestions);
        } else {
            stats.put("averageScore", 0);
            stats.put("bestScore", 0);
            stats.put("totalQuestions", 0);
        }
        
        List<QuizSession> recentGames = sessions.size() > 5 ? 
            sessions.subList(0, 5) : sessions;
        
        Map<String, Object> result = new HashMap<>();
        result.put("stats", stats);
        result.put("recentGames", recentGames);
        
        return result;
    }
    
    public void updateEmail(Long userId, String email) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (userRepository.existsByEmail(email) && !user.getEmail().equals(email)) {
            throw new RuntimeException("Email already in use");
        }
        
        user.setEmail(email);
        userRepository.save(user);
    }
    
    public void changePassword(Long userId, String currentPassword, String newPassword) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!hashPassword(currentPassword).equals(user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }
        
        user.setPassword(hashPassword(newPassword));
        userRepository.save(user);
    }
    
    private String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(password.getBytes());
            return Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) {
            throw new RuntimeException("Error hashing password");
        }
    }
}
