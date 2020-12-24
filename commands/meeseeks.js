var meesay = [
  "Hi I'm Mr. Meeseeks! Look at me!!",
  "I'm Mr. Meeseeks! oo0o0o0o0o weeeeee! caaaaan doo!",
  "Look at me! Remember to square your shoulders",
  "I'm Mr. Meeseeks. I have to fulfill my purpose so I can go away. Look at me.",
  "Ooh, he's trying!",
  "Your failures are your own, old man. I'm Mr. Meeseeks!"
];

var command = "meeseeks";

function help_info(prefix) {
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

function execute(args) {
  return new Promise((resolve, reject) => {
    let choice = logic();
    resolve(`<@${args.client}>   Meeseeks - *${choice}*`);
  });
}

function get() {
  return new Promise(resolve => {
    let choice = logic();

    resolve(`Meeseeks - ${choice}`);
  });
}

function get_slash() {
  return {
    name: command,
    description: help_info("/").help,
  }
}

module.exports.execute = execute;
module.exports.help_info = help_info;
module.exports.command = command;
module.exports.get = get;
module.exports.get_slash = get_slash;
