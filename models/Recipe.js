const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  ingredients: [{ type: String, required: true }],
  steps: [{ type: String, required: true }],       
  category: { type: String }, 
  cookingTime: { type: Number }, 
  servings: { type: Number },
  image: { type: String },         user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  likes: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', RecipeSchema);