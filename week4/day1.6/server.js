const mongoose = require('mongoose');
const { Schema } = mongoose;
// const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/animalzs');
mongoose.connection.on('connected', () => console.log('connected to mongo'));

// const o = {
//   a: 'this is a',
//   b: 'this is b'
// };

// const a = 'some other a';

// // const a = o.a;
// const { a: c, b } = o;
// console.log(a, b, c);

const animalSchema = new Schema({
  name: {
    type: String,
    required: [true, 'provide a name']
  },
  legs: {
    type: Number,
    required: [true, 'provide an age'],
    min: [0, 'provide a real number of legs'],
    max: [100, 'thats not a real number']
  },
  eatsPeople: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
});

// Animal => animals => collection name
const Animal = mongoose.model('Animal', animalSchema);

// other file
// const Animal = mongoose.model('Animal');


const spike = new Animal({
  name: 'Julie',
  legs: 10,
});

// console.log(spike)

spike.save()
  .then(function (animal) {
    console.log('saved animal', animal);
  })
  .catch(function (error) {
    // console.log('we got an error', error);
    console.log(error.errors.legs.message)

    const errors = Object.keys(error.errors).map(key => error.errors[key].message);

    // console.log(keys);
    // for (let index = 0; index < keys.length; index++) {
    //   console.log(keys[index]);
    //   errors.push(error.errors[keys[index]].message);
    // }

    console.log(errors);

    // response.render('form-page', { errors })
  });
