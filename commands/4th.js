var Datastore = require("nedb");
const editly = require('editly');
const path = require("path");
const url = require('url');
const { existsSync } = require("fs");

var out_dir = "/usr/share/hassio/homeassistant/www";
var data_dir = "/home/dark/discord_bots/bot-conglomorate/data";
var host_url = "https://darkhq.duckdns.org/local/";

const summons = [
  "https://cdn.discordapp.com/attachments/463864401011671050/533917047495589888/PicsArt_01-12-11.41.34.jpg",
  "https://pbs.twimg.com/profile_images/3029755578/5af44ec20a9634047a1624fc4e73b293.png",
  "https://i.kym-cdn.com/photos/images/facebook/001/337/716/1b5.jpg",
  "https://gfycat.com/dearsadalpaca"
];

const rand_names = [
  "Kratos",
  "Ori",
  "Gordon",
  "Lara"
]

const squad_names = [
  "**J**ust **B**uild **B**ro",
  "**2**nd **P**lace **A**ll **D**ay",
  "**R**oyale **R'** **U**s",
  "**G**et **R**ekt **K**ids",
  "**N**o **B**lues **N**o **P**roblem",
  "**A**lways **I**n **T**he **S**torm",
  "**T**his **A**in't **M**inecraft"
];

const total = 4;
const timeout_sec = 30 * 60;

var vid_layers = [ "first.gif",
"second.gif",
"third.gif",
"fourth.gif" ];

var command = "4th";

var rotateIdx = 0;

var invocated = -1;
var joined = [];

var squad_name = "";

function help_info(prefix) {
  var help = {};
  help["command"] = command;
  help["help"] = `WE NEED A 4th!!!!. ${prefix}${command} [catchprase] to store catchphrase`;

  return help;
}

function reset() {
  joined = [];
  squad_name = "";
  rotateIdx = 0;
}

function generate_gif(index) {
  return new Promise( (resolve, reject) => {
     
      last_to_join = joined[joined.length-1];
      file_joined_name = joined.join("_") + "_" + vid_layers[index];

      output_path = path.join(out_dir, file_joined_name);
      font_loc = path.join(data_dir, "./avengers.ttf");
      layer_specs = [
          [{ type: 'title', text: last_to_join, start: 0, stop: 3.7, zoomDirection: "in", zoomAmount: 0.5, position: "center" }],
          [{ type: 'title', text: last_to_join, start: 3, zoomDirection: "in", zoomAmount: 0.5, position: "center" }],
          [{ type: 'title', text: last_to_join, start: 3.5, zoomDirection: "in", zoomAmount: 0.5, position: "center" }],
          [
              //hardcoded lol but I MEAN ITS CALLED 4th! 4!!!
              { type: 'title', text: ` ${joined[0]}`, start: 0, stop: 1.2, zoomDirection: "out", zoomAmount: 1, position: {originX:"left", originY: "top", x: 0.1, y: 0.4} },
              { type: 'title', text: ` ${joined[1]}`, start: 1, stop: 2.2, zoomDirection: "out", zoomAmount: 1, position: {originX:"left", originY: "top", x: 0.01, y: 0.1} },
              { type: 'title', text: ` ${joined[2]}`, start: 2.5, stop: 3.1, zoomDirection: "out", zoomAmount: 0.1, position: {originX:"left", originY: "top", x: 0.2, y: 0.2} },
              { type: 'title', text: ` ${joined[3]}`, start: 3, stop: 3.8, zoomDirection: "in", zoomAmount: 0.1, position: {originX:"left", originY: "top", x: 0.1, y: 0.6} },
              { type: 'title', text: "assemble.", fontPath: font_loc, start: 4.3, zoomDirection: "null", zoomAmount: 0, position: {originX:"left", originY: "top", x: 0.1, y: 0.4} },
          ],
      ];

      compiled_layers = [{ type: 'video', path: path.join(data_dir, vid_layers[index])}];
      compiled_layers = compiled_layers.concat(layer_specs[index]);
  
      editSpec = {
          outPath: output_path,
          verbose: false,
          enableFfmpegLog: false,
          width: 640,
          height: 360,
          fps: 10,
          clips: [
              { 
                  layers: compiled_layers
              }
          ],
      };
  
      editly(editSpec)
          .then( () => {
              resolve(file_joined_name);
          })
          .catch( e=> {
              console.log("generate_gif:", e);
              resolve("Failed to create gif:", e);
          });
  });
}    

function randRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function logic() {
  return summons[rotateIdx++ % summons.length];
}

function check_cached() {
  file_joined_name = joined.join("_") + "_" + vid_layers[rotateIdx-1];

  output_path = path.join(out_dir, file_joined_name);

  if(existsSync(output_path)) {
    return file_joined_name;
  } else {
    return null;
  }

}

function avenge_logic() {
  return new Promise ( (resolve, reject) => {
    cached = check_cached();
    if(cached != null) {
      resolve(host_url + cached);
    } else {
      generate_gif(rotateIdx-1)
      .then( filename => {
        resolve(host_url + filename);
      })
      .catch( (e) => reject("zFailed to create gif:", e));
    }
  });
}

function add_custom_msg(db, username, msg) {
  return new Promise((resolve, reject) => {
    var fullmsg = msg.split(",").join(" ");
    var entry = {
      name: username,
      message: fullmsg
    };

    db.update({ name: username }, entry, { upsert: true }, (err, newDoc) => {
      if (!err) {
        resolve(`added \`${fullmsg}\``);
      } else {
        resolve(`failed to add \`${fullmsg}\``);
      }
    });
  });
}

function execute(args) {
  if(!args.key) {
    args.key = "anonymous";
  }
  var db = new Datastore({
    filename: `.data/4th_${args.key}`,
    autoload: true
  });

  if (args.args.length > 0) {
    return new Promise((resolve, reject) => {
      add_custom_msg(db, args.username, args.args)
        .then(entry => resolve(`<@${args.client}> ${entry}`))
        .catch(e => {
          console.log(e);
          resolve(
            `<@${args.client}> we really shouldn't have gotten here... but here we are...`
          );
        });
    });
  } else {
    return new Promise((resolve, reject) => {
      db.findOne({ name: args.username }, (err, doc) => {
        let current_time = Date.now() / 1000;
        let res_text = "";
        if (invocated + timeout_sec < current_time) {
          reset();
          res_text = `<@${args.client}> is trying to summon a 4th!`;
          squad_name = squad_names[randRange(0, squad_names.length)];
          joined.push(`${args.username}`);
          rotateIdx++;
        } else {
          //Debug - begin
          // if (!joined.includes(`${rand_names[rotateIdx]}`)) {
          //   joined.push(`${rand_names[rotateIdx]}`);
          //Debug - end
          if (!joined.includes(`${args.username}`)) {
            joined.push(`${args.username}`);
            rotateIdx++;
            res_text = `<@${args.client}> has joined the call to arms!`;
          } else {
            res_text = `<@${args.client}> still requires heroes! Will you not be a hero?`;
          }
        }

        rotateIdx = Math.min(rotateIdx, total);

        avenge_logic()
        .then( result => {
          if (doc) {
            let msg = doc.message;
            res_text += `\n\n*"${msg}"*\n\n`;
          }

          invocated = current_time;

          if (joined.length >= total) {
            res_text = `<@${args.client}> **GET HYPED SON!** \nSQUAD ${squad_name} \nis \n**READY!**\n     **PACKED**\n         & **LOADED!**\n\n You can still come on down the *HYPETRAIN*!`;
            //result = `https://media1.tenor.com/images/ffa0709d3d01ee86f926e81acfc0f1e7/tenor.gif`;
          }

          let squad_mems = "";
          joined.forEach(entry => (squad_mems += `\`${entry}\` `));
          // res_text += ` Type \`/4th\` to join the call to arms!\nSquad  [[ ${squad_name} ]] members:\n ${squad_mems}\n`;
          clean_url =  new url.URL(result);
          res_text += ` Type \`/4th\` to join the call to arms!\nSquad  [[ ${squad_name} ]] members:\n ${squad_mems}\n${clean_url.href}`;
          
          // jsonified = {
          //   "text": res_text,
          //   "attachment":clean_url,
          // }
          resolve(res_text);
        })
        .catch(console.error);
        
      });
    });
  }
}

function get() {
  return new Promise(resolve => {
    let result = logic();
    resolve(
      `Some person is trying to summon a 4th!<br/><img width="480" src="${result}"/>`
    );
  });
}

function get_slash() {
  return {
    name: command,
    description: help_info("/").help,
    options: [
      {
        name: "catchphrase",
        description: "Your catchphrase",
        type: 3,
      }
    ]
  }
}

module.exports.execute = execute;
module.exports.help_info = help_info;
module.exports.command = command;
module.exports.get = get;
module.exports.get_slash = get_slash;