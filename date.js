// Refactored
exports.getDate = function() {
  const today = new Date();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  };

  return today.toLocaleDateString("en-US", options);

}

exports.getDay = function () {
  const today = new Date();

  const options = {
    weekday: "long",
  };

  return today.toLocaleDateString("en-US", options);
}


// This is the original code for the date.js
// module.exports.getDate = getDate;
//
// function getDate() {
//   let today = new Date();
//
//   let options = {
//     weekday: "long",
//     day: "numeric",
//     month: "long",
//     year: "numeric"
//   };
//
//   return today.toLocaleDateString("en-US", options);
//
// }
//
// module.exports.getDay = getDay;
//
// function getDay() {
//   let today = new Date();
//
//   let options = {
//     weekday: "long",
//   };
//
//   return today.toLocaleDateString("en-US", options);
// }
// console.log(module.exports);
