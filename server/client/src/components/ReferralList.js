import React, { Component } from 'react';
import ReactTable from 'react-table';
import loader from '../loading-gif.gif';
import { fetchReferrals } from '../actions'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
const moment = require('moment');
const RECEIVED = 'received';
const SENT = 'sent';



class ReferralList extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount = () => {
    this.props.fetchReferrals(RECEIVED);
  }
  renderTable = () => {
    if (!this.props.referrals) {
      return (<img className='loading-img load-icon' src={loader} alt='loading'/>)
    }
    let columns = [
      {
        Header: 'From', accessor: 'referring_organization.organizationName'
      },
      {Header: 'To', accessor: 'receiving_organization.organizationName'
      },
      {
        Header: 'Referrer\'s Name', accessor: 'referring_user.firstName'
      },
      {
        Header: 'Client Name', accessor: 'client_name'
      },
      {
        Header: 'Date', accessor: 'dateUpdated',
        Cell: props => <span> {moment(props.value).format("lll")} </span>
      },
      {
        Header: 'Status', accessor: 'status',
        Cell: (props) => {
          return (
            <div>
              <span className={"status-" +(props.value)}>  </span>
              <span>{props.value}</span>
            </div>

          )
        }
      }
    ]
    let data;
    if (this.props.status !== null) {
      data = this.props.referrals.filter((referral) => {
        return referral.status == this.props.status;
      })
    } else {
      data = this.props.referrals;
    }
    return <ReactTable
      getTrProps={(state, rowInfo, column) => {
        return {
          onClick: (e) => {
            this.props.history.push(`/referral/${rowInfo.original._id}`)
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

const mapStateToProps = ({ referrals }) => {
  return { referrals }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchReferrals }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReferralList));
