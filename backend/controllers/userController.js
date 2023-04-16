const createError = require('http-errors');
const brcypt = require('bcryptjs');
const { Query } = require('firefose');
const Users = require('../models/User');
const Restaurants = require('../models/Restaurant');
const Stalls = require("../models/Stall");

class User {
    hashPassword = async (password) => {
        return await brcypt.hash(password, 12);
    }

    checkPassword = async (providedPassword, userPassword) => {
        return await brcypt.compare(providedPassword, userPassword);
    }

    register = async (req, res, next) => {
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        }

        const query = new Query().where('email', '==', user.email);
        const checkUser = await Users.find(query);
        if(checkUser.length > 0){
            return res.json(createError.BadRequest("User already exist!"));
        }

        if(user.password !== user.confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password doesn't match!"
            });
        }

        if(user.password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be a string with at least 6 characters"
            })
        }
        const password = await this.hashPassword(user.password)
        const userCreatedResponse = await Users.create({
            name: user.name,
            email: user.email,
            password: password
        })

        res.status(201).json({
            success: true,
            message: "User created",
            userCreatedResponse
        })
    }

    login = async (req, res, next) => {
        try {
            if(!req.body.email || !req.body.password){
                return res.json(createError.BadRequest("Email and password are required!"));
            }
            const query = new Query().where('email', '==', req.body.email);
            const user = await Users.find(query);
            if(user.length === 0){
                return res.status(401).json(createError.Unauthorized("User not found!"));
            }
            const isValid = await this.checkPassword(req.body.password, user[0].password)
            if(!isValid){
                return res.status(401).json(createError.Unauthorized("Paswword incorrect!"));
            }
            res.status(200).json(user);
        } catch (error) {
            return error.message;
        }
    }

    addFavoriteRes = async (req, res, next) => {
        const userId = req.params.userId;
        const user = await Users.findById(userId);
        const resName = req.body.resName;
        const query = new Query().where('name', '==', resName);
        const restaurant = await Restaurants.find(query);
        if(restaurant.length == 0) return res.json(createError.NotFound("Dish doesn't exist!"));
        var favoriteRes = [...user.favoriteRes, restaurant.id];
        const data = await Users.updateById(userId, {favoriteRes: favoriteRes});
        res.json(data);
    }

    addFavoriteStall = async (req, res, next) => {
        const userId = req.params.userId;
        const user = await Users.findById(userId);
        const stallName = req.body.stallName;
        const query = new Query().where('name', '==', stallName);
        const stall = await Stalls.find(query);
        if(stall.length == 0) return res.json(createError.NotFound("Beverage doesn't exist!"));
        var favoriteStalls = [...user.favoriteStalls, stall.id];
        const data = await Users.updateById(userId, {favoriteStalls: favoriteStalls});
        res.json(data);
    }
}

module.exports = new User();