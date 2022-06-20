import {LowSync, JSONFileSync } from 'lowdb';

export var command = "jiggle";

var jiggle_count = 5;

async function jiggle_user(db, user) {
    console.log(db.data);
    if(user in db.data) {
        //previously jiggled
        delete db.data[user];
    } else {
        //new user - no file
        db.data[user] = 1;
    }
    db.write();
    return Object.keys(db.data).length;
}

export function help_info(prefix) {
  var help = {};
  help["command"] = command;
  help["help"] = `Increment jiggle counter`;

  return help;
}

export async function execute(args) {
    if(!args.key) {
        args.key = "anonymous";
    }
    

    console.log("Creating new db");
    let db = new LowSync(new JSONFileSync(`.data/.dbjiggle_${args.key}.json`));
    // Read data from JSON file, this will set db.data content
    db.read()

    // If file.json doesn't exist, db.data will be null
    // Set default data
    db.data = db.data || { } // Node < v15.x
    // db.data ||= { posts: [] }             // Node >= 15.x

    if (args.args.length > 0) {
        const parsed = parseInt(args.args);
        if (isNaN(parsed) || parsed <= 0) {
            return `Invalid jiggle index ${parsed}. Please provide a valid number.`;
        }
        jiggle_count = parsed;
        return `Jiggle count updated to ${args.args}`;
    } else {
        
        let prev = Object.keys(db.data).length;
        let total = await jiggle_user(db, args.client);
        if(total == jiggle_count) {
            return `WE HAVE **MAXIMUM** JIGGLE!\nhttps://i.kym-cdn.com/photos/images/original/001/487/140/d17.gif\nhttps://img.buzzfeed.com/buzzfeed-static/static/2019-07/26/0/asset/f5de83578adb/anigif_sub-buzz-2661-1564100371-9.gif`;
        } else if (total > prev) {
            return `New Jiggle accounted for! We have ${total} of ${jiggle_count}!\nhttp://media3.giphy.com/media/GqtNlBsWoEXDy/giphy.gif`;
        } else {
            return `We lost a jiggle...We have ${total} of ${jiggle_count}!\nhttps://www.icegif.com/wp-content/uploads/shrek-icegif-14.gif`;
        }
    }
    
    
}

export async function get() {
  return `bot congo accounts for the jiggles`
}

export function get_slash() {
  return {
    name: command,
    description: help_info("/").help,
    options: [
      {
        name: "jiggle_wait",
        description: "Max jigglers to wait on",
        type: 3,
        required: false
      }
    ]
  }
}
