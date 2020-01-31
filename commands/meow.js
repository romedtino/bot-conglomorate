var request = require("request");
var cat = "http://aws.random.cat/meow.php";

var command = "meow";

function help_info(prefix) {
  var help = {};
  help["command"] = command;
  help["help"] = `Get a random kirry. Usage: \`${prefix}meow\``;

  return help;
}

function logic() {
  return new Promise((resolve, reject) => {
    request(
      {
        url: cat,
        json: true
      },
      function(error, response, body) {
        if (body.file === undefined) {
          resolve(`Sorry the meow API is overloaded... try again later.`);
        } else {
          resolve(`${body.file}`);
        }
      }
    );
  });
}

function execute(args) {
  return new Promise((resolve, reject) => {
    logic()
      .then(result => {
        resolve(`<@${args.client}> meow! ${result}`);
      })
      .catch(e => console.log(e));
  });
}

function get() {
  return new Promise((resolve, reject) => {
    logic()
      .then(result => {
        resolve(`botcongo meow! <img width="480" src="${result}">`);
      })
      .catch(e => console.log(e));
  });
}

module.exports.execute = execute;
module.exports.help_info = help_info;
module.exports.command = command;
module.exports.get = get;
