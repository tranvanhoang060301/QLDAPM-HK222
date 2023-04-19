const { Schema, SchemaTypes, Model } = require('firefose');
const { String, Number, Array } = SchemaTypes;

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true});

const Dishs = new Model("dishs", dishSchema);
module.exports = Dishs;