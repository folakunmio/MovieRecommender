const Review = require('../models/Review');

// Add or update a review
const addOrUpdateReview = async (req, res) => {
  const { movieId, rating, review } = req.body;
  if (!movieId || rating == null) return res.status(400).json({ message: 'movieId and rating are required' });
  let userReview = await Review.findOne({ user: req.user.id, movieId });
  if (userReview) {
    userReview.rating = rating;
    userReview.review = review;
    await userReview.save();
    return res.json(userReview);
  } else {
    userReview = await Review.create({ user: req.user.id, movieId, rating, review });
    return res.status(201).json(userReview);
  }
};

// Get reviews for a movie
const getMovieReviews = async (req, res) => {
  const { movieId } = req.params;
  const reviews = await Review.find({ movieId });
  res.json(reviews);
};

// Get user's reviews
const getUserReviews = async (req, res) => {
  const reviews = await Review.find({ user: req.user.id });
  res.json(reviews);
};

module.exports = { addOrUpdateReview, getMovieReviews, getUserReviews };