import React, { Component } from 'react';
import {Button, Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle, ToolbarIcon, Content, MenuAnchor, Menu, MenuItem, MenuDivider, List, ListItem} from 'react-mdc-web';
const moment = require('moment');

class AcceptedDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
  }

  render() {
    // debugger;
    if(this.props.referral.status!="pending" && this.props.referral.status!="rejected"){
    let referral = this.props.referral;

      return (

          <div className="pending-details">

            <div className="wrapper">

              <div className="accepted-grid-client">
                <div className="referral-details">
                  <div className="client-info">
                    <h2>Client</h2>
                    Name: {referral.client_name} <br/>
                    Phone Number: {referral.client_phone} <br/>
                    Email: {referral.client_email} <br/>
                  </div>
                </div>
              </div>
              <div className="accepted-grid-member">
                <div className="member-info">
                  <h2>Member</h2>
                  Name: {referral.referring_user.firstName} {referral.referring_user.lastName} <br/>
                  Phone Number: {referral.referring_user.phone} <br/>
                  Email: {referral.referring_user.email}
                </div>
              </div>
              <div className="accepted-grid-details pt-2">


                  <Toolbar>
                  <ToolbarIcon/>
                    <ToolbarRow>
                      <ToolbarSection align="start">
                        <ToolbarTitle>Description</ToolbarTitle>
                      </ToolbarSection>
                    </ToolbarRow>
                  </Toolbar>
                  <div className="block">
                  <Content>
                    {referral.description} "Lorem. ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                  </Content>
                  </div>




              {/* Adjust top margin for fixed toolbar */}

                <div className="client-info">
                <h4>Description:</h4>
                  {referral.description} "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                </div>
              </div>

              <div className="accepted-grid-notes">
                <div className="referral-notes">
                  <h2>Notes:</h2>
                  <div className="referral-notes-content">
                  {referral.tasks.map((note) => {
                    return (
                      <div>
                    <div> {note.text} <span className='text-muted'> posted by: {note.posting_user} at {moment(note.date).format("LLLL")}</span> </div>
                      <hr/>
                      </div>
                      )

                  })}</div>
                  <div className="referral-notes-input"><input onChange={(event) => {this.setState({text: event.target.value})}}/></div>
                  <div className="referral-notes-save"><button onClick={() => {this.props.submitNote(referral._id, this.state)}}>Save</button></div>

                </div>
              </div>


            </div>
          </div>

        )} else {
          return (<a/>)
        }
  }
}

export default AcceptedDetails
