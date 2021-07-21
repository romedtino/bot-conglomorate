import Editly from 'editly';
import path from 'path';
import url from 'url';
import gl from 'gl';
var gl_inst = gl(640,360);


var sub_text = [ "It ain't much, but it is honest work. Gulag secured.",
"Stealth, tactic, accuracy and precision. None of those things led to this win but here we are.",
"We don't win often but when we do, we make sure to let this channel know.",
"Tita approved winners right here."
]

var out_dir = "/usr/share/hassio/homeassistant/www/wzwin";
var data_dir = "/home/dark/discord_bots/bot-conglomorate/data/wzwin";
var host_url = "https://darkhq.duckdns.org/local/wzwin/";

var generators = [generate_anchorman, generate_avengers, generate_prangers, generate_therock];

export var command = "wzwin";

function randRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function help_info(prefix) {
    var help = {};
    help["command"] = command;
    help["help"] = `Announce to the channel you just rekt some ish. ${prefix}${command} [usernames]`;
  
    return help;
}

async function generate_anchorman(names) {
    let file_joined_name = "anchorman_" + names.join("_") + ".gif";
    let output_path = path.join(out_dir, file_joined_name);
    let host_path = new url.URL(host_url + file_joined_name);

    let layer = [{ type: 'video', path: path.join(data_dir, "anchorman.gif")}];
    if(names.length > 0) {
        console.log("Adding:", names[0]);
        layer.push({ type: 'title', text: names[0], position: {originX:"left", originY: "top", x: 0.04, y: 0.6}, zoomDirection: "null", zoomAmount: 0 });
    }
    if(names.length > 1) {
        console.log("Adding:", names[1]);
        layer.push({ type: 'title', text: names[1], position: {originX:"left", originY: "top", x: 0.2, y: 0.4}, zoomDirection: "null", zoomAmount: 0 });
    }
    if(names.length > 2) {
        console.log("Adding:", names[2]);
        layer.push({ type: 'title', text: names[2], position: {originX:"left", originY: "top", x: -0.2, y: 0.4}, zoomDirection: "null", zoomAmount: 0 });
    }
    if(names.length > 3) {
        console.log("Adding:", names[3]);
        layer.push({ type: 'title', text: names[3], position: {originX:"left", originY: "top", x: 0.35, y: 0.6}, zoomDirection: "null", zoomAmount: 0 });
    }

    let editSpec = {
        outPath: output_path,
        verbose: false,
        enableFfmpegLog: false,
        width: 400,
        height: 260,
        fps: 10,
        clips: [
            { 
                layers: layer
            }
        ],
    };

    try {
        await Editly(editSpec);
        return host_path;
    } catch(error) {
        console.log("generate_anchorman:", e);
        return "Failed to create gif:", e;
    }
}

async function generate_avengers(names) {
    let file_joined_name = "avengers_" + names.join("_") + ".gif";
    let output_path = path.join(out_dir, file_joined_name);
    let host_path = new url.URL(host_url + file_joined_name);

    let layer = [{ type: 'video', path: path.join(data_dir, "avengers.gif")}];
    if(names.length > 0) {
        console.log("Adding:", names[0]);
        layer.push({ type: 'title', text: names[0], position: { x: 0.05, y: 0.6}, zoomDirection: "null", zoomAmount: 0 });
    }
    if(names.length > 1) {
        console.log("Adding:", names[1]);
        layer.push({ type: 'title', text: names[1], position: { x: 0.35, y: 0.4}, zoomDirection: "null", zoomAmount: 0 });
    }
    if(names.length > 2) {
        console.log("Adding:", names[2]);
        layer.push({ type: 'title', text: names[2], position: { x: -0.1, y: 0.3}, zoomDirection: "null", zoomAmount: 0 });
    }
    if(names.length > 3) {
        console.log("Adding:", names[3]);
        layer.push({ type: 'title', text: names[3], position: { x: -0.2, y: 0.8}, zoomDirection: "null", zoomAmount: 0 });
    }

    let editSpec = {
        outPath: output_path,
        verbose: false,
        enableFfmpegLog: false,
        width: 500,
        height: 216,
        fps: 10,
        clips: [
            { 
                layers: layer
            }
        ],
    };

    try {
        await Editly(editSpec);
        return host_path;
    } catch(error) {
        console.log("generate_avengers:", e);
        return "Failed to create gif:", e;
    }

}

async function generate_prangers(names) {
    let file_joined_name = "prangers_" + names.join("_") + ".gif";
    let output_path = path.join(out_dir, file_joined_name);
    let host_path = new url.URL(host_url + file_joined_name);

    let layer = [{ type: 'video', path: path.join(data_dir, "prangers.gif")}];
    if(names.length > 0) {
        console.log("Adding:", names[0]);
        layer.push({ type: 'title', text: names[0], position: { x: 0.05, y: 0.8}, zoomDirection: "null", zoomAmount: 0 });
    }
    if(names.length > 1) {
        console.log("Adding:", names[1]);
        layer.push({ type: 'title', text: names[1], position: { x: 0.3, y: 0.65}, zoomDirection: "null", zoomAmount: 0 });
    }
    if(names.length > 2) {
        console.log("Adding:", names[2]);
        layer.push({ type: 'title', text: names[2], position: { x: -0.1, y: 0.3}, zoomDirection: "null", zoomAmount: 0 });
    }
    if(names.length > 3) {
        console.log("Adding:", names[3]);
        layer.push({ type: 'title', text: names[3], position: { x: -0.3, y: 0.8}, zoomDirection: "null", zoomAmount: 0 });
    }

    layer.push({ type: 'title', text: "fill", position: { x: 0.5, y: 0.4}, zoomDirection: "null", zoomAmount: 0 });


    let editSpec = {
        outPath: output_path,
        verbose: false,
        enableFfmpegLog: false,
        width: 498,
        height: 371,
        fps: 10,
        clips: [
            { 
                layers: layer
            }
        ],
    };

    try {
        await Editly(editSpec);
        return host_path;
    } catch(error) {
        console.log("generate_prangers:", e);
        return "Failed to create gif:", e;
    }
}

async function generate_therock(names) {
    let file_joined_name = "therock_" + names.join("_") + ".gif";
    let output_path = path.join(out_dir, file_joined_name);
    let host_path = new url.URL(host_url + file_joined_name);

    let layer = [{ type: 'video', path: path.join(data_dir, "therock.gif")}];
    if(names.length > 0) {
        console.log("Adding:", names[0]);
        layer.push({ type: 'title', text: names[0], position: { x: 0.1, y: 0.0}, zoomDirection: "null", zoomAmount: 0 });
    }
    if(names.length > 1) {
        console.log("Adding:", names[1]);
        layer.push({ type: 'title', text: names[1], position: { x: 0.1, y: 0.2}, zoomDirection: "null", zoomAmount: 0 });
    }
    if(names.length > 2) {
        console.log("Adding:", names[2]);
        layer.push({ type: 'title', text: names[2], position: { x: -0.25, y: 0.6}, zoomDirection: "null", zoomAmount: 0 });
    }
    if(names.length > 3) {
        console.log("Adding:", names[3]);
        layer.push({ type: 'title', text: names[3], position: { x: 0.3, y: 0.6}, zoomDirection: "null", zoomAmount: 0 });
    }

    layer.push({ type: 'title', text: "CAGE VICTORY", position: { x: 0.1, y: 0.8}, zoomDirection: "null", zoomAmount: 0 });


    let editSpec = {
        outPath: output_path,
        verbose: false,
        enableFfmpegLog: false,
        width: 498,
        height: 371,
        fps: 10,
        clips: [
            { 
                layers: layer
            }
        ],
    };

    try {
        await Editly(editSpec);
        return host_path;
    } catch(error) {
        console.log("generate_therock:", e);
        return "Failed to create gif:", e;
    }
}

export async function execute(args) {
    let message = `**!! HONORABLE VICTORY !!** \n${sub_text[randRange(0, sub_text.length)]}\n!! `
    let cleaned_names = [];

    for(let i=0;i<args.raw_opt.length;i++) {
        console.log(args.raw_opt[i]);
        if(args.raw_opt[i].value.includes("<@!")) {
            return "Hmm you seemed to have used `@username`, just type their name normally. e.g. `username`";
        }
        cleaned_names.push(args.raw_opt[i].value);
    }

    let generator = generators[randRange(0, generators.length)];
    try {
        const url = await generator(cleaned_names);
        for(let i=0;i<args.raw_opt.length;i++) {
            message += `${args.raw_opt[i].value} !! `;
        }
        return `${message}\n${url}`;
    } catch(error) {
        console.log(error);
    }
     
}

export async function get() {
    return `Yay these people won the game: Harry, Sally and Joe!`
}
  
export function get_slash() {
    return {
      name: command,
      description: help_info("/").help,
      options: [
        {
          name: "player1",
          description: "A winner in the channel",
          type: 3,
          required: true,
        },
        {
            name: "player2",
            description: "A winner in the channel",
            type: 3,
          },
          {
            name: "player3",
            description: "A winner in the channel",
            type: 3,
          },
          {
            name: "player4",
            description: "A winner in the channel",
            type: 3,
          },
      ]
    }
}
