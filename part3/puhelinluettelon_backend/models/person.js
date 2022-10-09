const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('Connecting to MongoDB');

mongoose
  .connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: String,
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
