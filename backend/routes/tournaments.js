const express = require('express');
const router = express.Router();
const Tournament = require('../models/tournament-model');
const User = require('../models/user-model');

/* GET all tournaments listing. */
router.get('/', (req, res) => {
    Tournament.find({}, (err, tournaments) => {
        if (err) {
            return res.status(404).send(err);
        }

        return res.status(200).send(tournaments);
    });
});


/* GET tournament listing. */
router.get('/:id', (req, res) => {
    Tournament.findById(req.params.id).then((tournaments) => {
        if (!tournaments) {
            return res.status(404).send("No such tournament found");
        }

        return res.status(200).send(tournaments);
    });
});


/* GET tournaments by user id */
router.post('/user', (req, res) => {
    User.findOne({ auth0id: req.body.auth0id })
    .then((user) => {
        if (user) {
            Tournament.find({director: user._id})
            .then((tournaments) => {
                res.status(200).send(tournaments);
            }).catch((err) => {
                res.status(500).send(err);
            })
        }  
        else {
            res.status(404).send("No such user found");
        } 
    })
    .catch((err) => {
        res.status(500).send(err);
    })
});

/* POST register new tournament */
router.post('/register', (req, res) => {
    if (!req.body.auth0id || !req.body.fieldsCount) {
        return res.status(400).json("errors");
    }

    User.findOne({auth0id: req.body.auth0id}).then((user) => {
        if (false) { //TODO: Add a check for recent tournament created by user
            return res.status(400).send("Tournament recently ceated");
        }
        else {
            var tournamentDetails = {
                director: user._id,
                fieldsCount: req.body.fieldsCount
            }

            if (req.body.name) {
                tournamentDetails.name = req.body.name;
            }

            if (req.body.teams) {
                tournamentDetails.teams = req.body.teams;
            }

            if (req.body.officialEventFlag) {
                tournamentDetails.officialEventFlag = req.body.officialEventFlag;
            }

            if (req.body.volunteers) {
                tournamentDetails.volunteers = req.body.volunteers;
            }

            if (req.body.fieldsCount) {
                tournamentDetails.fieldsCount = req.body.fieldsCount;
            }

            if (req.body.matchesPerTeam) {
                tournamentDetails.matchesPerTeam = req.body.matchesPerTeam;
            }

            if (req.body.startDate) {
                tournamentDetails.startDate = req.body.startDate;
            }

            if (req.body.endDate) {
                tournamentDetails.startDate = req.body.endDate;
            }

            const createdTournament = new Tournament(tournamentDetails);
            createdTournament.save().then((tournament) => res.send(tournament)).catch((err) => console.log(err));
        }
    }).catch((err) => {
        res.status(404).send("Your user id was invalid!");
    })
});

/* PATCH specific tournament. */
router.patch('/:id', (req, res) => {
    // if (!req.headers.auth) { // TODO: replace with correct authorization field or auth handler module
    //     res.status(401).send('Authorization invalid');
    //     return;
    // }
    
    Tournament.findById(req.params.id).then((tournament) => {
        if (req.body.director /* && CURRENT USER IS DIRECTOR */) {
            tournament.director = req.body.director;
        }

        if (req.body.name) {
            tournament.name = req.body.name;
        }

        if (req.body.teams) {
            tournament.teams = req.body.teams;
        }

        if (req.body.volunteers) {
            tournament.volunteers = req.body.volunteers;
        }

        if (req.body.fieldsCount) {
            tournament.fieldsCount = req.body.fieldsCount;
        }

        if (req.body.matchesPerTeam) {
            tournament.matchesPerTeam = req.body.matchesPerTeam;
        }

        if (req.body.startDate) {
            tournament.startDate = req.body.startDate;
        }

        if (req.body.endDate) {
            tournament.startDate = req.body.endDate;
        }
        tournament.save().then((tournament) => res.send(tournament)).catch((err) => console.log(err));
    });
});

// Allows the backend to properly monitor who is setting the tournament event flags
router.patch('/setofficialevent/:id', (req, res) => {
    // if (!req.body.auth) {
    //     //TODO: replace with actually good auth and user can make an event official
    //     res.status(401).send('Authorization invalud')
    // }

    Tournament.findById(req.params.id).then((tournament) => {
        tournament.officialEventFlag = req.body.officialEventFlag;
        tournament.save().then((tournament) => res.send(tournament)).catch((err) => console.log(err));
    });
});


/* DELETE */

//Delete a tournament given its id
router.delete('/:id', (req,res) => {
    //CURRENT USER IS ADMIN OR OWNS TOURNAMENT

    Tournament.findOneAndDelete({_id: req.params.id}, (err) => {
        if (err) {
            res.status(501).send("Server error.");
        }
        else {
            res.status(200).send("Tournament has been removed.");
        }
    });

});

module.exports = router;