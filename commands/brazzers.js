var imgur = require("imgur");
var jimp = require("jimp");

var command = "brazzers";

//Brazzers logo
var brazzersLogoURL = "https://i.imgur.com/gSnHoXE.jpg";

//default if none is used
var defaultURL = "https://i.imgur.com/s5AUpuY.jpg";

const out_dir = "/usr/share/hassio/homeassistant/www/";
const host_url = "https://darkhq.duckdns.org/local/";

//output/staging directory
var outputDir = "/tmp";

var album = "tGltqql";

function help_info(prefix) {
  var help = {};
  help["command"] = command;
  help["help"] =`Put the Brazzers logo on an image`;

  return help;
}

function brazzme(url) {
  return new Promise((resolve, reject) => {
    var tmpFilename = url;
    if (!tmpFilename) {
      tmpFilename = "https://i.imgur.com/s5AUpuY.jpg";
    }

    const outfile = `${out_dir}brazzers.jpg`;

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
              // imgur.setClientId(process.env.IMGUR_CLIENT);
              // imgur.setCredentials(
              //   process.env.IMGUR_USR,
              //   process.env.IMGUR_PW,
              //   process.env.IMGUR_CLIENT
              // );
              // imgur
              //   .uploadFile(outfile, album)
              //   .then(function(json) {
              //     console.log(json.data.link);
              //     resolve(`${json.data.link}`);
              //   })
              //   .catch(err => {
              //     console.error(err.message);
              //     reject(err.message);
              //   });
              resolve(`${host_url}brazzers.jpg`);
            });
          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  });
}

function execute(args) {
  return new Promise((resolve, reject) => {
    console.log("brazzin:", args.raw_opt[0].value);
    brazzme(args.raw_opt[0].value)
      .then(result => {
        jsonified = {
          "text": `<@${args.client}> saw this pr0n`,
          "attachment": result,
        }
        resolve(JSON.stringify(jsonified));
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

function get_slash() {
  return {
    name: command,
    description: help_info("/").help,
    options: [
      {
        name: "url",
        description: "URL to brazzify",
        type: 3,
        required: false
      }
    ]
  }
}

module.exports.execute = execute;
module.exports.help_info = help_info;
module.exports.command = command;
module.exports.get = get;
module.exports.get_slash = get_slash;
