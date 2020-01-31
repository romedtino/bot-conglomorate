Welcome to bot-conglomorate !
=================
What is bot-conglomorate? 

I once created a Discord bot that was meant for a single guild only. Unbeknownst at the time, the bot would have been useful in many places. 
The problem is that it had a lot of personal commands that just wouldn't work (or maybe shouldn't even run in another guild). 

In comes bot-conglomorate. This external bot allows me to create a bot outside of the Discord universe and just query specific commands. 
This allows any number of Discord bots to *pick and choose* the commands they want to use for their bot.

Try some of the commands here! - https://bot-conglomorate.glitch.me/

Available commands
=================
All available commands can be found in the commands directory.

Requirements
=================
When sending POST to the endpoint URL, you need to give it a payload JSON file that looks like this

```
  var payload = { "client" : "some user",
                 "key" : "my_unique_key",
                "args" : args };
```

* `client` - Client is used as an identifier to who issued a command. This way, when the request responds, you know who queried.
* `key`    - A unique key some commands use. This is useful for commands that segregate databases by guild (e.g. See mb.js).
* `args`   - Args is anything extra any other commands might take advantage of. (e.g. slap.js, args would contain the name of the person you want to slap)


Use case
==================

## Execute a command
To use, you simply send POST to 

`https://bot-conglomorate.glitch.me/[COMMAND YOU WANT]`

For example, with a JSON payload with:

```
  var payload = { "client" : "@Bob",
                 "key" : "my_unique_key",
                "args" : "@Monkey" };
```

and the URL:

`https://bot-conglomorate.glitch.me/slap`

will return

`@Bob slaps @Monkey around a bit with a large trout!`

## Getting help information on a command
Simply GET 

`https://bot-conglomorate.glitch.me/[COMMAND YOU WANT]/help`

This will return a JSON file that has `command` and `help`.

* `command` - The name of the command you would execute in your bot
* `help`    - The information on what the command does




\ ゜o゜)ノ
