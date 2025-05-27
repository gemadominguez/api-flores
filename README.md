# API de Flores 

Este proyecto es una API REST desarrollada con Node.js, Express y MongoDB (Mongoose) para la gestión de una API llamada "flores". Incluye autenticación segura, middleware de protección, pruebas automatizadas, contenerización con Docker y despliegue en Railway.

## URL del Proyecto

Producción: [https://api-flores-production.up.railway.app](https://api-flores-production.up.railway.app)

---

## Tecnologías Usadas

- Node.js
- Express
- MongoDB + Mongoose
- JWT (Autenticación)
- Bcrypt (Contraseñas seguras)
- Helmet + CORS (Seguridad)
- Docker + Docker Compose
- Railway (Despliegue)
- Jest + Supertest (Testing)

---

## Instalación local

```bash
git clone https://github.com/gemadominguez/api-flores.git
cd api-flores
npm install
```

Crear un archivo `.env` con:

```
PORT=3000
MONGO_URI=tu_uri_de_mongodb
JWT_SECRET=tu_clave_jwt
```

Iniciar el servidor:

```bash
node index.js
```

---

## Ejecutar tests

```bash
npm test
```

---

## Endpoints de Autenticación

| Método | Ruta           | Protegida | Descripción                    |
|--------|----------------|-----------|--------------------------------|
| POST   | /api/register  | No        | Registro de usuario            |
| POST   | /api/login     | No        | Login y generación de token    |
| GET    | /api/secret    | Sí (JWT)  | Ruta protegida con token JWT   |

---

## Endpoints de Flores

| Método | Ruta               | Protegida | Descripción                     |
|--------|--------------------|-----------|---------------------------------|
| GET    | /api/flores        | No        | Obtener todas las flores        |
| POST   | /api/flores        | Sí (JWT)  | Crear una flor                  |
| PUT    | /api/flores/:id    | Sí (JWT)  | Actualizar una flor por ID      |
| DELETE | /api/flores/:id    | Sí (JWT)  | Eliminar una flor por ID        |

---

## Docker

Para construir la imagen:

```bash
docker build -t backend-flores .
```

Con Docker Compose:

```bash
docker-compose up
```

---

## Observaciones

- Todas las rutas POST, PUT y DELETE están protegidas con autenticación JWT.
- Las contraseñas se almacenan encriptadas con `bcrypt`.
- El servidor se inicia solo si la conexión a MongoDB es exitosa.
- El proyecto está desplegado en Railway con variables de entorno seguras.
- Se realizaron pruebas de integración con Jest y Supertest.

