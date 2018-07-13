const express = require('express');
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');
const axios = require('axios');
const SocketServer = WebSocket.Server;
const PORT = 3001;
const server = express()
  .use(express.static('public'))
  .listen(PORT, 'localhost', () => console.log(`Listening on ${ PORT }`));
const wss = new SocketServer({server});
const srvHelpers = require('./srvHelpers');
const connects = {};

wss.on('connection', async (ws) => {

  const user = await srvHelpers.helpNewLogin(wss, ws, connects);
  ws.on('message', (message) => {
    message = JSON.parse(message);
    if(message.action === 'nameChange'){
      srvHelpers.helpNameChange(wss, ws, message, user);
    }
    else if(message.action === 'newMessage'){
      srvHelpers.helpNewMessage(wss, ws, message, user);
    }
  });
  ws.on('close', () => {
    srvHelpers.helpNewLogout(wss, ws, user);
  });
});
