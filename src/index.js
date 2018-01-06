const questions = require("./questions");
const download = require("./download");

function Main() {
  let result = {
    messages: {},
    errors: []
  };

  return questions(result) // q
    .then(data => {
      return data;
    })
    .then(download) // dl
    .then(data => {
      return data;
    })
    .catch(data => {
      // catch errors
      console.log(data);
      return data;
    });
}

Main().then(data => {
  if (data.errors.length > 0) {
    console.log(data);
  } else {
    console.log(`Done!`);
  }
});
