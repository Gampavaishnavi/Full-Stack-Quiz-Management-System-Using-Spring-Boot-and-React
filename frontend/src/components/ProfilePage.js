import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilePage.css';

const API_URL = 'http://localhost:8080/api/quiz';

function ProfilePage({ user, onBack }) {
  const [stats, setStats] = useState(null);
  const [recentGames, setRecentGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/user-stats/${user.userId}`);
      setStats(response.data.stats);
      setRecentGames(response.data.recentGames);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container profile-container">
        <h2>Loading profile...</h2>
      </div>
    );
  }

  return (
    <div className="container profile-container">
      <button className="back-btn" onClick={onBack}>← Back</button>
      
      <div className="profile-header">
        <div className="profile-avatar">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <h1>{user.username}</h1>
          <p>{user.email}</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats?.totalGames || 0}</div>
          <div className="stat-label">Total Games</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats?.averageScore || 0}%</div>
          <div className="stat-label">Average Score</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats?.bestScore || 0}</div>
          <div className="stat-label">Best Score</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats?.totalQuestions || 0}</div>
          <div className="stat-label">Questions Answered</div>
        </div>
      </div>

      <div className="recent-games">
        <h2>📜 Recent Games</h2>
        {recentGames.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Score</th>
                <th>Percentage</th>
                <th>Questions</th>
              </tr>
            </thead>
            <tbody>
              {recentGames.map((game, index) => {
                const date = new Date(game.endTime);
                const dateStr = date.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                });
                const timeStr = date.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit'
                });
                const percentage = Math.round((game.score / game.totalQuestions) * 100);
                
                return (
                  <tr key={index}>
                    <td>
                      <div style={{ fontWeight: '600' }}>{dateStr}</div>
                      <div style={{ fontSize: '12px', color: '#999' }}>{timeStr}</div>
                    </td>
                    <td style={{ fontWeight: '600', color: '#667eea' }}>
                      {game.score}/{game.totalQuestions}
                    </td>
                    <td>
                      <span style={{ 
                        padding: '4px 12px', 
                        borderRadius: '12px',
                        background: percentage >= 80 ? '#d4edda' : 
                                   percentage >= 60 ? '#fff3cd' : '#f8d7da',
                        color: percentage >= 80 ? '#155724' : 
                               percentage >= 60 ? '#856404' : '#721c24',
                        fontWeight: '600'
                      }}>
                        {percentage}%
                      </span>
                    </td>
                    <td>{game.totalQuestions} Qs</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="no-data">No games played yet. Start your first quiz!</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
