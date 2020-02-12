const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Tournament Schema
const TournamentSchema = new Schema({
    director: {
        type: String,
        ref: 'User',
        required: true,
    },
    volunteers: [
        { 
            user: {
                type: String,
                ref: 'User',
            }, 
            role: String, 
        }
    ],
    officialEventFlag: {
        type: Boolean,
        default: false,
    },
    teams: {
        type: String,
        ref: 'Team',
    },
    fieldsCount: {
        type: Number,
        required: true,
    },
    matchesPerTeam: {
        type: Number,
        default: 3,
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
        default: Date.now,
    },
});

//Create a model for schema instantiation
Tournament = mongoose.model('tournaments', TournamentSchema);

//Export the model for use by other javascript files
module.exports = Tournament;