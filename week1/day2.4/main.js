// define function personMaker
  // params:
    // name
    // items []


function Person(name, items) {
  // this = {};
  // const person = { name };
  if (!(this instanceof Person)) {
    console.log(name + ' is not an instance');
    return new Person(name, items);
  }

  this.name = name;
  this.items = items;
  // this.take = take;
  // console.log(this);



  // console.log(person);

  // return person;
  // return this;
}

Person.prototype.take = function take(item, target) {
  if (!target || !Array.isArray(target.items)) {
    throw new Error('target must have an items array');
  }
  // console.log(Array.isArray(target.items));

  for (let index = 0; index < target.items.length; index++) {
    if (item === target.items[index]) {
      console.log('found item', item);
      // slice => does not mutate original array
      // splice => mutates array
      this.items.push(item);
      target.items.splice(index, 1);

      return true;
    }
  }

  return false;
}

const jason = Person('Jason', ['lint', 'pencil', 'wallet']);
const bob = new Person('Bob', ['gold', 'dust', 'coins']);
console.log(jason);
console.log(bob);

jason.take('gold', bob);
bob.take('lint', jason);

const backpack = {
  items: ['compass', 'trailmix', 'map'],
};

// backpack.take = jason.take;
console.log(backpack);

// backpack.take('gold', jason);
jason.take('trailmix', backpack);

jason.take.apply(backpack, ['gold', jason]);
console.log(backpack);

// take('gold', bob);
console.log(bob);
console.log(jason);

// => Jason
