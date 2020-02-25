var request = require("request");
var cat = "https://api.thecatapi.com/v1/images/search";

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
        try {
          if (error || response.statusCode != 200) {
            resolve(`Sorry the meow API is overrun by doggos... try again later.`);
          } else if (body[0]["url"] === undefined) {
            resolve(`Sorry the meow API is overloaded... try again later.`);
          } else {
            resolve(`${body[0]["url"]}`);
          }
        } catch(e) {
          console.log(`Something went turribl-turribly wrong in the meow command:\n error - ${error} \nresponse - ${JSON.stringify(response)} \n body - ${JSON.stringify(body)}`);
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
