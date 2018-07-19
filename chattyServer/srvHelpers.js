const uuidv4 = require('uuid/v4');
const axios = require('axios');
const WebSocket = require('ws');

let messages;
let newState = {};
let newMsg = {};

//Generates a new user object with a uId, avatar, and random color
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

//Handles a new user login
async function helpNewLogin(wss, ws, connects){
  //Get the new user object
  const user = await initConnect(wss, ws, connects);

  //Send the new user object to the new user
  ws.send(JSON.stringify({
    user: user,
    action: 'myLogin',
    numUsers: wss.clients.size
  }));

  //Notify other users of the new login
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

//Handles a user logout
function helpNewLogout(wss, ws, user){

  //Notify all users that a user has logged out
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

//Handles a user name change
function helpNameChange(wss, ws, msg, user){

  const oldName = user.name;
  user.name = msg.newName;
  user.avatar = `https://api.adorable.io/avatars/285/${msg.newName}@adorable.io.png`;

  //Send the user their updated user object w new avatar and name
  ws.send(JSON.stringify({
    user: user,
    action: 'myNameChange',
  }));

  //Notify all users of the name change
  wss.clients.forEach(client => {
    client.send(JSON.stringify({
      id: uuidv4(),
      action: 'nameChange',
      content: `${oldName} has changed their name to ${user.name}.`,
      type: 'notification'
    }));
    })
}

//Handles messages to the server
function helpNewMessage(wss, ws, msg, user){

  //Notify all users of the new message
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
