const express = require('express');
const router = express.Router();
const User = require('../models/user-model');

/* GET */

//GET all users listings
router.get('/api/users', function (req, res, next) {
    User.find({}, (err, users) => {
        if(err) {
            res.status(500).send(err);
        }

        res.send(users);
    })
});

//GET specific user
router.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id).then(user => {
        if(!user) {
            res.status(404).send("user not found");
        }

        res.status(200).send(user);
    })
});

/* POST */

//POST new User
router.post('/api/users', (req, res) => {
    const newUser = new User({
        //TODO: ADD USER STUFF
    })

    //TODO: MORE PREP WORK FOR USER

    newUser.save().then(newUser => res.json(newUser)).catch(err => console.log(err));
});

/* PATCH */

//PATCH an existing user
//  -user id is supplied as URL param
//  -changes are supplied via body
//  -if no change to a field, don't send it
router.patch('/api/users/:id', (req, res) => {
    User.findById(req.params.id).then(user => {
        if(!user) {
            res.status(404).send("user not found");
            return;
        }

        if(req.body.name) {
            user.name = req.body.name;
        }

        if(req.body.email) { //TODO add email validator
            user.email = req.body.email;
        }

        if(req.body.password) { //TODO: NOTE: adding this becaue it is in schema but I do not think we need this as Auth0 is managing passwords
            //TODO
        }

        if(req.body.eventAuthorizer) { //TODO: add authorization to this
            user.eventAuthorizer = req.body.eventAuthorizer;
        }

        if(req.body.userAuthorizer) { //TODO: add authorization to this
            user.userAuthorizer = req.body.userAuthorizer;
        }

        user.save();

        res.status(200).send("changes made successfully");
    })
});

/* DELETE */

//DELETE user

router.delete('/api/users/:id', (req, res) => {
    //TODO: Actually add something
    res.status(501).send("not ready for that yet");
});

module.exports = router;
