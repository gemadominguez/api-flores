const mongoose = require('mongoose');

const florSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  color: { type: String, required: true },
  temporada: { type: String },
  precio: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Flor', florSchema);

