import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dashboard from './Dashboard';
import Landing from './Landing'
import OrganizationInfo from './OrganizationInfo';
import NewReferral from './NewReferral';
import Referral from './Referral';
import Header from './Header';

import {fetchAllOrgs} from '../actions';

class App extends Component {

    componentDidMount(){
      this.props.fetchAllOrgs()
    }

    render(){
    return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/my-org" component={OrganizationInfo} />
          <Route path='/new-referral' component={NewReferral}  />
          <Route path='/referral/:referralId' component={Referral} />
        </div>
      </BrowserRouter>
    </div>
  )}
};


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({fetchAllOrgs}, dispatch)
}

export default connect(null, mapDispatchToProps)(App);
