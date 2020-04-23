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

/* GET most recent schedule for tournament. */
router.get('/schedule/:id', (req, res) => {
    Tournament.findById(req.params.id).then((tournament) => {
        if(!tournament) {
            return res.status(404).send("No tournament found");
        }
        if(!tournament.schedule.length) {
            return res.status(400).send("No schedule generated for tournament");
        }

        return res.status(200).send(tournament.schedule[0]);
    })
})

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
    if ((!req.body.tournament_name || req.body.tournament_name === "") &&
        (!req.body.user_name || req.body.user_name === "") &&
        (!req.body.date || req.body.date === "")) {
        return res.status(400).send("Bad request: no searchable fields included.");
    }

    var found_user;
    if (req.body.user_name) {
        await User.findOne({name: {$regex: `${req.body.user_name}`}}).then((user) => {
            found_user = user;
        }).catch((error) => {
            found_user = null;
        });
    }

    var query = {};

    if (found_user && found_user !== null) {
        query.director = found_user._id;
    };

    if (req.body.tournament_name) {
        query.name = {$regex: `${req.body.tournament_name}`};
    }

    if (req.body.date) {
        query.startDate = req.body.date;
    }

    if (!query.director && !query.name && !query.startDate) {
        return res.status(404).send("No results found");
    }

    Tournament.find(query)
    .then( (tournament) => {
        if (!tournament || tournament.length == 0) {
            return res.status(404).send("No results found");
        }
        return res.status(200).send(tournament);
    }).catch((error) => {
      console.log(error);
        return res.status(500).send(error);
    });
});

/* Add a generic volunteer to a tournament */
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
        let result = tournament.viewOnlyVols.find((vol) => vol === idToAdd.toString());
        console.log("Result from volunteer check");
        console.log(result);
        if (!result || result === null) {
            console.log("Volunteer added");
            tournament.viewOnlyVols.push(idToAdd);
        }
        else {
            console.log("Volunteer exists already");
        }
        tournament.save().then((tournament) => res.send(tournament)).catch((err) => console.log(err));
    }).catch((err) => {
        console.log(err);
    })

})

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

router.post('/schedule', (req, res) => {
    Tournament.findById(req.body.id).then((tournament) => {
        if(!tournament) {
            return res.status(404).send("tourney not found");
        }


        var array = [];
        for(var i = 0; i < req.body.match.length; i++) {
            for(var j = 0; j < req.body.match[i].length; j++) {
                array.push(req.body.match[i][j]);
            }
        }

        var schedule = {
            startTime: req.body.startTime,
            cycleTime: req.body.cycleTime,
            rawData: req.body.rawData,
            match: array
        }

        tournament.schedule[0] = schedule;

        tournament.save().then(() => {
            res.status(200).send("schedule successfully saved");
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
            tournament.judges.push(req.body.judge);
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

        if(req.body.fieldTypes) {
            tournament.scores.id(req.params.scoreid).fieldTypes = req.body.fieldTypes;
        }

        if(req.body.fieldValues) {
            tournament.scores.id(req.params.scoreid).fieldValues = req.body.fieldValues;
        }

        if(req.body.teamNum) {
            tournament.scores.id(req.params.scoreid).teamNum = req.body.teamNum;
        }

        if(req.body.scoreType) {
            tournament.scores.id(req.params.scoreid).scoreType = req.body.scoreType;
        }

        if(req.body.finalScore) {
            tournament.scores.id(req.params.scoreid).finalScore = req.body.finalScore;
        }

        if(req.body.rawData) {
            tournament.scores.id(req.params.scoreid).rawData = req.body.rawData;
        }

        if(req.body.changeNotes) {
            tournament.scores.id(req.params.scoreid).changeNotes.push(req.body.changeNotes);
        }

        tournament.save().then(tournament => {
            res.status(200).send(tournament);
        }).catch(err => {
            res.status(500).send(err);
        })
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

router.delete('/schedules/byebye', (req, res) => {
    Tournament.findById(req.body.id).then(tournament => {
        if(!tournament) {
            return res.status(404).send("tourney not found");
        }

        tournament.schedule = [];

        tournament.save().then(tournament => {
            return res.status(200).send(tournament);
        }).catch(err => {
            console.log(err);
            return res.status(500).send(err);
        })
    })
})

module.exports = router;
