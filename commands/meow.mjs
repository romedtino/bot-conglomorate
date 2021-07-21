import got from 'got';

var cat = "https://api.thecatapi.com/v1/images/search";

export var command = "meow";

export function help_info(prefix) {
  var help = {};
  help["command"] = command;
  help["help"] = `Get a random kirry`;

  return help;
}

async function logic() {

  try {
    const response = await got(cat);
    let body = JSON.parse(response.body);
    if (response.statusCode != 200) {
      return `Sorry the meow API is overrun by doggos... try again later.`;
    } else if (body[0]["url"] === undefined) {
      return `Sorry the meow API is overloaded... try again later.`;
    }else {
      return `${body[0]["url"]}`
    }
  } catch(error) {
    return `Something went turribl-turribly wrong in the meow command: ${error}`;
  }

}

export async function execute(args) {
  try {
    const url = await logic();
    return `<@${args.client}> meow! ${url}`;
  } catch(error) {
    return `meow error: ${error}`;
  }
  
}

export async function get() {
  try {
    const url = await logic();
    return `botcongo meow! <img width="480" src="${result}">`;
  } catch(error) {
    return `meow error: ${error}`;
  }

}

export function get_slash() {
  return {
    name: command,
    description: help_info("/").help,
  }
}
