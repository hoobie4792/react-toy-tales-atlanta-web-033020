import React from 'react';
import ToyCard from './ToyCard'

// Define function to map toys into ToyCards.
// Toys array, deleteToy callback, and likeToy callback as arguments
const mapToys = (toys, deleteToy, likeToy) => {
  return (
    toys.map(toy => <ToyCard
      key={toy.id}
      id={toy.id}
      name={toy.name}
      image={toy.image}
      likes={toy.likes}
      deleteToy={deleteToy}
      likeToy={likeToy}
    />)
  )
}

const ToyContainer = props => {
  return (
    <div id="toy-collection">
      {/* Send all toy props, deleteToy callback, and likeToy callback to mapToys function defined above */}
      {mapToys(props.toys, props.deleteToy, props.likeToy)}
    </div>
  );
}

export default ToyContainer;
