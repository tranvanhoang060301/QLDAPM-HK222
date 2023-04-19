const Collection = require('../collection/collection');
const admin = require('firebase-admin');
const createError = require('http-errors');

class Favorite {
    addFavoriteRes = async (req, res, next) => {
        try {
            const userId = req.params.userId;
            const restaurantId = req.body.restaurantId;

            // Find user by userId
            const user = await admin.auth().getUser(userId);

            // Find the restaurant by ID
            const restaurant = await Collection.restaurantRef.doc(restaurantId).get();
            if (!restaurant.exists) {
                return res.status(404).json(createError.NotFound("Restaurant doesn't exist"));
            }

            // Update the restaurant document to add the dish ID to the dishes array
            // Update the restaurant document to add the dish ID to the dishes array
            const favoriteRef = await Collection.favoriteRef.where('userId', '==', userId).get();
            const resRef = Collection.favoriteRef.doc(favoriteRef.docs[0].id);
            await resRef.update({ restaurants: admin.firestore.FieldValue.arrayUnion(restaurantId) });

            const response = await resRef.get();

            res.status(200).json({
                id: response.id,
                ...response.data()
            })
        } catch (error) {
            if(error.code === 'auth/user-not-found') return res.send(createError.NotFound('User not found'));
            res.send(error.message);
        }
    }

    addFavoriteStall = async (req, res, next) => {
        try {
            const userId = req.params.userId;
            const stallId = req.body.stallId;

            // Find user by userId
            const user = await admin.auth().getUser(userId);

            // Find the restaurant by ID
            const stall = await Collection.stallRef.doc(stallId).get();
            if (!stall.exists) {
                return res.status(404).json(createError.NotFound("Stall doesn't exist"));
            }

            // Update the restaurant document to add the dish ID to the dishes array
            const favoriteRef = await Collection.favoriteRef.where('userId', '==', userId).get();
            const resRef = Collection.favoriteRef.doc(favoriteRef.docs[0].id);
            await resRef.update({ stalls: admin.firestore.FieldValue.arrayUnion(stallId) });

            const response = await resRef.get();

            res.status(200).json({
                id: response.id,
                ...response.data()
            })

        } catch (error) {
            if(error.code === 'auth/user-not-found') return res.send(createError.NotFound('User not found'));
            res.send(error.message);
        }
    }

}

module.exports = new Favorite();