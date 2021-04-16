// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var cors = require('cors');
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.use(cors()); //enable cors

const commandList = [];
commandList.push(require('./commands/bark.js'));
commandList.push(require('./commands/meow.js'));
commandList.push(require('./commands/meeseeks.js'));
commandList.push(require('./commands/fart.js'));
commandList.push(require('./commands/slap.js'));
commandList.push(require('./commands/clip.js'));
commandList.push(require('./commands/evan.js'));
commandList.push(require('./commands/victory_royale.js'));
commandList.push(require('./commands/myerb.js'));
commandList.push(require('./commands/brazzers.js'));
commandList.push(require('./commands/4th.js'));
commandList.push(require('./commands/weow.js'));
commandList.push(require('./commands/butterfly.js'));
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

for(let i=0;i<commandList.length;++i) {
  
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

io.on('connection', function(socket) {
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
const listener = http.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
