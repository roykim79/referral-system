import React, { Component } from 'react';
import {submitNote} from '../actions';
import {connect} from 'react-redux'
import {Button, Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle, ToolbarIcon, Content} from 'react-mdc-web';
import TextField, { HelperText, Input } from '@material/react-text-field';
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

                    {referral.client_name} <br/>
                    {referral.client_phone} <br/>
                    {referral.client_email} <br/>
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

                  {referral.referring_user.firstName} {referral.referring_user.lastName} <br/>
                  {referral.referring_user.phone} <br/>
                  {referral.referring_user.email}
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
                <div className="toolbar-notes">
                  <Toolbar>
                    <ToolbarRow>
                      <ToolbarSection align="start">
                        <ToolbarTitle>Notes</ToolbarTitle>
                      </ToolbarSection>
                    </ToolbarRow>
                  </Toolbar>
                </div>

                <div className="referral-notes">

                  <div className="referral-notes-content">
                  {referral.tasks.map((note) => {
                    return (

                    <div>
                      <div> <span> {note.text} </span>
                      <span className='text-muted right'> posted by: {note.posting_user} at {moment(note.date).format("LLLL")}</span> </div>
                      <hr/>
                    </div>
                    )

                  })}
                  </div>
                  <div className="referral-notes-save">
                  <TextField
                    label='Add New Note'
                    floatingLabelClassName='mdc-floating-label'
                    className="input-new-note mdc-text-field--box mx-2"
                    style={{ width: 300 }}
                  >
                    <Input
                      className="input-new-note"
                      value={this.state.text}
                      onChange={(event) => {this.setState({text: event.target.value})}}
                      name="input-new-note"
                    />
                  </TextField>



                    <button  className="mdc-button mdc-button--raised"
                    onClick={() => {this.props.submitNote(referral._id, this.state)}}>
                      Add Note
                    </button>

                  </div>

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
