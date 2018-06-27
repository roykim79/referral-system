import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchTags } from '../actions';
import {WithContext as ReactTags} from 'react-tag-input';
// const ReactTags = require('react-tag-input').WithOutContext;

class Tags extends Component {
  constructor (props) {
    super (props)

    this.state = {
      tags: [{text: 'foo', id: 1},{ id:'2',text: 'bar'}],
      suggestions: []
    }
  }

  componentDidMount () {
    // this.props.fetchTags();
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

    return (
      <div>
        <ReactTags 
          tags={tags}
          suggestions={suggestions}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          handleDrag={this.handleDrag} 
        />
      </div>
    )
  }
}

const mapStateToProps = ({ tags }) => {
  return { tags }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchTags }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Tags);