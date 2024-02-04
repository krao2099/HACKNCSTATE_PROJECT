import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './RelationForm.css'
import Header from '../components/Header';


const RelationForm = () => {
  const navigate = useNavigate();

  const [selectedRelation, setselectedRelation] = useState({
    p1_id: '',
    p2_id: '',
    type_id: '1'
  });

  const [peopleList, setPeopleList] = useState({
    people: []
  });

  const relationships = [{id: '1', relation: 'parent'}, {id: '2', relation: 'spouse'}]

  useEffect(() => {
    const fetchPeopleList = async () => {
      try {
        const apiURL = 'http://localhost:80/api/profile/all'
        console.log(apiURL);
        const response = await fetch(apiURL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setPeopleList({ people: data.profiles });
        console.log("peopleList", peopleList.people)
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchPeopleList();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setselectedRelation({ ...selectedRelation, [name]: value });
    console.log(selectedRelation);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiURL = 'http://localhost:80/api/relationship'

    try {
      const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(selectedRelation),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Success:', data);
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="page-background">
      <Header />
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className='form-title'>Add Relationship</div>
          <div className="form-group">
            <label className='form-item'>
              Person 1 <br />
              <select name="p1_id" className="selection" value={selectedRelation.p1_id} onChange={handleChange}>
                <option value="">Select Person 1</option>
                {peopleList.people.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className='form-group'>
            <label className='form-item'>
              Person 2 <br />
              <select name="p2_id" className="selection" value={selectedRelation.p2_id} onChange={handleChange}>
                  <option value="">Select Person 2</option>
                  {peopleList.people.map((person) => (
                    <option key={person.id} value={person.id}>
                      {person.name}
                    </option>
                  ))}
              </select>
            </label>
          </div>
          <div className='form-group'>
            <label className='form-item'>
              Person 1 is a  
              <select name="type_id" className="selection" value={selectedRelation.type_id} onChange={handleChange}>
                  {relationships.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.relation}
                    </option>
                  ))}
              </select>
              of person 2
            </label>
          </div>
          <div className="form-group">
            <Button variant="primary" className="green-button" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RelationForm;