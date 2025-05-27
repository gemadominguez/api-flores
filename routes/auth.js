const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()

const users = []

// Registro usuario
router.post('/register', async (req, res) => {
  const { username, password } = req.body

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  users.push({ username, password: hashedPassword })
  res.status(201).json({ message: 'Usuario registrado correctamente' })
})

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body

  const user = users.find((u) => u.username === username)
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })

  const passwordCorrect = await bcrypt.compare(password, user.password)
  if (!passwordCorrect)
    return res.status(401).json({ message: 'Contraseña incorrecta' })

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })

  res.status(200).json({ token })
})

const authenticateToken = require('../middlewares/authMiddleware')

// Ruta protegida
router.get('/secret', authenticateToken, (req, res) => {
  res.json({
    message: `Hola ${req.user.username}, has conseguido entrar en la ruta secreta.`,
  })
})

module.exports = router
