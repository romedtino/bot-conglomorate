import jimp from "jimp";

export var command = "butterfly";

const default_jpg = "https://i.imgflip.com/2cjr7j.jpg";
const out_dir = "/usr/share/hassio/homeassistant/www/";
const host_url = "https://darkhq.duckdns.org/local/";

export function help_info(prefix) {
    var help = {};
    help["command"] = command;
    help["help"] =`Generate butterfly meme`;
  
    return help;
}

async function butterfly(username, butterfly, message, output_location) { 
    try {
        const image = await jimp.read(default_jpg);
        const font = await jimp.loadFont(jimp.FONT_SANS_128_WHITE);
        image.print(font, 100, 400, username);
        image.print(font, 900, 200, butterfly);
        image.print(font, 0, 0, {
            text: message,
            alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: jimp.VERTICAL_ALIGN_BOTTOM,
        }, image.bitmap.width, image.bitmap.height);
        return await new Promise( (res) => {
            image.write(output_location, () => {
                res(output_location);
            });
        });
    } catch(error) {
        console.log(error);
    }
    
}

export async function execute(args) {
    let output_path = out_dir + "butterfly.jpg";
    try {
        const res = await butterfly(args.raw_opt[0].value, 
            args.raw_opt[1].value, 
            args.raw_opt[2].value, 
            output_path);
        let jsonified = {
            "text": `<@${args.client}>'s epiphany...`,
            "attachment":host_url + "butterfly.jpg",
            }
        return JSON.stringify(jsonified);
    } catch(error) {
        console.log(error);
    }
}

export async function get() {
    let output_path = out_dir + "butterfly.jpg";
    try {
        const result = await butterfly("username", "butterfly", "Is this how it would look?", output_path);
        return `<img width="480" src="${host_url + "butterfly.jpg"}"/>`
    } catch(error) {
        console.log(error);
    }
}

export function get_slash() {
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
