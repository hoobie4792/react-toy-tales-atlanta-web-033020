import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

// import data from './data'

const BASE_URL = 'http://localhost:3000/toys/';

class App extends React.Component {

  state = {
    display: false,
    toys: []
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  // Fetch toys from database when app component has loaded
  componentDidMount() {
    fetch(BASE_URL)
      .then(response => response.json())
      // Set toys state to toys returned from fetch response
      .then(toys => this.setState({ toys: toys }))
  }

  // Function to delete a toy
  // Takes in id passed in from Donate to Goodwill button click event in ToyCard.js
  deleteToy = id => {
    const fetchObj = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    // Set url to http://localhost:3000/toys/id
    fetch(BASE_URL + id, fetchObj)
      .then(response => response.json())
      // Set toys state: Filter for all toys except for the toy we want to delete
      .then(() => this.setState({ toys: this.state.toys.filter(toy => toy.id !== id) }));
  }

  // Function to like a toy
  // Takes in id and likes passed in from like button click event in ToyCard
  likeToy = (id, likes) => {
    const fetchObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // Increment likes by one to update (patch) desired toy
        likes: likes + 1
      })
    }

    fetch(BASE_URL + id, fetchObj)
      .then(response => response.json())
      .then(toy => {
        // Copy this.state.toys as to not mutate array
        let toysCopy = [...this.state.toys];
        // Find index of the "old toy" (toy we want to update)
        const oldToyIndex = toysCopy.findIndex(toy => toy.id === id);
        // Splice in new toy: Starting at index oldToyIndex, remove one element, and add the toy element that came from the fetch response
        toysCopy.splice(oldToyIndex, 1, toy)
        // Update toys state with new spliced toys (toysCopy)
        this.setState({ toys: toysCopy })
      })
  }

  // Function to add a toy
  // Accepts toy name and image passed in from toy form as arguments
  addToy = (name, image) => {
    // Declare object with all necessary toy properties (name, image) passed in from toy form
    // Set likes to 0 by default
    let toyObj = {
      name: name,
      image: image,
      likes: 0
    }

    const fetchObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // Pass in toyObj to be stringified
      body: JSON.stringify(toyObj)
    }

    // Send POST request to http://localhost:3000/toys
    fetch(BASE_URL, fetchObj)
      .then(response => response.json())
      // Append toy received from fetch request to the toys state
      .then(toy => this.setState({ toys: [...this.state.toys, toy] }))
  }

  render() {
    return (
      <>
        <Header />
        {this.state.display
          ?
          <ToyForm addToy={this.addToy} />
          :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        {/* Pass in toys, deleteToy callback, and likeToy callback */}
        <ToyContainer toys={this.state.toys} deleteToy={this.deleteToy} likeToy={this.likeToy} />
      </>
    );
  }

}

export default App;
