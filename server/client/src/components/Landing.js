import React, {Component} from 'react';
import axios from 'axios';
import logo from '../RS-logo.png'
import {withRouter} from 'react-router-dom';
import {fetchUser} from '../actions'
import {usernameField, passwordField} from '../utils/inputField.js'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';



class Landing extends Component{
    constructor(props){
        super(props)

        this.state = {
            username: null,
            password: null
        }
    }

    componentDidMount = async() => {
      await this.props.fetchUser()
      if(this.props.auth) {
        this.props.history.push('/dashboard')
      } 
      const username = usernameField()
      const password = passwordField()

    }

    submitLogin = async(e) => {
        //This will be once logins are supported and creating an account
        e.preventDefault();
        let response =  await axios.post(`/api/login`, this.state);
        if (response) {
          this.props.history.push('/dashboard');
        }
    }

    render() {
        return (
            <div>
                <h2> Welcome to Referral System. Please change this text to something meaningful.</h2>

                <section className="landing-logo">

                    <img className="shrine-logo" src={logo}/>

                  <h1>Referral System</h1>
                </section>


                <form onSubmit={this.submitLogin}>

                  <div className="mdc-text-field mdc-text-field--box username">
                    <label className="mdc-floating-label" for="username-input">Username</label>
                    <input onChange={(event) => {this.setState({username: event.target.value})}}
                      type="text" className="mdc-text-field__input input-text" id="username-input" name="username" required/>

                    <div className="mdc-line-ripple">
                    </div>
                  </div>

                  <div className="mdc-text-field mdc-text-field--box password">
                    <label className="mdc-floating-label" for="password-input">Password</label>
                    <input onChange={(event) => {this.setState({password: event.target.value})}}
                      type="password" className="mdc-text-field__input" id="password-input" name="password" required minLength="8"/>
                    <div className="mdc-line-ripple"></div>
                  </div>




                  <div className="button-container">
                    <button types="submit" className="mdc-button mdc-button--raised next">
                      Login
                    </button>
                  </div>

                </form>


            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
return bindActionCreators({fetchUser}, dispatch)
}
const mapStateToProps = ({auth}) => {
  return {auth}
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Landing));
