let messages;
let newState = {};
let newMsg = {};

function helpMyLogin(data){
  return {
    numUsers: data.numUsers,
    user: data.user
  }
}

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
