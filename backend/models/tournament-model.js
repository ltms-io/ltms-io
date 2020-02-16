const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Tournament Schema
const TournamentSchema = new Schema({
    director: {
        type: String,
        ref: 'User',
        required: true,
    },
    volunteers: [],
    officialEventFlag: {
        type: Boolean,
        default: false,
    },
    teams: [],
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

//Instance methods of the Schema
TournamentSchema.methods.addVolunteer = function(uId, uRole) {
    this.model.volunteer.add({user: uId, role: uRole})
};

//Create a model for schema instantiation
Tournament = mongoose.model('tournaments', TournamentSchema);

//Export the model for use by other javascript files
module.exports = Tournament;