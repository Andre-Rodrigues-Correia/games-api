const mongoose = require("mongoose")

const Games = mongoose.model('Games', {
    name: String,
    description: String,
    genre: String,
    producer: String,
    releaseYear: String,
    value: Number,
});

module.exports = Games;