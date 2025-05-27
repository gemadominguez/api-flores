const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

// Rutas 
const floresRoutes = require('../routes/flores');
const authenticateToken = require('../middlewares/authMiddleware');

// Rutas protegidas
app.use('/api/flores', floresRoutes);

// Token 
const token = jwt.sign({ username: 'gema' }, process.env.JWT_SECRET, { expiresIn: '1h' });

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Test de creación: POST /api/flores', () => {
  it('debería crear una flor si el token es válido', async () => {
    const nuevaFlor = {
      nombre: 'Dalia',
      color: 'Fucsia',
      temporada: 'Verano',
      precio: 3.2
    };

    const res = await request(app)
      .post('/api/flores')
      .set('Authorization', `Bearer ${token}`)
      .send(nuevaFlor);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.nombre).toBe('Dalia');
  }, 10000); 
});


describe('Test de lectura: GET /api/flores', () => {
  it('debería devolver un array de flores si el token es válido', async () => {
    const res = await request(app)
      .get('/api/flores')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('Test de seguridad: POST sin token', () => {
  it('debería devolver 401 si no se proporciona el token', async () => {
    const res = await request(app)
      .post('/api/flores')
      .send({
        nombre: 'Flor sin token',
        color: 'Invisible',
        temporada: 'Siempre',
        precio: 1.0
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Token requerido en el header Authorization');
  });
});
