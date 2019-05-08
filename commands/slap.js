var command = "slap";
function help_info(prefix) {
  var help = {};
  help["command"] = command;
  help["help"] = `Slap someone with a trout. Usage: \`${prefix}${command} <USERNAME>\``;

  return help;
 
}

function execute(args) {
    return new Promise( (resolve, reject) => {
      resolve(`<@${args.client}> slaps ${args.args} around a bit with a large trout!`);
    });
}

module.exports.execute = execute;
module.exports.help_info = help_info;
module.exports.command = command;