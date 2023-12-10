// Zulia Azalia Davis Ayala #20172001712
//Sergio Rolando Inestroza Amaya #20182002621
const express = require('express');
const morgan = require("morgan");
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { db } = require('./firebase');
const bodyParser = require('body-parser');

const app = express();


app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());


const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'Token no proporcionado' });
    }

    const tokenSinBearer = token.split(' ')[1]; 
    jwt.verify(token, 'tuSecretKey', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' });
        }

        req.usuario = decoded;
        next();
    });
};

app.post('/auth', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Buscar usuario por nombre de usuario
        const userQuerySnapshot = await db.collection('usuarios').where('username', '==', username).get();

        if (userQuerySnapshot.empty) {
            return res.status(401).send('Usuario no encontrado');
        }

        const userDoc = userQuerySnapshot.docs[0];
        const userData = userDoc.data();

        const isMatch = await bcrypt.compare(password, userData.password);


        if (isMatch) {
            const token = jwt.sign({ uid: user.id }, 'tuSecretKey', { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).send('Credenciales inválidas');
        }
    } catch (error) {
        console.error("Error al autenticar usuario:", error);
        res.status(500).send('Error en el servidor');
    }
});


app.use('/productos', verificarToken);

app.get('/productos', async (req, res) => {

    try {
        const querySnapshot = await db.collection('productos').get();
        const productos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.json(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).send('Error del servidor');
    } 
});

app.post('/productos', async (req, res) => {
    try {
        const nuevoProducto = req.body; // Asume que el cuerpo de la solicitud contiene los datos del nuevo producto
        const docRef = await db.collection('productos').add(nuevoProducto);

        res.status(201).send(`Producto creado con ID: ${docRef.id}`);
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).send('Error del servidor');
    }
});

app.put('/productos/:id', async (req, res) => {
    try {
        const idProducto = req.params.id;
        const datosProducto = req.body;

        await db.collection('productos').doc(idProducto).update(datosProducto);

        res.send(`Producto con ID: ${idProducto} actualizado`);
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).send('Error del servidor');
    }
   
});

app.delete('/productos/:id', async (req, res) => {
    try {
        const idProducto = req.params.id;

        await db.collection('productos').doc(idProducto).delete();

        res.send(`Producto con ID: ${idProducto} eliminado`);
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).send('Error del servidor');
    }
   
});


const port = 3001;
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

module.exports = app;
