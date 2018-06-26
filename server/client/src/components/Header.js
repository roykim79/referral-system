import React, { Component } from 'react';
import axios from 'axios';
import logo from '../RS-logo.png'

class Header extends Component {
  constructor(props) {
    super(props)
  }

  logoutUser() {
    axios.get(`/api/logout`);
  }

  render() {
    return (
      <div className="mb-h">
      <header className="mdc-top-app-bar mdc-top-app-bar--short app-nav-header ">
        <div className="mdc-top-app-bar__row">
          <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <img className="shrine-logo-drawer ml-1" src={logo}/>
          </section>
          <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end app-nav-header" role="toolbar">
            <a href="#" className="material-icons mdc-top-app-bar__action-item action-margin">My Organization</a>
            <a href="#" className="material-icons mdc-top-app-bar__action-item action-margin">Settings</a>
            <a onClick={() => {this.logoutUser()}} href="/" className="material-icons mdc-top-app-bar__action-item action-margin">Logout</a>
          </section>
        </div>
      </header>
      </div>
    )
  }
}

export default Header;
