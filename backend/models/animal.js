const mongoose = require('mongoose')

const animalSchema = new mongoose.Schema({
    tipAnimal: {
        type: String,
        required: [true, 'Please enter animal type'],
        enum: {
            values: [
                'Caine',
                'Pisica'
            ],
            message: 'Please select correct type for animal'
        }
    },
    nume: {
        type: String,
        required: [true, 'Please enter animal name'],
        trim: true
    },
    varsta: {
        type: Number,
        required: [true, 'Please enter animal type'],
        default: 0.0,
        maxlength: [3, 'Animal age cannot exceed 3 characters']
    },
    culoare: {
        type: String,
        required: [true, 'Please enter animal color'],
        trim: true
    },
    defect: {
        type: String,
        required: [true, 'Please enter animal faulty'],
        trim: true
    },
    calitate: {
        type: String,
        required: [true, 'Please enter animal type'],
        trim: true
    },
    stareSanatate: {
        type: String,
        required: [true, 'Please enter animal state of health'],
        trim: true
    },
    sex: {
        type: String,
        required: [true, 'Please enter animal sex'],
        enum: {
            values: [
                'Mascul',
                'Femela'
            ],
            message: 'Please select correct type for animal'
        }

    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Animal', animalSchema);