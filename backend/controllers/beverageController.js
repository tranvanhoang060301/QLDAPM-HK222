const createError = require('http-errors');
const Beverages = require('../models/Dish');
const brcypt = require('bcryptjs');
const { Query } = require('firefose');

class Beverage {
    getBeverages = async (req, res, next) => {
        try {
            const query = new Query();
            const beverages = await Beverages.find(query);
            res.status(200).json(beverages)
        } catch (error) {
            return res.send(error.message);
        }
    }

    getBeveragehById = async (req, res, next) => {
        try {
            const id = req.params.id;
            const beverage = await Beverages.findById(id);
            // const dish = await Dishs.findById(id);
            res.status(200).json(beverage)
        } catch (error) {
            return res.send(error.message);
        }
    }

    createBeverage = async (req, res, next) => {
        try {
            const name = req.body.name;
            const query = new Query().where('name', '==', name);
            const checkBeverage = await Beverages.find(query);
            if(checkBeverage.length > 0) return res.json(createError.BadRequest("Beverage already exists!"));
            const newBeverage = await Beverages.create({name: name});
            res.status(201).json(newBeverage);
        } catch (error) {
            return res.send(error.message);
        }
    }
}

module.exports = new Beverage();