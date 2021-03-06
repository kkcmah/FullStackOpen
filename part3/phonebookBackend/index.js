require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require("./models/person");

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

morgan.token("id", function getId(req) {
  return req.id;
});
morgan.token("body", function getBody(req) {
  return JSON.stringify(req.body);
});

const assignId = (req, res, next) => {
  req.id = Math.floor(Math.random() * 200);
  next();
};

app.use(assignId);
app.use(morgan(":url :method :id :response-time :body"));

app.get("/hello", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response) => {
  const curDate = new Date();
  Person.count({}).then((num) => {
    response.send(`<p>Phonebook has info for ${num} people</p>
    <p>${curDate}</p>`);
  });
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  const person = { number: body.number };
  //optional { new: true }parameter, which will cause our event handler to be called with the new modified document instead of the original.
  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
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

  // dont allow adding name that is already in phonebook
  Person.findOne({ name: body.name }).then((existingPerson) => {
    if (existingPerson) {
      return response.status(400).json({
        error: `${body.name} is already in phonebook with number ${existingPerson.number}`,
      });
    } else {
      const person = new Person({ name: body.name, number: body.number });

      person
        .save()
        .then((savedPerson) => {
          response.json(savedPerson);
        })
        .catch((error) => next(error));
    }
  });
});

app.delete("/api/persons/:id", (request, response, next) => {
  //return 204 if successfully removed existing or not existing resource in database
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);
