var request = require("request");
var command = "clip";

var twitchAPI = "https://api.twitch.tv/helix";
var twitchAuthUri = "https://id.twitch.tv/oauth2/token";
var latestClipURL = "";
var latestClipMilli = null;
var mainUser = "";
var clipCount = "&first=100";
var login = "";

function help_info(prefix) {
  var help = {};
  help["command"] = command;
  help["help"] = `Grabs the latest Twitch.tv clip of a given user. e.g. ${prefix}${command} Sajedene`;

  return help;
}

function reset() {
  latestClipURL = "";
  latestClipMilli = null;
}

var twitchClipsRequest = function(args, extraParams, auth_token) {
  return new Promise((resolve, reject) => {
    var options = {
      url: twitchAPI + "/clips?" + mainUser + clipCount + extraParams,
      json: true,
      headers: {
        "Authorization": `Bearer ${auth_token}`,
        "Client-ID": process.env.TWITCH_TOKEN
      }
    };

    request(options, function(error, response, body) {
      for (var i = 0; i < body.data.length; i++) {
        var milli = Date.parse(body.data[i].created_at);
        if (latestClipMilli == null || latestClipMilli < milli) {
          latestClipMilli = milli;
          latestClipURL = body.data[i].url;
        }
      }

      if (body.pagination.cursor != null) {
        var paginator = "&after=" + body.pagination.cursor;
        twitchClipsRequest(args, paginator, auth_token).then(result => {
          resolve(result);
        });
      } else {
        resolve(
          `<@${args.client}> here is ${login}'s latest clip: ${latestClipURL}`
        );
      }
    });
  });
};

function checkGetAccessToken()
{
  return new Promise( (resolve, reject) => {
    let access_token = "";
    uri = twitchAuthUri + `?client_id=${process.env.TWITCH_TOKEN}&client_secret=${process.env.TWITCH_SECRET}&grant_type=client_credentials`
    request.post(uri, (err, resp, body) => {
      json_parsed = JSON.parse(body);
      resolve(json_parsed.access_token);
    });  
  });
}

var getIdAndClip = function(args) {
  return new Promise((resolve, reject) => {
    
    checkGetAccessToken()
    .then( auth_token => {
      if(!login || login === ""){
        login = "nickmercs";
      }
      
      var options = {
        url: twitchAPI + "/users?login=" + login,
        json: true,
        headers: {
          "Authorization": `Bearer ${auth_token}`,
          "Client-ID": process.env.TWITCH_TOKEN
        }
      };
      request(options, function(error, response, body) {
        console.log("body:", body);
        if (body.data.length <= 0) {
          resolve(`We didn't find a user with the name ${login}`);
        } else {
          var bcastId = body.data[0].id;
          mainUser = "broadcaster_id=" + bcastId;
          console.log(mainUser);
          twitchClipsRequest(args, "", auth_token)
            .then(result => {
              resolve(result);
            })
            .catch(err => console.log(err));
        }
      });
    })
    .catch(console.error);
  });
};

function execute(args) {
  login = args.args;
  reset();
  return getIdAndClip(args);
}

function get() {
  let getUser = "nickmercs";
  login = getUser;
  reset();
  let args = { client: "botcongo" };
  return getIdAndClip(args);
}

function get_slash() {
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

module.exports.execute = execute;
module.exports.help_info = help_info;
module.exports.command = command;
module.exports.get = get;
module.exports.get_slash = get_slash;
