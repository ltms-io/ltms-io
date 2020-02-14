const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create User Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    accountCreated: {
        type: Date,
        default: Date.now,
    },
    eventAuthorizer: {
        type: Boolean,
        required: true,
    },
    userAuthorizer: {
        type: Boolean,
        default: false,
    },
});

//Create a model for the user scheme
const User = mongoose.model('users', UserSchema);

//Export
module.exports = User;