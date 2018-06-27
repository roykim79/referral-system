import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchReferrals, submitNote, fetchDetail} from '../actions'
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
const moment = require('moment');

class Referral extends Component {
  constructor(props) {
    super(props)

    this.state = {
      accepted : false,
      text : '',
    }
  }

  componentWillMount = async() => {
    await this.props.fetchDetail(this.props.match.params.referralId)
  }

  renderStatus(referral){
    if(this.state.accepted){
      return(
        <div className="progress-container">
          <ul className="progressbar">
              <li className="complete">Accepted</li>
              <li className="active">Contacted</li>
              <li className="">Completed</li>
          </ul>
        </div>
      )
    } else {
      return(
        <div className="wrapper">
          <div className="grid-1-1">
            <button
              onClick={(e)=>this.setState({accepted:true})}>Accept</button>
            <button>Reject</button>
          </div>
          <div className="grid-left">
            <div className="referral-details">
              <div className="client-info">
                <h2>Client</h2>
                Name: {referral.client_name} <br/>
                Phone Number: {referral.client_phone} <br/>
                Email: {referral.client_email} <br/>
              </div>
            </div>
          </div>
          <div className="grid-right">
            <div className="member-info">
              <h2>Member</h2>
              First Name: {referral.referring_user.firstName} <br/>
              Last Name: {referral.referring_user.lastName} <br/>
              Phone Number: {referral.referring_user.phone} <br/>
              Email: {referral.referring_user.email}
            </div>
          </div>
          <div className="grid-description">
            <div className="client-info">
              Description: {referral.description} "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            </div>
          </div>


        </div>
      )

    }

  }

  render() {
    if(!this.props.referralDetail) {
      return (
      <div onClick={() => {this.props.history.push('/dashboard')}}> Loading....</div>
      )
    } else {
    let referral = this.props.referralDetail;

    return (
      <div>
        <div className="wrapper">
          <div className="grid-1-1 center-text">
            {this.renderStatus(referral)}
          </div>
          <div className="body">

            <div className="wrapper">

            </div>
          </div>
        </div>



        <div className="referral-header">
          <div className="back-button">
            <a onClick={() => {this.props.history.push('/dashboard')}}>Back</a>
          </div>

          <div className="title">{referral.client_name} Referral<br/>From {referral.referring_organization.organizationName}</div>
          <div className="referral-status">
            Status: {referral.status}

          </div>
        </div>


        <div className="referral-details">
          <div className="client-info">
            <h2>Client</h2>
            Name: {referral.client_name} <br/>
            Phone Number: {referral.client_phone} <br/>
            Email: {referral.client_email} <br/>
            Description: {referral.description}
          </div>
          <div className="member-info">
            <h2>Member</h2>
            First Name: {referral.referring_user.firstName} <br/>
            Last Name: {referral.referring_user.lastName} <br/>
            Phone Number: {referral.referring_user.phone} <br/>
            Email: {referral.referring_user.email}
          </div>
          <div className="referral-notes">
            <h2>tasks</h2>
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
    )}
  }
}



function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchReferrals, submitNote, fetchDetail}, dispatch);
}
function mapStateToProps({referrals, referralDetail}) {
  return {referrals, referralDetail}
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Referral));
