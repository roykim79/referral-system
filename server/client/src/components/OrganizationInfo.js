import React, { Component } from 'react';
import axios from 'axios'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMyOrg, fetchTags } from '../actions';
import {WithContext as ReactTags} from 'react-tag-input';
import loader from '../loading-gif.gif'
import {Textfield, Icon} from 'react-mdc-web';
import TextField, { HelperText, Input } from '@material/react-text-field';
import { Display2 } from 'react-mdc-web';

import {styleReactTagInput} from '../utils/inputField.js'


// import Tags from './Tags';
const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class OrganizationInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: true,
    };
  }

  componentDidMount = async () => {
    await this.props.fetchMyOrg()
      .then( async () => {
        await this.props.fetchTags();
      })
      .then(() => {
        this.setState(this.props.myOrg);
        this.setState({suggestions: this.props.tags});
    });
    styleReactTagInput()
  }


  updateOrg = () => {
    axios.put('/api/my_organization', this.state)
    alert('Organization Saved!')
  }

  handleDelete = (i) => {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition = (tag) => {
    this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  handleDrag = (tag, currPos, newPos) => {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
  }

  toggleRenderDetails = () =>{

    const { tags, suggestions } = this.state;

    if (this.state.editing) {
      return(
        <div className="body">

          <TextField
            id="myId"
            label='Organization Name'
            floatingLabelClassName='mdc-floating-label'
            className="form-input-referral mdc-text-field--box mx-2"
            style={{ width: 300 }}
          >
            <Input
              className="form-input-referral"
              value={this.state.organizationName}
              onChange={(e) => this.setState({ organizationName: e.target.value })}
              name="form-input-referral"
            />
          </TextField>

          <TextField
            id="myId"
            label='Website'
            floatingLabelClassName='mdc-floating-label'
            className="form-input-referral mdc-text-field--box mx-2"
            style={{ width: 300 }}
          >
            <Input
              className="form-input-referral"
              value={this.state.website}
              onChange={(e) => this.setState({ website: e.target.value })}
              name="form-input-referral"
            />
          </TextField>

          <TextField
            id="myId"
            label='Address'
            floatingLabelClassName='mdc-floating-label'
            className="form-input-referral mdc-text-field--box mx-2"
            style={{ width: 300 }}
          >
            <Input
              className="form-input-referral"
              value={this.state.address}
              onChange={(e) => this.setState({ address: e.target.value })}
              name="form-input-referral"
            />
          </TextField>

          <TextField
            id="myId"
            label='Logo url'
            floatingLabelClassName='mdc-floating-label'
            className="form-input-referral mdc-text-field--box mx-2"
            style={{ width: 300 }}
          >
            <Input
              className="form-input-referral"
              value={this.state.logo}
              onChange={(e) => this.setState({ logo: e.target.value })}
              name="form-input-referral"
            />
          </TextField>


          <div className={''/*"mdc-text-field mdc-text-field--upgraded form-input-referral mdc-text-field--box mx-2"*/}>
            <ReactTags tags={tags}
            let placeholder = ""
              className={{
                tags: 'tagsClass',
                tagInput: 'tagInputClass',
                tagInputField: 'tagInputFieldClass',
                selected: 'selectedClass',
                tag: 'tagClass',
              }}
              inline={false}
              suggestions={suggestions}
              handleDelete={this.handleDelete}
              handleAddition={this.handleAddition}
              handleDrag={this.handleDrag}
              delimiters={delimiters} />
              {console.log(<ReactTags/>)}
              {

              }

          </div>


        </div>
      )

    }
  }

  render() {

    if (!this.state.suggestions|| !this.state.tags) {
      return (<img className='loading-img load-icon' src={loader} alt='loading'/>)
    } else {
      return (
        <div>
          <div className="wrapper">
            <div className="grid-1-1">

              <div className='row mx-2'>
                <img className='myorg-logo' src={this.state.logo} />
                <Display2 className='row mx-2' >{this.state.organizationName}</Display2>
              </div>

            </div>
            {this.toggleRenderDetails()}

          </div>



          <h2>This will be where ones own organization is shown, editable, tags made with react tag input</h2>
          <div className="form-container">

            <form action="">



              <input value={this.state.description} onChange={(e) => { this.setState({ description: e.target.value }) }} id="description" name="description" type="text" />


              <input value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} id="email" name="email" type="text" />

              <input value={this.state.phone} onChange={(e) => { this.setState({ phone: e.target.value }) }} id="phone" name="phone" type="text" />







              <button onClick={() => {this.updateOrg()}} type='button'>Save</button>
            </form>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = ({ myOrg, tags }) => {
  return { myOrg, tags }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchMyOrg, fetchTags }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationInfo);
