import React from 'react';
import ReactDOM from 'react-dom';
import {fetchAllOrgs, fetchTags}from '../actions';
import { connect } from 'react-redux';
import TextField, {HelperText, Input} from '@material/react-text-field';
import Modal from 'react-modal';
import { bindActionCreators } from 'redux';

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

  render() {
    if(!this.props.allOrgs || !this.props.tags) {
      return (<div>Loading...</div>)
    }
    return (
      <div>

        <button types="submit" className="mdc-button mdc-button--raised find"
          onClick={this.openModal}>
          Find
        </button>

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


        </Modal>
      </div>
    );
  }
}
const mapStateToProps = ({allOrgs, tags}) => {
  return {allOrgs, tags}
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchAllOrgs, fetchTags}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(OrganizationModal)
