const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Team Schema
const TeamSchema = new Schema({
    teamNum: {
        type: Number,
        required: true,
    },
    teamName: {
        type: String,
        required: true,
    },
    tournamentId: {
        type: String,
        required: true,
    },
    judgingScores: [],
    matchScores: [],
});

//Create a model for team schema instantiation
Team = mongoose.model('teams', TeamSchema);

//Export the model for use in other javascript files
module.exports = Team;