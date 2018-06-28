import React, {Component} from 'react';
import TextField, {HelperText, Input} from '@material/react-text-field';
import {Textfield, Icon} from 'react-mdc-web';
import Modal from 'react-modal';

import OrganizationModal from './OrganizationModal';


import {organizationNameField} from '../utils/inputField.js'

// import awesomplete from '../awesomplete.js';


class NewReferral extends Component {
    constructor(props){
      super(props)
      this.state = {
        value: '',
        suggestions: [],
      };
    }


    componentDidMount(){
      let organizationName = organizationNameField()
    }

    autofillList(){
      var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla"]

      let suggestions = []

      countries.forEach((organization)=>{
        suggestions.push(
          <option>{organization}</option>
        )
      })

      return (
        suggestions
      )


    }

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

                      <div className="mdc-text-field mdc-text-field--box organizationName">
                        <label className="mdc-floating-label" for="organizationName-input">Organization Name</label>
                        <input onChange={(event) => {this.setState({organization: event.target.value})}}
                          type="text" className=" awesomplete mdc-text-field__input input-text"  list="mylist"  required/>
                          <datalist id="mylist">
                          {this.autofillList()}
                          </datalist>
                          <div className="mdc-line-ripple">
                          </div>
                          </div>

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
