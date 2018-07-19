import React, {Component} from 'react';

export default class Footer extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: props.user.name,
      content: '',
      action: '',
    }
  }

  //On Enter press, call the addMsg prop function
  handleMsgPress = (ev) => {
    if(ev.key == 'Enter'){
      const msg = {
        action: 'newMessage',
        content: `${this.state.content}`,
        user: `${this.props.user}`
      }
      this.props.addMsg(msg);
      this.setState({
        content: '',
      })
    }
  }

  //When the message input is changed, update the state to reflect the change
  handleMsgChange = (ev) => {
    this.setState({
      content: ev.target.value
    })
  }

  //On Enter press, call the .addMsg prop function
  handleNmPress = (ev) => {
    if(ev.key == 'Enter'){
      const newMsg = {
        action: 'nameChange',
        currentUser: this.props.user,
        newName: this.state.username,
      };
      this.props.addMsg(newMsg);
    }
  }

  //When the username input is changed, update the state to reflect the change
  handleNameChange = (ev) => {
    this.setState({
      username: ev.target.value
    });
  }


  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" name="usr"
          placeholder="Anonymous"
          value={this.state.username}
          onChange={this.handleNameChange}
          onKeyPress={this.handleNmPress}
        />
        <input className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={this.state.content}
          onChange={this.handleMsgChange}
          onKeyPress={this.handleMsgPress}
        />
      </footer>
    )
  }
}
