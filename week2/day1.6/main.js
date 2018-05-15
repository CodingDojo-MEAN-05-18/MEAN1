

function map(array, callback) {
  // console.log(callback.toString());
  const results = [];

  console.log('orig', array);

  for (let index = 0; index < array.length; index++) {
    results.push(callback(array[index], index));
  }

  return results;
}

const stringArray = ['4', '5', '09', '2', 'cat', '10'];

// const res = map(stringArray, function(element) {
//   console.log('inside callback', element);
//
//   return element + ' hello from callback';
// });
//
// console.log('res', res, stringArray);
//
// const rez = map(stringArray, element => parseInt(element, 10));
//
// console.log('rez', rez, stringArray);
//
// const nums = [1,7,4 , 100,9, 234];
//
// const resz = map(nums, (element, index) => element * index);
//
// console.log('resz', resz);
//
// const ress = map(nums, add);
//
// console.log('ress', ress);
//
//
// function add(num1, num2) {
//   return num1 + num2;
// }


console.log('before');


// function sayHello(name) {
//   setTimeout(function() {
//     console.log(`Hello ${ name }`);
//   }, 2000);
//
// }
//
// sayHello('Jason');


function getThingsFromDB(query, callback) {

  return setTimeout(function() {
    console.log('callback in timeout', callback.toString());
    const data = ['thing1', 'thing2'];

    callback(data);

  }, 2000);
}


getThingsFromDB('select * from things;', function(things) {
  console.log('inside callback to db things', things);

  console.log(map(things, element => element + ' got things?'));
});




console.log('after');
