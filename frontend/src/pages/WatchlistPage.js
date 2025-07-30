import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { Typography, Box, Grid, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';

export default function WatchlistPage() {
  const { user } = useContext(AuthContext);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    axios.get('/api/watchlist', {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => setWatchlist(res.data))
      .catch(() => setWatchlist([]))
      .finally(() => setLoading(false));
  }, [user]);

  const removeMovie = async (movieId) => {
    await axios.post('/api/watchlist/remove', { movieId }, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    setWatchlist(watchlist.filter(item => item.movieId !== movieId));
  };

  if (!user) return <Typography>Please log in to view your watchlist.</Typography>;
  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>My Watchlist</Typography>
      <Grid container spacing={2}>
        {watchlist.map(item => (
          <Grid item key={item.movieId}>
            <Card sx={{ maxWidth: 200 }}>
              <CardMedia
                component="img"
                height="300"
                image={item.poster_path ? `https://image.tmdb.org/t/p/w300${item.poster_path}` : ''}
                alt={item.title}
              />
              <CardContent>
                <Typography variant="subtitle1" noWrap>{item.title || item.movieId}</Typography>
              </CardContent>
              <CardActions>
                <Button color="error" onClick={() => removeMovie(item.movieId)}>Remove</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}