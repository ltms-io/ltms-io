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
    User.findOne({ auth0id: req.body.auth0id }).then(async function(user) {
        if(!user) {
            return res.status(404).send("user not found");
        }

        console.log(user);

        var results = {
            director: [],
            headReferee: [],
            judgeAdvisor: [],
            referee: [],
            judge: [],
            viewOnlyVol: []
        }

        //.@Hank: there are probably 8000 better ways to do this but I don't know them TODO
        await Tournament.find({ director: user._id }, (err, tournaments) => {
            if(err) {
                return res.status(500).send(err);
            }

            results.director = tournaments
        });

        await Tournament.find({ headReferee: { "$in": [user._id] } }, (err, tournaments) => {
            if(err) {
                return res.status(500).send(err);
            }

            console.log(tournaments)

            results.headReferee = tournaments
        });

        await Tournament.find({ judgeAdvisor: { "$in": [user._id] } }, (err, tournaments) => {
            if(err) {
                return res.status(500).send(err);
            }

            results.judgeAdvisor = tournaments
        });

        await Tournament.find({ referees: { "$in": [user._id] } }, (err, tournaments) => {
            if(err) {
                return res.status(500).send(err);
            }

            results.referee = tournaments
        });

        await Tournament.find({ judges: { "$in": [user._id] } }, (err, tournaments) => {
            if(err) {
                return res.status(500).send(err);
            }

            results.judge = tournaments
        });

        await Tournament.find({ viewOnlyVols: { "$in": [user._id] } }, (err, tournaments) => {
            if(err) {
                return res.status(500).send(err);
            }

            results.viewOnlyVol = tournaments
        });

        res.status(200).send(results);
    });
});

/* GET all scores for tournament given tourney id */
router.get('/:id/scores', (req, res) => {
    Tournament.findById(req.params.id).then(tournament => {
        if(!tournament) {
            return res.status(404).send("tournament not found");
        }

        return res.status(200).send(tournament.scores);
    })
})

/* GET SPECIFIC score for tournament given tourney id and score id */
router.get('/:id/scores/:scoreid', (req, res) => {
    Tournament.findById(req.params.id).then(tournament => {
        if(!tournament) {
            return res.status(404).send("tournament not found");
        }

        return res.status(200).send(tournament.scores.id(req.params.scoreid));
    })
})

/* POST search for tournament via various outlets */
router.post('/search', async(req, res) => {
    console.log(req.body);
    if (!req.body.tournament_name && !req.body.user_name && !(req.body.date)) {
        return res.status(400).send("Please include");
    }

    var found_user;
    if (req.body.user_name) {
        await User.findOne({name: req.body.user_name}).then((user) => {
            found_user = user;
        }).catch((error) => {
            found_user = null;
        });
    }

    var query = {};

    if (found_user) {
        query.director = found_user._id;
    };

    if (req.body.tournament_name) {
        query.name = req.body.tournament_name;
    }

    if (req.body.date) {
        query.startDate = req.body.date;
    }

    Tournament.find(query).then((tournament) => {
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

/* POST score */
router.post('/score', (req, res) => {
    Tournament.findById(req.body.id).then((tournament) => {
        if(!tournament) {
            return res.status(404).send("tourney not found");
        }
        
        tournament.scores.push({
            fieldTypes: req.body.fieldTypes,
            fieldValues: req.body.fieldValues,
            teamNum: req.body.teamNum,
            scoreType: req.body.scoreType,
            finalScore: req.body.finalScore,
            rawData: req.body.rawData
        });

        tournament.save().then(tourney => {
            res.status(200).send(tourney);
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
    })
})

/* PATCH specific tournament. */
router.patch('/:id', (req, res) => {
    // if (!req.headers.auth) { // TODO: replace with correct authorization field or auth handler module
    //     res.status(401).send('Authorization invalid');
    //     return;
    // }

    Tournament.findById(req.params.id).then((tournament) => {
        if (req.body.referee) {
            if (req.body.referee === "DNE") {
                return res.status(400).send("Invalid Referee User");
            }
            tournament.referees.push(req.body.referee);
        }

        if (req.body.director /* && CURRENT USER IS DIRECTOR */) {
            tournament.director = req.body.director;
        }

        if (req.body.name) {
            tournament.name = req.body.name;
        }

        if (req.body.team) {
            tournament.teams.push(req.body.team);
        }

        if (req.body.volunteers) { //DO NOT USE
            tournament.volunteers = req.body.volunteers;
        }

        if (req.body.headReferee) {
            tournament.headReferee.push(req.body.headReferee);
        }

        if (req.body.judgeAdvisor) {
            tournament.judgeAdvisor.push(req.body.judgeAdvisor);
        }

        if (req.body.judge) {
            tournament.referees.push(req.body.judge);
        }

        if (req.body.viewOnlyVol) {
            tournament.viewOnlyVols.push(req.body.viewOnlyVol);
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

//update a score given tourney and score ids
router.patch('/:id/scores/:scoreid', (req, res) => {
    Tournament.findById(req.params.id).then(tournament => {
        if(!tournament) {
            return res.status(404).send("tournament not found");
        }

        //STOP HERE
    })
})

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

//delete all scores
router.delete('/scores/yesimsure', (req, res) => {
    Tournament.findById(req.body.id).then(tournament => {
        if(!tournament) {
            return res.status(404).send("tourney not found");
        }

        tournament.scores = [];
        
        tournament.save().then(tournament => {
            return res.status(200).send(tournament);
        }).catch(err => {
            console.log(err)
            return res.status(500).send(err) ;
        })
    })
})

module.exports = router;
