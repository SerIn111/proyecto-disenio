const app = require('./app'); // Importa la instancia de app desde app.js
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const port = 3000;

app.use(bodyParser.json());


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


app.use(verificarToken);

;

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
