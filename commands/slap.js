var command = "slap";
function help_info(prefix) {
  var help = {};
  help["command"] = command;
  help["help"] = `Slap someone with a trout`;

  return help;
}

function execute(args) {
  return new Promise((resolve, reject) => {
    resolve(
      `<@${args.client}> slaps ${args.args} around a bit with a large trout!`
    );
  });
}

function get() {
  return new Promise(resolve => {
    resolve(`botcongo slaps whoever you are around a bit with a large trout!`);
  });
}

function get_slash() {
  return {
    name: command,
    description: help_info("/").help,
    options: [
      {
        name: "user",
        description: "Who to slap",
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
