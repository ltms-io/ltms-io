const express = require('express');
const router = express.Router();
const Team = require('../models/team-model');
const Tournament = require('../models/tournament-model');
const sgMail = require('@sendgrid/mail');
const dev_config = require('../config/dev-params')

sgMail.setApiKey(dev_config.SENDGRID_API_KEY || process.env.SENDGRID_API_KEY);

/* GET */

/* GET all teams from all tournaments */
router.get('/', (req, res, next) => {
  Team.find({}, (err, teams) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(teams);
  })
});

/* GET all teams from a given tournament */
router.get('/tournid/:id', (req, res, next) => {
  Team.find({tournamentId: req.params.id}, (err, teams) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(teams);
  })
});

/* GET team */
router.get('/:id', (req, res) => {
  Team.findById(req.params.id).then( (team) => {
    if (!team) {
      return res.status(404).send("No such team found");
    }
    return res.status(200).send(team);
  });
});

/* POST */

/* POST team */
router.post('/register', (req, res) => {
  if (!req.body.teamNum || !req.body.teamName || !req.body.tournamentId) {
    return res.status(400).json("no teamNum, teamName, or tournamentId given");
  }

  Team.findOne({teamNum: req.body.teamNum, tournamentId: req.body.tournamentId}).then( (team) => {
    if (!team) {
      const createdTeam = new Team({
        teamNum: req.body.teamNum,
        teamName: req.body.teamName,
        tournamentId: req.body.tournamentId,
        judgingScores: [],
        matchScores: [],
        rubrics: []
      });
      createdTeam.save().then( (team) => {
        Tournament.findById(team.tournamentId).then( (tournament) => {
          if (!tournament) {
            return res.status(404).send("No such tournament found");
          }
          tournament.teams.push(team._id);
          tournament.save().then( (tournament) => res.send(tournament)).catch( (err) => console.log(err));
        });
        res.send(team);
      }).catch( (err) => {
        console.log(err);
      });
    }
    else {
      res.status(200).send(team);
    }
  });
});

router.post('/sendrubrics/:id', (req, res) => {
  if (!req.body.email || req.body.email === "") {
    return res.status(400).json("no email given");
  }

  Team.findById(req.params.id).then( (team) => {
    if (!team) {
      return res.status(400).send("Team doesn't exist");
    }

    var rubricsText = "";
    for (var i = 0; i < team.rubrics.length; i++) {
      rubricsText += (team.rubrics[i] + "\n");
    }

    const msg = {
        to: req.body.email,
        from: 'noreply@ltmsio.codes',
        subject: 'Rubrics have been sent for your team',
        text: rubricsText,
        html: rubricsText
    };
    sgMail.send(msg)
    .then( () => {
        return res.status(200).send("Email sent successfully");
    })
    .catch( (err) => {
        console.log(err)
        return res.status(500).send(err);
    });
  });
});

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

/* PATCH team */
router.patch('/:id', (req, res) => {
  if(Object.keys(req.body).length == 0) {
    return res.status(400).send("body is empty");
  }

  Team.findById(req.params.id).then( (team) => {
    if (!team) {
      return res.status(404).send("team not found");
    }

    if (req.body.teamNum) {
      team.teamNum = req.body.teamNum;
    }
    if (req.body.teamName) {
      team.teamName = req.body.teamName;
    }
    if (req.body.tournamentId) {
      team.tournamentId = req.body.tournamentId;
    }
    if (req.body.judgingScore) {
      team.judgingScores.push(req.body.judgingScore);
    }
    if (req.body.matchScore) {
      team.matchScores.push(req.body.matchScore);
    }
    if (req.body.rubric) {
      team.rubrics.push(req.body.rubric);
    }

    team.save().then( (team) => res.send(team)).catch( (err) => console.log(err));
  });
});

/* PATCH for rubric deletion */
router.patch('/rubricdelete/:id', (req, res) => {
  if(!req.body.index) {
    return res.status(400).send("No index given");
  }

  Team.findById(req.params.id).then( (team) => {
    if (!team) {
      return res.status(404).send("team not found");
    }

    team.rubrics.splice(req.body.index, 1);

    team.save().then( (team) => res.send(team)).catch( (err) => console.log(err));
  });
});

module.exports = router;
