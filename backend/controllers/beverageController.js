const createError = require('http-errors');
const Collection = require('../collection/collection');
const { Query } = require('firebase-admin');

class Beverage {
    getBeverages = async (req, res, next) => {
        try {
            const query = await Collection.beverageRef.get()
            const beverages = query.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            res.status(200).json(beverages)
        } catch (error) {
            return res.send(error.message);
        }
    }

    getBeveragehById = async (req, res, next) => {
        try {
            const id = req.params.id;
            const docRef = Collection.beverageRef.doc(id);
            const beverage = await docRef.get();
            if(!beverage.exists) return res.send(createError.NotFound("Beverage not found"));
            res.status(200).json({
                id: beverage.id,
                ...beverage.data()
            })
            res.status(200).json(beverage)
        } catch (error) {
            return res.send(error.message);
        }
    }

    createBeverage = async (req, res, next) => {
        try {
            const name = req.body.name;
            const query = await Collection.beverageRef.where('name', '==', name).get();
            if(!query.empty) return res.send(createError.BadRequest("Beverage already exists!"));
            const docRef = await Collection.beverageRef.add({ name });
            const newBeverage = await docRef.get();
            res.status(201).json({
                id: newBeverage.id,
                ...newBeverage.data()
            });
        } catch (error) {
            return res.send(error.message);
        }
    }

    deleteBeverageByName = async (req, res, next) => {
        try {
            const name = req.body.name;
            const query = await Collection.beverageRef.where('name', '==', name).get();
            if(query.empty) return res.json(createError.NotFound("Dish not found!"));
            const batch = await Collection.beverageRef.firestore.batch();
            query.forEach((doc) => batch.delete(doc.ref));
            await batch.commit();
            res.status(200).json({ message: "Dish deleted successfully" });
        } catch (error) {
            return res.send(error.message);
        }
    }

    deleteBeverageById = async (req, res, next) => {
        try {
            const id = req.params.id;
            const docRef = Collection.beverageRef.doc(id);
            const doc = await docRef.get();
            if(!doc.exists) return res.send(createError.NotFound("Beverage not found"));
            await docRef.delete();
            res.status(200).json({ message: "Dish deleted successfully" });
        } catch (error) {
            return res.send(error.message);
        }
    }
}

module.exports = new Beverage();