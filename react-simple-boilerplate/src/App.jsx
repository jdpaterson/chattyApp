import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import msgHelpers from './msgHelpers.jsx';
import data from './data.js';

//Main app component
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      messages: data.messages,
      numUsers: 0
    };
  }

  componentDidMount() {

    //Establish a new websocket connection
    let newSocket = new WebSocket("ws://0.0.0.0:3001");
    this.socket = newSocket;
    this.socket.app = this;
    let newState = {}

    //When a new message is received from server
    this.socket.onmessage = function(event) {

      const data = JSON.parse(event.data);
      const messages = this.app.state.messages;

      //Call the relevant helper per the specified data action
      if (data.action === 'myLogin') {
        newState = msgHelpers.helpMyLogin(data);
      }
      else if (data.action === 'newLogin'){
        newState = msgHelpers.helpNewLogin(data, messages);
      }
      else if (data.action === 'logout'){
        newState = msgHelpers.helpLogout(data, messages);
      }
      else if (data.action === 'myNameChange'){
        newState = msgHelpers.helpMyNameChange(data, messages);
      }
      else if (data.action === 'nameChange'){
        newState = msgHelpers.helpNameChange(data, messages);
      }else {
        newState = msgHelpers.helpOther(data, messages);
      }
      //Set the state based on what the helpers returned
      this.app.setState(() => {
        return newState;
      })
    }
  }

  //Sends a given message to the server
  addMessage = (newMsg) => {
    this.socket.send(JSON.stringify(newMsg));
  }

  render() {
    return (
      <div>
        <NavBar numUsers={this.state.numUsers} />
        <MessageList messages={this.state.messages} />
        <ChatBar addMsg={this.addMessage} user={this.state.user}/>
      </div>
    )
  }
}
