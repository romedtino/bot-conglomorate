var imgur = require("imgur");
var jimp = require("jimp");

var jsCommand = "brazzers";

//Brazzers logo
var brazzersLogoURL = "https://i.imgur.com/gSnHoXE.jpg";

//default if none is used
var defaultURL = "https://i.imgur.com/s5AUpuY.jpg";

//output/staging directory
var outputDir = "/tmp";

var album = "tGltqql";

function help_info() {
  var help = {};
  help["command"] = jsCommand;
  help["help"] =
    "Put the Brazzers logo on an image. Usage: `!brazzers [URL to image]`";

  return help;
}

function brazzme(url) {
  return new Promise((resolve, reject) => {
    var tmpFilename = url;
    if (!tmpFilename) {
      tmpFilename = "https://i.imgur.com/s5AUpuY.jpg";
    }

    var seconds = new Date() / 1000;
    const outfile = `/tmp/brazzers${seconds}.jpg`;

    var brazzersLogoURL = "https://i.imgur.com/gSnHoXE.jpg";
    jimp
      .read(brazzersLogoURL)
      .then(image => {
        jimp
          .read(tmpFilename)
          .then(targetImg => {
            image.resize(targetImg.bitmap.width * 0.3, jimp.AUTO);
            targetImg.blit(
              image,
              targetImg.bitmap.width - image.bitmap.width - 20,
              targetImg.bitmap.height - image.bitmap.height - 20
            );
            targetImg.write(outfile, () => {
              imgur.setClientId(process.env.IMGUR_CLIENT);
              imgur.setCredentials(
                process.env.IMGUR_USR,
                process.env.IMGUR_PW,
                process.env.IMGUR_CLIENT
              );
              imgur
                .uploadFile(outfile, album)
                .then(function(json) {
                  console.log(json.data.link);
                  resolve(`${json.data.link}`);
                })
                .catch(err => {
                  console.error(err.message);
                  reject(err.message);
                });
            });
          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  });
}

function execute(args) {
  return new Promise((resolve, reject) => {
    brazzme(args.args)
      .then(result => {
        resolve(`<@${args.client}> - ${result}`);
      })
      .catch(e => console.log(e));
  });
}

function get() {
  return new Promise(resolve => {
    brazzme(null)
      .then(result => {
        resolve(`<img width="480" src="${result}"/>`);
      })
      .catch(e => console.log(e));
  });
}

module.exports.execute = execute;
module.exports.help_info = help_info;
module.exports.command = jsCommand;
module.exports.get = get;
