const axios = require('axios');
const { TMDB_API_KEY } = require('../config/config');

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: TMDB_API_KEY,
  },
});

module.exports = tmdb;