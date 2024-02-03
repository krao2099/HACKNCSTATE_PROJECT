import React from 'react';
import './Tree.css'
import FamilyTree from '../mytree';
import plus from '../images/plus.png';


const Tree = () => {
    return (
        
        <div >
            <div class="header">
              <div class="links">
              <h1 class="tree-header">Root to Something</h1>
                <a href="/" class="add-relationships">Add Family Member</a>
                <a href="/" class="add-relationships">Add Relationships</a>
                <a href="/" class="memories-link">Memories</a>
                <a href="/" class="about-link">About Us</a>
              </div>
              
            </div>
            <FamilyTree nodes={[
                { id: 1, pids: [2], name: 'Amber McKenzie', Birthday: '1/43/2', img: 'https://cdn.balkan.app/shared/2.jpg'  },
                { id: 2, pids: [1], name: 'Ava Field', gender: 'Test', img: 'https://cdn.balkan.app/shared/m30/5.jpg' },
                { id: 3, mid: 1, fid: 2, name: 'Peter Stevens', Birthday: "1/2/3", gender: 'male', img: 'https://cdn.balkan.app/shared/m10/2.jpg' },
                { id: 4, mid: 1, fid: 2, name: 'Savin Stevens', gender: 'male', img: 'https://cdn.balkan.app/shared/m10/1.jpg'  },
                { id: 5, mid: 1, fid: 2, name: 'Emma Stevens', gender: 'female', img: 'https://cdn.balkan.app/shared/w10/3.jpg' }
            ]} /> 
            <a class="new-link">
              <img src={plus}/>
            </a>
        </div>
        
    );
};

export default Tree;
