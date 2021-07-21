var summons = [
  "https://giphy.com/gifs/5ttRvCRSnVKZeiMWac",
  "https://media.tenor.com/images/d9762dbaa0f94f9637e91a8e1da07c80/tenor.gif",
  "https://media1.tenor.com/images/518457a38d1c2bb23d2eb67475a3f420/tenor.gif",
  "https://thumbs.gfycat.com/UnselfishWellgroomedJaeger-size_restricted.gif",
  "https://i.redd.it/cec6z49n29841.jpg"
];

export var command = "weow";

var rotateIdx = 0;

export function help_info(prefix) {
  var help = {};
  help["command"] = command;
  help["help"] = `Owen Wilson says 'weow'`;

  return help;
}

function logic() {
  return summons[rotateIdx++ % summons.length];
}

export async function execute(args) {
  const choice = logic();
  return `<@${args.client}> says, "Wow"!\n${choice}`;
}

export async function get() {
  return `botcongo says, "Wow"! ${choice}`;
  
}

export function get_slash() {
  return {
    name: command,
    description: help_info("/").help,
  }
}
