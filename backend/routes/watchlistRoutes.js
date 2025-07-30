const express = require('express');
const { addToWatchlist, removeFromWatchlist, getWatchlist } = require('../controllers/watchlistController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);
router.post('/add', addToWatchlist);
router.post('/remove', removeFromWatchlist);
router.get('/', getWatchlist);

module.exports = router;