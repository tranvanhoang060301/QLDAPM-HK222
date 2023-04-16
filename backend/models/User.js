const { Schema, SchemaTypes, Model } = require('firefose');
const { String, ObjectId, Array } = SchemaTypes;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    favoriteRes: {
        type: Array,
        default: []
    },
    favoriteStalls: {
        type: Array,
        default: []
    }
}, {timestamps: true});

const Users = new Model("users", userSchema);
module.exports = Users;