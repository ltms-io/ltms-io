const express = require('express');
const router = express.Router();
const Tournament = require('../models/tournament-model');
const User = require('../models/user-model');

var exampleUser = new User({
    name: 'Fake M. Name',
    email: 'boyo@LTMS.com',
    password: 'yeet123',
    userAuthorizer: true
})

var exampleTournament = new Tournament({
    director: exampleUser._id,
    officialEventFlag: true,
    fieldsCount: 2,
    matchesPerTeam: 3,
});

/* GET tournament listing. */
router.get('/api/tournaments', function(req, res, next) {
  res.send('All these tournaments!');
});

/* GET specific tournament. */
router.get('/api/tournaments/:id', (req, res) => {
    if (!req.body.auth) { // TODO: replace with correct authorization field or auth handler module
        res.status(401).send('Authorization invalid');
        return;
    }
    
    res.send(exampleTournament);
})

/* UPDATE specific tournament. */
router.put('/api/tournaments/:id', (req, res) => {
    if (!req.body.auth) { // TODO: replace with correct authorization field or auth handler module
        res.status(401).send('Authorization invalid');
        return;
    }
    
    //TODO: Update tournament based upon req.body.tournament
})

module.exports = router;