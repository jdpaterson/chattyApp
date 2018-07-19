let messages;
let newState = {};
let newMsg = {};

//Returns an object for a users own new login
function helpMyLogin(data){
  return {
    numUsers: data.numUsers,
    user: data.user
  }
}

//Returns an object for when another user has logged in
function helpNewLogin(data, stateMessages){
  const newMsg = {
    id: data.id,
    action: data.action,
    content: data.content,
    user: data.user,
    type: 'notification'
  }
  return {
      numUsers: data.numUsers,
      messages: stateMessages.concat(newMsg)
  }
}

//Returns an object for when another user logs out
function helpLogout(data, stateMessages){
  const newMsg = {
    id: data.id,
    action: data.action,
    content: data.content,
    user: data.user,
    type: 'notification'
  }
  return {
      numUsers: data.numUsers,
      messages: stateMessages.concat(newMsg)
  }
}

//Returns an object for when the current user changes their name
function helpMyNameChange(data, stateMessages){
  const newMsg = {
    id: data.id,
    action: data.action,
    content: data.content,
    user: data.user,
    type: 'notification'
  }
  return {
    messages: stateMessages.concat(newMsg),
    user: data.user
  }
}

//Return an object for when another user changed their name
function helpNameChange(data, stateMessages){
  const newMsg = {
    id: data.id,
    action: data.action,
    content: data.content,
    user: data.user,
    type: 'notification'
  }
  return {
    messages: stateMessages.concat(newMsg),
  }
}

//Returns an object for other messages not described above
function helpOther(data, stateMessages){
  const newMsg = {
    id: data.id,
    action: data.action,
    content: data.content,
    user: data.user,
    type: 'message'
  }
  return {
    messages: stateMessages.concat(newMsg)
  }
}

module.exports = {
  helpMyLogin: helpMyLogin,
  helpNewLogin: helpNewLogin,
  helpLogout: helpLogout,
  helpNameChange: helpNameChange,
  helpOther: helpOther,
}
