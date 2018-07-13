const uuidv4 = require('uuid/v4');
const axios = require('axios');
const WebSocket = require('ws');

let messages;
let newState = {};
let newMsg = {};

async function initConnect(wss, ws, connects){
  const colorRes = await axios.get('http://www.colr.org/json/color/random');
  const uuId = uuidv4();
  connects[uuId] = {
    id: uuId,
    name: 'Anonymous',
    color: `#${colorRes.data.colors[0].hex}`,
    avatar: 'https://api.adorable.io/avatars/285/anonymous@adorable.io.png'
  }
  return connects[uuId];
}

async function helpNewLogin(wss, ws, connects){
  const user = await initConnect(wss, ws, connects);

  ws.send(JSON.stringify({
    user: user,
    action: 'myLogin',
    numUsers: wss.clients.size
  }));

  const publicMsg = {
    id: uuidv4(),
    action: 'newLogin',
    content: `${user.name} has logged in.`,
    numUsers: wss.clients.size,
    type: 'notification'
  }
  wss.clients.forEach(client => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(publicMsg));
    }
  })
  return user;

}

function helpNewLogout(wss, ws, user){
  newMsg = {
    id: uuidv4(),
    action: 'logout',
    content: `${user.name} has logged out.`,
    numUsers: wss.clients.size,
    type: 'notification'
  }

  wss.clients.forEach(client => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(newMsg));
    }
  })
}

function helpNameChange(wss, ws, msg, user){
  const oldName = user.name;
  user.name = msg.newName;
  user.avatar = `https://api.adorable.io/avatars/285/${msg.newName}@adorable.io.png`;

  ws.send(JSON.stringify({
    user: user,
    action: 'myNameChange',
  }));

  wss.clients.forEach(client => {
    client.send(JSON.stringify({
      id: uuidv4(),
      action: 'nameChange',
      content: `${oldName} has changed their name to ${user.name}.`,
      type: 'notification'
    }));
    })
}

function helpNewMessage(wss, ws, msg, user){

  let newMsg = {
    id: uuidv4(),
    action: msg.action,
    content: msg.content,
    user: user,
    type: msg.type
  }
  wss.clients.forEach(client => {
    client.send(JSON.stringify(newMsg));
  })
}

module.exports = {
  helpNewLogin: helpNewLogin,
  helpNewLogout: helpNewLogout,
  helpNameChange: helpNameChange,
  helpNewMessage: helpNewMessage
}
