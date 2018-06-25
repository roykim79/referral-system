import React, { Component } from 'react';
import axios from 'axios';

class Header extends Component {
  // constructor() {

  // }

  // logOut() {
  //   axios.get(`/api/logout`);
  // }

  render() {
    // if (!userLoggedIn) {
    //   return (
    //     <div className="header">
    //       <h1>Referral System</h1>
    //     </div>
    //   )
    // }
    return (
      <div className="header">
        <h1>Referral System</h1>
        {/* <button onClick={this.logOut}>Logout</button> */}
        <button className="header-logout">Logout</button>
      </div>
    )
  }
}

export default Header;