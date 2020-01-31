var summons = [
  "https://giphy.com/gifs/5ttRvCRSnVKZeiMWac",
  "https://media.tenor.com/images/d9762dbaa0f94f9637e91a8e1da07c80/tenor.gif",
  "https://media1.tenor.com/images/518457a38d1c2bb23d2eb67475a3f420/tenor.gif",
  "https://thumbs.gfycat.com/UnselfishWellgroomedJaeger-size_restricted.gif",
  "https://i.redd.it/cec6z49n29841.jpg"
];

var command = "weow";

var rotateIdx = 0;

function help_info(prefix) {
  var help = {};
  help["command"] = command;
  help["help"] = `Owen Wilson says 'weow'`;

  return help;
}

function logic() {
  return summons[rotateIdx++ % summons.length];
}

function execute(args) {
  return new Promise((resolve, reject) => {
    var choice = logic();
    resolve(`<@${args.client}> says, "Wow"!\n${choice}`);
  });
}

function get() {
  return new Promise(resolve => {
    var choice = logic();
    resolve(`botcongo says, "Wow"! ${choice}`);
  });
}

module.exports.execute = execute;
module.exports.help_info = help_info;
module.exports.command = command;
module.exports.get = get;
