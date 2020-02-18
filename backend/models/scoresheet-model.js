const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Scoresheet Schema
const SchoresheetSchema = new Schema({
    fieldTypes: [],
    fieldValues: [],
    teamNum: {
        type: Number,
        required: true,
    },
    scoreType: {
        type: String,
        default: "match",
    }
});

//Create a model for scoresheet schema instantiation
Scoresheet = mongoose.model('scoresheet', ScoresheetSchema);

//Export the model for use in other javascript files
module.exports = Team;