const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

if (process.argv.length < 3)  {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
} 


const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.pf1gfrd.mongodb.net/phoneBook?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);





if (process.argv.length < 5){
    mongoose
        .connect(url)
        .then((result) => {
            console.log('connected');
            return Person.find({})
        })
        .then((result) => {
            result.forEach(note => console.log(note));
            mongoose.connection.close();
        })

} else {
    const name = process.argv[3];
    const number = process.argv[4];
    mongoose
        .connect(url)
        .then((result) => {
            console.log('connected');
            const person = new Person({name: name, number: number});
            return person.save();
        })
        .then((result) => {
            console.log(`added ${name} number ${number} to phonebook`);
            mongoose.connection.close();
        })

}

