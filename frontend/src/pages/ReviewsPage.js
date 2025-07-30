import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { Typography, Box, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

export default function ReviewsPage() {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [movieId, setMovieId] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    axios.get('/api/reviews/user', {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => setReviews(res.data))
      .catch(() => setReviews([]));
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('/api/reviews', { movieId, rating, review }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setMovieId(''); setRating(''); setReview('');
      // Refresh reviews
      const res = await axios.get('/api/reviews/user', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setReviews(res.data);
    } catch (err) {
      setError('Failed to submit review');
    }
  };

  if (!user) return <Typography>Please log in to view your reviews.</Typography>;

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>My Reviews</Typography>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <TextField label="Movie ID" value={movieId} onChange={e => setMovieId(e.target.value)} size="small" required />
        <TextField label="Rating" value={rating} onChange={e => setRating(e.target.value)} size="small" type="number" inputProps={{ min: 0, max: 10 }} required />
        <TextField label="Review" value={review} onChange={e => setReview(e.target.value)} size="small" multiline rows={2} />
        <Button type="submit" variant="contained" sx={{ ml: 2 }}>Submit</Button>
        {error && <Typography color="error">{error}</Typography>}
      </form>
      <List>
        {reviews.map(r => (
          <ListItem key={r._id} alignItems="flex-start">
            <ListItemText
              primary={`Movie: ${r.movieId} | Rating: ${r.rating}`}
              secondary={r.review}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}