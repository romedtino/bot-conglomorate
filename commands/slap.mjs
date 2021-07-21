export var command = "slap";

export function help_info(prefix) {
  var help = {};
  help["command"] = command;
  help["help"] = `Slap someone with a trout`;

  return help;
}

export async function execute(args) {
  return `<@${args.client}> slaps ${args.args} around a bit with a large trout!`;
}

export async function get() {
  return `botcongo slaps whoever you are around a bit with a large trout!`;
}

export function get_slash() {
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
