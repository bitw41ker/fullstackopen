require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');

const app = express();

morgan.token('body', (req, res) => {
  if (req.method === 'POST') return JSON.stringify(req.body);
});

app.use(express.static('build'));
app.use(express.json());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

const PORT = process.env.PORT || 3001;

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

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => console.log(error));
});

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: 'content missing' });
  }
  const person = new Person({ name, number });
  person.save().then(() => res.status(201).json(person));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
