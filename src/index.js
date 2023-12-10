const app = require('./app'); // Importa la instancia de app desde app.js
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const port = 3000;

app.use(bodyParser.json());

// Función para verificar el token
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

// Usa el middleware de verificación de token
app.use(verificarToken);

// Aquí puedes agregar tus rutas para el CRUD de productos
// Ejemplo:
// app.get('/productos', (req, res) => {
//     // Lógica para obtener productos
// });

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
