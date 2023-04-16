const createError = require('http-errors');
const Dishs = require('../models/Dish');
const brcypt = require('bcryptjs');
const { Query } = require('firefose');

class Dish {
    getDishs = async (req, res, next) => {
        try {
            const query = new Query();
            const dishs = await Dishs.find(query);
            res.status(200).json(dishs)
        } catch (error) {
            return res.send(error.message);
        }
    }

    getDishById = async (req, res, next) => {
        try {
            const id = req.params.id;
            const dish = await Dishs.findById(id);
            // const dish = await Dishs.findById(id);
            res.status(200).json(dish)
        } catch (error) {
            return res.send(error.message);
        }
    }

    createDish = async (req, res, next) => {
        try {
            const name = req.body.name;
            const query = new Query().where('name', '==', name);
            const checkDish = await Dishs.find(query);
            if(checkDish.length > 0) return res.json(createError.BadRequest("Dish already exists!"));
            const newDish = await Dishs.create({name: name});
            res.status(201).json(newDish);
        } catch (error) {
            return res.send(error.message);
        }
    }
}

module.exports = new Dish();