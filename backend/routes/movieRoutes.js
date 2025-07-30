const express = require('express');
const router = express.Router();
const tmdb = require('../utils/tmdb');

// Search movies by title, genre, or year
router.get('/search', async (req, res) => {
  const { title, genre, year } = req.query;
  try {
    const params = {
      query: title,
      year,
      with_genres: genre,
    };
    // Remove undefined params
    Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);
    const response = await tmdb.get('/search/movie', { params });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Error searching movies', error: err.message });
  }
});

// Filter movies by rating, popularity, release date
router.get('/filter', async (req, res) => {
  const { minRating, maxRating, sortBy, releaseYear } = req.query;
  try {
    const params = {
      'vote_average.gte': minRating,
      'vote_average.lte': maxRating,
      sort_by: sortBy || 'popularity.desc',
      'primary_release_year': releaseYear,
    };
    Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);
    const response = await tmdb.get('/discover/movie', { params });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Error filtering movies', error: err.message });
  }
});

module.exports = router;
