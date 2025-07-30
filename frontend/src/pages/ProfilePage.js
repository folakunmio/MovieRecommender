import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { Typography, Box, TextField, Button } from '@mui/material';

export default function ProfilePage() {
  const { user, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState({ username: '', email: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) return;
    axios.get('/api/auth/profile', {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => setProfile(res.data))
      .catch(() => setProfile({ username: '', email: '' }));
  }, [user]);

  const handleChange = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      await axios.put('/api/auth/profile', profile, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setMessage('Profile updated!');
    } catch {
      setMessage('Failed to update profile');
    }
  };

  if (!user) return <Typography>Please log in to edit your profile.</Typography>;

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>My Profile</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          value={profile.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Save</Button>
        {message && <Typography color={message.includes('updated') ? 'primary' : 'error'}>{message}</Typography>}
      </form>
      <Button color="error" sx={{ mt: 2 }} onClick={logout}>Logout</Button>
    </Box>
  );
}