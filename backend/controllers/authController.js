const createError = require('http-errors');
const Collection = require('../collection/collection');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const { initializeApp } = require('firebase/app');

const firebaseConfig = {
    apiKey: "AIzaSyD3qokrwT6fe33EFAuPK8_lFd2BpKXZNCY",
    authDomain: "bkvenue-e8f5d.firebaseapp.com",
    projectId: "bkvenue-e8f5d",
    storageBucket: "bkvenue-e8f5d.appspot.com",
    messagingSenderId: "661970574673",
    appId: "1:661970574673:web:911d5429c6b78236300770"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

class Auth {
    createFavoriteCollection = async (userId) => {
        await Collection.favoriteRef.add({
            userId,
            restaurants: [],
            stalls: []
        })
    }

    register = async (req, res, next) => {
        try {
            const { email, password, confirmPassword } = req.body;
            if(password !== confirmPassword) return res.send(createError.BadRequest("Password doesn't match"));

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;
            this.createFavoriteCollection(uid);
            res.status(201).json({
                uid,
                email
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const userRecord = await signInWithEmailAndPassword(auth, email, password);
            const uid = userRecord.user.uid;
            res.status(200).json({
                uid,
                email,
                accessToken: userRecord.user.stsTokenManager.accessToken,
                refreshToken: userRecord.user.stsTokenManager.refreshToken
            });
        } catch (error) {
            res.send(error.message)
        }
    }
}

module.exports = new Auth();