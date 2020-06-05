const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
    {
        score: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 5,
            unique: true,
        },
        title: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: true,
        },
        review: {
            type: String,
            required: true,
            maxlength: 2000,
        },
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Review', reviewSchema)
