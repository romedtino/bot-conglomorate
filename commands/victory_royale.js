var cmd = "royale";

function help_info(prefix) {
  var help = {};
  help["command"] = cmd;
  help["help"] = `List people who have won a solo game on Fortnite. Usage \`${prefix}${cmd}\``;

  return help;
 
}

function execute(args) {
  return new Promise( (resolve, reject) => {
    var msg = "<@" + args.client + ">  https://media1.tenor.com/images/d89ba4e965cb9144c82348a1c234d425/tenor.gif \n\n";
    msg +="**[Battle Royale] [Victory Royale]**\n";
    msg +="*__Exlusive__ Member* list:\n";
    
    var winners = args.args;
    
    winners = winners.split(',');
    
    for(var i=0;i<winners.length;i++) {
      msg += "        `" + winners[i] + "`\n";
    }
    resolve(msg);
  });
}

module.exports.execute = execute;
module.exports.help_info = help_info;
module.exports.command = cmd;
