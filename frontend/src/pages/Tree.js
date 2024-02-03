import React from 'react';
import './Tree.css';
import Person from '../components/Person';

const Tree = () => {
  return (
    <div>
      <div className='tree-header'>Family Tree</div>
      <Person name="Jane Doe" birthday="2000-04-05" />
      <Person name="John Smith" birthday="2001-09-23" />
    </div>
  );
};

export default Tree;