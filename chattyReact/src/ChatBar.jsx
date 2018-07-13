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

  handleMsgChange = (ev) => {
    this.setState({
      content: ev.target.value
    })
  }

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
