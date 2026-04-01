const mongoose = require("mongoose");

const animeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    year: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    review: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Anime", animeSchema);
