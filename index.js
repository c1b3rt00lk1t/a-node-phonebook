
const express = require('express');

const app = express();
app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];


app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.get('/api/persons/:id', (request, response) => {
    const id = +request.params.id;
    const person = persons.find(person => person.id === id);
    person ? response.json(person) : response.sendStatus(404).end();
})

app.delete('/api/persons/:id', (request, response) => {
    const id = +request.params.id;
    const length = persons.length;
    persons = persons.filter(person => person.id !== id);
    persons.length !== length ? response.sendStatus(204).end() : response.sendStatus(404).end();
})

app.post('/api/persons/', (request, response) => {
    const body = request.body;
 
    const id = Math.floor(Math.random() * 10000);
    body.id = id;
    persons.push(body);
    response.json(body)
})

app.get('/info', (request, response) => {
    const date = new Date();
    const infoMessage = `<h1>Info</h1><p>Phonebook has info for ${persons.length} people.</p><p>${date}</p>`
    response.sendStatus(infoMessage);
})


const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})