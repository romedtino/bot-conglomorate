var command = "fart";

function help_info(prefix) {
  var help = {};
  help["command"] = command;
  help["help"] = `Fart on a user. Usage: \`${prefix}${command} <USERNAME>\``

  return help;

}

function execute(args) {
    return new Promise( (resolve, reject) => {
      resolve(`<@${args.client}> farts on ${args.args} with a soft soggy wet one`);
    });

}

module.exports.execute = execute;
module.exports.help_info = help_info;
module.exports.command = command;