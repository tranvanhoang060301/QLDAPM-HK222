const admin = require('firebase-admin');
const serviceAccount = require('../creds.json');

// Initialize the Firebase Admin SDK with a service account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Get a reference to the Firestore database
const db = admin.firestore();

const firebaseConfig = {
    apiKey: "AIzaSyD3qokrwT6fe33EFAuPK8_lFd2BpKXZNCY",
    authDomain: "bkvenue-e8f5d.firebaseapp.com",
    projectId: "bkvenue-e8f5d",
    storageBucket: "bkvenue-e8f5d.appspot.com",
    messagingSenderId: "661970574673",
    appId: "1:661970574673:web:911d5429c6b78236300770"
};

// Export the Firestore database and dishes collection
module.exports = { db, firebaseConfig };