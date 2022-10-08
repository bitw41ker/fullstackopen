const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const [, , password, name, number] = process.argv;
const url = `mongodb+srv://fullstackcourse789:${password}@cluster0.pmba8yg.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model('Person', personSchema);

if (process.argv.length <= 3) {
  Person.find({}).then((results) => {
    console.log('phonebook:');
    results.forEach((person) => console.log(person.name, person.number));
    mongoose.connection.close();
  });
} else {
  const person = new Person({ name, number });

  person.save().then((result) => {
    console.log(`added ${person.name} ${person.number} to phonebook`);
    mongoose.connection.close();
  });
}
