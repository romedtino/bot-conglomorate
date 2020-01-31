var cmd = "royale";

function help_info(prefix) {
  var help = {};
  help["command"] = cmd;
  help[
    "help"
  ] = `List people who have won a solo game on Fortnite. Usage \`${prefix}${cmd}\``;

  return help;
}

function logic(user, list) {
  return new Promise((resolve, reject) => {
    var msg =
      "<@" +
      user +
      ">  https://media1.tenor.com/images/d89ba4e965cb9144c82348a1c234d425/tenor.gif \n\n";
    msg += "**[Battle Royale] [Victory Royale]**\n";
    msg += "*__Exlusive__ Member* list:\n";

    var winners = list;

    winners = winners.split(",");

    for (var i = 0; i < winners.length; i++) {
      msg += "        `" + winners[i] + "`\n";
    }
    resolve(msg);
  });
}

function execute(args) {
  return new Promise((resolve, reject) => {
    logic(args.client, args.args)
      .then(msg => {
        resolve(msg);
      })
      .catch(e => console.log(e));
  });

}

function get() {
  return new Promise(resolve => {
     logic('botcongo', 'Person1,Person2,Person3,...')
      .then(msg => {
        resolve(msg);
      })
      .catch(e => console.log(e));
  });
}

module.exports.execute = execute;
module.exports.help_info = help_info;
module.exports.command = cmd;
module.exports.get = get;
