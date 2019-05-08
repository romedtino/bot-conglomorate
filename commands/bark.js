var request = require ("request");
var dog = "https://random.dog/woof.json"

var command = "bark";

function help_info(prefix) {
  var help = {};
  help["command"] = command;
  help["help"] = `Get a random doggo. Usage: \`${prefix}${command}\``

  return help;

}

function execute(args) {
    return new Promise( (resolve, reject) => {
      request({
            url: dog,
            json: true
        }, function (error, response, body) {
              resolve(`<@${args.client}> bark! ${body.url}`);
            });
    });

}

module.exports.execute = execute;
module.exports.help_info = help_info;
module.exports.command = command;
