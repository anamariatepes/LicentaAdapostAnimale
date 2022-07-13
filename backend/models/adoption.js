const mongoose = require('mongoose')

const adoptionSchema = mongoose.Schema({
    userInfo: {
        varsta: {
            type: Number,
            required: true
        },
        copii: {
            type: String,
            required: true
        },
        sanatate: {
            type: String,
            required: true
        },
        personalitate: {
            type: String,
            required: true
        },
        tipCasa: {
            type: String,
            required: true
        },
        telefon : {
            type: String,
            required: true
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    adoptionAnimals: [
        {
           name: {
            type: String,
            required: true
           },
           cantitate: {
            type: Number,
            required: true
        },
           image: {
            type: String,
            required: true
           },
           animal: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Animal'
        }
        }
    ],
    adoptionInfo: {
        id: {
            type: String
        },
        status: {
            type: String
        }
    },
    adoptedAt: {
        type: Date
    },
    adoptionStatus: {
        type: String,
        required: true,
        default: 'Processing'
    },
    deliveredAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


})
module.exports = mongoose.model('Adoption', adoptionSchema)