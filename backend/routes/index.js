const express = require('express');
const router = express.Router();

const User = require('../controllers/userController');
const Restaurant = require('../controllers/restaurantController');
const Dish = require('../controllers/dishController');
const Beverage = require('../controllers/beverageController');
const Stall = require('../controllers/stallController');

// router.get('/', (req, res) => {
//     res.send('Welcome to BKVenue!!!!');
// });

// User authentication
router.post("/user/register", User.register);  // đăng ký
router.post("/user/login", User.login);     // đăng nhập

// Dish controller
router.get("/dish", Dish.getDishs);     // Trả về tất cả các món ăn
router.get("/dish/:id", Dish.getDishById);  // Trả về món ăn theo id
router.post("/dish", Dish.createDish);  // Tạo món ăn

// Restaurant controller
router.get("/restaurant", Restaurant.getRestaurants);   // Tả về tất cả các quán ăn
router.get("/restaurant/:id", Restaurant.getRestaurantById);    // Trả về quán ăn theo id
router.get("/restaurant/findbydish/:dishId", Restaurant.getRestaurantsByDish);  // Trả về các quán ăn có chứa món ăn cần tìm
router.post("/restaurant", Restaurant.createRestaurant);    // Tạo quán ăn
router.patch("/restaurant/:restaurantId", Restaurant.addDishForRestaurant);     // Thêm món ăn cho quán ăn

// Beverage controller
router.get("/beverage", Beverage.getBeverages); // Trả về tất cả đồ uống
router.get("/beverage/:id", Beverage.getBeveragehById);     // Trả về đồ uống theo id
router.post("/beverage", Beverage.createBeverage);  // Tạo đồ uống


// Stall controller
router.get("/stall", Stall.getStalls);  // Trả về tất cả quán nước
router.get("/stall/:id", Stall.getStallById);   // Trả về quán nước theo id
router.get("/stall/findbybeverage/:beverageId", Stall.getStallByBeverage);  // Trả về các quán nước có chưa đồ uống cần tìm
router.post("/stall", Stall.createStall);   // Tạo quán nước
router.patch("/stall/:stallId", Stall.addBeverageForStall); // Thêm đồ uống cho quán nước

module.exports = router;