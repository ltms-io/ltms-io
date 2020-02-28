const express = require('express');
const router = express.Router();
const User = require('../models/user-model');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/* GET */

//GET all users listings
router.get('/', (req, res, next) => {
    User.find({}, (err, users) => {
        if(err) {
            res.status(500).send(err);
        }

        res.send(users);
    })
});

//POST specific user
router.post('/auth', (req, res) => {
    const userinfo = req.body.data;
    console.log(userinfo);

    User.findOne({auth0id: userinfo.sub}).then((user) => {
        if (!user) {
            console.log("Creating user");
            const createdUser = new User({
                name: userinfo.name,
                email: userinfo.email,
                auth0id: userinfo.sub,
                eventAuthorizer: false,
                userAuthorizer: false
            });
            createdUser.save().then((user) => {
                res.send(user)
            }).catch((err) => {
                console.log(err)
            });
        }
        else {
            console.log("User already exists!")
            res.status(200).send(user);
        }
    });
});

//GET specific user
router.get('/:id', (req, res) => {
    User.findById(req.params.id).then(user => {
        if(!user) {
            return res.status(404).send("user not found");
        }

        return res.status(200).send(user);
    })
});

/* POST */

router.post("/register", (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).send("Need email and name at minimum");
    }

    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            return res.status(400).send("User email exists");
        }
        else {
            const createdUser = new User({
                name: req.body.name,
                email: req.body.email,
                auth0id: 'meh',
                eventAuthorizer: req.body.eventAuthorizer,
                userAuthorizer: req.body.userAuthorizer
            });
            createdUser.save().then((user) => res.send(user)).catch((err) => console.log(err));
        }
    });
});

/* PATCH */

//PATCH an existing user
//  -user id is supplied as URL param
//  -changes are supplied via body
//  -if no change to a field, don't send it
router.patch('/updateuser', (req, res) => {
    if(Object.keys(req.body).length == 0) {
        return res.status(400).send("body is empty");
    }

    User.findById(req.params.id).then((user) => {
        if(!user) {
            return res.status(404).send("user not found");
        }

        summaryOfChanges = '';

        if(req.body.name) {
            user.name = req.body.name;
            summaryOfChanges += `•Name has been updated to ${req.body.name}\n`
        }

        if(req.body.email) { //TODO add email validator
            user.email = req.body.email;
            summaryOfChanges += `•Email has been updated to ${req.body.email}\n` //TODO: maybe ask to confirm on old email if this is the case?
        }

        if(req.body.eventAuthorizer) { //TODO: add authorization to this
            user.eventAuthorizer = req.body.eventAuthorizer;
            summaryOfChanges += "•You have been authorized to create official events.\n"
        }

        if(req.body.userAuthorizer) { //TODO: add authorization to this
            user.userAuthorizer = req.body.userAuthorizer;
            summaryOfChanges += "•You have been authorized to authorize other users to create official events.\n"
        }

        user.save().then((user) => res.send(user)).catch((err) => console.log(err)); //TODO: as a .then() or an await?

        const msg = {
            to: req.body.email,
            from: 'noreply@ltmsio.codes',
            subject: 'Changes have been made to your account',
            text: summaryOfChanges,
            html: summaryOfChanges,
        };

        console.log(msg);

        sgMail.send(msg).then(() => {
            res.status(200).send("changes made successfully");
        }).catch(err => {
            console.log(err)
            res.status(500).send(err);
        });
    })
});

/* DELETE */

//DELETE user

router.delete('/:id', (req, res) => {
    User.findOneAndDelete({_id: req.params.id}, (err) => {
        if (err) {
            res.status(501).send("Server error.");
        }
        else {
            res.status(200).send("User eradicated");
        }
    });
});

module.exports = router;
