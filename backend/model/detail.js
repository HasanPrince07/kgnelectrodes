const mongoose = require('mongoose')

const detailSchema = mongoose.Schema({
    firstp: String,
    secondp: String,
    thirdp: String,
    fourthp: String,
})

module.exports = mongoose.model('detail', detailSchema)