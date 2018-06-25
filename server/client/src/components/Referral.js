import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Referral extends Component {
  constructor (props) {
    super(props)

    // var referral = getReferral(props.match.params.id);
  }
  
  render() {
    return (
      <div>
        <div className="referral-header">
          <div className="back-button">
            <a href="/">Back</a>
          </div>
          <div className="title">referral.client_name Referral<br/>From referral.organization</div>
          <div className="referral-status">
            Status: referral.status
            <span><button>Reject</button></span>
            <span><button>Accept</button></span>
          </div>
        </div>
        

        <div className="referral-details">
          <div className="client-info">
            <h2>Client</h2>
            Name: referral.client_name <br/>
            Phone Number: referral.client_phone <br/>
            Email: referral.client_email <br/>
            Description: referral.description
          </div>
          <div className="member-info">
            <h2>Member</h2>
            First Name: referral.referring_user.firstName <br/>
            Last Name: referral.referring_user.lastName <br/>
            Phone Number: referral.referring_user.phone <br/>
            email: referral.referring_user.email
          </div>
          <div className="referral-notes">
            <h2>Notes</h2>
            <div className="referral-notes-content"></div>
            <div className="referral-notes-input"><input type="text"/></div>
            <div className="referral-notes-save"><button>Save</button></div>

          </div>

        </div>


      </div>
    )
  }
}



// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({getReferral}, dispatch);
// }

// export default connect(null, mapDispatchToProps)(Referral);
export default Referral;