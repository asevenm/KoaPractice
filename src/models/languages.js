const mongoose = require('../db');

const languageSchema = new mongoose.Schema({
    name: { type: String },
    desc: { type: String },
});

const Language = mongoose.model('Language', languageSchema);

module.exports = Language;