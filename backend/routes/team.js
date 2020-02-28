const express = require('express');
const router = express.Router();
const Team = require('../models/team-model');

/* GET */

/* POST */
router.post("/score", (req,res) => {
    if (!req.body.teamName || !req.body.teamNum) {
        res.status(400).send("Bad request; please include team and num");
        return;
    }

    Team.findOne({teamName: req.body.teamName, teamNum: req.body.teamNum}).then((team) => {
        if (!team) {
            res.status(400).send("Team didn't exist");
            return;
        }
        
        if (req.body.scoreType === 'Judgment') {
            team.judgingScores.append(req.body.score);
        }
        else {
            team.matchScores.append(req.body.score);
        }
    });
    createdTeam.save().then((team) => res.send(tournament));

});

/* PATCH */

module.exports = router;