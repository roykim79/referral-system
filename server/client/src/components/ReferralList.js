import React, {Component} from 'react';
import ReactTable from 'react-table';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

class ReferralList extends Component {
    constructor(props) {
        super(props)
    }
    renderTable = () => {
        let fakeData = [{status: 'pending', id:'landing', referring_organization : {organizationName: 'testOrg'}}]
        let columns = [{Header: 'Organization', accessor: 'referring_organization.organizationName'},{Header: 'status', accessor: 'status'}]
        let data;
        if(this.props.status !== null){
            data = fakeData.filter((referral) => {
                return referral.status == this.props.status;
            })
        } else {
            data = fakeData;
        }
        return <ReactTable 
                    getTrProps={(state, rowInfo, column) => {
                        return {
                            onClick: (e) => {
                                this.props.history.push(`/${rowInfo.original.id}`)
                            }
                        }
                    }}
                    data={data}
                    columns={columns}
        />
    }
    
    render() {
        return this.renderTable()
    }
}

const mapStateToProps = ({referrals}) => {
    return {referrals}
}
export default connect(mapStateToProps)(withRouter(ReferralList)); 