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
      rubricsText += "Rubric " + (i + 1) + "\n";
      rubricsText += "Core Values\n";
      rubricsText += "Inspiration: (Discovery: " + team.rubrics[i].coreValues.inspiration.discovery + ", " +
                                   "Team Identity: " + team.rubrics[i].coreValues.inspiration.teamIdentity + ", " +
                                   "Impact: " + team.rubrics[i].coreValues.inspiration.impact + ")\n";
      rubricsText += "Teamwork: (Effectiveness: " + team.rubrics[i].coreValues.teamwork.effectiveness + ", " +
                                 "Efficiency: " + team.rubrics[i].coreValues.teamwork.efficiency + ", " +
                                 "Kids Do the Work: " + team.rubrics[i].coreValues.teamwork.kidsDoTheWork + ")\n";
      rubricsText += "Gracious Professionalism®: (Inclusion: " + team.rubrics[i].coreValues.graciousProfessionalism.inclusion + ", " +
                                                 "Respect: " + team.rubrics[i].coreValues.graciousProfessionalism.respect + ", " +
                                                 "Coopertition®: " + team.rubrics[i].coreValues.graciousProfessionalism.coopertition + ")\n";
      rubricsText += "Comments: " + team.rubrics[i].coreValues.comments + "\n\n";

      rubricsText += "Innovation Project\n"
      rubricsText += "Research: (Problem Identification: " + team.rubrics[i].innovationProject.research.problemIdentificaton + ", " +
                                 "Sources of Information: " + team.rubrics[i].innovationProject.research.sourcesOfInformation + ", " +
                                 "Problem Analysis: " + team.rubrics[i].innovationProject.research.problemAnalysis + ")\n";
      rubricsText += "Innovative Solution: (Team Solution: " + team.rubrics[i].innovationProject.innovativeSolution.teamSolution + ", " +
                                           "Innovation: " + team.rubrics[i].innovationProject.innovativeSolution.innovation + ", " +
                                           "Solution Development: " + team.rubrics[i].innovationProject.innovativeSolution.solutionDevelopment + ")\n";
      rubricsText += "Presentation: (Sharing: " + team.rubrics[i].innovationProject.presentation.sharing + ", " +
                                    "Creativity: " + team.rubrics[i].innovationProject.presentation.creativity + ", " +
                                    "Presentation Effectiveness: " + team.rubrics[i].innovationProject.presentation.presentationEffectiveness + ")\n";
      rubricsText += "Comments: " + team.rubrics[i].innovationProject.comments + "\n\n";

      rubricsText += "Robot Design\n"
      rubricsText += "Mechanical Design: (Durability: " + team.rubrics[i].robotDesign.mechanicalDesign.durability + ", " +
                                         "Mechanical Efficiency: " + team.rubrics[i].robotDesign.mechanicalDesign.mechanicalEfficiency + ", " +
                                         "Mechanization: " + team.rubrics[i].robotDesign.mechanicalDesign.mechanization + ")\n";
      rubricsText += "Programming: (Programming Quality: " + team.rubrics[i].robotDesign.programming.programmingQuality + ", " +
                                   "Programming Efficiency: " + team.rubrics[i].robotDesign.programming.programmingEfficiency + ", " +
                                   "Automation/Navigation: " + team.rubrics[i].robotDesign.programming.automationNavigation + ")\n";
      rubricsText += "Strategy & Innovation: (Design Process: " + team.rubrics[i].robotDesign.strategyInnovation.designProcess + ", " +
                                             "Mission Strategy: " + team.rubrics[i].robotDesign.strategyInnovation.missionStrategy + ", " +
                                             "Innovation: " + team.rubrics[i].robotDesign.strategyInnovation.innovation + ")\n";
      rubricsText += "Comments: " + team.rubrics[i].robotDesign.comments + "\n\n";

      if (i != team.rubrics.length - 1) {
        rubricsText += "---\n\n";
      }
    }

    const msg = {
        to: req.body.email,
        from: 'noreply@ltmsio.codes',
        subject: 'Rubrics have been sent for your team',
        text: rubricsText,
        html: rubricsText.replace(/(\n)/g, "<br>")
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
