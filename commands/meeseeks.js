var meesay = [ "Hi I'm Mr. Meeseeks! Look at me!!",
               "I'm Mr. Meeseeks! oo0o0o0o0o weeeeee! caaaaan doo!",
               "Look at me! Remember to square your shoulders",
               "I'm Mr. Meeseeks. I have to fulfill my purpose so I can go away. Look at me.",
               "Ooh, he's trying!",
               "Your failures are your own, old man. I'm Mr. Meeseeks!"]

var command = "meeseeks";

function help_info(prefix) {
  var help = {};
  help["command"] = command;
  help["help"] = `Typing \`${prefix}meeseeks\` anytime will summon a meeseeks from the box.`;

  return help;
}



function randRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function execute(args) {
    return new Promise( (resolve, reject) => {
      var meeChoice = randRange(0, meesay.length); 

      resolve(`<@${args.client}>   Meeseeks - * ${meesay[meeChoice]}*`);

    });
}

module.exports.execute = execute;
module.exports.help_info = help_info;
module.exports.command = command;