const createError = require('http-errors');
const Restaurants = require('../models/Restaurant');
const brcypt = require('bcryptjs');
const { Query } = require('firefose');
const Dishs = require('../models/Dish');

class Restaurant {
    getRestaurants = async (req, res, next) => {
        try {
            const query = new Query();
            const restaurants = await Restaurants.find(query);
            res.status(200).json(restaurants);
        } catch (error) {
            res.json(error.message);
        }
    }

    getRestaurantById = async (req, res, next) => {
        try {
            const id = req.params.id;
            const restaurants = await Restaurants.findById(id);
            res.status(200).json(restaurants);
        } catch (error) {
            res.json(error.message);
        }
    }

    getRestaurantsByDish = async (req, res, next) => {
        try {
            const dishId = req.params.dishId;
            const dishes = await Dishs.findById(dishId);
            if(!dishes) return res.json(createError.NotFound("Dish doesn't exist!"));
            const query = new Query().where('dishs', 'array-contains', dishes.id)
            const restaurants = await Restaurants.find(query);
            console.log(restaurants)
            res.status(200).json(restaurants);

        } catch (error) {
            res.json(error.message);
        }
    }

    createRestaurant = async (req, res, next) => {
        try {
            const restaurant = {
                name: req.body.name,
                address: req.body.address,
                dishs: req.body.dishs
            }
            const restaurantCreate = await Restaurants.create(restaurant);
            res.status(201).json(restaurantCreate);
        } catch (error) {
            res.json(error.message);
        }
    }

    addDishForRestaurant = async (req, res, next) => {
        try {
            const restaurantId = req.params.restaurantId;
            const dishName = req.body.dishName;
            const restaurant = await Restaurants.findById(restaurantId);
            if(!restaurant){
                return res.status(404).json(createError.NotFound("restaurant doesn't exists!"));
            }
            const query = new Query().where('name', '==', dishName);
            const dish = await Dishs.find(query);
            // const dishsOfRes = restaurant.dishs;
            if(dish.length == 0) return res.json(createError.NotFound("Dish doesn't exists!"));
            var listOfDish = [...restaurant.dishs, dish[0].id];
            const data = await Restaurants.updateById(restaurant.id, {dishs: listOfDish});
            res.json(data);
        } catch (error) {
            res.json(error.message);
        }
    }
}

module.exports = new Restaurant();