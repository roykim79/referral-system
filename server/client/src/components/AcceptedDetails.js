import React, { Component } from 'react';
import {submitNote} from '../actions';
import {connect} from 'react-redux'
import {Button, Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle, ToolbarIcon, Content, MenuAnchor, Menu, MenuItem, MenuDivider, List, ListItem} from 'react-mdc-web';
import { bindActionCreators } from 'redux';
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
                <Toolbar>
                  <ToolbarRow>
                    <ToolbarSection align="start">
                      <ToolbarTitle>Client</ToolbarTitle>
                    </ToolbarSection>
                  </ToolbarRow>
                </Toolbar>
                  <div className="client-info py-2">

                    Name: {referral.client_name} <br/>
                    Phone Number: {referral.client_phone} <br/>
                    Email: {referral.client_email} <br/>
                  </div>
                </div>
              </div>
              <div className="accepted-grid-member">
              <Toolbar>
                <ToolbarRow>
                  <ToolbarSection align="start">
                    <ToolbarTitle>Member</ToolbarTitle>
                  </ToolbarSection>
                </ToolbarRow>
              </Toolbar>
                <div className="member-info py-2">

                  Name: {referral.referring_user.firstName} {referral.referring_user.lastName} <br/>
                  Phone Number: {referral.referring_user.phone} <br/>
                  Email: {referral.referring_user.email}
                </div>
              </div>
              <div className="accepted-grid-details">


                  <Toolbar>
                    <ToolbarRow>
                      <ToolbarSection align="start">
                        <ToolbarTitle>Description</ToolbarTitle>
                      </ToolbarSection>
                    </ToolbarRow>
                  </Toolbar>
                  <div className="block">
                  <Content className="py-2">
                    {referral.description}
                  </Content>
                  </div>




              {/* Adjust top margin for fixed toolbar */}

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
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({submitNote}, dispatch)
  }
export default connect(null, mapDispatchToProps)(AcceptedDetails)
