/* global io */

var socket = io(); 
var output = document.getElementById("output");
var commands = document.getElementById("commands");

socket.on('commands', result => {
  var inputElement = document.createElement('input');
  inputElement.type = "button"
  inputElement.addEventListener('click', function(){
      socket.emit(result, result);
  });
  inputElement.value=result;
  commands.appendChild(inputElement);
});

socket.on('results', fromServer => {
  while (output.firstChild) {
    output.removeChild(output.firstChild);
  }
  console.log('ding ding ding');
  console.log(fromServer);
  output.insertAdjacentHTML('beforeend', fromServer);
});

console.log('hello world :o');