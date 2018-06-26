import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class OrganizationInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [
        { id: "Thailand", text: "Thailand" },
        { id: "India", text: "India" }
      ],
      suggestions: [
        { id: 'USA', text: 'USA' },
        { id: 'Germany', text: 'Germany' },
        { id: 'Austria', text: 'Austria' },
        { id: 'Costa Rica', text: 'Costa Rica' },
        { id: 'Sri Lanka', text: 'Sri Lanka' },
        { id: 'Thailand', text: 'Thailand' }
      ]
    };
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
        <h2>This will be where ones own organization is shown, editable, tags made with react tag input</h2>
        <div className="form-container">
          <form action="">
            <input id="organizationName" name="organizationName" type="text" />
            <input id="description" name="description" type="text" />
            <input id="website" name="website" type="text" />
            <input id="email" name="email" type="text" />
            <input id="phone" name="phone" type="text" />
            <input id="address" name="address" type="text" />
            <input id="logo" name="logo" type="text" />
            <input id="address" name="address" type="text" />
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

const mapStateToProps = ({tags, myOrg}) => {
  return {
    tags,
    myOrg
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({})
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationInfo);