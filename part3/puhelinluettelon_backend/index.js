require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');

const PORT = process.env.PORT || 3001;
const app = express();

morgan.token('body', (req) => {
  if (req.method === 'POST') return JSON.stringify(req.body);
});

const errorHandler = (error, req, res, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(express.static('build'));
app.use(express.json());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.get('/api/persons', (req, res) => {
  Person.find({}).then((results) => res.json(results));
});

app.get('/info', (req, res, next) => {
  Person.countDocuments()
    .then((count) => {
      const responseString = `Phonebook has info for ${count} people
  <br><br>
  ${new Date().toString()}`;
      res.send(responseString);
    })
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.status(200).json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: 'content missing' });
  }
  const person = new Person({ name, number });
  person
    .save()
    .then(() => res.status(201).json(person))
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;

  const newPerson = { name, number };

  if (!name || !number) {
    return res.status(400).json({ error: 'content missing' });
  }

  Person.findByIdAndUpdate(req.params.id, newPerson, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      if (updatedPerson) return res.json(updatedPerson);
      else {
        const person = new Person(newPerson);
        person
          .save()
          .then(() => res.status(201).json(person))
          .catch((error) => next(error));
      }
    })
    .catch((error) => next(error));
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
