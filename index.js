require('dotenv').config();
const express = require("express");
const app = express();
const Person = require("./models/people");
console.log(Person)
const morgan = require("morgan");


app.use(express.static('build'))
app.use(express.json());
morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const cors = require('cors')
app.use(cors())





app.get('/', (req, res) => {
  res.send('<h1>Phonebook</h1>')
})

app.get("/api/persons", (request, response) => {
  Person.find({}).then(persons => response.json(persons));
});

app.get("/api/persons/:id", (request, response) => {
  const id = +request.params.id;
  const person = persons.find((person) => person.id === id);
  person ? response.json(person) : response.sendStatus(404).end();
});

app.delete("/api/persons/:id", (request, response) => {
  const id = +request.params.id;
  const length = persons.length;
  persons = persons.filter((person) => person.id !== id);
  persons.length !== length
    ? response.sendStatus(204).end()
    : response.sendStatus(404).end();
});

app.post("/api/persons/", (request, response) => {
  const body = request.body;

  if (!body) {
    return response.status(400).json({
      error: "content missing",
    });
  } else if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: "missing name or number" 
    });
  } else if (persons.find((person) => person.name === body.name)) {
    return response.status(400).json({ 
      error: "name must be unique"
    });
  }

  const id = Math.floor(Math.random() * 10000);
  body.id = id;
  persons.push(body);
  response.json(body);
});

app.get("/info", (request, response) => {
  const date = new Date();
  const infoMessage = `<h1>Info</h1><p>Phonebook has info for ${persons.length} people.</p><p>${date}</p>`;
  response.sendStatus(infoMessage);
});

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
