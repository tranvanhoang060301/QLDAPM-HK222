const { Schema, SchemaTypes, Model } = require('firefose');
const { String, Object, Array } = SchemaTypes;

const stallSchema = new Schema({
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
    beverages: {
        type: Array,
        default: []
    }

}, {timestamps: true});

const Stalls = new Model("stalls", stallSchema);
module.exports = Stalls;