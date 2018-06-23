import React, {Component} from 'react';
import axios from 'axios';
import {ROOT_URL} from '../actions'

class Landing extends Component{
    constructor(props){
        super(props)

        this.state = {
            username: null,
            password: null
        }
    }

    submitLogin = () => {
        axios.post(`${ROOT_URL}/api/login`, this.state);
    }

    render() {
        return (
            <div>
                <h2> Welcome to Referral System. Please change this text to something meaningful.</h2>
                <h6>Login Below</h6>
                <form>
                    <input onChange={(event) => {this.setState({username: event.target.value})}} type="text"/>
                    <input type="password" onChange={(event) => {this.setState({password: event.target.value})}}/>
                    <button type='button' onClick={() => {this.submitLogin(this.state.username, this.state.password)}}>Submit</button>
                </form>
            </div>
        );
    }
}

export default Landing;