// Zulia Azalia Davis Ayala #20172001712
//Sergio Rolando Inestroza Amaya #20182002621
require('dotenv').config();
const admin = require('firebase-admin');
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp({
   credential: applicationDefault()
   // Aquí puedes agregar otras opciones si es necesario
});

const db = getFirestore();

module.exports = { admin, db };



