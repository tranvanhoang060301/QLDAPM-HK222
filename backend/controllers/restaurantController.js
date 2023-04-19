const createError = require('http-errors');
const Collection = require('../collection/collection');
const Photo = require('../config/photo');
const { firebaseConfig } = require('../config/firebase');
const admin = require('firebase-admin');
const { ref, getDownloadURL, uploadBytesResumable, getStorage } = require('firebase/storage');
const { initializeApp } = require('firebase/app');

initializeApp(firebaseConfig);
const storage = getStorage();

class Restaurant {
    getRestaurants = async (req, res, next) => {
        try {
            const query = await Collection.restaurantRef.get()
            const restaurants = query.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            res.status(200).json(restaurants)
        } catch (error) {
            res.json(error.message);
        }
    }

    getRestaurantById = async (req, res, next) => {
        try {
            const id = req.params.id;
            const docRef = Collection.restaurantRef.doc(id);
            const restaurant = await docRef.get();
            if(!restaurant.exists) return res.send(createError.NotFound("Restaurant not found"));
            res.status(200).json({
                id: restaurant.id,
                ...restaurant.data()
            })
            res.status(200).json(restaurant);
        } catch (error) {
            res.json(error.message);
        }
    }

    getRestaurantsByDish = async (req, res, next) => {
        try {
            const dishId = req.params.dishId;
            const docRef = Collection.restaurantRef.doc(dishId);
            const dish = docRef.get();
            if(!dish) return res.json(createError.NotFound("Dish not found!"));
            const query = await Collection.restaurantRef.where('dishes', 'array-contains', dishId).get();
            const restaurants = query.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            res.status(200).json(restaurants);

        } catch (error) {
            res.json(error.message);
        }
    }

    createRestaurant = async (req, res, next) => {
        try {
            // Get the restaurant data from the request body
            const { name, address, dishes } = req.body;

            // Check if the restaurant name already exists
            const snapshot = await Collection.restaurantRef.where('name', '==', name).get();
            if (!snapshot.empty) {
                return res.status(400).send(createError.BadRequest(`A restaurant with the name ${name} already exists`));
            }

            // Create the restaurant document in Firestore
            const restaurantRef = await Collection.restaurantRef.add({
                name,
                address,
                dishes,
                imageUrl: ''
            });

            // Return the created restaurant document as the response
            const restaurant = await restaurantRef.get();
            res.status(201).json({
                id: restaurant.id,
                ...restaurant.data()
            });
        } catch (error) {
            console.log(error.message)
            res.send(error);
        }
    }

    uploadPhoto = async (req, res, next) => {
        try {
            const restaurantId = req.params.restaurantId;
            const restaurantRef = Collection.restaurantRef.doc(restaurantId);
            const restaurant = await restaurantRef.get();
            if (!restaurant.exists) {
                return res.status(404).json(createError.NotFound("Restaurant doesn't exist"));
            }
            
            const dateTime = Photo.giveCurrentDateTime();

            const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);

            // Create file metadata including the content type
            const metadata = {
                contentType: req.file.mimetype,
            };

            // Upload the file in the bucket storage
            const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
            //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

            // Grab the public url
            const downloadURL = await getDownloadURL(snapshot.ref);

            restaurantRef.update({
                imageUrl: downloadURL
            })

            res.status(200).json(downloadURL)
            
        } catch (error) {
            res.json(error.message);
        }
    }

    addDishForRestaurant = async (req, res, next) => {
        try {
            const restaurantId = req.params.restaurantId;
            const dishName = req.body.dishName;

            // Find the restaurant by ID
            const restaurant = await Collection.restaurantRef.doc(restaurantId).get();
            if (!restaurant.exists) {
                return res.status(404).json(createError.NotFound("Restaurant doesn't exist"));
            }

            // Find the dish by ID
            const dish = await Collection.dishesRef.where('name', '==', dishName).get();
            if (dish.empty) {
                return res.status(404).json(createError.NotFound("Dish doesn't exist"));
            }

            // Update the restaurant document to add the dish ID to the dishes array
            const restaurantRef = Collection.restaurantRef.doc(restaurantId);
            await restaurantRef.update({
                dishes: admin.firestore.FieldValue.arrayUnion(dish.docs[0].id)
            });

            // Return the updated restaurant document as the response
            const updatedRestaurant = await restaurantRef.get();
            res.json({
                id: updatedRestaurant.id,
                ...updatedRestaurant.data()
            });
        } catch (error) {
            res.json(error.message);
        }
    }

    removeDishFromRestaurant = async (req, res, next) => {
        const restaurantId = req.params.restaurantId;
        const dishName = req.body.dishName;
        const restaurantRef = Collection.restaurantRef.doc(restaurantId);
    
        try {
            const restaurant = await restaurantRef.get();
    
            if (!restaurant.exists) {
                return res.status(404).json(createError.NotFound("Restaurant doesn't exist"));
            }
    
            const dishQuery = Collection.dishesRef.where('name', '==', dishName);
            const dishes = await dishQuery.get();
    
            if (dishes.empty) {
                return res.status(404).json(createError.NotFound("Dish doesn't exist"));
            }
    
            const dishId = dishes.docs[0].id;
            const dishesArr = restaurant.data().dishes;
    
            if (!dishesArr.includes(dishId)) {
                return res.status(400).json(createError.BadRequest("Dish is not in the restaurant"));
            }
            
            const updatedDishesArr = dishesArr.filter((dish) => dish !== dishId);
            await restaurantRef.update({ dishes: updatedDishesArr });
    
            return res.json({
                message: 'Dish successfully removed from restaurant'
            });
        } catch (error) {
            return res.status(500).json(createError.InternalServerError(error.message));
        }
    };
    
}

module.exports = new Restaurant();