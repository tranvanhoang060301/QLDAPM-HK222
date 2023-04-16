const createError = require('http-errors');
const Stalls = require('../models/Stall');
const brcypt = require('bcryptjs');
const { Query } = require('firefose');
const Beverages = require('../models/Bevarage');

class Stall {
    getStalls = async (req, res, next) => {
        try {
            const query = new Query();
            const stalls = await Stalls.find(query);
            res.status(200).json(stalls);
        } catch (error) {
            res.json(error.message);
        }
    }

    getStallById = async (req, res, next) => {
        try {
            const id = req.params.id;
            const stall = await Stalls.findById(id);
            res.status(200).json(stall);
        } catch (error) {
            res.json(error.message);
        }
    }

    getStallByBeverage = async (req, res, next) => {
        try {
            const beverageId = req.params.beverageId;
            const beverages = await Beverages.findById(beverageId);
            if(!beverages) return res.json(createError.NotFound("Beverage doesn't exist!"));
            const query = new Query().where('beverages', 'array-contains', beverages.id)
            const stalls = await Restaurants.find(query);
            console.log(stalls)
            res.status(200).json(stalls);

        } catch (error) {
            res.json(error.message);
        }
    }

    createStall = async (req, res, next) => {
        try {
            const stall = {
                name: req.body.name,
                address: req.body.address,
                dishs: req.body.dishs
            }
            const stallCreate = await Stalls.create(stall);
            res.status(201).json(stallCreate);
        } catch (error) {
            res.json(error.message);
        }
    }

    addBeverageForStall = async (req, res, next) => {
        try {
            const stallId = req.params.stallId;
            const beverageName = req.body.beverageName;
            const stall = await Restaurants.findById(stallId);
            if(!stall){
                return res.status(404).json(createError.NotFound("restaurant doesn't exists!"));
            }
            const query = new Query().where('name', '==', beverageName);
            const beverage = await Beverages.find(query);
            // const dishsOfRes = restaurant.dishs;
            if(beverage.length == 0) return res.json(createError.NotFound("Beverage doesn't exists!"));
            var listOfBeverage = [...stall.beverages, beverage[0].id];
            const data = await Restaurants.updateById(stall.id, {beverages: listOfBeverage});
            res.json(data);
        } catch (error) {
            res.json(error.message);
        }
    }
}

module.exports = new Stall();