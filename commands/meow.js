var request = require ("request");
var cat = "http://aws.random.cat/meow.php"

var command = "meow";

function help_info(prefix) {
  var help = {};
  help["command"] = command;
  help["help"] = `Get a random kirry. Usage: \`${prefix}meow\``

  return help;

}

function execute(args) {
  return new Promise( (resolve, reject) => {
    request({
            url: cat,
            json: true
        }, function (error, response, body) {
              if(body.file === undefined )
              {
                resolve(`<@${args.client}> Sorry the meow API is overloaded... try again later.`);
              }
              else {
                resolve(`<@${args.client}> meow! ${body.file}`);
              }
            });
  });
}

module.exports.execute = execute;
module.exports.help_info = help_info;
module.exports.command = command;
