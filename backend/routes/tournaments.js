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

router.post('/addvolunteer', (req, res) => {
    console.log(req.body);

    if (!req.body.user_id && !req.body.auth_id) {
        return res.status(400).send("Bad Request: User must be identified in some manner");
    }

    var idToAdd;
    if (req.body.auth_id) {
        User.findOne({ auth0id: req.body.auth_id })
        .then((user) => {
            if (user) {
                idToAdd = user._id;
            }

        })
    }
    else {
        idToAdd = req.body.user_id;
    }

    Tournament.findById(req.body.tournament_id).then((tournament) => {
        if (!tournament) {
            return res.status(500).send("An error occured with the specified tournament")
        }
        let result = tournament.volunteers.find((vol) => vol.user.equals(idToAdd));
        console.log("Result from volunteer check");
        console.log(result);
        if (!result || result === null) {
            console.log("Volunteer added");
            tournament.volunteers.push({user: idToAdd, role: "Unassigned"});
        }   
        else {
            console.log("Volunteer exists already");
        }
        tournament.save().then((tournament) => res.send(tournament)).catch((err) => console.log(err));
    }).catch((err) => {
        console.log(err);
    })

})


/* POST search for tournament via various outlets */
router.post('/search', async(req, res) => {
    console.log(req.body);
    if (!req.body.tournament_name && !req.body.user_name && !(req.body.date)) {
        return res.status(400).send("Bad request: no searchable fields included.");
    }

    var found_user;
    if (req.body.user_name) {
        await User.findOne({name: {$regex: new RegExp(`^${req.body.user_name}$`, 'i')}}).then((user) => {
            found_user = user;
        }).catch((error) => {
            found_user = null;
        });
    }

    console.log(found_user);

    var query = {};

    if (found_user && found_user != null) {
        console.log("=== ASSIGNING QUERY FOR DIRECTOR ===");
        query.director = found_user._id;
    };

    if (req.body.tournament_name) {
        query.name = {$regex: new RegExp(`^${req.body.tournament_name}$`, 'i')};
    }

    if (req.body.date) {
        query.startDate = req.body.date;
    }
    console.log(query);

    if (!query.director && !query.tournament_name && !query.startDate) {
        console.log("Returning empty");
        return res.status(404).send([]);
    }

    Tournament.find(query)
    .then((tournament) => {
        if (!tournament) {
            return res.status(404).send("No results found");
        }
        return res.status(200).send(tournament);
    }).catch((error) => {
        return res.status(500).send(error);
    });
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

            if (req.body.location) {
                tournamentDetails.location = req.body.location;
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