import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {fetchAllOrgs, fetchTags}from '../actions';
import TextField, {HelperText, Input} from '@material/react-text-field';
import Modal from 'react-modal';
import { bindActionCreators } from 'redux';
import { Button, Caption } from 'react-mdc-web';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#yourAppElement')

class OrganizationModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };
  }

  componentDidMount = () => {
    this.props.fetchAllOrgs();
    this.props.fetchTags();
  }

  openModal = (e) => {
    e.preventDefault()
    this.setState({modalIsOpen: true});
  }

  closeModal = (e) => {
    this.setState({modalIsOpen: false});
  }

  autofillList(){
    let suggestions = []

    console.log(this.props)
    if(this.props.allOrgs){
      this.props.allOrgs.forEach((organization)=>{
        // if (suggestions.length < 1){
          suggestions.push(
            <option>{organization.organizationName}</option>
          )
        // }

      })
    }
  }

  renderOrgs(){
    return this.props.allOrgs.map((org) =>{
      console.log(org)
      return (
        <div className="row" key={'model'+org._id}>

          <img className = "org-logo" alt = "<LOGO>" src = {org.logo}/>
          <p>{org.organizationName}</p>

          <br/>
        </div>


      );
    })
  }

  render() {
    console.log(this.props)

    if(!this.props.allOrgs || !this.props.tags) {
      return (<div>Loading...</div>)
    }
    return (
      <div>
        <div className="find">
        <Caption> or </Caption>
        <Button dense types="submit"
          onClick={this.openModal}>
           Search by Tag
        </Button>
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          className="organization-modal"
          contentLabel="Example Modal"
        >

          <a className="exit-window" onClick={this.closeModal}>X</a>

          <TextField
            id="myId"
            label='Search Organization'
            floatingLabelClassName='mdc-floating-label'
            className="form-input-referral mdc-text-field--box"
            style = {{width: 300}}

          >
            <Input
              className="form-input-referral"
              value={this.state.organization}
              onChange={(e) => this.setState({organization: e.target.value})}
              name="form-input-referral"/>
          </TextField>

          {this.renderOrgs()}

        </Modal>
      </div>
    );
  }
}
const mapStateToProps = ({ tags }) => {
  return { tags }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchAllOrgs, fetchTags}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(OrganizationModal)
