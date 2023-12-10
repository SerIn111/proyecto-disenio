// Zulia Azalia Davis Ayala #20172001712
//Sergio Rolando Inestroza Amaya #20182002621
const express = require('express');
const morgan = require("morgan");
const {db} = require('./firebase')


const app = express();
app.use(morgan('dev'))


app.get('/', async (req, res) => {

    const querySnapshot = await db.collection('productos').get()
    console.log(querySnapshot.docs);
    res.send('Hello ')
});


module.exports = app;