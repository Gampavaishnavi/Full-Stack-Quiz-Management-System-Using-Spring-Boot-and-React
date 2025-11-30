CREATE DATABASE IF NOT EXISTS quiz_db;
USE quiz_db;

CREATE TABLE IF NOT EXISTS questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    question_text VARCHAR(500) NOT NULL,
    option_a VARCHAR(200) NOT NULL,
    option_b VARCHAR(200) NOT NULL,
    option_c VARCHAR(200) NOT NULL,
    option_d VARCHAR(200) NOT NULL,
    correct_answer VARCHAR(1) NOT NULL,
    category VARCHAR(50),
    difficulty VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS quiz_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    player_name VARCHAR(100),
    score INT NOT NULL,
    total_questions INT NOT NULL,
    start_time DATETIME,
    end_time DATETIME
);
