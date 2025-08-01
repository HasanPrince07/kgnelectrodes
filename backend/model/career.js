const mongoose = require('mongoose')

const careerSchema = mongoose.Schema({
    name: String,
    email: String,
    number: Number,
    experience: String,
    message: String,
    status: { type: String, default: 'unread' }
})

module.exports = mongoose.model('career', careerSchema)