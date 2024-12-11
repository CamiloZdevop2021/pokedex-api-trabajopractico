const mongoose = require  ('mongoose');

const trainerSchema = new mongoose.Schema ({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: 'trainer'}
})

module.exports = mongoose.model ('Trainer', trainerSchema);
