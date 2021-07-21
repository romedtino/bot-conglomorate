export var command = "fart";

export function help_info(prefix) {
  var help = {};
  help["command"] = command;
  help["help"] = `Fart on a user`;

  return help;
}

export async function execute(args) {
  return `<@${args.client}> farts on ${args.args} with a soft soggy wet one`;
}

export async function get() {
  return `bot congo farts on whoever you are with a soft soggy wet one`
}

export function get_slash() {
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
