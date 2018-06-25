import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import ReferralList from './ReferralList';
import {fetchReferrals} from '../actions';
import {connect} from 'react-redux';
const RECEIVED = 'received';
const SENT = 'sent';


class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentFilter: null
        }
    }
    componentDidMount = () => {

        //fetch received referrals by default
        this.props.fetchReferrals(RECEIVED)
    }
    render(){
        return (
            <div> 
                <button onClick={() => this.props.fetchReferrals(SENT)}>Sent</button>
                <button onClick={() => this.props.fetchReferrals(RECEIVED)}>Received</button>

                <button onClick={() => this.setState({currentFilter: null})} className={this.state.currentFilter === null ? 'active': ''} >All</button>
                <button onClick={() => this.setState({currentFilter: 'pending'})} className={this.state.currentFilter === 'pending' ? 'active': ''} >Pending</button>
                <button onClick={() => this.setState({currentFilter: 'accepted'})} className={this.state.currentFilter === 'accepted' ? 'active': ''} >Accepted</button>
                <button onClick={() => this.setState({currentFilter: 'rejected'})} className={this.state.currentFilter === 'rejected' ? 'active': ''} >Rejected</button>
                

            <div>This will be where the filter buttons will go </div>
            <div>onClick they will set state which should be passed into referralList component to filter</div>
            <ReferralList status={this.state.currentFilter} />
            </div>
            
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({fetchReferrals}, dispatch)
}

export default connect(null, mapDispatchToProps)(Dashboard);