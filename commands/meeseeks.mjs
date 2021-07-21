var meesay = [
  "Hi I'm Mr. Meeseeks! Look at me!!",
  "I'm Mr. Meeseeks! oo0o0o0o0o weeeeee! caaaaan doo!",
  "Look at me! Remember to square your shoulders",
  "I'm Mr. Meeseeks. I have to fulfill my purpose so I can go away. Look at me.",
  "Ooh, he's trying!",
  "Your failures are your own, old man. I'm Mr. Meeseeks!"
];

export var command = "meeseeks";

export function help_info(prefix) {
  var help = {};
  help["command"] = command;
  help[
    "help"
  ] = `Summon a meeseeks from the box`;

  return help;
}

function randRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function logic() {
  var meeChoice = randRange(0, meesay.length);
  return meesay[meeChoice];
}

export async function execute(args) {
  try {
    const choice = await logic();
    return `<@${args.client}>   Meeseeks - *${choice}*`;
  } catch(error) {
    console.log(error);
  }

}

export async function get() {
  try {
    const choice = await logic();
    return `Meeseeks - ${choice}`;
  } catch(error) {
    console.log(error);
  }
}

export function get_slash() {
  return {
    name: command,
    description: help_info("/").help,
  }
}
