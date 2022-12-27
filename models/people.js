const mongoose = require('mongoose');
const url = process.env.MONGODB_URI;
console.log(url);
mongoose.set('strictQuery', false);

mongoose
  .connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

module.export = mongoose.model('Person', personSchema);


