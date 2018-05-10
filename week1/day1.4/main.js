
const myStr = "some string";

// myStr[0] = 'd';
//
// console.log(myStr);

// myStr = 5;

// console.log(myStr[myStr.length]);

const array = ['dog', 'cat', 1,2,8,4,99];

// console.log(array.push(myStr));
//
// console.log(array.pop());

for (let index = 0; index < array.length; index++) {
  // console.log(array[index]);
}

// console.log('index after loop', index);

// for (var item in array) {
//   // console.log(item);
//   console.log(array[item]);
// }

// for (var item of array) {
//   console.log('item', item);
// }

var obj = {
  content: 'this is some content',
  'hair-color': 'purple',
};

obj.name = 'Jason';

obj['age'] = 99;

// console.log(obj);

// for (var key in obj) {
//   console.log(obj[key]);
// }

// array = [];


function someName(...rest) {
  var child = 'child stuff';
  // console.log(arguments);
  console.log(rest);
  // console.log('name' + name.toUpperCase());

  return child;
}

console.log(someName('Jason', 'bob', 565656));

function counter() {
  var count = 0;


  function childScope() {
    console.log('inside child scope', ++count);
    return count;
  }

  return childScope;
}


counter = counter();
console.log(counter);
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());
// counter()
// => 1;
// counter()
// => 2;
// counter()
// => 3;


var func = function() {
  console.log('inside anon func');
};

function doesThings(callback) {
    console.log(callback);
    console.log(typeof callback);
    if (typeof callback === 'function') {
      callback();
    }
}

doesThings(func);


// func();
