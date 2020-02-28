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

//GET specific user
router.get('/auth/:token', (req, res) => {
    const accessToken = req.params.token;
    console.log(accessToken);
    const authString = 'Bearer ' + accessToken;
    console.log(authString);

    axios({method: 'get',
           url: 'https://dev-s68c-q-y.auth0.com/userinfo',
           headers: {
               'uthorization': `Bearer ${accessToken}`,
            }
        }).then((userDataResponse) => {
            console.log('FUN!');
            console.log(userDataResponse);
            return res.status(200).send("yee");
        //Destruct the  data from  from auth0
        //const { name, nickname, email, picture, sub } = userDataResponse.data;
        // console.log(userDataResponse.data);
        // res.status(200).send(userDataResponse.data);
        // console.log('user data--------', userDataResponse.data);
        // res.status(200).json({message: 'mEssages'})
        // User.findOne({auth0_id: sub}, (err, user) => {
        //     if(err) console.log('Login Error--------------', err);

        //     //If the user is undefined.
        //     if(!user) { 
        //         //Create a new user. 
        //         let newUser = new User({
        //             name: name,
        //             email: email,
        //             username: nickname,
        //             profile_picture: picture,
        //             auth0_id: sub,
        //             //For now set it to true, then after you login set it to false, so other users are not considered the admin.
        //             // is_admin: true 
        //             is_admin: false
        //         });
        //         //Assign the user to the session.
        //         req.session.user = newUser;
        //         //Save the session
        //         req.session.save();
        //         //Save the newUser instance to mongodb
        //         newUser.save();
        //     } 
        //     req.session.user = user;
        //     req.session.save();
        //     res.redirect('/');
        // })
    }).catch(err => console.log('Auth0 get user info Error------------', err)).then(()=>{console.log("FML")});


    //res.status(400).send("Oops");
    // User.findById(req.params.token).then(user => {
    //     if(!user) {
    //         return res.status(404).send("user not found");
    //     }

    //     return res.status(200).send(user);
    // })
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
                password: req.body.password,
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
router.patch('/:id', (req, res) => {
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
