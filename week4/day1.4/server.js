
const mongoose = require('mongoose');
const { Schema } = mongoose;
// const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/animalsz');
mongoose.connection.on('connected', () => console.log('connected to mongodb'));

// mongoose < 4.x
// mongoose.Promise = global.Promise;

// const o = {
//   a: 'this is a',
//   b: 'this is b',
// };

// const a = 'some other a';
// const { a: c, b } = o;


// console.log(a, b, c);


const animalSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Provide an animal name']
  },
  age: {
    type: Number,
    required: [true, 'Provide an animal age!!'],
    min: [0, 'Provide a real age'],
    max: [100, 'Animals do not live that long!!']
  },
  eatsPeople: {
    type: Boolean,
   default: false
  },
});

// Animal => animals  | collection
mongoose.model('Animal', animalSchema);

// other file
const Animal = mongoose.model('Animal');

const animal = new Animal({
  name: 'Sally',
  age: 8
});

animal.save()
  .then(function (document) {
    console.log('saved document', document);

    // success redirect
  })
  .catch(function (error) {
    // console.log('got an error', error.errors.age.message);


    const errors = Object.keys(error.errors).map(key => error.errors[key].message)

    // for (let index = 0; index < keys.length; index++) {
    //   console.log(keys[index]);
    //   errors.push(error.errors[keys[index]].message);
    // }

    // response.render('form-page', { errors })

    console.log(errors);
  });
