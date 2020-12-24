var command = "myerb";

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
    help["command"] = command;
    help["help"] = "Look up or assign someone's Myer Brigg's personality type";

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

        db.find({ type: modType.toLowerCase() }, function (err, docs) {
            var retMessage = "";
            if (!err) {
                retMessage += `<@${client}> People with personality type: ${query.toUpperCase()} ${type_images[modType.toLowerCase()]
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
        db.find({ name: query }, function (err, docs) {
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
            .exec(function (err, docs) {
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

        db.update({ name: name }, entry, { upsert: true }, function (err, newDoc) {
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

        db.remove({ name: name }, {}, function (err, numRemoved) {
            if (!err) {
                resolve(`<@${client}> Removed ${numRemoved} entry`);
            } else {
                resolve(`<@${client}> Failed to remove entry`);
            }
        });
    });
}

function execute(rawArgs) {
    console.log("DEBUGJ:" + JSON.stringify(rawArgs));
    return new Promise((resolve, reject) => {
        var key = rawArgs.key;
        var db = new Datastore({
            filename: `.data/mbDatafile_${key}`,
            autoload: true
        });

        if (rawArgs.raw_opt === undefined)
        {
            return resolve("Received undefined parameters");
        }

        if (rawArgs.raw_opt[0].name === "all") {
            findAll(rawArgs.client, db)
                .then(result => resolve(result))
                .catch(err => console.log(err));
        } else if (rawArgs.raw_opt[0].name === "add") {
            let name = rawArgs.raw_opt[0].options[0].value;
            let brigg = rawArgs.raw_opt[0].options[1].value;
            if (name === undefined || brigg === undefined) {
                resolve(`<@${rawArgs.client}> Invalid add.`);
            } else {
                insert(rawArgs.client, db, name, brigg)
                    .then(result => resolve(result))
                    .catch(err => console.log(err));
            }
        } else if (rawArgs.raw_opt[0].name === "remove") {
            let name = rawArgs.raw_opt[0].options[0].value;
            if (name === undefined) {
                resolve(`<@${rawArgs.client}> Invalid remove.`);
            } else {
                remove(rawArgs.client, db, name)
                    .then(result => resolve(result))
                    .catch(err => console.log(err));
            }
        } else if (rawArgs.raw_opt[0].name === "sheet") {
            if (process.env.FAMIREE_KEY === key) {
                resolve(`<@${rawArgs.client}> ${process.env.FAMIREE_URL}`);
            } else {
                resolve("This doesn't do anything.");
            }
        } else if (rawArgs.raw_opt[0].name === "myer") {
            let brigg = rawArgs.raw_opt[0].options[0].value;
            findByName(rawArgs.client, db, brigg)
                .then(result => resolve(result))
                .catch(err => console.log(err));
        } else {
            resolve("Why did we get here???");
        }
    });
}

function get() {
    return new Promise(resolve => {
        resolve(`Not demoable.`);
    });
}

function get_slash() {
    return {
        name: command,
        description: help_info("/").help,
        options: [
            {
                name: "sheet",
                description: "Show me the sheet!",
                type: 1,
            },
            {
                name: "all",
                description: "Show me everyone!",
                type: 1,
            },
            {
                name: "myer",
                description: "Lookup people with this Myer Briggs type",
                type: 1,
                options: [
                    {
                        name: "type",
                        description: "Myer Briggs type",
                        type: 3,
                        required: true,
                    },
                ]
            },
            {
                name: "add",
                description: "Add new user",
                type: 1,
                options: [
                    {
                        name: "name",
                        description: "Person to add",
                        type: 3,
                        required: true,
                    },
                    {
                        name: "myer",
                        description: "Myer Briggs Value",
                        type: 3,
                        required: true,
                    }
                ]
            },
            {
                name: "remove",
                description: "Remove user",
                type: 1,
                options: [
                    {
                        name: "name",
                        description: "Person to remove",
                        type: 3,
                        required: true,
                    }
                ]
            }
        ]
    }
}

module.exports.execute = execute;
module.exports.help_info = help_info;
module.exports.command = command;
module.exports.get = get;
module.exports.get_slash = get_slash;
