const { request, application, response } = require('express');
const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3001;
let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
})

app.get('/info', (req, res) => {
  const responseString = `Phonebook has info for ${persons.length} people
  <br><br>
  ${new Date().toString()}`

  res.send(responseString);
});

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find((el) => Number(req.params.id) === el.id);
  if (person) {
    res.status(200).json(person);
  } else {
    res.status(404).end();
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const index = persons.findIndex((el) => el.id === Number(req.params.id));
  if(index > -1) {
    persons.splice(index, 1);
    res.status(204).end();
  }
  else {
    res.status(404).end();
  }

})

app.post('/api/persons', (req, res) => {
  const {name, number} = req.body;
  if(!name || !number) {
    return res.status(400).json({error: 'content missing'});
  }
  const person = {
    name,
    number,
    id: Math.floor(Math.random() * 1000000000)
  }
  persons.push(person);
  res.status(201).end();
 })

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));