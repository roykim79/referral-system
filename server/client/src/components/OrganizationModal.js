import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {fetchAllOrgs, fetchTags}from '../actions';
import TextField, {HelperText, Input} from '@material/react-text-field';
import Modal from 'react-modal';
import { bindActionCreators } from 'redux';
import { Button, Caption, Title } from 'react-mdc-web';

import {tagNameField} from '../utils/inputField.js'

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#yourAppElement')

class OrganizationModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      tag: ''
    };

    console.log(this.props)
  }

  componentDidMount = () => {
    let tagName = tagNameField()
    this.props.fetchAllOrgs()
    this.props.fetchTags()
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
    // console.log(this.state.tag)
    if(this.props.tags){
      this.props.tags.forEach((tag)=>{
        // if (suggestions.length < 1){
          suggestions.push(
            <option key={tag.id}>{tag.text}</option>
          )
        // }

      })
    }
    return (
      suggestions
    )
  }

  renderOrgs(){
    let orgs = this.props.allOrgs.slice()

    let match = this.props.tags.filter((tag)=>{
        return tag.text == this.state.tag
      }
  )[0]

  if (match){

    orgs = orgs.filter((org)=>{

      let tags = org.tags.filter((tag)=>{

        return tag.text == match.text
        }
      )[0]

      return org.tags.includes(tags)

    })

  }

    return orgs.map((org) =>{
      const orgName = org.organizationName


      return (
        <div className="wrapper modal pointer" key={'model'+org._id}
          onClick={(e)=>{
            this.props.setOrganization(e, orgName)
            this.setState({modalIsOpen:false})}}>

          <img className = "org-logo" alt = "<LOGO>" src = {org.logo}/>
          <div className="modal-list-name">
          <div className="orgName-title">{orgName}</div>
           {
            org.tags.map((tag)=>{
              return <Caption className="tag"> {tag.text} </Caption>
            })
          }
          </div>

        </div>


      );

    })
  }

  render() {

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
              value={this.state.tag}
              onChange={(e) => {
                e.preventDefault()
                this.setState({tag: e.target.value})}}
              name="form-input-referral" list="tagNames"/>
          </TextField>
          <datalist id="tagNames">
          {this.autofillList()}
          </datalist>
          <div className="">
              {this.renderOrgs()}
          </div>
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
