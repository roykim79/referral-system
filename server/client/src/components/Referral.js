import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchReferrals, submitNote, fetchDetail, emptyDetails, updateRefStatus, fetchUser} from '../actions'
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import PendingDetails from './PendingDetails';
import AcceptedDetails from './AcceptedDetails';
const moment = require('moment');

class Referral extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentWillMount = () => {
   this.props.fetchDetail(this.props.match.params.referralId)
    .then(()=>{
this.updateStatus()
      })
    }

    componentDidUpdate = (prevProps) => {
      this.props.fetchUser()
      if(prevProps.referralDetail){
      if(this.props.referralDetail.status != prevProps.referralDetail.status) {
        this.updateStatus();

      }
    }}

  componentWillUnmount = () =>{
    this.props.emptyDetails()
  }

  handleState = (prop, value) =>{
    this.setState({[prop]:value})
  }
 updateStatus = () => {
  switch(this.props.referralDetail.status){
    case 'accepted':
      this.setState({
        accepted: 'complete',
        contacted: 'active',
        completed: '',
      })
      break;
    case 'contacted':
      this.setState({
        accepted: 'complete',
        contacted: 'complete',
        completed: 'active',
      })
      break;
    case 'completed':
      this.setState({
        accepted: 'complete',
        contacted: 'complete',
        completed: 'complete',
      })
      break;
    default:
    this.setState({
      accepted: '',
      contacted: '',
      completed: '',
    })
  }
}

changeStatus = (referral) => {
  switch(referral.status){
    case 'accepted':
    this.props.updateRefStatus(referral._id, 'contacted');
    break;
    case 'contacted':
    this.props.updateRefStatus(referral._id, 'completed');
    break;
  }
}

  renderStatus = (referral) =>{
    if(referral.status != 'pending' && referral.status != 'rejected'){

      return(
        <div className="grid-1-1 center-text">
          <div className="progress-container center-text">
            <ul className="progressbar">
                <li className="complete">Accepted</li>
                <li className={this.state.contacted}>Contacted</li>
                <li className={this.state.completed}>Completed</li>
            </ul>


          </div>
          {this.renderStep(referral)}
        </div>
      )
    }

  }

  renderStep = (referral) => {

    if(this.props.auth && referral){
    if(referral.status != 'completed' && this.props.auth.organization != referral.referring_organization._id){
      return (
        <button  className="mdc-button mdc-button--raised next-step"
        onClick={() => {this.changeStatus(referral)}}>
          Next Step
        </button>
      )
    }}
  }

  render = () => {


    if(!this.props.referralDetail) {
      return (
      <div onClick={() => {this.props.history.push('/dashboard')}}> Loading...</div>
      )
    } else {
    let referral = this.props.referralDetail;

    return (
      <div>
        <div className="wrapper">

          <div className="back-button">
            <a onClick={() => {this.props.history.push('/dashboard')}}>
              <span className="material-icons">arrow_back_ios</span>
              <span>Back</span>
            </a>
          </div>

          {this.renderStatus(referral)}

          {/* TODO: this.renderDetails()*/}
          <PendingDetails status={this.state.accepted} referral={referral} handleState = {this.handleState}/>

          <AcceptedDetails status={this.state.accepted} referral={referral} handleState = {this.handleState}/>

        </div>
     </div>
    )}
  }
}



function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchReferrals, submitNote, fetchDetail, emptyDetails, updateRefStatus, fetchUser}, dispatch);
}
function mapStateToProps({referrals, referralDetail, auth, myOrg, allOrgs}) {
  return {referrals, referralDetail, auth, myOrg, allOrgs}
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Referral));
