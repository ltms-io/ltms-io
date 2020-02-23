const express = require('express');
const router = express.Router();
const Tournament = require('../models/tournament-model');
const User = require('../models/user-model');

/* GET tournament listing. */
router.get('/', function(req, res, next) {
  res.send('All these tournaments!');
});

/* GET specific tournament. */
router.get('/:id', (req, res) => {
    if (!req.body.auth) { // TODO: replace with correct authorization field or auth handler module
        res.status(401).send('Authorization invalid');
        return;
    }
    
    res.send(exampleTournament);
});

/* GET tournaments by users */
router.get('/user/:id', (req, res) => {
    
});

/* POST register new tournament */
router.post('/register', (req, res) => {
    if (!req.body.director || !req.body.fieldsCount) {
        return res.status(400).json(errors);
    }

    if (false) { //TODO: Add a check for recent tournament created by user
        return res.status(400).send("Tournament recently ceated");
    }
    else {
        const createdTournament = new User({
            director: req.body.name,
            fieldsCount: req.body.fieldsCount,
        });
        createdTournament.save().then((tournament) => res.send(tournament)).catch((err) => console.log(err));
    }
});

/* UPDATE specific tournament. */
router.post('/:id', (req, res) => {
    if (!req.body.auth) { // TODO: replace with correct authorization field or auth handler module
        res.status(401).send('Authorization invalid');
        return;
    }
    
    //TODO: Update tournament based upon req.body.tournament
    Tournament.findById(req.body.id).then((tournament) => {
        if (req.body.director) {
            tournament.director = req.body.director;
        }

        if (req.body.name) {
            tournament.naem = req.body.name;
        }

        if (req.body.teams) {
            tournament.teams = req.body.teams;
        }

        if (req.body.fieldsCount) {
            tournament.fieldsCount = req.body.fieldsCount;
        }

        if (req.body.matchesPerTeam) {
            tournament.matchesPerTeam = req.body.matchesPerTeam;
        }
    });
});

module.exports = router;