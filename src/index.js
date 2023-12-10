// Zulia Azalia Davis Ayala #20172001712
//Sergio Rolando Inestroza Amaya #20182002621
const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Middleware para verificar el token
const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];       

  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  admin.auth().verifyIdToken(token)
    .then((decodedToken) => {
      req.usuario = decodedToken.uid;
      next();
    })
    .catch((error) => {
      res.status(401).json({ error: 'Token inválido' });
    });
};

// Rutas protegidas con middleware de verificación de token
app.use(verificarToken);

// CRUD de productos
// ... Implementa las rutas y funciones para el CRUD de productos ...

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});