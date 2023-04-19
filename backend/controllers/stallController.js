const createError = require('http-errors');
const Collection = require('../collection/collection');
const Photo = require('../config/photo');
const { firebaseConfig } = require('../config/firebase');
const admin = require('firebase-admin');
const { ref, getDownloadURL, uploadBytesResumable, getStorage } = require('firebase/storage');
const { initializeApp } = require('firebase/app');

initializeApp(firebaseConfig);
const storage = getStorage();

class Stall {
    getStalls = async (req, res, next) => {
        try {
            const query = await Collection.stallRef.get()
            const stalls = query.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            res.status(200).json(stalls);
        } catch (error) {
            res.json(error.message);
        }
    }

    getStallById = async (req, res, next) => {
        try {
            const id = req.params.id;
            const docRef = Collection.stallRef.doc(id);
            const stall = await docRef.get();
            if(!stall.exists) return res.send(createError.NotFound("Stall not found"));
            res.status(200).json({
                id: stall.id,
                ...stall.data()
            })
        } catch (error) {
            res.json(error.message);
        }
    }

    getStallByBeverage = async (req, res, next) => {
        try {
            const beverageId = req.params.beverageId;
            const docRef = Collection.stallRef.doc(beverageId);
            const beverage = docRef.get();
            if(!beverage) return res.json(createError.NotFound("Beverage not found!"));
            const query = await Collection.stallRef.where('beverages', 'array-contains', beverageId).get();
            const stalls = query.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            res.status(200).json(stalls);

        } catch (error) {
            res.json(error.message);
        }
    }

    createStall = async (req, res, next) => {
        try {
            // Get the stall data from the request body
            const { name, address, beverages } = req.body;


            // Check if the stall name already exists
            const snapshot = await Collection.stallRef.where('name', '==', name).get();
            if (!snapshot.empty) {
                return res.status(400).send(createError.BadRequest(`A stall with the name ${name} already exists`));
            }

            // Create the stall document in Firestore
            const stallRef = await Collection.stallRef.add({
                name,
                address,
                beverages,
                imageUrl: ''
            });

            // Return the created stall document as the response
            const stall = await stallRef.get();
            res.status(201).json({
                id: stall.id,
                ...stall.data()
            });
        } catch (error) {
            console.log(error.message)
            res.send(error);
        }
    }

    uploadPhoto = async (req, res, next) => {
        try {
            const stallId = req.params.stallId;
            const stallRef = Collection.stallRef.doc(stallId);
            const stall = await stallRef.get();
            if (!stall.exists) {
                return res.status(404).json(createError.NotFound("Stall doesn't exist"));
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

            stallRef.update({
                imageUrl: downloadURL
            })

            res.status(200).json(downloadURL)
            
        } catch (error) {
            res.json(error.message);
        }
    }

    addBeverageForStall = async (req, res, next) => {
        try {
            const stallId = req.params.stallId;
            const beverageName = req.body.beverageName;

            // Find the stall by ID
            const stall = await Collection.stallRef.doc(stallId).get();
            if (!stall.exists) {
                return res.status(404).json(createError.NotFound("Stall doesn't exist"));
            }

            // Find the dish by ID
            const beverage = await Collection.beverageRef.where('name', '==', beverageName).get();
            if (beverage.empty) {
                return res.status(404).json(createError.NotFound("Beverage doesn't exist"));
            }

            // Update the stall document to add the dish ID to the beverages array
            const stallRef = Collection.stallRef.doc(stallId);
            await stallRef.update({
                beverages: admin.firestore.FieldValue.arrayUnion(beverage.docs[0].id)
            });

            // Return the updated stall document as the response
            const updatedStall = await stallRef.get();
            res.json({
                id: updatedStall.id,
                ...updatedStall.data()
            });
        } catch (error) {
            res.json(error.message);
        }
    }

    removeBeverageFromStall = async (req, res, next) => {
        const stallId = req.params.stallId;
        const beverageName = req.body.beverageName;
        const stallRef = Collection.stallRef.doc(stallId);
    
        try {
            const stall = await stallRef.get();
    
            if (!stall.exists) {
                return res.status(404).json(createError.NotFound("Stall doesn't exist"));
            }
    
            const beverageQuery = Collection.beverageRef.where('name', '==', beverageName);
            const beverages = await beverageQuery.get();
    
            if (beverages.empty) {
                return res.status(404).json(createError.NotFound("Beverage doesn't exist"));
            }
    
            const beverageId = beverages.docs[0].id;
            const beverageArr = stall.data().beverages;
    
            if (!beverageArr.includes(beverageId)) {
                return res.status(400).json(createError.BadRequest("Beverage is not in the stall"));
            }
            
            const updatedBeveragesArr = beverageArr.filter((beverage) => beverage !== beverageId);
            await stallRef.update({ beverages: updatedBeveragesArr });
    
            return res.json({
                message: 'Beverage successfully removed from stall'
            });
        } catch (error) {
            return res.status(500).json(createError.InternalServerError(error.message));
        }
    }
}

module.exports = new Stall();