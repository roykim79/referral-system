import React, { Component } from 'react';
import TextField, { HelperText, Input } from '@material/react-text-field';
import { Textfield, Icon } from 'react-mdc-web';
import Modal from 'react-modal';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMyOrg } from '../actions'
import OrganizationModal from './OrganizationModal';

import { organizationNameField } from '../utils/inputField.js'

class NewReferral extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      suggestions: [],
      receiving_organization: null,
      client_name: null,
      client_phone: null,
      client_email: null,
      description: null
    };

    this.props.fetchMyOrg()

  }

  setOrganization = (e, id) => {
    e.preventDefault()
    this.setState({ receiving_organization: id })
  }

  componentDidMount() {
    let organizationName = organizationNameField()
  }

  autofillList(notMyOrgs) {
    let suggestions = []

    if (notMyOrgs) {
      notMyOrgs.forEach((organization) => {
        suggestions.push(<option key={organization._id}>{organization.organizationName}</option>)
      })
    }

    return suggestions;
  }
//checks if the send to organization matches and sets field as disabled
  disabledStatus = (sendTo) => {
    debugger;
    if(this.props.allOrgs){
    let matchChecker = this.props.allOrgs.filter((org) => {
      return org.organizationName == sendTo;
    })
    if(matchChecker === undefined || matchChecker.length == 0 || this.state.client_name == null || this.state.client_name == '' ||
      this.state.client_phone == null || this.state.client_phone == '' || this.state.description == null || this.state.description == ''){
      return true;
    } else {
      return false;
    }}
  }

  handleSubmit = () => {
    const { receiving_organization, client_name, client_phone, client_email, description } = this.state;

    let newReferral = {
      receiving_organization,
      client_name,
      client_phone,
      client_email,
      description
    }

    // send post request with newReferral
    axios.post('/api/referrals', newReferral);

    // send user back to dashboard
    this.props.history.push('/dashboard');
  }

  render() {
    let notMyOrgs;
    if(this.props.allOrgs && this.props.myOrg){
      notMyOrgs = this.props.allOrgs.filter((org)=>{
        return org.organizationName != this.props.myOrg.organizationName
      })
    }


    console.log(notMyOrgs)

    return (
      <div>
        <div className="new-referral">
          <div className="wrapper">
            <div className="grid-1-1">
              <h1 className='add-referral-header'>Send Referral</h1>
            </div>
            <div className="body">
              <div className="wrapper">
                <section className="section-organization">
                  <div className="mdc-text-field mdc-text-field--box organizationName">
                    <label className="mdc-floating-label" for="organizationName-input">Organization Name</label>
                    <input
                      required
                      value={this.state.receiving_organization}
                      onChange={async (event) => {
                        await this.setState({ receiving_organization: event.target.value })
                      }}
                      type="text" className=" awesomplete mdc-text-field__input input-text" list="orgNames" required
                    />
                    <datalist id="orgNames">
                      {this.autofillList(notMyOrgs)}
                    </datalist>
                    <div className="mdc-line-ripple">
                    </div>
                  </div>

                  <OrganizationModal
                    value={this.state.organizationName}
                    allOrgs={notMyOrgs}
                  setOrganization={this.setOrganization}
                  />
                </section>

                <section className="section-client">

                  <TextField
                    id="myId"
                    label='Client Name'
                    floatingLabelClassName='mdc-floating-label'
                    className="form-input-referral mdc-text-field--box "
                  >
                    <Input
                      required
                      className="form-input-referral"
                      value={this.state.client_name}
                      onChange={(e) => this.setState({ client_name: e.target.value })}
                      name="form-input-referral" />
                  </TextField>

                  <br />

                  <TextField
                    id="myId"
                    label='Client Phone Number'
                    floatingLabelClassName='mdc-floating-label'
                    className="form-input-referral mdc-text-field--box "
                    style={{ width: 300 }}
                  >
                    <Input
                      required
                      className="form-input-referral"
                      value={this.state.client_phone}
                      onChange={(e) => this.setState({ client_phone: e.target.value })}
                      name="form-input-referral"
                    />
                  </TextField>

                  <br />

                  <TextField
                    id="myId"
                    label='Client Email'
                    floatingLabelClassName='mdc-floating-label'
                    className="form-input-referral mdc-text-field--box "
                    style={{ width: 300 }}

                  >
                    <Input
                      className="form-input-referral"
                      value={this.state.client_email}
                      onChange={(e) => this.setState({ client_email: e.target.value })}
                      name="form-input-referral"
                    />
                  </TextField>

                  <br />

                  <Textfield
                    floatingLabel="Description"
                    className="mdc-text-field--box"
                    textarea
                    rows="8"
                    cols="44"
                    value={this.state.description}

                    onChange={({ target: { value: description } }) => {
                      this.setState({ description })
                    }}
                  />

                  <div className="button-container">
                    <a href="/dashboard"
                      // type="button"
                      // className="mdc-button mdc-button--raised cancel"
                      id="cancel-new-referral"
                    >
                      Cancel
                    </a>
                    <button
                      disabled = {this.disabledStatus(this.state.receiving_organization)}
                      onClick={this.handleSubmit}
                      type="button"
                      className="mdc-button mdc-button--raised submit">
                      Submit
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ allOrgs, myOrg }) {
  return { allOrgs, myOrg }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMyOrg }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewReferral);
