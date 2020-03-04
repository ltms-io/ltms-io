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
<<<<<<< HEAD
    auth0id: {
=======
    authID: {
>>>>>>> 101-4-maintain-author
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
    profilePic: {
        is_azure: {
            type: Boolean,
            default: false,
        },
        imgUrl: {
            type: String,
        },
        thumbUrl: {
            type: String,
        },
    },
});

//Create a model for the user schema
const User = mongoose.model('users', UserSchema);

//Export
module.exports = User;