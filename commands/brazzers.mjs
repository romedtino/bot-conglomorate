// import imgur from "imgur";
import jimp from "jimp";

export var command = "brazzers";

//Brazzers logo
var brazzersLogoURL = "https://i.imgur.com/gSnHoXE.jpg";

//default if none is used
var defaultURL = "https://i.imgur.com/s5AUpuY.jpg";

const out_dir = "/usr/share/hassio/homeassistant/www/";
const host_url = "https://darkhq.duckdns.org/local/";

//output/staging directory
var outputDir = "/tmp";

var album = "tGltqql";

export function help_info(prefix) {
  var help = {};
  help["command"] = command;
  help["help"] =`Put the Brazzers logo on an image`;

  return help;
}

async function brazzme(url) {
  var tmpFilename = url;
  if (!tmpFilename) {
    tmpFilename = "https://i.imgur.com/s5AUpuY.jpg";
  }
  const outfile = `${out_dir}brazzers.jpg`;

  try {
    const image = await jimp.read(brazzersLogoURL);
    const targetImg = await jimp.read(tmpFilename);
    image.resize(targetImg.bitmap.width * 0.3, jimp.AUTO);
    targetImg.blit(
      image,
      targetImg.bitmap.width - image.bitmap.width - 20,
      targetImg.bitmap.height - image.bitmap.height - 20
    );
    return await new Promise((resolve) => {
      targetImg.write(outfile, () => {resolve(`${host_url}brazzers.jpg`)});
    });
  } catch (error) {
    console.log("brazzers error:", error);
  }

}

export async function execute(args) {
  console.log("brazzin:", args.raw_opt[0].value);
  try {
    const result = await brazzme(args.raw_opt[0].value);
    let jsonified = {
      "text": `<@${args.client}> saw this pr0n`,
      "attachment": result,
    }
    return JSON.stringify(jsonified);
  } catch (error) {
    console.log("brazzers execute err:", error);
  }
  
}

export async function get() {
  try {
    const result = await brazzme(null);
    return `<img width="480" src="${result}"/>`;
  } catch (error) {
    console.log("brazzers get err:", error);
  }
  
}

export function get_slash() {
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
