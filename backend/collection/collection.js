const { db } = require('../config/firebase');

class Collection {
    dishesRef = db.collection('dishes');
    beverageRef = db.collection('beverages');
    restaurantRef = db.collection('restaurants');
    stallRef = db.collection('stalls');
    favoriteRef = db.collection('favorites');
}

module.exports = new Collection();