import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import ReferralList from './ReferralList';
import {fetchReferrals, fetchUser} from '../actions';
import {connect} from 'react-redux';
const RECEIVED = 'received';
const SENT = 'sent';



class Dashboard extends Component {
    constructor(props) {
        super(props)

        //give component a state that holds the filter information for the react table
        this.state = {
            currentFilter: null,
            currentView: RECEIVED
        }

        this.interval = setInterval(() => this.props.fetchReferrals(this.state.currentView), 15000);
    }
    componentDidMount = () => {
        if(!this.props.auth) {
          this.props.history.push('/')
        }
    } 

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render(){
        return (
            <div>

              <body className="home">

                <section id="layout-grid-in-fluid-container pt-h">
                  <div className="demo-grid mdc-layout-grid">
                    <div className="mdc-layout-grid__inner">

                      <div className="demo-cell mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
                        <nav className="shrine-drawer mdc-drawer mdc-drawer--permanent side-drawer">
                          <h2 className="shrine-title">REFERRAL</h2>
                          <h2 className="shrine-title">SYSTEM</h2>

                          <button className="mdc-button mdc-button--raised next">
                            Create Referral
                          </button>

                          <div className="mdc-drawer__content">
                            <nav className="mdc-list">

                              <a className="mdc-list-item"
                                onClick={() => {this.props.fetchReferrals(RECEIVED); this.setState({currentView: RECEIVED})}}>
                                Received
                              </a>

                              <a className="mdc-list-item"
                                onClick={() => {this.props.fetchReferrals(SENT); this.setState({currentView: SENT})}}>
                                Outgoing
                              </a>

                            </nav>
                          </div>
                        </nav>
                      </div>

                      <div className="demo-cell mdc-layout-grid__cell mdc-layout-grid__cell--span-9">
                        <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
                          <button type="button" className={this.state.currentFilter === null ? 'mdc-button mdc-button--raised': 'mdc-button'}
                            onClick={() => this.setState({currentFilter: null})} >
                            All
                          </button>
                          <button className={this.state.currentFilter === 'pending' ? 'mdc-button mdc-button--raised': 'mdc-button'}
                            onClick={() => this.setState({currentFilter: 'pending'})}>
                            Pending
                          </button>
                          <button className={this.state.currentFilter === 'accepted' ? 'mdc-button mdc-button--raised': 'mdc-button'}
                            onClick={() => this.setState({currentFilter: 'accepted'})}>
                            Accepted
                          </button>
                          <button className={this.state.currentFilter === 'contacted' ? 'mdc-button mdc-button--raised': 'mdc-button'}
                            onClick={() => this.setState({currentFilter: 'contacted'})}>
                            Contacted
                          </button>
                          <button className={this.state.currentFilter === 'completed' ? 'mdc-button mdc-button--raised': 'mdc-button'}
                            onClick={() => this.setState({currentFilter: 'completed'})}>
                            Completed
                          </button>
                          <button className={this.state.currentFilter === 'rejected' ? 'mdc-button mdc-button--raised': 'mdc-button'}
                            onClick={() => this.setState({currentFilter: 'rejected'})}>
                            Rejected
                          </button>
                        </div>
                        <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
                          <ReferralList view={this.state.currentView} status={this.state.currentFilter} />
                        </div>
                      </div>
                      <div className="demo-cell mdc-layout-grid__cell mdc-layout-grid__cell--span-2"></div>

                    </div>
                  </div>
                </section>
              </body>
            </div>

        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({fetchReferrals, fetchUser}, dispatch)
}
const mapStateToProps = ({auth}) => {
  return {auth};
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);