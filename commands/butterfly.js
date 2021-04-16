var jimp = require("jimp");

var command = "butterfly";

const default_jpg = "https://i.imgflip.com/2cjr7j.jpg";
const out_dir = "/usr/share/hassio/homeassistant/www/";
const host_url = "https://darkhq.duckdns.org/local/";

function help_info(prefix) {
    var help = {};
    help["command"] = command;
    help["help"] =`Generate butterfly meme`;
  
    return help;
}

function butterfly(username, butterfly, message, output_location) { 
    return new Promise ((resolve, reject) => {
        jimp.read(default_jpg)
        .then(image => {
            jimp.loadFont(jimp.FONT_SANS_128_WHITE).then(font => {
                image.print(font, 100, 400, username);
                image.print(font, 900, 200, butterfly);
                image.print(font, 0, 0, {
                    text: message,
                    alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: jimp.VERTICAL_ALIGN_BOTTOM,
                }, image.bitmap.width, image.bitmap.height);
                image.write(output_location, () => {
                    resolve(output_location);
                });
            })
            .catch(console.error)
            
        })
        .catch(console.error);
    });
    
}

function execute(args) {
    return new Promise( (resolve, reject) => {
        output_path = out_dir + "butterfly.jpg";
        butterfly(args.raw_opt[0].value, 
            args.raw_opt[1].value, 
            args.raw_opt[2].value, 
            output_path)
        .then(res => {
            jsonified = {
                "text": `<@${args.client}>'s epiphany...`,
                "attachment":host_url + "butterfly.jpg",
              }
            resolve(JSON.stringify(jsonified));;
        });
    });
    
}

function get() {
    return new Promise(resolve => {
        output_path = out_dir + "butterfly.jpg";
        butterfly("username", "butterfly", "Is this how it would look?", output_path)
        .then(result => {
        resolve(`<img width="480" src="${host_path + "butterfly.jpg"}"/>`);
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
                name: "face",
                description: "Text on face",
                type: 3,
                required: true
            },
            {
                name: "bfly",
                description: "Text on butterfly",
                type: 3,
                required: true
            },
            {
                name: "bot",
                description: "Text on bottom",
                type: 3,
                required: true
            }
        ]
    };
}

module.exports.execute = execute;
module.exports.help_info = help_info;
module.exports.command = command;
module.exports.get = get;
module.exports.get_slash = get_slash;