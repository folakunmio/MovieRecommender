const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movieId: { type: String, required: true }, // TMDB movie ID
  addedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Watchlist', watchlistSchema);