// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
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
commandList.push(require('./commands/mb.js'));
commandList.push(require('./commands/brazzers.js'));
commandList.push(require('./commands/4th.js'));
commandList.push(require('./commands/weow.js'));
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
}

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
