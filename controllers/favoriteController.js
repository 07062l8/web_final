const Favorite = require('../models/Favorite');
const mongoose = require('mongoose'); 

exports.removeFromFavorites = async (req, res, next) => {
    try {
        const { recipeId } = req.params;
        const userId = req.user.id;

        const result = await Favorite.findOneAndDelete({ 
            user: userId, 
            recipe: recipeId 
        });

        if (!result) {
            const resultById = await Favorite.findByIdAndDelete(recipeId);
            if (!resultById) {
                return res.status(404).json({ message: 'The entry in the favorites was not found.' });
            }
        }

        res.status(200).json({ message: 'Deleted from favorites' });
    } catch (err) {
        next(err);
    }
};

exports.addToFavorites = async (req, res) => {
  try {
    const favorite = new Favorite({
      user: req.user.id,
      recipe: req.body.recipeId
    });
    await favorite.save();
    res.status(201).json({ message: 'Added to favorites' });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: 'Already in favorites' });
    next(err);
  }
};

exports.getMyFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.id }).populate('recipe');
    res.json(favorites);
  } catch (err) {
    next(err);
  }
};
