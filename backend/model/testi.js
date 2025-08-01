const mongoose = require('mongoose')

const testiSchema = mongoose.Schema({
    name: String,
    desc: String,
    status: { type: String, default: 'unpublish' }
})

module.exports = mongoose.model('testi', testiSchema)