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

  componentDidMount() {
    fetch(BASE_URL)
      .then(response => response.json())
      .then(toys => this.setState({ toys: toys }))
  }

  deleteToy = id => {
    const fetchObj = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(BASE_URL + id, fetchObj)
      .then(response => response.json())
      .then(() => this.setState({ toys: this.state.toys.filter(toy => toy.id !== id) }));
  }

  likeToy = (id, likes) => {
    const fetchObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        likes: likes + 1
      })
    }

    fetch(BASE_URL + id, fetchObj)
      .then(response => response.json())
      .then(toy => {
        let toysCopy = [...this.state.toys];
        const oldToyIndex = toysCopy.findIndex(toy => toy.id === id);
        toysCopy.splice(oldToyIndex, 1, toy)
        this.setState({ toys: toysCopy })
      })
  }

  addToy = (name, image) => {
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
      body: JSON.stringify(toyObj)
    }

    fetch(BASE_URL, fetchObj)
      .then(response => response.json())
      .then(toy => this.setState({ ...this.state.toys, toy }))
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
        <ToyContainer toys={this.state.toys} deleteToy={this.deleteToy} likeToy={this.likeToy} />
      </>
    );
  }

}

export default App;
