import React from 'react';

const FeedCard = ({ title, description,  people}) => {


  return (
    <div id = "card">
        <h3 id = "title">{title}</h3>
        <div id = "people">
            {people.map(p => (
                <a href={'/profile?pid=' + p[0]}>{p[1]}</a>
            ))}
        </div>
        <p id = "description">{description}</p>
    </div>
  );
};

export default FeedCard;