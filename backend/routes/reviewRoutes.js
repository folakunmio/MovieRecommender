const express = require('express');
const { addOrUpdateReview, getMovieReviews, getUserReviews } = require('../controllers/reviewController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);
router.post('/', addOrUpdateReview);
router.get('/movie/:movieId', getMovieReviews);
router.get('/user', getUserReviews);

module.exports = router;