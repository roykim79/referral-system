import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import logo from '../RS-logo-white.png'

class LoginHeader extends React.Component {
  render() {
    return <div></div>
  }
}

class OtherHeader extends React.Component {
  logOut = async() => {
    await axios.get(`/api/logout`);
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
            <a href="#" className="mdc-top-app-bar__action-item action-margin">My Organization</a>
            <a href="#" className="mdc-top-app-bar__action-item action-margin">Settings</a>
            <a onClick={this.logOut} href="/" className="mdc-top-app-bar__action-item action-margin">Logout</a>
          </section>
        </div>
      </header>
      </div>
    )
  }
}

class Header extends Component {
  render() {
    return this.props.auth ? <OtherHeader /> : <LoginHeader />
  }
}

const mapStateToProps = ({auth}) => {
  return {auth};
}

export default connect(mapStateToProps)(withRouter(Header));
