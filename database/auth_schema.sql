USE quiz_db;

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Add user_id to quiz_sessions
ALTER TABLE quiz_sessions ADD COLUMN user_id BIGINT;
ALTER TABLE quiz_sessions ADD FOREIGN KEY (user_id) REFERENCES users(id);
