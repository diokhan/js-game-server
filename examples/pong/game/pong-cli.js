'use strict';

var socket = {};
var config = {};
var connected = false;

function connect() {
  connected = true;
  console.log('connecting');
  if (!socket.connected) socket = io(document.location.href);
  socket.on('news', onNews);
  socket.on('config', onConfig);
  socket.on('disconnect', onDisconnect);
  setTimeout(tic, 10);
}

function tic() {
  if (!connected) return;
  pad1.style.top  = (100 * config.pad1)  + '%';
  pad2.style.top  = (100 * config.pad2)  + '%';
  ball.style.top  = (100 * config.ballY) + '%';
  ball.style.left = (100 * config.ballX) + '%';
  setTimeout(tic, 33);
};

function onNews(data) {
  console.log(data);
  var msg = document.createElement('p');
  msg.className = 'show';
  msg.innerHTML = data.message;
  messageBox.appendChild(msg);
  setTimeout(function(){ msg.className = '' }, 10);
  setTimeout(function(){ messageBox.removeChild(msg) }, 20*1000);
}

function onConfig(data) {
  for (var k in data) { config[k] = data[k] }
}

function onDisconnect(data) {
  connected = false;
  console.log('disconnected', data);
  openDialog(
    'Disconnected', 'Do you want to reconnect?',
    'Reconnect', function() {
      document.location.reload();
      dialog.style.display = 'none';
  });
}

function openDialog(title, content, btLabel, btFunc) {
  console.log('open dialog', title, dialog);
  dialog.style.display = 'block';
  dialogTitle.innerHTML = title;
  dialogContent.innerHTML = content;
  dialogBtFunc.innerHTML = btLabel;
  dialogBtFunc.onclick = btFunc;
  console.log('open dialog done');
}

game.onclick = function(ev) {
  console.log('click',ev);
  if (!connected) return;
  socket.emit('usrCmd', {
    cmd: 'click',
    y: ev.clientY/game.clientHeight
  });
};
