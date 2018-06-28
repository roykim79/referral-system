import React, { Component } from 'react';
import TextField, { HelperText, Input } from '@material/react-text-field';
import { Textfield, Icon } from 'react-mdc-web';
import Modal from 'react-modal';
import axios from 'axios';
import { bindActionCreators } from 'react-modal';
import { connect } from 'react-redux';

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
  }

  // setOrganization = (e, id) => {
  //   console.log("J")
  //   // e.preventDefault()
  //   this.setState({ receiving_organization: id })
  // }

  componentDidMount() {
    let organizationName = organizationNameField()
  }

  autofillList() {
    let suggestions = []

    if (this.props.allOrgs) {
      this.props.allOrgs.forEach((organization) => {
        suggestions.push(<option key={organization._id}>{organization.organizationName}</option>)
      })
    }

    return suggestions;
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

    return (
      <div>
        <div className="new-referral">
          <div className="wrapper">
            <div className="grid-1-1">
              <h1 className='add-referral-header'>Add Referral</h1>
            </div>
            <div className="body">
              <div className="wrapper">
                <section className="section-organization">
                  <div className="mdc-text-field mdc-text-field--box organizationName">
                    <label className="mdc-floating-label" for="organizationName-input">Organization Name</label>
                    <input
                      value={this.state.receiving_organization}
                      onChange={async (event) => {
                        await this.setState({ receiving_organization: event.target.value })
                      }}
                      type="text" className=" awesomplete mdc-text-field__input input-text" list="orgNames" required
                    />
                    <datalist id="orgNames">
                      {this.autofillList()}
                    </datalist>
                    <div className="mdc-line-ripple">
                    </div>
                  </div>

                  <OrganizationModal
                    value={this.state.organizationName}
                    allOrgs={this.props.allOrgs}
                  // setOrganization={this.setOrganization} 
                  />
                </section>

                <section className="section-client">

                  <TextField
                    id="myId"
                    label='Name'
                    floatingLabelClassName='mdc-floating-label'
                    className="form-input-referral mdc-text-field--box "
                  >
                    <Input
                      className="form-input-referral"
                      value={this.state.client_name}
                      onChange={(e) => this.setState({ client_name: e.target.value })}
                      name="form-input-referral" />
                  </TextField>

                  <br />

                  <TextField
                    id="myId"
                    label='Phone Number'
                    floatingLabelClassName='mdc-floating-label'
                    className="form-input-referral mdc-text-field--box "
                    style={{ width: 300 }}
                  >
                    <Input
                      className="form-input-referral"
                      value={this.state.client_phone}
                      onChange={(e) => this.setState({ client_phone: e.target.value })}
                      name="form-input-referral"
                    />
                  </TextField>

                  <br />

                  <TextField
                    id="myId"
                    label='Email'
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

function mapStateToProps({ allOrgs }) {
  return { allOrgs }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ submitNewReferral }, dispatch);
// }

export default connect(mapStateToProps)(NewReferral);
