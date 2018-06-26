import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import Landing from './Landing'
import OrganizationInfo from './OrganizationInfo';
import NewReferral from './NewReferral';
import Referral from './Referral';
import Header from './Header';

class App extends Component {


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


export default App;

//done