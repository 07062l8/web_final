const express = require('express');
const router = express.Router();
const { addToFavorites, getMyFavorites, removeFromFavorites } = require('../controllers/favoriteController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addToFavorites);
router.get('/', protect, getMyFavorites);
router.delete('/:recipeId', protect, removeFromFavorites);

module.exports = router;