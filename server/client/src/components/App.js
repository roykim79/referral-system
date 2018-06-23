import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import {fetchUser} from '../actions'
import { bindActionCreators } from 'redux';
import Landing from './Landing'
import OrganizationInfo from './OrganizationInfo';
import NewReferral from './NewReferral';
import Referral from './Referral';
import Header from './Header';

class App extends Component {

    componentDidMount(){
        this.props.fetchUser();
    }
    render(){
    return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Dashboard} />
          <Route path="/landing" component={Landing} />
          <Route path="/my-org" component={OrganizationInfo} />
          <Route path='/new-referral' component={NewReferral}  />
          <Route path='/referral/:referralId' component={Referral} />
        </div>
      </BrowserRouter>
    </div>
  )}
};

 const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({fetchUser}, dispatch)
 }
export default connect(null, mapDispatchToProps)(App);