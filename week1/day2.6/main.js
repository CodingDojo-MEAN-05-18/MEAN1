// define function personMaker
   // name
   // items []

// jason.name
// => Jason


function Person(name, items) {
  const person = { name };

  if (!(this instanceof Person)) {
    console.log(name + ' is not instance of person');
    return new Person(name, items);
  }


  this.name = name;
  this.items = items;
  // console.log(this);

  // this.take = take;
  // console.log(this);



  // return person;
  // return this;
}

Person.prototype.take = function take(item, target) {
  if (!target || !Array.isArray(target.items)) {
    throw new Error('target must have items array');
  }

  for (let index = 0; index < target.items.length; index++) {
    if (item === target.items[index]) {
      console.log('found item', item);
      // remove item from array
      // slice => does not mutate array
      // splice => mutates original array

      target.items.splice(index, 1);
      this.items.push(item);

      return true;
    }
  }

  return false;
}


const jason = Person('Jason', ['lint', 'phone', 'wallet']);
const bob = new Person('Bob', ['gold', 'dust', 'cookies']);

// jason.name
console.log(jason.name);



console.log(jason);
console.log(bob);

jason.take('gold', bob);
bob.take('lint', jason);

const backpack = {
  items: ['compass', 'map', 'trailmix'],
};

// backpack.take = jason.take;

console.log(backpack);
jason.take('trailmix', backpack);
// backpack.take('gold', jason);

bob.take.apply(backpack, ['gold', jason]);
console.log(backpack);

console.log(jason);
console.log(bob);
