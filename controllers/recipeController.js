const Recipe = require('../models/Recipe');
const Comment = require('../models/Comment');

exports.createRecipe = async (req, res) => {
  try {
    const newRecipe = new Recipe({
      ...req.body,
      user: req.user.id 
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    res.status(500).json({ message: 'Error creating recipe', error: err.message });
  }
};

exports.getRecipes = async (req, res) => {
  try {
    const { category, ingredient, maxTime } = req.query;
    let query = {};

    if (category) query.category = category;
    
    if (ingredient) query.ingredients = { $regex: ingredient, $options: 'i' };

    if (maxTime) query.cookingTime = { $lte: Number(maxTime) };

    const recipes = await Recipe.find(query).populate('user', 'username');
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching recipes' });
  }
};

exports.likeRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    next(err);
  }
};

exports.addComment = async (req, res) => {
  try {
    const newComment = new Comment({
      text: req.body.text,
      user: req.user.id,
      recipe: req.params.id
    });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    next(err);
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ recipe: req.params.id }).populate('user', 'username');
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (comment.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await comment.deleteOne();
    res.json({ message: 'Comment removed' });
  } catch (err) {
    next(err);
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    if (recipe.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You can only delete your own recipes' });
    }

    await recipe.deleteOne();
    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    next(err);
  }
};

exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate('user', 'username');
        if (recipe) res.json(recipe);
        else res.status(404).json({ message: 'Recipe not found' });
    } catch (error) {
        next(error);
    }
};

exports.updateRecipe = async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

    if (recipe.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'You do not have permission to edit this recipe' });
    }

    recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(recipe);
  } catch (err) {
    next(err);
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { text } = req.body;
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You do not have permission to edit this comment' });
    }

    comment.text = text;
    const updatedComment = await comment.save();
    res.json(updatedComment);
  } catch (err) {
    next(err);
  }
};