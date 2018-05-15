

function map(array, callback) {
  const results = [];

  for (let index = 0; index < array.length; index++) {
    results.push(callback(array[index], index));
  }

  return results;
}

const stringArray = ['cat', '7', '99', '10'];

const res = map(stringArray, element => parseInt(element, 10));

const numArray = [1,5,23,7,234,8];
// console.log('results', res);

const rez = map(numArray, (element, index) => element * index);
// console.log('results', rez);

const ress = map(numArray, add);

function add(num1, num2) {
  return num1 + num2;
}
// console.log('results', ress);


console.log('before');
// function sayHello(name) {
//   setTimeout(function() {
//     console.log(`Hello ${name}`);
//   }, 2000);
//
//   console.log('processing...');
// }
//
// sayHello('Jason');


function getThingsFromDB(query, callback) {
  return setTimeout(function() {
    const data = ['thing1', 'thing2'];
    // console.log(callback.toString());
    callback(data);
  }, 2000);
}


getThingsFromDB('select * from things', function(things) {
  console.log('inside anon func', things);

  const results = map(things, thing => thing + ' whatever');


  console.log('results', results);
});


console.log('after');
