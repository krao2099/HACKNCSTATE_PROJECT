import React, { useState , useEffect} from 'react';

const FeedCard = ({ title, description,  people, file, type}) => {

    const [memType, setMemType] = useState({
        type: ""
    });

    useEffect(() => {
        if(type === 1){
            setMemType({type: "Childhood"});
        }
        if(type === 2){
            setMemType({type: "Family"});
        }
        if(type === 3){
            setMemType({type: "Special Event"});
        } 
    }, [type]);
  return (
    <div id = "card">
        <div id = "card_content">
            <p id = "memory_type">{memType.type} Memory</p>
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