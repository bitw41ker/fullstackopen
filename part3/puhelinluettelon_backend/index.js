require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');

const PORT = process.env.PORT || 3001;
const app = express();

morgan.token('body', (req, res) => {
  if (req.method === 'POST') return JSON.stringify(req.body);
});

const errorHandler = (error, req, res, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
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

app.get('/info', (req, res) => {
  const responseString = `Phonebook has info for ${persons.length} people
  <br><br>
  ${new Date().toString()}`;

  res.send(responseString);
});

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find((el) => Number(req.params.id) === el.id);
  if (person) {
    res.status(200).json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => (error) => next(error));
});

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: 'content missing' });
  }
  const person = new Person({ name, number });
  person.save().then(() => res.status(201).json(person));
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
