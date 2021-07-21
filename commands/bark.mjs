import got from 'got';

  var dog = "https://random.dog/woof.json";

  export var command = "bark";

  export function help_info(prefix) {
    var help = {};
    help["command"] = command;
    help["help"] = `Get a random doggo`;

    return help;
  }

  async function logic() {

    try {
      const body = await got(dog).json();
      console.log('body:', body.url);
      return body.url;
    } catch (error) {
      console.log('error:', error);
      return error;
    }
  }

  export async function execute(args) {
    try {
      const url = await logic();
      return `<@${args.client}> bark! ${url}`;
    } catch (error) {
      return `<@${args.client}> problem getting bark :( - ${error}`;
    }

  }

  export async function get() {
    try {
      const url = await logic();
      return `botcongo - bark! <img width="480" src="${url}">`;
    } catch(error) {
      return `botcongo - something went wrong with bark - ${error}`;
    }

  }

  export function get_slash() {
    return {
      name: command,
      description: help_info("/").help,
    }
  }

