import React, { Component } from 'react';

class ToyForm extends Component {

  // Declare state keys to house input data from form (name and image)
  state = {
    name: '',
    image: ''
  }

  // Handle all input changes and write to corresponding state key
  handleChange = e => {
    // Set corresponding state (defined by e.target.name) to the event target value
    this.setState({ [e.target.name]: e.target.value });
  }

  // Handle form submission
  handleSubmit = e => {
    // Prevent default form action
    e.preventDefault();

    // Call addToy callback passed down from App.js sending toy name and toy image as arguments
    this.props.addToy(this.state.name, this.state.image);
  }

  render() {
    return (
      <div className="container">
        {/* Add event handler for on submit to fire off callback function in App.js */}
        <form className="add-toy-form" onSubmit={this.handleSubmit}>
          <h3>Create a toy!</h3>
          {/* Add event handler for on change to update state with text field input changes */}
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text" onChange={this.handleChange} />
          <br />
          {/* Add event handler for on change to update state with text field input changes */}
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text" onChange={this.handleChange} />
          <br />
          <input type="submit" name="submit" value="Create New Toy" className="submit" />
        </form>
      </div>
    );
  }

}

export default ToyForm;
