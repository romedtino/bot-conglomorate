var request = require('request');
var command = "clip";

var twitchAPI = 'https://api.twitch.tv/helix';
var latestClipURL = "";
var latestClipMilli = null;
var mainUser = "";
var clipCount = '&first=100';
var login = "";

function help_info(prefix) {
  var help = {};
  help["command"] = command;
  help["help"] = `Grabs the latest Twitch.tv clip of a given user. Usage: \`${prefix}${command} [Twitch Username]\`\n    e.g. \`${prefix}${command} Sajedene\``;

  return help;
 
}

function reset()
{
  latestClipURL = "";
  latestClipMilli = null;
}

var twitchClipsRequest = function(args, extraParams)
{
  return new Promise( (resolve, reject) => {
    var options = { url:twitchAPI + '/clips?' + mainUser + clipCount + extraParams,
                    json: true,
                    headers: {
                      "Client-ID" : process.env.TWITCH_TOKEN
                    }
                  };

      request(options, function(error, response, body) {

        for(var i=0;i< body.data.length;i++) {
          var milli = Date.parse(body.data[i].created_at);
          if(latestClipMilli == null || latestClipMilli < milli) {
            latestClipMilli = milli;
            latestClipURL = body.data[i].url;
          }
        }

        if(body.pagination.cursor != null)
        {
          var paginator = "&after=" + body.pagination.cursor;
          twitchClipsRequest(args, paginator)
            .then( result => {
              resolve(result);
            });
        } else {
          resolve(`<@${args.client}> here is ${login}'s latest clip: ${latestClipURL}`);
        }

      }  
    );
  });
  
}

var getIdAndClip = function(args)
{
  return new Promise( (resolve, reject) => {
    var options = { url:twitchAPI + '/users?login=' + login,
                json: true,
                headers: {
                  "Client-ID" : process.env.TWITCH_TOKEN
                }
              };
    request(options, function(error, response, body) {

      if(body.data.length <= 0)
      {
        resolve(`We didn't find a user with the name ${login}`);  
      } else {
        var bcastId = body.data[0].id;
        mainUser = 'broadcaster_id=' + bcastId;
        console.log(mainUser);
        twitchClipsRequest(args, "")
        .then( result => {
          resolve(result);
        })
        .catch( err => console.log(err) );
      }
    });
  });
}

function execute(args) 
{
     login = args.args;
     reset();
     return getIdAndClip(args);
}

module.exports.execute = execute;
module.exports.help_info = help_info;
module.exports.command = command;