const express = require('express')
const bp = require('body-parser') // https://akhromieiev.com/req-body-undefined-express/
const cors = require('cors')
const app = express()
const Declaration = require('./models/declaration')

app.use(cors())
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const mongoose = require('mongoose')

// Password hardcoded for simplicity
const url = `mongodb+srv://reynoldchia:Password123@cluster0.amhrtet.mongodb.net/declarations?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url).then(result => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})

app.get('/api/declarations', (request, response) => {
    Declaration.find({}).then(declarations => {
        response.json(declarations)
    })
})

app.post('/api/declarations', (request, response) => {
    Declaration.find({}).then(() => {
    const body = request.body
    const declaration = new Declaration({
      name: body.name,
      temperature: body.temperature,
      symptoms: body.symptoms,
      inContact: body.inContact
    })

    declaration
      .save()
      .then((savedDeclaration) => {
        response.json(savedDeclaration)
      })
      .catch((error) => console.log(error))
  })
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

module.exports = app