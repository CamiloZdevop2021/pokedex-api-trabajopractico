const mongoose = require ('mongoose');

const pokemonSchema = new mongoose.Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    level: {type: String, required: true},
    trainerID: {type: mongoose.Schema.Types.ObjectId, ref: 'Trainer'},
    createdAT: {type: Date, default: Date.now},
});


module.exports = mongoose.model('Pokemon', pokemonSchema);