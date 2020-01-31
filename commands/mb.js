var jsCommand = "mb";

var type_images = {};
type_images["intj"] =
  "http://www.personalityperfect.com/wp-content/uploads/2015/09/mastermind-intj.png";
type_images["intp"] =
  "http://www.personalityperfect.com/wp-content/uploads/2015/09/thinker-intp.png";
type_images["entj"] =
  "http://www.personalityperfect.com/wp-content/uploads/2015/09/commander-entj.png";
type_images["entp"] =
  "http://www.personalityperfect.com/wp-content/uploads/2015/09/visionary-entp.png";

type_images["infj"] =
  "http://www.personalityperfect.com/wp-content/uploads/2015/09/counselor-infj.png";
type_images["infp"] =
  "http://www.personalityperfect.com/wp-content/uploads/2015/09/idealist-infp.png";
type_images["enfj"] =
  "http://www.personalityperfect.com/wp-content/uploads/2015/09/giver-enfj.png";
type_images["enfp"] =
  "http://www.personalityperfect.com/wp-content/uploads/2015/09/champion-enfp.png";

type_images["istj"] =
  "http://www.personalityperfect.com/wp-content/uploads/2015/09/inspector-istj.png";
type_images["isfj"] =
  "http://www.personalityperfect.com/wp-content/uploads/2015/09/nurturer-isfj.png";
type_images["estj"] =
  "http://www.personalityperfect.com/wp-content/uploads/2015/09/supervisor-estj.png";
type_images["esfj"] =
  "http://www.personalityperfect.com/wp-content/uploads/2015/09/provider-esfj.png";

type_images["istp"] =
  "http://www.personalityperfect.com/wp-content/uploads/2015/09/craftsman-istp.png";
type_images["isfp"] =
  "http://www.personalityperfect.com/wp-content/uploads/2015/10/isfp-the-composer-avatar.jpg";
type_images["estp"] =
  "http://www.personalityperfect.com/wp-content/uploads/2015/09/doer-estp.png";
type_images["esfp"] =
  "http://www.personalityperfect.com/wp-content/uploads/2015/09/performer-esfp.png";

// { name, type }
var Datastore = require("nedb");
// Security note: the database is saved to the file `datafile` on the local filesystem. It's deliberately placed in the `.data` directory
// which doesn't get copied if someone remixes the project.
// var db = new Datastore({ filename: '.data/mbDatafile', autoload: true });

function help_info(prefix) {
  var help = {};
  help["command"] = jsCommand;
  help["help"] =
    "Look up or assign someone's Myer Brigg's personality type. \n";
  help[
    "help"
  ] += `    Usage: \`${prefix}${jsCommand} [name][add name type][remove name][sheet]\`\n`;
  help["help"] += `    e.g. \`${prefix}${jsCommand} add Jerome intj\``;

  return help;
}

function findByType(client, db, query) {
  return new Promise((resolve, reject) => {
    console.log("findByType");
    var dashIndex = query.indexOf("-");
    var modType = query;
    if (dashIndex > -1) {
      modType = modType.substring(0, dashIndex);
    }

    db.find({ type: modType.toLowerCase() }, function(err, docs) {
      var retMessage = "";
      if (!err) {
        retMessage += `<@${client}> People with personality type: ${query.toUpperCase()} ${
          type_images[modType.toLowerCase()]
        }`;

        if (docs.length <= 0) {
          retMessage += "\nNo one has this personality type.";
        }
        for (let elem of docs) {
          retMessage +=
            "\n**" +
            elem.name.padEnd(15) +
            "**" +
            elem.type_string.toUpperCase();
        }
        resolve(retMessage);
      }
    });
  });
}

function findByName(client, db, query) {
  return new Promise((resolve, reject) => {
    console.log("findByName");
    db.find({ name: query }, function(err, docs) {
      var retMessage = `<@${client}>`;
      if (!err) {
        if (docs.length <= 0) {
          findByType(client, db, query)
            .then(result => resolve(result))
            .catch(err => console.log(err));
          return;
        }
        for (let elem of docs) {
          retMessage +=
            elem.name +
            " is a **[" +
            elem.type_string.toUpperCase() +
            "]** " +
            type_images[elem.type.toLowerCase()];
        }
        resolve(retMessage);
      }
    });
  });
}

function findAll(client, db) {
  return new Promise((resolve, reject) => {
    // Find all documents in the collection
    db.find({})
      .sort({ name: 1 })
      .exec(function(err, docs) {
        var retMessage = `<@${client}>\n`;
        if (!err) {
          if (docs.length <= 0) {
            retMessage += "\nNo entries found.";
          }
          for (let elem of docs) {
            retMessage +=
              "\n**" +
              elem.name.padEnd(15, "-") +
              "** " +
              elem.type_string.toUpperCase();
          }
        } else {
          retMessage += "Could not find entries";
        }
        resolve(retMessage);
      });
  });
}

function insert(client, db, name, type) {
  return new Promise((resolve, reject) => {
    console.log("insert " + name);

    var dashIndex = type.indexOf("-");
    var modType = type;
    if (dashIndex > -1) {
      modType = modType.substring(0, dashIndex);
    }

    var entry = {
      name: name,
      type: modType.toLowerCase(),
      type_string: type.toLowerCase()
    };

    if (type_images[name.toLowerCase()] !== undefined) {
      return resolve(`<@${client}> What were you really trying to do...`);
    }

    if (type_images[modType.toLowerCase()] === undefined) {
      return resolve(`<@${client}> Unrecognized type: type`);
    }

    db.update({ name: name }, entry, { upsert: true }, function(err, newDoc) {
      if (!err) {
        resolve(
          `<@${client}> Added personality [${type.toUpperCase()}] for: ${name}`
        );
      } else {
        resolve(`<@${client}> Failed adding personality to list`);
      }
    });
  });
}

function remove(client, db, name) {
  return new Promise((resolve, reject) => {
    console.log("remove");

    db.remove({ name: name }, {}, function(err, numRemoved) {
      if (!err) {
        resolve(`<@${client}> Removed ${numRemoved} entry`);
      } else {
        resolve(`<@${client}> Failed to remove entry`);
      }
    });
  });
}

function execute(rawArgs) {
  return new Promise((resolve, reject) => {
    var key = rawArgs.key;
    var db = new Datastore({
      filename: `.data/mbDatafile_${key}`,
      autoload: true
    });

    var info = rawArgs.args;
    var req = undefined;
    var args = [];

    if (info) {
      console.log("INFO IS: " + info);
      args = info.split(",");
      req = args[0];
    }
    if (req === undefined) {
      findAll(rawArgs.client, db)
        .then(result => resolve(result))
        .catch(err => console.log(err));
    } else if (req === "add") {
      if (args[1] === undefined || args[2] === undefined) {
        resolve(`<@${rawArgs.client}> Invalid add.`);
      } else {
        insert(rawArgs.client, db, args[1], args[2])
          .then(result => resolve(result))
          .catch(err => console.log(err));
      }
    } else if (req === "remove") {
      if (args[1] === undefined) {
        resolve(`<@${rawArgs.client}> Invalid remove.`);
      } else {
        remove(rawArgs.client, db, args[1])
          .then(result => resolve(result))
          .catch(err => console.log(err));
      }
    } else if (req === "sheet") {
      if (process.env.FAMIREE_KEY === key) {
        resolve(`<@${rawArgs.client}> ${process.env.FAMIREE_URL}`);
      } else {
        resolve("This doesn't do anything.");
      }
    } else {
      findByName(rawArgs.client, db, args[0])
        .then(result => resolve(result))
        .catch(err => console.log(err));
    }
  });
}

function get() {
  return new Promise(resolve => {
    resolve(`Not demoable.`);
  });
}

module.exports.execute = execute;
module.exports.help_info = help_info;
module.exports.command = jsCommand;
module.exports.get = get;
