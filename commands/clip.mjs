import got from 'got';

export var command = "clip";

var twitchAPI = "https://api.twitch.tv/helix";
var twitchAuthUri = "https://id.twitch.tv/oauth2/token";
var latestClipURL = "";
var latestClipMilli = null;
var mainUser = "";
var clipCount = "&first=100";
var login = "";

export function help_info(prefix) {
  var help = {};
  help["command"] = command;
  help["help"] = `Grabs the latest Twitch.tv clip of a given user. e.g. ${prefix}${command} Sajedene`;

  return help;
}

function reset() {
  latestClipURL = "";
  latestClipMilli = null;
}

var twitchClipsRequest = async function(args, extraParams, auth_token) {
  var options = {
    url: twitchAPI + "/clips?" + mainUser + clipCount + extraParams,
    headers: {
      "Authorization": `Bearer ${auth_token}`,
      "Client-ID": process.env.TWITCH_TOKEN
    }
  };

  try {
    const body = await got(options).json();
    for (var i = 0; i < body.data.length; i++) {
      var milli = Date.parse(body.data[i].created_at);
      if (latestClipMilli == null || latestClipMilli < milli) {
        latestClipMilli = milli;
        latestClipURL = body.data[i].url;
      }
    }

    if (body.pagination.cursor != null) {
      var paginator = "&after=" + body.pagination.cursor;
      return twitchClipsRequest(args, paginator, auth_token);
    } else {
      return `<@${args.client}> here is ${login}'s latest clip: ${latestClipURL}`;
    }
  } catch(error) {
    console.log("error caught in twitchClipRequest:", error);
  }
};

async function checkGetAccessToken()
{
  let uri = twitchAuthUri + `?client_id=${process.env.TWITCH_TOKEN}&client_secret=${process.env.TWITCH_SECRET}&grant_type=client_credentials`
  
  try {
    const body = await got.post(uri).json();
    console.log("checkGetAcc:", body);
    return body.access_token;
  } catch(error) {
    console.log("error checkGetAccessToken:", error);
  }
}

var getIdAndClip = async function(args) {
  
  try {
    let auth_token = await checkGetAccessToken();
    if(!login || login === ""){
      login = "nickmercs";
    }
  
    var options = {
      url: twitchAPI + "/users?login=" + login,
      headers: {
        "Authorization": `Bearer ${auth_token}`,
        "Client-ID": process.env.TWITCH_TOKEN
      }
    };

    const body = await got(options).json();
    console.log("twitapiLog:", body);
    if (body.data.length <= 0) {
      resolve(`We didn't find a user with the name ${login}`);
    } else {
      var bcastId = body.data[0].id;
      mainUser = "broadcaster_id=" + bcastId;
      console.log(mainUser);
      return twitchClipsRequest(args, "", auth_token);
    }
  } catch(error) {
    console.log("error:", error);
  }

};

export async function execute(args) {
  login = args.args;
  reset();
  return getIdAndClip(args);
}

export async function get() {
  let getUser = "nickmercs";
  login = getUser;
  reset();
  let args = { client: "botcongo" };
  return getIdAndClip(args);
}

export function get_slash() {
  return {
    name: command,
    description: help_info("/").help,
    options: [
      {
        name: "user",
        description: "Twitch username to get clip from",
        type: 3,
        required: true
      }
    ]
  }
}
