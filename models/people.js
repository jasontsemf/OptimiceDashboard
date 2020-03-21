const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const peopleSchema = new Schema({
    "name": { type: String, unique: true},
    "email": String,
    "ordinal" : Number
}, {
    timestamps: true
});

const db = mongoose.model('people', peopleSchema);

module.exports = db;