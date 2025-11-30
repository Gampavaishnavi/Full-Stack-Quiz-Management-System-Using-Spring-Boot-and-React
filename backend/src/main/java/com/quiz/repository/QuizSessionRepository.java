package com.quiz.repository;

import com.quiz.model.QuizSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuizSessionRepository extends JpaRepository<QuizSession, Long> {
    List<QuizSession> findTop10ByOrderByScoreDesc();
    List<QuizSession> findByUserIdOrderByEndTimeDesc(Long userId);
}
