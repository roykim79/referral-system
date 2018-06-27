import React, { Component } from 'react';

class PendingDetails extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props)
    if(this.props.referral.status=="pending"){
    let referral = this.props.referral;

      return (

          <div className="pending-details">

            <div className="wrapper">

            <div className="pending-header">

              <h3> {referral.client_name} has been referred to your organization by {referral.referring_organization.organizationName}
              </h3>


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
                Name: {referral.referring_user.firstName} {referral.referring_user.lastName} <br/>
                Phone Number: {referral.referring_user.phone} <br/>
                Email: {referral.referring_user.email}
              </div>
            </div>
            <div className="grid-description pt-2">
              <div className="client-info">
              <h4>Description:</h4>
                {referral.description} "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              </div>
            </div>
              <div className="grid-accept-reject">
                <button types="submit" className="mdc-button mdc-button--raised reject">
                  Reject
                </button>
                <button types="submit" className="mdc-button mdc-button--raised accept"
                onClick={(e)=>{
                  e.preventDefault()
                  console.log(this.props)
                  this.props.handleState('accepted',true)}
                }
                  >
                  Accept
                </button>
              </div>

            </div>
          </div>

        )} else {
          return (<a/>)
        }

  }
}

export default PendingDetails
