const mongoose = require('mongoose')

const mainimageSchema = mongoose.Schema({
    image: String,
})

module.exports = mongoose.model('mainimage', mainimageSchema)