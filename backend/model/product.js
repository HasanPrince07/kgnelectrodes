const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: String,
    desc: String,
    image: String,
    status: { type: String, default: 'in stock' }

})

module.exports = mongoose.model('product', productSchema)