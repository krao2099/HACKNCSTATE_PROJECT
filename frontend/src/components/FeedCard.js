import React from 'react';

const FeedCard = ({ title, description,  people, file}) => {


  return (
    <div id = "card">
        <div id = "card_content">
            <h3 id = "title">{title}</h3>
            <div id = "people">
                {people.map(p => (
                    <a href={'/profile?pid=' + p[0]}>{p[1]}</a>
                ))}
            </div>
            <p id = "description">{description}</p>
        </div>

        <div id="card_image">
            <img src={file} alt="Memory photograph not found"></img>
        </div>
    </div>
  );
};

export default FeedCard;