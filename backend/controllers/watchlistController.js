const Watchlist = require('../models/Watchlist');

// Add a movie to watchlist
const addToWatchlist = async (req, res) => {
  const { movieId } = req.body;
  if (!movieId) return res.status(400).json({ message: 'movieId is required' });
  const exists = await Watchlist.findOne({ user: req.user.id, movieId });
  if (exists) return res.status(400).json({ message: 'Movie already in watchlist' });
  const item = await Watchlist.create({ user: req.user.id, movieId });
  res.status(201).json(item);
};

// Remove a movie from watchlist
const removeFromWatchlist = async (req, res) => {
  const { movieId } = req.body;
  if (!movieId) return res.status(400).json({ message: 'movieId is required' });
  const result = await Watchlist.findOneAndDelete({ user: req.user.id, movieId });
  if (!result) return res.status(404).json({ message: 'Movie not found in watchlist' });
  res.json({ message: 'Removed from watchlist' });
};

// Get user's watchlist
const getWatchlist = async (req, res) => {
  const items = await Watchlist.find({ user: req.user.id });
  res.json(items);
};

module.exports = { addToWatchlist, removeFromWatchlist, getWatchlist };