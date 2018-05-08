var myStr = 'some string';
// var index;
// myStr = 8;

var array = ['dog', 'cat', 77, 'moo', ['hat']];


array[5] = 'stuff';
// console.log(array.push('some content'));
array[array.length] = 'more stuff';


// console.log(array.pop(0));
// console.log(array);
// console.log(index);


// for (let index = 0; index < array.length; index++) {
//   console.log(array[index]);
// }

// console.log('after loop', index);
// const express = require('express');




// express = 'express';





// for (var item in array) {
//   console.log(array[item]);
// }

// for (var element of array.entries()) {
//   var index = element[0];
//   var item = element[1];
//   console.log(element, item, index);
// }

// var obj = {
//   content: 'some content',
//   'hair-color': 'purple',
// };
//
// obj.name = 'Jason';
//
// obj['age'] = 99;
//
// for (var key in obj) {
//   console.log(key, obj[key]);
// }


// console.log(obj);

function someName(name, bob, num, ...rest) {
  var child = 'child stuff';

  // console.log(arguments);
  console.log(rest);

  console.log('name');

  return 345;
}

console.log(someName('Jason', 'bobo', 23423423));
// console.log(child)
