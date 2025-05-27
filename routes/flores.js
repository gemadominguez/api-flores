const express = require('express');
const router = express.Router();
const Flor = require('../models/Flor');
const authenticateToken = require('../middlewares/authMiddleware');

// Crear flor
router.post('/', authenticateToken, async (req, res) => {
  try {
    const nuevaFlor = new Flor(req.body);
    const guardada = await nuevaFlor.save();
    res.status(201).json(guardada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todas las flores
router.get('/', authenticateToken, async (req, res) => {
  const flores = await Flor.find();
  res.json(flores);
});

// Actualizar una flor
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const actualizada = await Flor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar una flor
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await Flor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Flor eliminada' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
