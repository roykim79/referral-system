import React, {Component} from 'react';
import axios from 'axios';
import logo from '../RS-logo.png'
import {withRouter} from 'react-router-dom';
import {fetchUser} from '../actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField, { HelperText, Input } from '@material/react-text-field';



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
      } else {
        // let  username = usernameField()
        // let  password = passwordField()
    }}

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
                <h2 className="landing-title"> Best Referral System. Referrals made easy.</h2>

                <section className="landing-logo">

                    <img className="shrine-logo" src={logo}/>

                  <h1>Referral System</h1>
                </section>


                <form onSubmit={this.submitLogin}>

                <TextField
                  id="myId"
                  label='Username'
                  floatingLabelClassName='mdc-floating-label'
                  className="form-input-referral mdc-text-field--box username"
                >
                  <Input
                    required
                    className="form-input-referral"
                    value={this.state.username}
                    onChange={(event) => {this.setState({username: event.target.value})}}
                    name="form-input-referral" />
                </TextField>

                <TextField
                  id="myId"
                  label='Password'
                  floatingLabelClassName='mdc-floating-label'
                  className="form-input-referral mdc-text-field--box password"
                >
                  <Input
                    required
                    type="password"
                    className="form-input-referral"
                    value={this.state.password}
                    onChange={(event) => {this.setState({password: event.target.value})}}
                    name="form-input-referral" />
                </TextField>

                  <div className="login-button-container">
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
