const mongoose = require('mongoose')

const aboutSchema = mongoose.Schema({
    desc: String,
    image: String,
    hdesc: String,
    himage: String,
    tdesc: String,
    timage1: String,
    timage2: String,
    timage3: String,
})

module.exports = mongoose.model('about', aboutSchema)