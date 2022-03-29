// run this using node mongo.js <pass>

const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://kami:${password}@cluster0.dhfvw.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

// display all entries in phonebook if only password is supplied
if (process.argv.length === 3) {
  console.log(`phonebook`);
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}

// add a phone book entry from command line in the following format
// node mongo.js yourpassword Anna 040-1234556
if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name,
    number,
  });
  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}

if (process.argv.length !== 3) {
  if (process.argv.length !== 5) {
    console.log("supply 3 or 5 command line arguments");
    mongoose.connection.close();
  }
}
