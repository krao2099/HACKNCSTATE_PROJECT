import React from 'react';

const FeedCard = ({ title, description, people_ids, people}) => {

  return (
    <div id = "card">
        <h3 id = "title">{title}</h3>
        <div id = "people">
            {people.map(p => (
                <div>{p}</div>
            ))}
        </div>
        <p id = "description">{description}</p>
    </div>
  );
};

export default FeedCard;