# 🧠 BrainBurst Quiz

A full-stack interactive quiz application with user authentication, real-time assessment, and performance analytics.

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-green)
![React](https://img.shields.io/badge/React-18-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)

## ✨ Features

- 🔐 **User Authentication** - Secure login/register with password hashing
- 📝 **Quiz System** - 60 questions with random selection
- ⏱️ **Timed Questions** - 60-second timer per question
- 📊 **User Profile** - Stats dashboard with game history
- 🏆 **Certificate Generation** - Download certificates for 80%+ scores
- 📖 **Answer Review** - Review all questions with correct/wrong answers
- 🎯 **Leaderboard** - Top scores from all players
- ⚙️ **Settings** - Update email and change password
- 🔔 **Browser Notifications** - Alerts when starting quizzes
- 📱 **Responsive Design** - Works on desktop and mobile

## 🛠️ Tech Stack

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- Spring Security (Password Hashing)
- MySQL 8.0
- Maven

### Frontend
- React 18
- Axios
- HTML5 Canvas (Certificate Generation)
- CSS3 with Animations

## 📋 Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/brainburst-quiz.git
cd brainburst-quiz
```

### 2. Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Run the schema and sample data
source database/schema.sql
source database/sample_data.sql
source database/additional_questions.sql
source database/auth_schema.sql
```

### 3. Backend Setup

```bash
cd backend

# Update application.properties with your MySQL credentials
# Edit: src/main/resources/application.properties

# Build and run
mvn clean install
mvn spring-boot:run
```

Backend runs on: `http://localhost:8080`

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend runs on: `http://localhost:3000`

## 📁 Project Structure

```
brainburst-quiz/
├── backend/
│   ├── src/main/java/com/quiz/
│   │   ├── controller/      # REST API endpoints
│   │   ├── service/         # Business logic
│   │   ├── repository/      # Database access
│   │   ├── model/           # Entity classes
│   │   └── dto/             # Data transfer objects
│   └── src/main/resources/
│       └── application.properties
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/      # React components
│       ├── App.js
│       └── index.js
└── database/
    ├── schema.sql           # Database schema
    ├── sample_data.sql      # Initial questions
    ├── additional_questions.sql
    └── auth_schema.sql      # User authentication tables
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `PUT /api/auth/update-email` - Update email
- `PUT /api/auth/change-password` - Change password

### Quiz
- `GET /api/quiz/questions?count=10` - Get random questions
- `POST /api/quiz/check-answer` - Validate answer
- `POST /api/quiz/submit` - Submit quiz results
- `GET /api/quiz/leaderboard` - Get top scores
- `GET /api/quiz/user-stats/{userId}` - Get user statistics

## 🎮 How to Use

1. **Register/Login** - Create an account or login
2. **Start Quiz** - Choose number of questions (10, 15, or 20)
3. **Answer Questions** - 60 seconds per question
4. **View Results** - See your score and leaderboard
5. **Review Answers** - Check correct/wrong answers
6. **Download Certificate** - Get certificate for 80%+ scores
7. **View Profile** - Check your stats and game history

## 🌐 Deployment

### Backend (Heroku/Railway)

```bash
# Add Procfile
echo "web: java -jar target/quiz-app-1.0.0.jar" > Procfile

# Set environment variables
DB_URL=your_database_url
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### Frontend (Vercel/Netlify)

```bash
# Build for production
npm run build

# Deploy the build folder
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Vaishnavi Gampa**
- GitHub: [@Gampavaishnavi](https://github.com/Gampavaishnavi)

## 🙏 Acknowledgments

- Spring Boot Documentation
- React Documentation
- MySQL Documentation

---

⭐ Star this repo if you find it helpful!
