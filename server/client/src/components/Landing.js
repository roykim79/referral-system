import React, {Component} from 'react';
import axios from 'axios';
import logo from '../RS-logo.png'
import {usernameField, passwordField} from '../utils/inputField.js'



class Landing extends Component{
    constructor(props){
        super(props)

        this.state = {
            username: null,
            password: null
        }
    }

    componentDidMount(){
      const username = usernameField()
      const password = passwordField()
    }

    submitLogin = () => {
        //This will be once logins are supported and creating an account
        axios.post(`/api/login`, this.state);
    }

    render() {
      console.log(this.state)
        return (
            <div>
                <h2> Welcome to Referral System. Please change this text to something meaningful.</h2>

                <section className="landing-logo">

                    <img className="shrine-logo" src={logo}/>

                  <h1>Referral System</h1>
                </section>


                <form action="home.html">

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
                      type="password" className="mdc-text-field__input" id="password-input" name="password" required minlength="8"/>
                    <div className="mdc-line-ripple"></div>
                  </div>




                  <div className="button-container">
                    <button onClick={() => {this.submitLogin(this.state.username, this.state.password)}} className="mdc-button mdc-button--raised next">
                      Login
                    </button>
                  </div>

                </form>


            </div>
        );
    }
}

export default Landing;
