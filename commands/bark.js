var request = require("request");
var dog = "https://random.dog/woof.json";

var command = "bark";

function help_info(prefix) {
  var help = {};
  help["command"] = command;
  help["help"] = `Get a random doggo`;

  return help;
}

function logic() {
  return new Promise((resolve, reject) => {
    request(
      {
        url: dog,
        json: true
      },
      function(error, response, body) {
        resolve(`${body.url}`);
      }
    );
  });
}

function execute(args) {
  return new Promise((resolve, reject) => {
    logic()
      .then(url => resolve(`<@${args.client}> bark! ${url}`))
      .catch(e => console.log(e));
  });
}

function get() {
  return new Promise(resolve => {
    logic()
      .then(url => resolve(`botcongo - bark! <img width="480" src="${url}">`))
      .catch(e => console.log(e));
  });
}

function get_slash() {
  return {
    name: command,
    description: help_info("/").help,
  }
}

module.exports.execute = execute;
module.exports.help_info = help_info;
module.exports.command = command;
module.exports.get = get;
module.exports.get_slash = get_slash;
