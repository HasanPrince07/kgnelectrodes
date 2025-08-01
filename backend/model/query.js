const mongoose = require('mongoose')

const querySchema = mongoose.Schema({
    name: String,
    email: String,
    query: String,
    status: { type: String, default: 'unread' }
})

module.exports = mongoose.model('query', querySchema)