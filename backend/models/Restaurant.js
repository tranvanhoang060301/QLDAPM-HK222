const { Schema, SchemaTypes, Model } = require('firefose');
const { String, Object, Array } = SchemaTypes;

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: Object,
        // num: String,
        // street: String,
        // ward: String,
        // district: String,
        default: {
            num: '268',
            street: 'Lý Thường Kiệt',
            ward: '14',
            district: '10'
        }
    },
    dishs: {
        type: Array,
        default: []
    }

}, {timestamps: true});

const Restaurants = new Model("restaurants", restaurantSchema);
module.exports = Restaurants;