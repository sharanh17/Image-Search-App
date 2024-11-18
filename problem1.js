// console.log('Start');

// setTimeout(() => {
//     console.log('Timeout 1');
//     Promise.resolve().then(() => {
//         console.log('Promise 1');
//         setTimeout(() => {
//             console.log('Timeout 2');
//             Promise.resolve().then(() => {
//                 console.log('Promise 2');
//             });
//         }, 0); //cb 3
//     });
// }, 0); //cb 1

// Promise.resolve().then(() => {
//     console.log('Promise 3');
//     setTimeout(() => {
//         console.log('Timeout 3');
//     }, 0);
// }); //cb 2

// console.log('End');

console.log("Start");

async function first() {
  console.log("First Start");
  await Promise.resolve("Promise A");
  console.log("First After Promise A");
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log("First Timeout");
      resolve();
    }, 0); // cb 2
  });
  console.log("First End");
}

async function second() {
  console.log("Second Start");
  await new Promise((resolve) => {
    console.log("Second Promise");
    resolve();
  });
  setTimeout(() => {
    console.log("Second Timeout");
  }, 0); //cb 4
  console.log("Second End");
}

setTimeout(() => {
  console.log("Timeout 1");
  Promise.resolve("Promise B").then(() => {
    console.log("Promise B Resolved");
    setTimeout(() => {
      console.log("Timeout 2");
    }, 0); //cb 3
  });
}, 0); //cb 1

first().then(() => {
  console.log("First Complete");
  second().then(() => {
    console.log("Second Complete");
  });
});

console.log("End");

// console.log("Start"); //1

// async function first() {
//   console.log("First Start");
//   await new Promise((resolve) => {
//     setTimeout(() => {
//       console.log("First Timeout");
//       resolve();
//     }, 0); // cb 2 => 0s =======
//   });
//   console.log("First After Timeout");
// }

// async function second() {
//   console.log("Second Start");
//   await Promise.resolve(); //
//   console.log("Second After Promise");
//   setTimeout(() => {
//     console.log("Second Timeout");
//   }, 0); // cb 4

//   await new Promise((resolve) => {
//     console.log("Second Nested Promise");
//     resolve();
//   });
//   console.log("Second End");
// }

// setTimeout(() => {
//   console.log("Timeout 1");
//   Promise.resolve("Promise 1").then((msg) => {
//     console.log(msg);
//     setTimeout(() => {
//       console.log("Timeout 2");
//     }, 0); // cb 3
//   });
// }, 0); //cb 1 => 0s ==========

// first().then(() => {
//   console.log("First Complete");
//   second().then(() => {
//     console.log("Second Complete");
//   });
// });

// console.log("End");
