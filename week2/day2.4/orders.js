function orderSupplies(item) {
  let warehouse; //undefined
  const deliveryTime = Math.random() * 3000;

  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      warehouse = {
        paint: {
          product: 'Neon Green Paint',
          directions: function() { return 'mix it!' }
        },
        brush: {
          product: 'Horsehair brush',
          directions: function() { return 'start painting!' }
        },
        tarp: {
          product: 'A Large Tarp',
          directions: () => 'cover the floor'
        }
      };

      console.log('supplying ' + item);

      if (item in warehouse) {
        resolve(warehouse[item]);
      } else {
        reject(new Error(`Item ${ item } is out of stock`));
      }

    }, deliveryTime);
  });
}

function receivedItem(item) {
  console.log(`Received ${item.product}. Time to ${item.directions()}`);
}


const paint = orderSupplies('paint');
const brush = orderSupplies('brush');
const tarp = orderSupplies('tarp');
const roller = orderSupplies('roller');


Promise.all([tarp, paint, brush, roller])
  .then(function(items) {
    items.forEach(receivedItem);
  })
  .catch(handleError);

// tarp
//   .then(function(item) {
//     receivedItem(item);
//
//     return paint;
//   })
//   .then(function(item) {
//     receivedItem(item);
//
//     return brush;
//   })
//   .then(function(item) {
//     receivedItem(item);
//
//     return roller;
//   })
//   .catch(handleError);
//
  function handleError(error) {
    console.log(error.message);
  }


console.log(paint);
// solution #1
// orderSupplies('paint', item => {
//   receivedItem(item);
//
//   orderSupplies('brush', receivedItem);
// });


// solution #2

// let havePaint = false;
//
// orderSupplies('paint', item => {
//   receivedItem(item);
//
//   havePaint = true;
// });
// orderSupplies('brush', item => {
//   if (havePaint) {
//     receivedItem(item);
//   } else {
//     const timer = setInterval(function() {
//       console.log('....checking for paint...');
//
//       if (havePaint) {
//         clearInterval(timer);
//
//         receivedItem(item);
//       }
//     }, 50);
//   }
// });

// orderSupplies('brush', handleBrush);
//
// function handleBrush(item) {
//   console.log('...checking for paint', item);
//   if (havePaint) {
//     return receivedItem(item);
//   }
//
//   setTimeout(handleBrush, 50, item);
// }


// let havePaint = false;
// let haveBrush = false;
//
// // solution #3
// orderSupplies('paint', item => {
//   console.log('have paint');
//   receivedItem(item);
//
//   if (haveBrush) {
//     // do something
//     return receivedItem(haveBrush);
//   }
//
//   havePaint = item;
// });
//
// orderSupplies('brush', item => {
//   console.log('have brush');
//   if (havePaint) {
//     return receivedItem(item);
//   }
//
//   haveBrush = item;
// });



// const paint = new Promise(function(resolve, reject) {
//   orderSupplies('paint', resolve);
// });
//
// const brush = new Promise(function(resolve, reject) {
//   orderSupplies('brush', resolve);
// });
//
// const tarp = new Promise(function(resolve, reject) {
//   orderSupplies('tarp', resolve);
// });
//
// tarp
//   .then(function(item) {
//     receivedItem(item);
//
//     return paint;
//   })
//   .then(function(item) {
//     receivedItem(item);
//   })
//   .then(function() {
//     return brush;
//   })
//   .then(function(item) {
//     receivedItem(item);
//   })
//   .catch(console.log);


//
