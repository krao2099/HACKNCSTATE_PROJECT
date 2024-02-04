import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './ProfileCreationForm.css'
import Header from '../components/Header';
import Select from 'react-select';


const MemoryCreationForm = () => {
  const navigate = useNavigate();

  const [memory, setMemory] = useState({
    title: '',
    description: '',
    file: "",
    mem_type: '1',
    p_ids: [],
  });

  const [peopleList, setPeopleList] = useState({
    people: []
  });

  const memory_types = [{id: '1', type: 'childhood'}, {id: '2', type: 'Family'}, {id: '3', type: 'Special Event'}]

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

  const handleSelectChange = (selectedValues) => {
    setMemory({ ...memory, p_ids: selectedValues.map(selectedValue => selectedValue.value)});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemory({ ...memory, [name]: value });
    console.log(memory);
  };

  const handleFileChange = (e) => {

    const file = e.target.files[0];
    let document = "";

    if(file) {
        console.log("File true");
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log("File loaded");
            document = reader.result;
            setMemory({ ...memory, file:document });
        }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(memory));
    const apiURL = 'http://localhost:80/api/memory'

    try {
      const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(memory),
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
          <div className='form-title'>Add Memory</div>
          <div className="form-group">
            <label className='form-item'>
              Title <br />
              <input type="text" name="title" value={memory.title} onChange={handleChange} />
            </label>
          </div>
          <div className="form-group">
            <label className='form-item'>
            description <br />
              <textarea name="description" className='bio-field' value={memory.description} onChange={handleChange} />
            </label>
          </div>
          <div className="form-group">
            <label className='form-item'>
              Picture <br />
              <input type="file" name="pic" onChange={handleFileChange} />
            </label>
          </div>
          <div className="form-group">
            <label className='form-item'>
              Persons <br />
              <Select
                options={peopleList.people.map(person => ({ value: person.id, label: person.name }))}
                isMulti
                value={memory.p_ids.map(p_id => ({ value: p_id, label: peopleList.people.find(person => person.id === p_id).name }))}
                onChange={handleSelectChange}
              />
            </label>
          </div>
          <div className='form-group'>
            <label className='form-item'>
              Memory Type <br />
              <select name="mem_type" className="selection" value={memory.mem_type} onChange={handleChange}>
                  {memory_types.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.type}
                    </option>
                  ))}
              </select>
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

export default MemoryCreationForm;