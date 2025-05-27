const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']

  // Si no hay cabecera
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: 'Token requerido en el header Authorization' })
  }

  // Si falta el prefijo Bearer
  if (!authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({
        message: 'Formato incorrecto: el token debe comenzar con "Bearer + el token "',
      })
  }

  const token = authHeader.split(' ')[1]

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ message: 'Token inválido o expirado' })

    req.user = user
    next()
  })
}

module.exports = authenticateToken
