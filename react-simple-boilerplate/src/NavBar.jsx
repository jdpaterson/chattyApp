import React from 'react';

//Functional component for the nav bar
export default function NavBar(props){
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p >{props.numUsers} users logged in</p>
      </nav>
    );
}
