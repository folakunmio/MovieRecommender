const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String },
  year: { type: Number },
  description: { type: String },
  // Add more fields as needed
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
