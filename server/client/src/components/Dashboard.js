import React, {Component} from 'react';
import ReferralList from './ReferralList';

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    componentDidMount = () => {
        //fetch all referrals when this component mounts
    }
    render(){
        return (
            <div>
            <div>This will be where the filter buttons will go </div>
            <div>onClick they will set state which should be passed into referralList component to filter</div>
            <ReferralList />
            </div>
            
        )
    }
}

export default Dashboard;