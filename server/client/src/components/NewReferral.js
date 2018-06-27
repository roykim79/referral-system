import React, {Component} from 'react';
import TextField, {HelperText, Input} from '@material/react-text-field';
import {Textfield, Icon} from 'react-mdc-web';
import Modal from 'react-modal';

import OrganizationModal from './OrganizationModal';

class NewReferral extends Component {
    constructor(props){
      super(props)
      this.state={}
    }

    // function to verify if inputted organization name is equal to an organization in the system. If true, activate inputs in "section client". If false, disable them.
    // selectedOrganization(){
    //   return this.props.organizations.find((item)=>{
    //     return this.state.organization == item
    //   })
    // }

    render(){
        return (
            <div>

              <body className="new-referral">

                <div className="wrapper">
                  <div className="grid-1-1">
                    <h1 className='add-referral-header'>Add Referral</h1>
                  </div>

                  <div className="body">
                    <div className="wrapper">
                      <section className="section-organization">

                          <TextField
                            id="myId"
                            label='Organization Name'
                            floatingLabelClassName='mdc-floating-label'
                            className="form-input-referral mdc-text-field--box"
                            style = {{width: 300}}

                          >
                            <Input
                              className="form-input-referral"
                              value={this.state.organization}
                              onChange={(e) => this.setState({organization: e.target.value})}
                              name="form-input-referral"/>
                          </TextField>

                          <OrganizationModal/>

                      </section>

                      <section className="section-client">

                        <TextField
                          id="myId"
                          label='Name'
                          floatingLabelClassName='mdc-floating-label'
                          className="form-input-referral mdc-text-field--box"
                          style = {{width: 300}}

                        >
                          <Input
                            className="form-input-referral"
                            value={this.state.name}
                            onChange={(e) => this.setState({name: e.target.value})}
                            name="form-input-referral"/>
                        </TextField>

                        <TextField
                          id="myId"
                          label='Phone Number'
                          floatingLabelClassName='mdc-floating-label'
                          className="form-input-referral mdc-text-field--box"
                          style = {{width: 300}}

                        >
                          <Input
                            className="form-input-referral"
                            value={this.state.number}
                            onChange={(e) => this.setState({number: e.target.value})}
                            name="form-input-referral"/>
                        </TextField>

                        <TextField
                          id="myId"
                          label='Email'
                          floatingLabelClassName='mdc-floating-label'
                          className="form-input-referral mdc-text-field--box"
                          style = {{width: 300}}

                        >
                          <Input
                            className="form-input-referral"
                            value={this.state.email}
                            onChange={(e) => this.setState({email: e.target.value})}
                            name="form-input-referral"/>
                        </TextField>

                        <Textfield
                          floatingLabel="Description"
                          className="mdc-text-field--box"
                          textarea
                          rows="8"
                          cols="44"
                          value={this.state.description}
                          onChange={({target : {value : description}}) => {
                            this.setState({ description })
                          }}
                        />

                        <div className="button-container">
                          <button types="submit" className="mdc-button mdc-button--raised cancel">
                            Cancel
                          </button>

                          <button types="submit" className="mdc-button mdc-button--raised submit">
                            Submit
                          </button>
                        </div>



                      </section>



                    </div>
                  </div>
                </div>

              </body>

            </div>
        )
    }
}

export default NewReferral;
