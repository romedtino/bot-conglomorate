var command = "fart";

function help_info(prefix) {
  var help = {};
  help["command"] = command;
  help["help"] = `Fart on a user`;

  return help;
}

function execute(args) {
  return new Promise((resolve, reject) => {
    resolve(
      `<@${args.client}> farts on ${args.args} with a soft soggy wet one`
    );
  });
}

function get() {
  return new Promise(resolve => {
    resolve(`bot congo farts on whoever you are with a soft soggy wet one`);
  });
}

function get_slash() {
  return {
    name: command,
    description: help_info("/").help,
    options: [
      {
        name: "fartee",
        description: "Someone to fart on",
        type: 3,
        required: true
      }
    ]
  }
}

module.exports.execute = execute;
module.exports.help_info = help_info;
module.exports.command = command;
module.exports.get = get;
module.exports.get_slash = get_slash;
