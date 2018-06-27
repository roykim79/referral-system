import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMyOrg, fetchTags } from '../actions';
import {WithContext as ReactTags} from 'react-tag-input';

// import Tags from './Tags';
const KeyCodes = {
  comma: 188,
  enter: 13,
};
 
const delimiters = [KeyCodes.comma, KeyCodes.enter];

class OrganizationInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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

  render() {
    const { tags, suggestions } = this.state;

    if (!this.state.suggestions|| !this.state.tags) {
      return (<div>Loading...</div>)
    } else {
      return (
        <div>
          <h2>This will be where ones own organization is shown, editable, tags made with react tag input</h2>
          <div className="form-container">
            <form action="">
              <input value={this.state.organizationName} onChange={(e) => { this.setState({ organizationName: e.target.value }) }} id="organizationName" name="organizationName" type="text" />
              <input value={this.state.description} onChange={(e) => { this.setState({ description: e.target.value }) }} id="description" name="description" type="text" />
              <input value={this.state.website} onChange={(e) => { this.setState({ website: e.target.value }) }} id="website" name="website" type="text" />
              <input value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} id="email" name="email" type="text" />
              <input value={this.state.phone} onChange={(e) => { this.setState({ phone: e.target.value }) }} id="phone" name="phone" type="text" />
              <input value={this.state.address} onChange={(e) => { this.setState({ address: e.target.value }) }} id="address" name="address" type="text" />
              <input value={this.state.logo} onChange={(e) => { this.setState({ logo: e.target.value }) }} id="logo" name="logo" type="text" />
              <div>
                <ReactTags tags={tags}
                  suggestions={suggestions}
                  handleDelete={this.handleDelete}
                  handleAddition={this.handleAddition}
                  handleDrag={this.handleDrag}
                  delimiters={delimiters} />
              </div>
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