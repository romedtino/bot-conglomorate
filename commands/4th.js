var summons = [
  "https://cdn.discordapp.com/attachments/463864401011671050/533917047495589888/PicsArt_01-12-11.41.34.jpg",
  "https://pbs.twimg.com/profile_images/3029755578/5af44ec20a9634047a1624fc4e73b293.png",
  "https://i.kym-cdn.com/photos/images/facebook/001/337/716/1b5.jpg",
  "https://gfycat.com/dearsadalpaca"
];

var command = "4th";

var rotateIdx = 0;

function help_info(prefix) {
  var help = {};
  help["command"] = command;
  help["help"] = `WE NEED A 4th!!!!. Usage: \`${prefix}${command}\``;

  return help;
}

function logic() {
  return summons[rotateIdx++ % summons.length];
}

function execute(args) {
  return new Promise((resolve, reject) => {
    let result = logic();
    resolve(`<@${args.client}> is trying to summon a 4th!\n${result}`);
  });
}

function get() {
  return new Promise(resolve => {
    let result = logic();
    resolve(
      `Some person is trying to summon a 4th!<br/><img width="480" src="${result}"/>`
    );
  });
}

module.exports.execute = execute;
module.exports.help_info = help_info;
module.exports.command = command;
module.exports.get = get;
