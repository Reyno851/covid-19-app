const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../index.js');
const api = supertest(app);
const Declaration = require('../models/declaration')

test('Declarations are returned in JSON format', async () => {
    await api
      .get('/api/declarations')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
})

test('Declaration submission succeeds', async () => {
    var declarationsAtStart = await Declaration.find({})
    declarationsAtStart = declarationsAtStart.map((declaration) => declaration.toJSON());
    console.log(declarationsAtStart)

    const newDeclaration = new Declaration({
        name: "test_subject01",
        temperature: 35,
        symptoms: "no",
        inContact: "no"
    })

    await api
        .post('/api/declarations')
        .send(newDeclaration)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    var declarationsAtEnd = await Declaration.find({})
    declarationsAtEnd = declarationsAtEnd.map((declaration) => declaration.toJSON());
    expect(declarationsAtEnd).toHaveLength(declarationsAtStart.length + 1)

})


afterAll(() => {
  mongoose.connection.close();
});