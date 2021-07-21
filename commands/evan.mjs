import got from 'got';

export let command = "evan";

export function help_info(prefix) {
  var help = {};
  help["command"] = command;
  help["help"] = `No one knows what this does...`;

  return help;
}

async function getLastPlayed(args) {
  var steamCmd =
    "http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=" +
    process.env.STEAMKEY +
    "&steamid=" +
    process.env.EVANSKEY +
    "&format=json";

  try {
    const body = await got(steamCmd).json();
    if (body.response.total_count < 1) {
      return `That's unusual... Evan hasn't tried to mod DOA jiggle physics in awhile. Someone should check if he's alive!`;
    } else {
      var appid = body.response.games[0].appid;
      var hash = body.response.games[0].img_logo_url;
      var icon = `http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${hash}.jpg`;
      return `<@${args.client}> :mount_fuji: :mount_fuji: The latest game Evan is modding in **DOA** *jiggle* physics for is ${body.response.games[0].name} \n ${icon}`;
    }
  } catch (error) {
    console.log(error)
    return `Problem querying for Evan's DOA jiggle library :(`
  }
}

export async function execute(args) {
  return getLastPlayed(args);
}

export async function get() {
  let args = { client: "botcongo" };
  return getLastPlayed(args);
}

export function get_slash() {
  return {
    name: command,
    description: help_info("/").help,
  }
}
