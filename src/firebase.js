// Zulia Azalia Davis Ayala #20172001712
//Sergio Rolando Inestroza Amaya #20182002621
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-admin-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tienda-c8261-default-rtdb.firebaseio.com/'
});