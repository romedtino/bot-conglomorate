// server.js
// where your node app starts

// init project
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const http_server = http.Server(app);
const socket_serv = new Server(http_server);

app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.use(cors()); //enable cors

//explicit inclusion
import * as bark from './commands/bark.mjs';
import * as meow from './commands/meow.mjs';
import * as meeseeks from './commands/meeseeks.mjs';
import * as fart from './commands/fart.mjs';
import * as slap from './commands/slap.mjs';
import * as clip from './commands/clip.mjs';
import * as evan from './commands/evan.mjs';
import * as brazzers from './commands/brazzers.mjs';
import * as fourth from './commands/4th.mjs';
import * as weow from './commands/weow.mjs';
import * as butterfly from './commands/butterfly.mjs';
import * as wzwin from './commands/wzwin.mjs';
import * as jiggle from './commands/jiggle.mjs';

const commandList = [];
commandList.push(bark);
commandList.push(meow);
commandList.push(meeseeks);
commandList.push(fart);
commandList.push(slap);
commandList.push(clip);
commandList.push(evan);
// commandList.push(require('./commands/victory_royale.js'));
// commandList.push(require('./commands/myerb.js'));
commandList.push(brazzers);
commandList.push(fourth);
commandList.push(weow);
commandList.push(butterfly);
commandList.push(wzwin);
commandList.push(jiggle);
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

for(let i=0;i<commandList.length;++i) {
  console.log(commandList[i].command);
  //Populate help endpoints
  app.get(`/${commandList[i].command}/help`, function(request, response) {
    response.send(commandList[i].help_info(request.query.prefix));
  });
  
  //Populate command execution endpoints
  app.post(`/${commandList[i].command}`, function(request, response) {
    commandList[i].execute(request.body)
      .then( result => {
      console.log(result);
      response.send(result);
    })
      .catch( err => console.log(err) );
    
  });

  //Return discord slash command data
  app.post(`/${commandList[i].command}/get_slash`, function(request, response) {
    let result = commandList[i].get_slash();
    console.log(result);
    response.send(result);
  });
}

socket_serv.on('connection', function(socket) {
  console.log('User connected.');
  for(let i=0;i<commandList.length;++i) {
    
    //Add listener to command
    socket.on(commandList[i].command, function(username) {
      commandList[i].get()
      .then(result => {
        //Emit command results
        socket.emit('results', result);
      })
      .catch( err => console.log(err));
    });
    
    //Add command to available commands
    socket.emit('commands', commandList[i].command);
  }

});

// listen for requests :)
const listener = http_server.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
