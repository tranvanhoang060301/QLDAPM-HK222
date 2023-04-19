const { Schema, SchemaTypes, Model } = require('firefose');
const { String, Number, Array } = SchemaTypes;

const beverageSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true});

const Beverages = new Model("beverages", beverageSchema);
module.exports = Beverages;