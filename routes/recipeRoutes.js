const express = require('express');
const router = express.Router();
const { 
  createRecipe, 
  getRecipes, 
  getRecipeById, 
  likeRecipe, 
  addComment, 
  getComments,
  deleteRecipe,
  updateRecipe,
  deleteComment,
  updateComment
} = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.post('/', protect, createRecipe);
router.get('/', getRecipes);

router.get('/:id', getRecipeById); 

router.put('/:id/like', protect, likeRecipe);

router.post('/:id/comments', protect, addComment);
router.get('/:id/comments', getComments); 

router.delete('/:id', protect, deleteRecipe); 
router.put('/:id', protect, updateRecipe);

router.delete('/comments/:id', protect, deleteComment);
router.put('/comments/:id', protect, updateComment);

module.exports = router;