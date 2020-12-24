var request = require("request");

let command = "evan";

function help_info(prefix) {
  var help = {};
  help["command"] = command;
  help["help"] = `No one knows what this does...`;

  return help;
}

function getLastPlayed(args) {
  return new Promise((resolve, reject) => {
    var steamCmd =
      "http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=" +
      process.env.STEAMKEY +
      "&steamid=" +
      process.env.EVANSKEY +
      "&format=json";

    request(
      {
        url: steamCmd,
        json: true
      },
      function(error, response, body) {
        if (body.response.total_count < 1) {
          resolve(
            `That's unusual... Evan hasn't tried to mod DOA jiggle physics in awhile. Someone should check if he's alive!`
          );
        } else {
          var appid = body.response.games[0].appid;
          var hash = body.response.games[0].img_logo_url;
          var icon = `http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${hash}.jpg`;
          resolve(
            `<@${args.client}> :mount_fuji: :mount_fuji: The latest game Evan is modding in **DOA** *jiggle* physics for is ${body.response.games[0].name} \n ${icon}`
          );
        }
      }
    );
  });
}

function execute(args) {
  return getLastPlayed(args);
}

function get() {
  let args = { client: "botcongo" };
  return getLastPlayed(args);
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