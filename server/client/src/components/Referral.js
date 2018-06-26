import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchReferrals} from '../actions'
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
const moment = require('moment');

class Referral extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text : ''
    }
  }
  submitNote = () => {
    axios.post(`/api/referrals/${this.props.match.params.referralId}/notes`, this.state)
  }
  
  render() {
    var referral = this.props.referrals.find((referral) => {
      return referral._id = this.props.match.params.referralId
    })
    if(!referral) {
      return (<div onClick={() => {this.props.history.push('/dashboard')}}> Sorry! Something went wrong, please click here to head back </div>)
    }
    return (
      <div>
        <div className="referral-header">
          <div className="back-button">
            <a onClick={() => {this.props.history.push('/dashboard')}}>Back</a>
          </div>
          <div className="title">{referral.client_name} Referral<br/>From {referral.referring_organization.organizationName}</div>
          <div className="referral-status">
            Status: {referral.status}
            <span><button>Reject</button></span>
            <span><button>Accept</button></span>
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
              <div> {note.text} <span className='text-muted'> posted by: {note.posting_user} at {moment(note.value).format('MMMM Do YYYY, h:mm:ss a')}</span> </div>
                <hr/>
                </div>
                ) 

            })}</div>
            <div className="referral-notes-input"><input onChange={(event) => {this.setState({text: event.target.value})}}/></div>
            <div className="referral-notes-save"><button onClick={() => {this.submitNote()}}>Save</button></div>

          </div>

        </div>


      </div>
    )
  }
}



function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchReferrals}, dispatch);
}
function mapStateToProps({referrals}) {
  return {referrals}
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Referral));
