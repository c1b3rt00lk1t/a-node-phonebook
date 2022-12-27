require("dotenv").config();
const express = require("express");
const app = express();
const Person = require("./models/people");
console.log(Person);
const morgan = require("morgan");

app.use(express.static("build"));
app.use(express.json());
morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Phonebook</h1>");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => response.json(persons));
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => person ? response.json(person) : response.sendStatus(404).end());
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
      error: "missing name or number",
    });
  }

  const person = new Person(body);
  person.save().then((res) => response.json(res));
});

app.put("/api/persons/:id", (request, response) => {
  const body = request.body;

  if (!body) {
    return response.status(400).json({
      error: "content missing",
    });
  } else if (!body.name || !body.number) {
    return response.status(400).json({
      error: "missing name or number",
    });
  }
  Person.updateOne({_id: request.params.id}, {$set: {number: body.number}}).then( _ => response.json({...body, id: request.params.id}));

});

app.get("/info", (request, response) => {
  const date = new Date();
  const infoMessage = `<h1>Info</h1><p>Phonebook has info for ${persons.length} people.</p><p>${date}</p>`;
  response.sendStatus(infoMessage);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
