const inquirer = require("inquirer");

module.exports = function(args) {
  const questions = [
    {
      type: "input",
      name: "baseURL",
      message: "What is the base URL of the file(s) you would like to download?"
    },
    {
      type: "input",
      name: "fileExtension",
      message: "What is the file extension?",
      default: "txt"
    },
    {
      type: "input",
      name: "startingFile",
      message: "Starting at which file number?",
      default: 1
    },
    {
      type: "input",
      name: "endingFile",
      message: "Ending at which file number?",
      default: 5
    },
    {
      type: "input",
      name: "rateLimit",
      message: "How much time (in seconds) to wait between download requets?",
      default: 1
    }
  ];

  return new Promise(resolve => {
    inquirer
      .prompt(questions)
      .then(data => {
        args.messages.answers = {};
        args.messages.answers = data;
        resolve(args);
      })
      .catch(function(err) {
        console.log("inquirer error");
        reject(err);
      });
  });
};
