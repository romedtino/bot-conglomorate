var summons = [
  "https://giphy.com/gifs/5ttRvCRSnVKZeiMWac",
  "https://media.tenor.com/images/d9762dbaa0f94f9637e91a8e1da07c80/tenor.gif",
  "https://media1.tenor.com/images/518457a38d1c2bb23d2eb67475a3f420/tenor.gif",
  "https://thumbs.gfycat.com/UnselfishWellgroomedJaeger-size_restricted.gif"
];

var command = "weow";

var rotateIdx = 0;

function help_info(prefix) {
  var help = {};
  help["command"] = command;
  help["help"] = `Owen Wilson says 'weow'`;

  return help;
}

function execute(args) {
  return new Promise((resolve, reject) => {
    var choice = summons[rotateIdx++ % summons.length];
    resolve(`<@${args.client}> says, "Wow"!\n${choice}`);
  });
}

module.exports.execute = execute;
module.exports.help_info = help_info;
module.exports.command = command;
