var Datastore = require("nedb");

const summons = [
  "https://cdn.discordapp.com/attachments/463864401011671050/533917047495589888/PicsArt_01-12-11.41.34.jpg",
  "https://pbs.twimg.com/profile_images/3029755578/5af44ec20a9634047a1624fc4e73b293.png",
  "https://i.kym-cdn.com/photos/images/facebook/001/337/716/1b5.jpg",
  "https://gfycat.com/dearsadalpaca"
];

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
const timeout_sec = 10 * 60;

var command = "4th";

var rotateIdx = 0;

var invocated = -1;
var joined = [];

var squad_name = "";

function help_info(prefix) {
  var help = {};
  help["command"] = command;
  help[
    "help"
  ] = `WE NEED A 4th!!!!. Usage: \`${prefix}${command}\`\n You can also add a custom message when you join a squad by typing \`${prefix}${command}\` [message] (e.g. \`${prefix}${command}\` Let's Rock!) and that will be displayed whenever you call for a 4th.`;

  return help;
}

function reset() {
  joined = [];
  squad_name = "";
}

function randRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function logic() {
  return summons[rotateIdx++ % summons.length];
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
        let result = logic();
        let current_time = Date.now() / 1000;
        let res_text = "";
        if (invocated + timeout_sec < current_time) {
          res_text = `<@${args.client}> is trying to summon a 4th!`;
          squad_name = squad_names[randRange(0, squad_names.length)];
          joined.push(`${args.username}`);
        } else {
          if (!joined.includes(`${args.username}`)) {
            joined.push(`${args.username}`);
            res_text = `<@${args.client}> has joined the call to arms!`;
          } else {
            res_text = `<@${args.client}> still requires heroes! Will you not be a hero?`;
          }
        }

        if (doc) {
          let msg = doc.message;
          res_text += `\n\n*"${msg}"*\n\n`;
        }

        invocated = current_time;

        if (joined.length >= total) {
          res_text = `<@${args.client}> **GET HYPED SON!** \nSQUAD ${squad_name} \nis \n**READY!**\n     **PACKED**\n         & **LOADED!**\n\n You can still come on down the *HYPETRAIN*!`;
          result = `https://media2.giphy.com/media/f9SSWBQExDLV7AXas6/giphy.gif`;
        }

        let squad_mems = "";
        joined.forEach(entry => (squad_mems += `\`${entry}\` `));
        res_text += ` Type \`!4th\` to join the call to arms!\nSquad  [[ ${squad_name} ]] members:\n ${squad_mems}\n ${result}`;

        resolve(res_text);
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

module.exports.execute = execute;
module.exports.help_info = help_info;
module.exports.command = command;
module.exports.get = get;
