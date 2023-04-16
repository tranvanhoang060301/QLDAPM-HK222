// const { initializeApp, cert } = require('firebase-admin/app');
// const { getFirestore } = require('firebase-admin/firestore');

// const serviceAccount = require('../creds.json');

// initializeApp({
//     credential: cert(serviceAccount),
// })

// const db = getFirestore()

// module.exports = { db };

const { connect } = require('firefose');
const serviceAccount = require('../creds.json');

connect(serviceAccount, "databaseURI");
module.exports = { connect };