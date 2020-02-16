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
})

/* GET tournaments by users */
router.get('/user/:id', (req, res) => {
    
})

/* UPDATE specific tournament. */
router.post('/:id', (req, res) => {
    if (!req.body.auth) { // TODO: replace with correct authorization field or auth handler module
        res.status(401).send('Authorization invalid');
        return;
    }
    
    //TODO: Update tournament based upon req.body.tournament
})

module.exports = router;