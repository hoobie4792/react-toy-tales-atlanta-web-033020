import React, { Component } from 'react';

class ToyCard extends Component {

  render() {
    return (
      <div className="card">
        {/* Update props accordingly */}
        <h2>{this.props.name}</h2>
        <img src={this.props.image} alt={this.props.name} className="toy-avatar" />
        <p>{this.props.likes} Likes </p>
        {/* Add click event that calls likeToy callback function defined in App.js */}
        <button className="like-btn" onClick={() => this.props.likeToy(this.props.id, this.props.likes)}>Like {'<3'}</button>
        {/* Add click event that calls deleteToy callback function defined in App.js */}
        <button className="del-btn" onClick={() => this.props.deleteToy(this.props.id)}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
