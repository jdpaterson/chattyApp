import React from 'react';

export default function NavBar(props){
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p >{props.numUsers} users logged in</p>
      </nav>
    );
}
