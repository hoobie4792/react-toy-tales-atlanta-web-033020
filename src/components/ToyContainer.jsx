import React from 'react';
import ToyCard from './ToyCard'

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
      {mapToys(props.toys, props.deleteToy, props.likeToy)}
    </div>
  );
}

export default ToyContainer;
