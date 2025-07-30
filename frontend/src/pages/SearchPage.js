import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Box, Typography, Card, CardMedia, CardContent, CardActionArea, Dialog, DialogTitle, DialogContent } from '@mui/material';

function MovieCard({ movie, onClick }) {
  return (
    <Card sx={{ maxWidth: 200, m: 1 }}>
      <CardActionArea onClick={() => onClick(movie)}>
        <CardMedia
          component="img"
          height="300"
          image={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : ''}
          alt={movie.title}
        />
        <CardContent>
          <Typography variant="subtitle1" noWrap>{movie.title}</Typography>
          <Typography variant="body2" color="text.secondary">{movie.release_date}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get('/api/movies/search', {
        params: { title: query, year, genre }
      });
      setResults(res.data.results || []);
    } catch (err) {
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>Search Movies</Typography>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        <TextField label="Title" value={query} onChange={e => setQuery(e.target.value)} size="small" />
        <TextField label="Year" value={year} onChange={e => setYear(e.target.value)} size="small" />
        <TextField label="Genre (ID)" value={genre} onChange={e => setGenre(e.target.value)} size="small" />
        <Button type="submit" variant="contained" disabled={loading}>Search</Button>
      </form>
      <Grid container spacing={2}>
        {results.map(movie => (
          <Grid item key={movie.id}>
            <MovieCard movie={movie} onClick={setSelected} />
          </Grid>
        ))}
      </Grid>
      <Dialog open={!!selected} onClose={() => setSelected(null)} maxWidth="sm" fullWidth>
        {selected && (
          <>
            <DialogTitle>{selected.title}</DialogTitle>
            <DialogContent>
              <img
                src={selected.poster_path ? `https://image.tmdb.org/t/p/w300${selected.poster_path}` : ''}
                alt={selected.title}
                style={{ width: '100%', marginBottom: 16 }}
              />
              <Typography variant="body1">{selected.overview}</Typography>
              <Typography variant="body2" color="text.secondary">Release: {selected.release_date}</Typography>
              <Typography variant="body2" color="text.secondary">Rating: {selected.vote_average}</Typography>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
}