const mongoose = require('mongoose')

const declarationSchema = new mongoose.Schema({
    id: Number,
    name: String,
    temperature: String,
    symptoms: String,
    inContact: String
})

module.exports = mongoose.model('Declaration', declarationSchema)