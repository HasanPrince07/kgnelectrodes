const mongoose = require('mongoose')

const footerSchema = mongoose.Schema({
    email: String,
    number: Number,
    address: String,
    facebook: String,
    messanger: String,
    twitter: String
})

module.exports = mongoose.model('footer', footerSchema)