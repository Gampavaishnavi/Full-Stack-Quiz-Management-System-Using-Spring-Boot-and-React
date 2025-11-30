import React, { useState } from 'react';
import axios from 'axios';
import './SettingsPage.css';

const API_URL = 'http://localhost:8080/api/auth';

function SettingsPage({ user, onBack, onUpdateUser }) {
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const response = await axios.put(`${API_URL}/update-email`, {
        userId: user.userId,
        email: email
      });
      
      const updatedUser = { ...user, email: email };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      onUpdateUser(updatedUser);
      setMessage('Email updated successfully!');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update email');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await axios.put(`${API_URL}/change-password`, {
        userId: user.userId,
        currentPassword: currentPassword,
        newPassword: newPassword
      });
      
      setMessage('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container settings-container">
      <button className="back-btn" onClick={onBack}>← Back</button>
      
      <h1>⚙️ Settings</h1>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="settings-section">
        <h2>Account Information</h2>
        <form onSubmit={handleUpdateEmail}>
          <div className="input-group">
            <label>Username</label>
            <input type="text" value={user.username} disabled />
            <small>Username cannot be changed</small>
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading || email === user.email}>
            Update Email
          </button>
        </form>
      </div>

      <div className="settings-section">
        <h2>Change Password</h2>
        <form onSubmit={handleChangePassword}>
          <div className="input-group">
            <label>Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              required
            />
          </div>

          <div className="input-group">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
              minLength="6"
            />
          </div>

          <div className="input-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default SettingsPage;
