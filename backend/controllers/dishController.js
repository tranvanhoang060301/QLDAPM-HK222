const createError = require('http-errors');
const Collection = require('../collection/collection');

class Dish {
    getDishes = async (req, res, next) => {
        try {
            const query = await Collection.dishesRef.get()
            const dishes = query.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            
            res.status(200).json(dishes)
        } catch (error) {
            return res.send(error.message);
        }
    }

    getDishById = async (req, res, next) => {
        try {
            const id = req.params.id;
            const docRef = Collection.dishesRef.doc(id);
            const dish = await docRef.get();
            if(!dish.exists) return res.send(createError.NotFound("Dish not found"));
            res.status(200).json({
                id: dish.id,
                ...dish.data()
            })
        } catch (error) {
            return res.send(error.message);
        }
    }

    createDish = async (req, res, next) => {
        try {
            const name = req.body.name;
            const query = await Collection.dishesRef.where('name', '==', name).get();
            if(!query.empty) return res.send(createError.BadRequest("Dish already exists!"));
            const docRef = await Collection.dishesRef.add({ name });
            const newDish = await docRef.get();
            res.status(201).json({
                id: newDish.id,
                ...newDish.data()
            });
        } catch (error) {
            return res.send(error.message);
        }
    }

    deleteDishByName = async (req, res, next) => {
        try {
            const name = req.body.name;
            const query = await Collection.dishesRef.where('name', '==', name).get();
            if(query.empty) return res.json(createError.NotFound("Dish not found!"));
            const batch = await Collection.dishesRef.firestore.batch();
            query.forEach((doc) => batch.delete(doc.ref));
            await batch.commit();
            res.status(200).json("Successful delete");
        } catch (error) {
            return res.send(error.message);
        }
    }

    deleteDishById = async (req, res, next) => {
        try {
            const id = req.params.id;
            const docRef = Collection.dishesRef.doc(id);
            const doc = await docRef.get();
            if(!doc.exists) return res.send(createError.NotFound("Dish not found"));
            await docRef.delete();
            res.status(200).json({ message: "Dish deleted successfully" });
        } catch (error) {
            return res.send(error.message);
        }
    }
}

module.exports = new Dish();