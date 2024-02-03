import React from 'react';

const Person = ({ name, birthday, bio }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="person">
      <h2>{name}</h2>
      <p>Birthday: {formatDate(birthday)}</p>
    </div>
  );
};

export default Person;