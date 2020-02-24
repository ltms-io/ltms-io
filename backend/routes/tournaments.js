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
    Tournament.findById(req.params.id).then((tournament) => {
        if(!tournament) {
            res.status(404).send("tournament not found");
            return;
        }

        res.status(200).send(tournament);
    })
    //res.send(exampleTournament);
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

/* PATCH specific tournament. */
router.patch('/:id', (req, res) => {
    if (!req.body.auth) { // TODO: replace with correct authorization field or auth handler module
        res.status(401).send('Authorization invalid');
        return;
    }
    
    Tournament.findById(req.params.id).then((tournament) => {
        if (req.body.director) {
            tournament.director = req.body.director;
        }

        if (req.body.name) {
            tournament.naem = req.body.name;
        }

        if (req.body.teams) {
            tournament.teams = req.body.teams;
        }

        if (req.body.volunteers) {
            tournament.teams = req.body.volunteers;
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

router.patch('/setofficialevent/:id', (req, res) => {
    if (req.body.auth) {
        //TODO: replace with actually good auth and user can make an event official
        res.status(401).send('Authorization invalud')
    }

    Tournament.findById(req.params.id).then((tournament) => {
        tournament.officialEventFlag = req.body.eventFlag;
        tournament.save().then((tournament) => res.send(tournament)).catch((err) => console.log(err));
    });
});

module.exports = router;