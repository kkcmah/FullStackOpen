const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());

morgan.token("id", function getId(req) {
    return req.id;
});
morgan.token("body", function getBody(req) {
  return JSON.stringify(req.body);
});

const assignId = (req, res, next) => {
    req.id = Math.floor(Math.random() * 200);
    next();
}

app.use(assignId);
app.use(morgan(":url :method :id :response-time :body"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = +request.params.id;
  const person = persons.find((person) => person.id === id);
  if (!person) {
    return response.status(404).end();
  }
  response.json(person);
});

app.get("/info", (request, response) => {
  const curDate = new Date();
  response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${curDate}</p>`);
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  // check if content type is one that is expected
  //console.log(request.headers);
  console.log(body);
  if (!body.name) {
    return response.status(400).json({
      error: "name is missing",
    });
  }
  if (!body.number) {
    return response.status(400).json({
      error: "number is missing",
    });
  }
  const nameExists =
    persons.findIndex((person) => person.name === body.name) !== -1;
  if (nameExists) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const id = Math.floor(Math.random() * 200);
  const person = { id, name: body.name, number: body.number };
  persons = [...persons, person];
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = +request.params.id;
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
